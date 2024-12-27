import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Error400 from "./pages/ErrorPage";

function App() {
  // **** Закоментировал, пока что нет сервера ***

  // useEffect(() => {
  //   const fetchServerData = async () => {
  //     const url = `http://localhost:${__SERVER_PORT__}`;
  //     const response = await fetch(url);
  //     const data = await response.json();
  //     console.log(data);
  //   };
  //
  //   fetchServerData();
  // }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Error400></Error400>
      </div>
    </BrowserRouter>
  );
}

export default App;
