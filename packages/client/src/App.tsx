import { RouterProvider } from "react-router-dom";
import { router } from "@/app/providers";
import "@/app/style/style.css";

function App() {
  return (
    <div id="app">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
