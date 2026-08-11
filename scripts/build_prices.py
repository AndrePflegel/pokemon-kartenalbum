#!/usr/bin/env python3
import json, re, sys, urllib.request
from collections import defaultdict
from pathlib import Path
from datetime import datetime, timezone

price_path, product_path, out_path = map(Path, sys.argv[1:4])

SETS = [
    {"tcgdex":"sv10.5b","code":"BLK","label":"Black Bolt","expectedExpansion":"6134"},
    {"tcgdex":"sv10.5w","code":"WHT","label":"White Flare","expectedExpansion":"6135"},
]
MIN_MATCH_RATIO = 0.95

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

def card_number(card):
    raw=str(card.get("localId") or card.get("id","").split("-")[-1])
    m=re.search(r"\d+",raw)
    return int(m.group()) if m else 99999

def fetch_json(url):
    req=urllib.request.Request(url,headers={"User-Agent":"pokemon-kartenalbum-price-builder/1.1"})
    with urllib.request.urlopen(req,timeout=30) as r:
        return json.load(r)

prices=rows(load(price_path),["priceGuide","priceGuides","prices","data","products"])
products=rows(load(product_path),["products","product","data"])
price_by_id={pid(r):r for r in prices if pid(r)}

products_by_expansion=defaultdict(list)
for p in products:
    eid=expansion_id(p)
    if eid:
        products_by_expansion[eid].append(p)

by_key={}
diagnostics={}
failures=[]

for spec in SETS:
    tcg=fetch_json(f"https://api.tcgdex.net/v2/en/sets/{spec['tcgdex']}")
    cards=sorted((tcg.get("cards") or []), key=card_number)

    # The preceding diagnostic run identified the exact Cardmarket expansion IDs.
    # Keep them explicit for this curated collection instead of guessing every month.
    eid=spec["expectedExpansion"]
    cm_products=sorted(products_by_expansion.get(eid,[]), key=lambda p:int(pid(p) or 0))

    if not cards or not cm_products:
        failures.append(f"{spec['code']}: cards/products missing")
        diagnostics[spec["code"]]={"idExpansion":eid,"tcgdexCards":len(cards),"cardmarketProducts":len(cm_products),"matchedPrices":0}
        continue

    # For these two expansions Cardmarket has exactly one product per collector-numbered card.
    # Pair by stable order. Names are used only as a sanity check because localized Pokémon
    # names differ between TCGdex EN and Cardmarket's product catalogue.
    pair_count=min(len(cards),len(cm_products))
    anchors=0
    matched=0
    missing_price=0
    samples=[]

    for index in range(pair_count):
        card=cards[index]
        product=cm_products[index]
        number=card_number(card)
        key=f"{spec['code']}:{number:03d}"
        row=price_by_id.get(pid(product))
        if not row:
            missing_price+=1
            continue

        if norm(card.get("name")) == norm(name(product)):
            anchors+=1

        by_key[key]={
            "idProduct":pid(product),
            "name":name(product),
            "trend":val(row,"trend","trendPrice","priceTrend"),
            "avg1":val(row,"avg1","avg1d","average1"),
            "avg7":val(row,"avg7","avg7d","average7"),
            "avg30":val(row,"avg30","avg30d","average30"),
        }
        matched+=1
        if index in (0,1,2,78,79,80,len(cards)-3,len(cards)-2,len(cards)-1):
            samples.append({
                "collector":number,
                "tcgdex":card.get("name"),
                "cardmarket":name(product),
                "idProduct":pid(product)
            })

    ratio=matched/len(cards) if cards else 0
    diagnostics[spec["code"]]={
        "idExpansion":eid,
        "tcgdexCards":len(cards),
        "cardmarketProducts":len(cm_products),
        "paired":pair_count,
        "matchedPrices":matched,
        "matchRatio":round(ratio,4),
        "sameNameAnchors":anchors,
        "missingPriceRows":missing_price,
        "samplePairs":samples
    }

    if len(cards) != len(cm_products):
        failures.append(f"{spec['code']}: Cardmarket product count {len(cm_products)} != TCGdex card count {len(cards)}")
    if ratio < MIN_MATCH_RATIO:
        failures.append(f"{spec['code']}: only {matched}/{len(cards)} prices matched ({ratio:.1%})")

out={
    "schema":1,
    "generatedAt":datetime.now(timezone.utc).isoformat(),
    "source":"Cardmarket public Pokémon price guide + product catalogue; curated BLK/WHT expansion IDs; collector-order pairing",
    "byKey":dict(sorted(by_key.items())),
    "diagnostics":diagnostics,
}

# Write a candidate file for diagnostics, but exit non-zero on bad quality.
candidate=out_path.with_suffix(".candidate.json")
candidate.parent.mkdir(parents=True,exist_ok=True)
candidate.write_text(json.dumps(out,ensure_ascii=False,separators=(",",":")),encoding="utf-8")

print(json.dumps(diagnostics,ensure_ascii=False,indent=2))
print(f"Candidate contains {len(by_key)} prices.")

if failures:
    print("QUALITY GATE FAILED:", file=sys.stderr)
    for failure in failures:
        print(" -",failure,file=sys.stderr)
    sys.exit(2)

candidate.replace(out_path)
print(f"QUALITY GATE PASSED. Wrote {len(by_key)} prices to {out_path}")
