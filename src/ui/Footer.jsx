import React from "react";

export default function Footer() {
  return (
    <footer className="h-14 border-t flex items-center justify-center text-sm text-zinc-600 dark:text-zinc-400">
      © {new Date().getFullYear()} Lance Page • VirtualWarfare
    </footer>
  );
}
