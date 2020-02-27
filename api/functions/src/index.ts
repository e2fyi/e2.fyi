import * as functions from "firebase-functions";

import { deserializeVegaSpec } from "./serialization";
import {
  getVegaEmbedTemplateProps,
  vegaEmbedTemplate,
  toCanvas,
  toSvg
} from "./vega";

export const vegaLink = functions
  .region("us-central1") // firebase hosting only works with us-central1
  .runWith({ timeoutSeconds: 10, memory: "128MB" })
  .https.onRequest(async (request, response) => {
    const spec = request.query.spec;
    const mode: "html" | "svg" | "img" | undefined = request.query.mode;
    if (!spec) return response.sendStatus(404);
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Cache-Control", "max-age=108000"); // cache for 30 days
    try {
      const specObj = deserializeVegaSpec(spec);
      if (mode === "img") {
        response.setHeader("Content-Type", "image/png");
        return response.send(await toCanvas(specObj));
      }
      if (mode === "svg") {
        response.setHeader("Content-Type", "image/svg+xml");
        return response.send(await toSvg(specObj));
      }
      response.setHeader("Content-Type", "text/html");
      const html = vegaEmbedTemplate(getVegaEmbedTemplateProps(specObj));
      return response.send(html);
    } catch (error) {
      console.error(error);
      return response.sendStatus(500);
    }
  });
