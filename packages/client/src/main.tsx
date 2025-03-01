import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "@/app/style/style.css";

import { registerServiceWorker, unregisterServiceWorker } from "@/app/utils/serviceWorker";

// if (import.meta.env.PROD) {
//   registerServiceWorker();
// } else {
//   unregisterServiceWorker();
// }

ReactDOM.hydrateRoot(document.getElementById("root") as HTMLElement, <App />);
