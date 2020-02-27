import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import React from "react";
import { Divider } from "@material-ui/core";
import { RouteProps } from "../lib/routes";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  sidebar: {
    minWidth: 240
  }
}));

export interface SidebarProps {
  items?: RouteProps[];
}

export default function Sidebar({ items = [] }: SidebarProps) {
  const classes = useStyles();
  return (
    <List className={classes.sidebar}>
      {items.map((item, i) =>
        item.divider ? (
          <Divider key={i} />
        ) : (
          <ListItem button key={i} title={item.title} onClick={item.onClick}>
            {item.icon ? <ListItemIcon>{item.icon}</ListItemIcon> : null}
            <ListItemText primary={item.title} />
          </ListItem>
        )
      )}
    </List>
  );
}
