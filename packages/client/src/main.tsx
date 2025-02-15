import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "@/app/style/style.css";
import ErrorBoundary from "./ErrorBoundary";
import { CssBaseline } from "@mui/material";
import { Provider } from "react-redux";
import { store } from "@/store";

import { registerServiceWorker, unregisterServiceWorker } from "@/app/utils/serviceWorker";

if (!import.meta.env.PROD) {
  registerServiceWorker();
} else {
  unregisterServiceWorker();
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorBoundary>
        <CssBaseline />
        <App />
      </ErrorBoundary>
    </Provider>
  </React.StrictMode>,
);
