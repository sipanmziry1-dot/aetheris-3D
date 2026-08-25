'use client';

import dynamic from 'next/dynamic';

const Canvas3D = dynamic(() => import('@/components/spatial/Canvas3D').then((mod) => mod.default || mod), { 
  ssr: false 
});

export default function Home() {
  return (
    <main className="relative w-full h-screen overflow-hidden text-white selection:bg-cyan-500 selection:text-black">
      <Canvas3D />

      <header className="absolute top-8 left-8 z-10 backdrop-blur-md bg-black/30 p-4 rounded-2xl border border-white/10">
        <h1 className="text-3xl font-black tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-teal-300 to-fuchsia-500">
          AETHERIS
        </h1>
        <p className="text-[10px] tracking-wider text-cyan-300/70 uppercase mt-0.5">
          Generative Spatial Web Engine
        </p>
      </header>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 w-11/12 max-w-lg">
        <div className="backdrop-blur-xl bg-black/50 border border-cyan-500/30 p-2 rounded-2xl shadow-[0_0_30px_rgba(0,240,255,0.15)] flex items-center gap-2">
          <input 
            type="text" 
            placeholder="داوا لە AI بکە بۆ هەر شوێنێک لە شارەکە..." 
            className="w-full bg-transparent outline-none text-sm text-white placeholder-gray-400 px-4 py-2"
          />
          <button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold text-xs px-5 py-3 rounded-xl transition-all shadow-lg shrink-0">
            گەڕان
          </button>
        </div>
      </div>
    </main>
  );
}