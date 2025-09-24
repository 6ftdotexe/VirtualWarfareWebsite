import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains("dark"));
  const location = useLocation();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <nav className="h-14 border-b bg-white/70 dark:bg-zinc-900/70 backdrop-blur sticky top-0 z-50">
      <div className="container mx-auto h-full px-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={import.meta.env.BASE_URL + "logo.svg"} alt="logo" className="w-7 h-7" />
          <Link to="/" className="font-bold">VirtualWarfare</Link>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/docs" className={`hover:underline ${location.pathname.startsWith("/docs") ? "font-semibold text-yellow-400" : ""}`}>Docs</Link>
          <Link to="/developer" className={`hover:underline ${location.pathname.startsWith("/developer") ? "font-semibold text-yellow-400" : ""}`}>Developer</Link>
          <a href="https://github.com/<your-username>/VirtualWarfareWebsite" target="_blank" className="hover:underline">GitHub</a>
          <button onClick={() => setDark(v => !v)} className="px-3 py-1 rounded border border-zinc-300 dark:border-zinc-700">
            {dark ? "🌙" : "☀️"}
          </button>
        </div>
      </div>
    </nav>
  );
}
