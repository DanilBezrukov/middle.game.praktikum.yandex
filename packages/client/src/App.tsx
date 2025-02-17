import { RouterProvider } from "react-router-dom";
import { router } from "@/app/providers";
import "@/app/style/style.css";

function App() {
  return (
    <div>Базовая настройка ssr без роутинга </div>
    // <div data-testid="app" id="app">
    //   <RouterProvider router={router} />
    // </div>
  );
}

export default App;
