import * as serviceWorker from "./serviceWorker";
import App from "./App";
import React from "react";
import ReactDOM from "react-dom";
import store from "./redux";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";
import "./index.css";

ReactDOM.render(
  <Provider store={store}>
    <SnackbarProvider maxSnack={3}>
      <App />
    </SnackbarProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// See also https://stackoverflow.com/questions/55245427/create-react-app-reload-on-service-worker-update
serviceWorker.register({
  onUpdate: async registration => {
    // We want to run this code only if we detect a new service worker is
    // waiting to be activated.
    // Details about it: https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle
    if (registration && registration.waiting) {
      await registration.unregister();
      // Once the service worker is unregistered, we can reload the page to let
      // the browser download a fresh copy of our app (invalidating the cache)
      window.location.reload(true);
    }
  },
});
