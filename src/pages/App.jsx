import { useEffect, useState } from 'react';
import { Routes, Route, Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import mermaid from 'mermaid';

function DocViewer({doc}){
  const [content, setContent] = useState('Loading...');
  useEffect(()=>{
    fetch(`/VirtualWarfareWebsite/Docs/${doc}`)
      .then(res=>res.text())
      .then(text => {
        setContent(text);
        // Delay to allow markdown to render, then init mermaid
        setTimeout(() => {
          try{
            mermaid.initialize({ startOnLoad: false, theme: 'dark' });
            const nodes = document.querySelectorAll('.language-mermaid, .mermaid');
            // If using code fences, turn them into .mermaid blocks
            nodes.forEach(node => {
              if (node.classList.contains('language-mermaid')) {
                const pre = node.closest('pre');
                if (pre) {
                  const el = document.createElement('div');
                  el.className = 'mermaid';
                  el.textContent = node.textContent;
                  pre.replaceWith(el);
                }
              }
            });
            mermaid.init(undefined, document.querySelectorAll('.mermaid'));
          }catch(e){/* noop */}
        }, 50);
      })
      .catch(()=>setContent('Error loading document'));
  }, [doc]);
  return <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{content}</ReactMarkdown>;
}

export default function Docs(){
  return (
    <div className="flex">
      <nav className="w-1/4 p-4 border-r">
        <ul className="space-y-2">
          <li><Link to="HOME.md">Home</Link></li>
          <li><Link to="GAME_MODES.md">Game Modes</Link></li>
          <li><Link to="WEAPONS.md">Weapons</Link></li>
          <li><Link to="DIAGRAMS.md">Diagrams</Link></li>
        </ul>
      </nav>
      <main className="flex-1 p-4 overflow-auto">
        <Routes>
          <Route path=":docId" element={<DocRoute />} />
          <Route index element={<DocViewer doc="HOME.md" />} />
        </Routes>
      </main>
    </div>
  );
}

function DocRoute(){
  const {docId} = useParams();
  return <DocViewer doc={docId} />;
}
