import React from "react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[radial-gradient(circle_at_top_left,rgba(250,204,21,0.6),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(250,204,21,0.3),transparent_40%)]"></div>
      <div className="container mx-auto px-6 py-24 text-center">
        <img src={import.meta.env.BASE_URL + "logo.svg"} alt="logo" className="mx-auto w-20 h-20 mb-6 drop-shadow" />
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4">VirtualWarfare</h1>
        <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-300 mb-10">
          Professional documentation portal for tactical systems.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link to="/docs" className="px-6 py-3 bg-yellow-400 text-black rounded-xl shadow hover:shadow-lg transition">Get Started</Link>
          <Link to="/developer" className="px-6 py-3 bg-zinc-800 text-white rounded-xl shadow hover:shadow-lg transition">Meet the Developer</Link>
        </div>
      </div>
    </section>
  );
}
