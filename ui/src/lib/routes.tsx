import Avatar from "@material-ui/core/Avatar";
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
    title: "Vega-Link",
    image: "/vega.png",
    desc: "is a url generator to share interactive vis with Vega or Vega-Lite.",
    pathname: "/vega",
    icon: <Avatar>V</Avatar>
  },
  {
    title: "Minio-Web",
    image: "/minio.png",
    desc: "is a web server proxy for any S3-compatible storage.",
    pathname: "/github/e2fyi/minio-web",
    icon: <Avatar>M</Avatar>
  },
  {
    title: "e2fyi-utils",
    image: "/pypi.png",
    desc: "Useful ease-of-use python helpers to interact with AWS resources.",
    pathname: "/github/e2fyi/py-utils",
    icon: <Avatar>P</Avatar>
  },
  {
    title: "kfx",
    image: "/pypi.png",
    desc: "Extensions for kubeflow pipelines sdk.",
    pathname: "/github/e2fyi/kfx",
    icon: <Avatar>K</Avatar>
  },
  {
    title: "Kubeflow-AWS",
    image: "/kubeflow.jpg",
    desc: "is a collection of kustomize manifest to deploy Kubeflow in AWS.",
    pathname: "/github/e2fyi/kubeflow-aws",
    icon: <Avatar>K</Avatar>
  }
];
