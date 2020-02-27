import schema from "vega-schema-url-parser";

import * as vg from "vega";

import * as vl from "vega-lite";

import { Canvas } from "canvas";

export interface VegaEmbedTemplateProps {
  vegaEmbedVersion?: string;
  vegaVersion?: string;
  vegaLiteVersion?: string;
  spec: string;
}

export function getVegaEmbedTemplateProps(
  specObj: any
): VegaEmbedTemplateProps {
  const spec = JSON.stringify(specObj);
  if (specObj["$schema"]) {
    const { library, version } = schema(specObj["$schema"]);
    if (library === "vega-lite") {
      return { spec, vegaLiteVersion: version.slice(1, 2) };
    }
    return { spec, vegaVersion: version.slice(1, 2) };
  }
  return { spec };
}

export const vegaEmbedTemplate = ({
  vegaEmbedVersion = "6",
  vegaVersion = "5",
  vegaLiteVersion = "4",
  spec
}: VegaEmbedTemplateProps) => `
<!DOCTYPE html>
<html>
<head>

  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="theme-color" content="#000000" />
  <meta
    name="description"
    content="Share your interactive visualization."
  />
  <meta property="og:title" content="e2.fyi/vega" />
  <meta property="og:url" content="https://e2.fyi/vega" />
  <meta property="og:type" content="website" />
  <meta property="og:description" content="Share your interactive visualization." />
  <meta property="og:image" content="https://e2.fyi/vega.png" />

  <title>e2.fyi/api/vegaLink</title>

  <!-- Import Vega 5 & Vega-Lite 3 (does not have to be from CDN) -->
  <script src="https://cdn.jsdelivr.net/npm/vega@${vegaVersion}"></script>
  <script src="https://cdn.jsdelivr.net/npm/vega-lite@${vegaLiteVersion}"></script>
  <!-- Import vega-embed -->
  <script src="https://cdn.jsdelivr.net/npm/vega-embed@${vegaEmbedVersion}"></script>
</head>
<body>

<div id="vis"></div>

<script type="text/javascript">
  var spec = ${spec};
  vegaEmbed('#vis', spec).then(function(result) {
    // Access the Vega view instance (https://vega.github.io/vega/docs/api/view/) as result.view
  }).catch(console.error);
</script>
</body>
</html>
`;

export function getView(
  specObj: any = {},
  renderer: "canvas" | "svg" | "none" = "none"
) {
  let specObj_ = specObj;
  if (specObj["$schema"]) {
    const { library } = schema(specObj["$schema"]);

    if (library === "vega-lite") {
      specObj_ = vl.compile(specObj).spec;
    }
  }

  return new vg.View(vg.parse(specObj_))
    .renderer(renderer)
    .loader(vg.loader({ mode: "http" }))
    .width(specObj_.width || 320)
    .height(specObj_.height || 320)
    .initialize()
    .runAsync();
}

export async function toSvg(specObj: any = {}) {
  const view = await getView(specObj, "svg");
  return view.toSVG();
}

export async function toCanvas(specObj: any = {}) {
  const view = await getView(specObj, "canvas");
  const canvas = (await view.toCanvas()) as unknown;
  return (canvas as Canvas).toBuffer();
}
