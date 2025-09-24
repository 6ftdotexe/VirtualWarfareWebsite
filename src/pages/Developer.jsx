import React from "react";

export default function Developer() {
  return (
    <div className="container mx-auto px-6 py-16">
      <div className="max-w-2xl mx-auto bg-white dark:bg-zinc-800 rounded-2xl shadow-soft p-8">
        <h1 className="text-3xl font-bold mb-2">About the Developer</h1>
        <p className="text-zinc-600 dark:text-zinc-300 mb-6">Built by <strong>Lance Page</strong>.</p>
        <p className="text-zinc-600 dark:text-zinc-300">
          Creator of VirtualWarfare. This portal documents systems, modes, and technical decisions.
        </p>
      </div>
    </div>
  );
}
