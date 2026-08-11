#!/usr/bin/env python3
import json, re, sys
from pathlib import Path
from datetime import datetime, timezone

price_path, product_path, out_path = map(Path, sys.argv[1:4])

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

def val(row,*keys):
    for key in keys:
        v=row.get(key)
        if v not in (None,""):
            try: return float(v)
            except (TypeError,ValueError): pass
    return None

def pid(row):
    return str(row.get("idProduct") or row.get("productId") or row.get("id") or "")

def product_name(p):
    return str(p.get("name") or p.get("productName") or "")

def expansion_name(p):
    e=p.get("expansionName") or p.get("expansion") or ""
    if isinstance(e,dict): e=e.get("name","")
    return str(e)

prices=rows(load(price_path),["priceGuide","priceGuides","prices","data","products"])
products=rows(load(product_path),["products","product","data"])
price_by_id={pid(r):r for r in prices if pid(r)}

# We intentionally publish only the two sets currently curated in the app.
# Cardmarket uses Black Bolt / White Flare product expansions and card names;
# the collector number is recovered from common fields where available.
wanted={
    "black bolt":"BLK",
    "white flare":"WHT",
    "schwarze blitze":"BLK",
    "weiße flammen":"WHT",
    "weisse flammen":"WHT",
}
by_key={}
for p in products:
    ex=expansion_name(p).strip().lower()
    code=None
    for hint,c in wanted.items():
        if hint in ex:
            code=c; break
    if not code: continue
    number=p.get("number") or p.get("collectorNumber") or p.get("nr") or p.get("cardNumber")
    if number is None:
        # Some exports include the set code/number in category/product metadata.
        blob=" ".join(str(p.get(k,"")) for k in ("name","categoryName","category","setCode","expansionName"))
        m=re.search(r"\b(?:BLK|WHT)\s*0*(\d{1,3})\b",blob,re.I)
        if m: number=m.group(1)
    if number is None: continue
    m=re.search(r"(\d{1,3})",str(number))
    if not m: continue
    key=f"{code}:{int(m.group(1)):03d}"
    row=price_by_id.get(pid(p))
    if not row: continue
    by_key[key]={
        "idProduct":pid(p),
        "name":product_name(p),
        "trend":val(row,"trend","trendPrice","priceTrend"),
        "avg1":val(row,"avg1","avg1d","average1"),
        "avg7":val(row,"avg7","avg7d","average7"),
        "avg30":val(row,"avg30","avg30d","average30"),
    }

out={
    "schema":1,
    "generatedAt":datetime.now(timezone.utc).isoformat(),
    "source":"Cardmarket public Pokémon price guide and product catalogue",
    "byKey":dict(sorted(by_key.items())),
}
out_path.parent.mkdir(parents=True,exist_ok=True)
out_path.write_text(json.dumps(out,ensure_ascii=False,separators=(",",":")),encoding="utf-8")
print(f"Wrote {len(by_key)} prices to {out_path}")
