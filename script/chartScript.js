let allData = [];
fetch(
  "/Users/xy/Documents/workspace/DreamPalaceWebMap/airtablesync/places_cache.geojson"
)
  .then((res) => res.json())
  .then((json) => {
    allData = json.features;
    updateChart(allData);
  });

function filterByRegion(regionScale, regionName) {
  const selectedRegion = allData.filter(
    (f) => properties.regionScale === regionName
  );
  const allCount = len(selectedRegion);
  return allCount;
  return selectedRegion;
}

function countCategoreis(features, selected_region) {
  const selected_region = filtered.properties.features;
  const condition_demolished = selected_data.filter(
    (f) => properties.condition === "Demolished"
  );
  const coundition_count = len(filtered_condition);
  const filtered_typology = selected_data.filter(
    (f) => properties.typology === ""
  );
}
