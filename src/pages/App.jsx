import React, { useEffect, useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import mermaid from "mermaid";
import NProgress from "nprogress";
import Fuse from "fuse.js";
import Sidebar from "../ui/Sidebar";

const DOCS = [
  { name: "Home", file: "HOME.md" },
  { name: "Game Modes", file: "GAME_MODES.md" },
  { name: "Weapons", file: "WEAPONS.md" },
  { name: "Index", file: "DOCS_INDEX.md" },
  { name: "Readme", file: "README.md" },
];

export default function App() {
  const [activeDoc, setActiveDoc] = useState("HOME.md");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [allDocs, setAllDocs] = useState([]);
  const [query, setQuery] = useState("");
  const base = import.meta.env.BASE_URL;

  // Prefetch docs for search
  useEffect(() => {
    let mounted = true;
    (async () => {
      const entries = await Promise.all(
        DOCS.map(async (d) => {
          const text = await fetch(`${base}Docs/${d.file}`).then((r) => r.text());
          return { ...d, text };
        })
      );
      if (mounted) setAllDocs(entries);
    })();
    return () => { mounted = false; };
  }, []);

  const fuse = useMemo(() => new Fuse(allDocs, { keys: ["name", "text"], threshold: 0.3 }), [allDocs]);
  const results = query ? fuse.search(query).slice(0, 8).map(r => r.item) : [];

  useEffect(() => {
    NProgress.start();
    setLoading(true);
    fetch(`${base}Docs/${activeDoc}`)
      .then((res) => res.text())
      .then((text) => {
        setContent(text);
        setLoading(false);
        NProgress.done();
        setTimeout(() => {
          try {
            const nodes = document.querySelectorAll(".language-mermaid, .mermaid");
            mermaid.initialize({ startOnLoad: false, theme: "dark" });
            mermaid.init(undefined, nodes);
            nodes.forEach((node) => node.classList.add("mermaid"));
          } catch {}
        }, 200);
      })
      .catch(() => { setLoading(false); NProgress.done(); });
  }, [activeDoc]);

  return (
    <div className="flex">
      <Sidebar docs={DOCS} activeDoc={activeDoc} onSelect={setActiveDoc} />

      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        {/* Search */}
        <div className="mb-6">
          <input
            className="w-full md:w-1/2 px-4 py-2 rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            placeholder="Search docs..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && results.length > 0 && (
            <ul className="mt-2 w-full md:w-1/2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded shadow-soft">
              {results.map((r) => (
                <li key={r.file}>
                  <button
                    className="w-full text-left px-3 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-700"
                    onClick={() => { setActiveDoc(r.file); setQuery(""); }}
                  >
                    <div className="font-semibold">{r.name}</div>
                    <div className="text-sm text-zinc-500 line-clamp-1">{r.file}</div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Content */}
        <article className="prose lg:prose-lg dark:prose-invert max-w-none">
          {loading ? (
            <div className="flex items-center justify-center h-40"><div className="loader"/></div>
          ) : (
            <ReactMarkdown>{content}</ReactMarkdown>
          )}
        </article>
      </main>
    </div>
  );
}
