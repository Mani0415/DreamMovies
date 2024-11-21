import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter} from "react-router-dom";
import axios from "axios";
import { MovieProvider } from "./context/MovieAuth";

// Setup axios
axios.defaults.baseURL = "https://api.themoviedb.org/3";
axios.defaults.headers.common["Authorization"] = `Bearer ${
  import.meta.env.VITE_API_TOKEN
}`;

createRoot(document.getElementById("root")).render(
  <BrowserRouter
    future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
  >
    <MovieProvider>
      <App />
    </MovieProvider>
  </BrowserRouter>
);
