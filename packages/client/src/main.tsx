import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "@/app/style/style.css";
import ErrorBoundary from "./ErrorBoundary";
import { CssBaseline } from "@mui/material";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <CssBaseline />
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
