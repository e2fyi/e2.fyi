import AppBar from "@material-ui/core/AppBar";
import GitHub from "@material-ui/icons/GitHub";
import Home from "@material-ui/icons/Home";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import React from "react";
import Slide from "@material-ui/core/Slide";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import { makeStyles } from "@material-ui/core/styles";
import store, { openDrawer } from "../redux";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1
  }
}));

export default function InteractiveAppBar() {
  const dispatch = useDispatch<typeof store.dispatch>();
  const classes = useStyles();
  const history = useHistory();
  const onClickHome = () => history.push("/");
  const onClickMenu = () => dispatch(openDrawer(true));

  return (
    <Slide appear={false} direction="down" in={!useScrollTrigger()}>
      <AppBar>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="home"
            title="home"
            onClick={onClickHome}
          >
            <Home />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            E2.fyi
          </Typography>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            title="menu"
            onClick={onClickMenu}
          >
            <MenuIcon />
          </IconButton>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="github"
            title="https://github.com/e2fyi/e2.fyi"
            onClick={() => window.open("https://github.com/e2fyi/e2.fyi")}
          >
            <GitHub />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Slide>
  );
}
