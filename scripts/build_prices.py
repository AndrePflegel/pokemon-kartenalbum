#!/usr/bin/env python3
import json, re, sys, urllib.request
from collections import defaultdict, Counter
from pathlib import Path
from datetime import datetime, timezone

price_path, product_path, out_path = map(Path, sys.argv[1:4])

SETS = [
    {"tcgdex":"sv10.5b","code":"BLK","label":"Black Bolt"},
    {"tcgdex":"sv10.5w","code":"WHT","label":"White Flare"},
]

def load(path):
    with path.open("r", encoding="utf-8") as f:
        return json.load(f)

def rows(payload, keys):
    if isinstance(payload, list): return payload
    if isinstance(payload, dict):
        for key in keys:
            value=payload.get(key)
            if isinstance(value, list): return value
    return []

def pid(row):
    return str(row.get("idProduct") or row.get("productId") or row.get("id") or "")

def expansion_id(row):
    return str(row.get("idExpansion") or row.get("expansionId") or "")

def name(row):
    return str(row.get("name") or row.get("productName") or "").strip()

def val(row,*keys):
    for key in keys:
        v=row.get(key)
        if v not in (None,""):
            try: return float(v)
            except (TypeError,ValueError): pass
    return None

def norm(s):
    s=str(s or "").casefold()
    s=re.sub(r"\b(v|version)\s*\.?\s*\d+\b","",s)
    s=re.sub(r"[^a-z0-9]+"," ",s)
    return " ".join(s.split())

def fetch_json(url):
    req=urllib.request.Request(url,headers={"User-Agent":"pokemon-kartenalbum-price-builder/1.0"})
    with urllib.request.urlopen(req,timeout=30) as r:
        return json.load(r)

prices=rows(load(price_path),["priceGuide","priceGuides","prices","data","products"])
products=rows(load(product_path),["products","product","data"])
price_by_id={pid(r):r for r in prices if pid(r)}

# Group all Cardmarket singles by idExpansion.
products_by_expansion=defaultdict(list)
for p in products:
    eid=expansion_id(p)
    if eid:
        products_by_expansion[eid].append(p)

by_key={}
diagnostics={}

for spec in SETS:
    tcg=fetch_json(f"https://api.tcgdex.net/v2/en/sets/{spec['tcgdex']}")
    cards=tcg.get("cards") or []
    # Normalized multiset of English card names. Duplicate names are meaningful.
    target_names=Counter(norm(c.get("name")) for c in cards if c.get("name"))

    # Find Cardmarket idExpansion with the strongest overlap with the full set.
    scored=[]
    for eid,plist in products_by_expansion.items():
        pnames=Counter(norm(name(p)) for p in plist if name(p))
        overlap=sum(min(count,pnames.get(n,0)) for n,count in target_names.items())
        if overlap:
            scored.append((overlap, -abs(len(plist)-len(cards)), eid))
    scored.sort(reverse=True)
    if not scored:
        diagnostics[spec["code"]]={"error":"No matching Cardmarket expansion found"}
        continue

    best_overlap, _, best_eid=scored[0]
    cm_products=products_by_expansion[best_eid]

    # Group cards/products by normalized English name, then pair duplicates
    # deterministically: cards by collector number, CM products by idProduct.
    cards_by_name=defaultdict(list)
    prods_by_name=defaultdict(list)
    for c in cards:
        cards_by_name[norm(c.get("name"))].append(c)
    for p in cm_products:
        prods_by_name[norm(name(p))].append(p)

    matched=0
    missing=[]
    for n,clist in cards_by_name.items():
        plist=prods_by_name.get(n,[])
        clist.sort(key=lambda c:int(re.sub(r"\D","",str(c.get("localId") or c.get("id","0")).split("-")[-1]) or 0))
        plist.sort(key=lambda p:int(pid(p) or 0))
        for c,p in zip(clist,plist):
            local=str(c.get("localId") or c.get("id","").split("-")[-1])
            m=re.search(r"\d+",local)
            if not m: continue
            key=f"{spec['code']}:{int(m.group()):03d}"
            row=price_by_id.get(pid(p))
            if not row:
                missing.append(key)
                continue
            by_key[key]={
                "idProduct":pid(p),
                "name":name(p),
                "trend":val(row,"trend","trendPrice","priceTrend"),
                "avg1":val(row,"avg1","avg1d","average1"),
                "avg7":val(row,"avg7","avg7d","average7"),
                "avg30":val(row,"avg30","avg30d","average30"),
            }
            matched+=1

    diagnostics[spec["code"]]={
        "idExpansion":best_eid,
        "tcgdexCards":len(cards),
        "cardmarketProducts":len(cm_products),
        "nameOverlap":best_overlap,
        "matchedPrices":matched,
        "missingPriceRows":len(missing),
        "runnerUp":[{"overlap":x[0],"idExpansion":x[2]} for x in scored[1:4]],
    }
    print(spec["code"], diagnostics[spec["code"]])

out={
    "schema":1,
    "generatedAt":datetime.now(timezone.utc).isoformat(),
    "source":"Cardmarket public Pokémon price guide + product catalogue; TCGdex set names used for deterministic set matching",
    "byKey":dict(sorted(by_key.items())),
    "diagnostics":diagnostics,
}
out_path.parent.mkdir(parents=True,exist_ok=True)
out_path.write_text(json.dumps(out,ensure_ascii=False,separators=(",",":")),encoding="utf-8")
print(f"Wrote {len(by_key)} prices to {out_path}")
