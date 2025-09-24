import React from "react";

export default function Sidebar({ docs, activeDoc, onSelect }) {
  return (
    <aside className="hidden md:block w-64 bg-zinc-50 dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 p-4 sidebar">
      <h2 className="text-lg font-semibold mb-3">📚 Docs</h2>
      <ul className="space-y-1">
        {docs.map((d) => (
          <li key={d.file}>
            <button
              onClick={() => onSelect(d.file)}
              className={`w-full text-left px-3 py-2 rounded-md transition ${
                activeDoc === d.file
                  ? "bg-yellow-400 text-black font-semibold"
                  : "hover:bg-zinc-100 dark:hover:bg-zinc-800"
              }`}
            >
              {d.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
