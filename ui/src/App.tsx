import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import InteractiveAppBar from './pages/AppBar';
import Pages from './pages';
import React from 'react';
import store, {
  setError,
  setHasUpdates,
  setMsg,
  StoreState
  } from './redux';
import Toast from './components/Toast';
import { BrowserRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { setupServiceWorkerHooks } from './lib/service-worker-hooks';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';


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
