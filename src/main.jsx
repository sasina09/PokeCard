import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Pokemondex from "./components/Pokemondex";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Pokemondex/>
  </StrictMode>
);