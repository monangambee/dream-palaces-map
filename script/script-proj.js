const minx = -16857702.71589949;
const miny = -17212325.962645144;
const maxx = 17289853.05215329;
const maxy = 16935229.805407636;

const resolutions = [
  213422.22355032988708, // z=0  -> world px ~160
  106711.11177516494354, // z=1  -> ~320
  53355.55588758247177, // z=2  -> ~640
  26677.77794379123588, // z=3  -> ~1280 (≈5 tiles)
];

const MetersProjection = {
  project: (latlng) => L.point(latlng.lng, latlng.lat), // [x,y] -> Point(x,y)
  unproject: (point) => L.latLng(point.y, point.x), // 反变换
  bounds: L.bounds(L.point(minx, miny), L.point(maxx, maxy)),
};

const CRS_Spilhaus = L.extend({}, L.CRS.Simple, {
  projection: MetersProjection,
  transformation: new L.Transformation(1, -minx, -1, maxy),
  scale: (z) => 1 / resolutions[z],
  zoom: (s) => {
    const scales = resolutions.map((r) => 1 / r);
    let best = 0,
      err = Infinity;
    for (let i = 0; i < scales.length; i++) {
      const d = Math.abs(scales[i] - s);
      if (d < err) {
        err = d;
        best = i;
      }
    }
    return best;
  },
  infinite: false,
});

const mapBounds = L.latLngBounds([miny, minx], [maxy, maxx]);

const map_spilhaus = L.map("mapSpilhaus", {
  crs: CRS_Spilhaus,
  minZoom: 0,
  maxZoom: 3,
  maxBounds: mapBounds,
  maxBoundsViscosity: 1.0,
});

// 立刻设视图（否则停在 z=0 只要 1 瓦）
// map_spilhaus.fitBounds(mapBounds);

// gdal2tiles -w leaflet 通常是 XYZ（y 向下）=> 先用 tms:false 试
const tile = L.tileLayer("tiles8.12/{z}/{x}/{y}.png", {
  tms: true,
  tileSize: 256,
  minZoom: 0,
  maxZoom: 3,
  minNativeZoom: 3,
  maxNativeZoom: 3,
  scrollWheelZoom: "center",
  touchZoom: "center",
  doubleClickZoom: "center",
  zoomSnap: 1,
  zoomDelta: 1,
  inertia: false,
  noWrap: true,
  bounds: mapBounds,
  keepBuffer: 2,
}).addTo(map_spilhaus);

// 调试：看看实际请求了哪些瓦片
map_spilhaus.on("zoomend", () => {
  const z = map_spilhaus.getZoom();
  const wb = map_spilhaus.options.crs.getProjectedBounds(z).getSize();
  console.log(`world px @z=${z}:`, wb.x, wb.y);
});
tile.on("tileloadstart", (e) => console.log("start", e.coords, e.tile.src));
tile.on("tileerror", (e) => console.warn("tileerror", e.coords, e.tile.src));

// —— “已是米坐标”的 GeoJSON —— //
fetch("/assets/ukspilhaus.geojson", { cache: "no-cache" })
  .then((r) => {
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    return r.json();
  })
  .then((geojson) => {
    if (geojson.crs) delete geojson.crs; // 避免误触发跨CRS逻辑

    const layer = L.geoJSON(geojson, {
      coordsToLatLng: (c) => L.latLng(c[1], c[0]), // [x,y] -> [lat=y,lng=x]
      style: {
        color: "#1f2937",
        weight: 1,
        fillColor: "#60a5fa",
        fillOpacity: 0.25,
      },
    }).addTo(map_spilhaus);

    const b = layer.getBounds();
    if (b.isValid())
      map_spilhaus.fitBounds(b, { maxZoom: 3, padding: [10, 10] });
  });
