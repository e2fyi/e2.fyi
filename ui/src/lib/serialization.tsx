import * as BSON from "bson";
import lz from "lz-string";

export const serializeVegaSpec = (spec: any) =>
  lz.compressToEncodedURIComponent(BSON.serialize(spec).toString("base64"));

export const deserializeVegaSpec = (serialized?: string) =>
  serialized
    ? BSON.deserialize(
        Buffer.from(lz.decompressFromEncodedURIComponent(serialized), "base64")
      )
    : undefined;
