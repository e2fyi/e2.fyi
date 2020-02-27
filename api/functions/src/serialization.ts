import * as BSON from "bson";

import * as lz from "lz-string";

export const serializeVegaSpec = (spec: any) =>
  lz.compressToEncodedURIComponent(BSON.serialize(spec).toString("base64"));

export const deserializeVegaSpec = (serialized: string) => {
  if (!serialized) return undefined;
  const uncompressed = lz.decompressFromEncodedURIComponent(serialized);
  return BSON.deserialize(Buffer.from(uncompressed, "base64"));
};
