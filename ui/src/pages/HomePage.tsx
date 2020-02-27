import Grid from "@material-ui/core/Grid";
import MediaCard from "../components/MediaCard";
import React from "react";
import { RouteProps } from "../lib/routes";

export interface HomePageProps {
  items?: RouteProps[];
}

export default function HomePage({ items = [] }: HomePageProps) {
  return (
    <Grid container direction="column" alignContent="center" spacing={2}>
      {items
        .filter(item => !item.divider)
        .map((item, i) => (
          <Grid item key={i}>
            <MediaCard {...item} />
          </Grid>
        ))}
    </Grid>
  );
}
