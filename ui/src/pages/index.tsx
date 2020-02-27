import HomePage from "./HomePage";
import React from "react";
import Sidebar from "../components/Sidebar";
import store, { openDrawer, StoreState } from "../redux";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import VegaLinkPage from "./VegaLinkPage";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import { routes } from "../lib/routes";
import { useDispatch, useSelector } from "react-redux";

export default function Router() {
  const drawerOpened = useSelector<StoreState, boolean>(
    state => state.app.drawerOpened
  );
  const history = useHistory();
  const dispatch = useDispatch<typeof store.dispatch>();
  const items = routes.map((route, i) => {
    const { pathname } = route;
    const onClick = pathname
      ? (e: React.MouseEvent) => {
          e.stopPropagation();
          dispatch(openDrawer(false));
          history.push(pathname);
        }
      : undefined;
    return { ...route, onClick };
  });
  return (
    <React.Fragment>
      <Switch>
        <Route path="/vega">
          <VegaLinkPage path="/vega" />
        </Route>
        <Route path="/">
          <HomePage items={items} />
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>

      <SwipeableDrawer
        open={drawerOpened}
        onOpen={() => dispatch(openDrawer(true))}
        onClose={() => dispatch(openDrawer(false))}
      >
        <Sidebar items={items} />
      </SwipeableDrawer>
    </React.Fragment>
  );
}
