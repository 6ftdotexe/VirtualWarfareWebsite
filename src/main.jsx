import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import App from "./pages/App";
import Landing from "./pages/Landing";
import Developer from "./pages/Developer";
import Navbar from "./ui/Navbar";
import Footer from "./ui/Footer";
import "./index.css";
import NProgress from "nprogress";

function RouteProgress() {
  const location = useLocation();
  useEffect(() => { NProgress.start(); NProgress.done(); }, [location.pathname]);
  return null;
}

function ThemeBoot() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = saved || (prefersDark ? "dark" : "light");
    document.documentElement.classList.toggle("dark", theme === "dark");
    // set favicon dynamically using base URL
    const link = document.createElement("link");
    link.rel = "icon";
    link.type = "image/svg+xml";
    link.href = import.meta.env.BASE_URL + "logo.svg";
    document.head.appendChild(link);
    setReady(true);
  }, []);
  return ready ? null : null;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router basename={import.meta.env.BASE_URL}>
      <ThemeBoot />
      <Navbar />
      <RouteProgress />
      <div className="min-h-[calc(100vh-56px-56px)]"> 
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/docs" element={<App />} />
          <Route path="/developer" element={<Developer />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  </React.StrictMode>
);