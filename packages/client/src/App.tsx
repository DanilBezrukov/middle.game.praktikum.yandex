import { RouterProvider } from "react-router-dom";
import { router } from "@/app/providers";
import "@/app/style/style.css";
import React from "react";
import { Provider } from "react-redux";
import { store } from "@/store";
import ErrorBoundary from "@/ErrorBoundary";
import { CssBaseline } from "@mui/material";

function App() {
  return (
    <React.StrictMode>
      <ErrorBoundary>
        <Provider store={store}>
          <CssBaseline />
          <RouterProvider router={router} />
        </Provider>
      </ErrorBoundary>
    </React.StrictMode>
  );
}

export default App;
