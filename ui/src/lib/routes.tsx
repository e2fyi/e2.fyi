import BarChart from "@material-ui/icons/BarChart";
import Home from "@material-ui/icons/Home";
import React from "react";

export interface RouteProps {
  image?: string;
  title?: string;
  desc?: string;
  onClick?: React.MouseEventHandler;
  pathname?: string;
  icon?: JSX.Element;
  divider?: boolean;
}

export const routes: Array<RouteProps> = [
  {
    title: "e2.fyi",
    image: "/foliocover.png",
    desc:
      "is the personal site of @eterna2 to showcase random stuff he had done.",
    pathname: "/",
    icon: <Home />
  },
  {
    divider: true
  },
  {
    title: "Vega-link",
    image: "/vega.png",
    desc: "is a url generator to share interactive vis with Vega or Vega-Lite.",
    pathname: "/vega",
    icon: <BarChart />
  }
];
