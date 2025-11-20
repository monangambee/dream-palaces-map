import json
# read data 
with open ("airtablesync/places_cache.geojson", "r", encoding="utf-8") as f:
    data = json.load(f)

# clean 
rename = {
    "Condition [V2] ": "Condition"
}
new_feature = []
for entry in data.get("features", []):
    s = entry.get("properties", {})
    new_props = {}
    for k,v in s.items():
        new_key = rename.get(k,k)
        new_props[new_key]=v
    new_entry = {
        "type": entry.get("type", "Feature"),
        "geometry": entry.get("geometry"),
        "properties": new_props
    }
    new_feature.append(new_entry)

new_geojson = {
     "type": "FeatureCollection",
    "features": new_feature
}

with open ("airtablesync/reanme.geojson", "w", encoding="utf-8") as f:
    json.dump(new_geojson,f,ensure_ascii=False, indent=2, default=str)
    