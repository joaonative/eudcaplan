import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header.tsx";
import Plan from "./pages/Plan.tsx";
import About from "./pages/About.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/sobre" element={<About />} />
        <Route path="/planejamento/:id" element={<Plan />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
