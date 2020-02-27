export interface ApiVegaLinkProps {
  mode?: "html" | "svg" | "img";
  spec: string;
}
export const apiVegaLink = ({ spec, mode = "img" }: ApiVegaLinkProps) =>
  `https://api.e2.fyi/vega?mode=${mode}&spec=${spec}`;
