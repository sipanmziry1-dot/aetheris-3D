"use client";

import { useState } from "react";
import Canvas3D from "@/components/spatial/Canvas3D";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsGenerating(true);
    
    // Simulate generation event
    setTimeout(() => {
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-black">
      {/* Canvas 3D */}
      <Canvas3D isGenerating={isGenerating} prompt={prompt} />

      {/* Floating Prompt Box UI */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-2xl z-10">
        <form 
          onSubmit={handleSubmit}
          className="flex items-center gap-2 p-2 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-cyan-500/30 shadow-lg shadow-cyan-500/10"
        >
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="پێم بڵێ هەموو شتێک..."
            className="flex-1 bg-transparent px-4 py-2 text-white outline-none placeholder-slate-400 text-right"
          />
          <button
            type="submit"
            disabled={isGenerating}
            className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-semibold transition-all disabled:opacity-50"
          >
            {isGenerating ? "دروستکردن..." : "بنێرە"}
          </button>
        </form>
      </div>
    </main>
  );
}