import AppBar from "@material-ui/core/AppBar";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import GitHub from "@material-ui/icons/GitHub";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Pages from "./pages";
import React from "react";
import Slide from "@material-ui/core/Slide";
import store, {
  openDrawer,
  setError,
  setMsg,
  StoreState,
  setHasUpdates
} from "./redux";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import { BrowserRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { setupServiceWorkerHooks } from "./lib/service-worker-hooks";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import Toast from "./components/Toast";

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar
  }
}));

export const InteractiveAppBar: React.FC = () => {
  const dispatch = useDispatch<typeof store.dispatch>();
  const classes = useStyles();

  return (
    <Slide appear={false} direction="down" in={!useScrollTrigger()}>
      <AppBar>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            title="menu"
            onClick={() => dispatch(openDrawer(true))}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            E2.fyi
          </Typography>
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
};

export default function App() {
  const classes = useStyles();
  const hasUpdates = useSelector<StoreState, boolean>(
    state => state.app.hasUpdates
  );
  const msg = useSelector<StoreState, string | undefined>(
    state => state.app.msg
  );
  const error = useSelector<StoreState, Error | string | undefined>(
    state => state.app.error
  );
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch<typeof store.dispatch>();
  React.useEffect(() => {
    setupServiceWorkerHooks(msg => {
      dispatch(setHasUpdates(msg.hasUpdates));
    });
  }, [dispatch]);

  if (error) {
    enqueueSnackbar(typeof error === "string" ? error : error.message, {
      variant: "error"
    });
    dispatch(setError());
  }
  if (msg) {
    enqueueSnackbar(msg, { variant: "info" });
    dispatch(setMsg());
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Container className={classes.container}>
        <BrowserRouter>
          <InteractiveAppBar />
          <div className={classes.toolbar} />
          <Pages />
        </BrowserRouter>
      </Container>
      <Toast show={hasUpdates} message="Updates are available. Click to reload." />
    </React.Fragment>
  );
}
