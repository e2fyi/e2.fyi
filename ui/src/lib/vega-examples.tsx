export const vegaLiteExampleSpec = {
  $schema: "https://vega.github.io/schema/vega-lite/v4.json",
  height: 250,
  data: {
    url:
      "https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_110m_populated_places_simple.geojson",
    format: { type: "json", property: "features" }
  },
  transform: [
    { filter: "datum.properties.adm1name" },
    { filter: "datum.properties.rank_max < 10" },
    { calculate: "datum.properties.adm1name", as: "name" },
    { calculate: "datum.properties.pop_max", as: "pop_max" }
  ],
  mark: "bar",
  encoding: {
    x: { field: "name", type: "nominal", sort: "-y" },
    y: { aggregate: "sum", field: "pop_max", type: "quantitative" }
  }
};
