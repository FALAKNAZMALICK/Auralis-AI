"use client";

import StudyNavbar from "../../../components/StudyNavbar";
import { useState } from "react";

export default function VideoRoom() {
  const [micActive, setMicActive] = useState(true);
  const [camActive, setCamActive] = useState(true);

  return (
    <main className="min-h-screen bg-slate-950 text-white pb-16">
      <StudyNavbar />

      <div className="max-w-7xl mx-auto px-6 pt-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold text-cyan-400 flex items-center gap-3">
            <span>🎥</span> Live Study Video Room
          </h1>
          <p className="text-gray-400 mt-2">
            Collaborate face-to-face with your matched study partner in real-time.
          </p>
        </div>

        {/* Video Grids */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          
          {/* Peer Video Box */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl h-80 flex flex-col items-center justify-center relative overflow-hidden shadow-xl">
            <div className="absolute top-4 left-4 bg-slate-950/70 px-3 py-1 rounded-lg text-xs font-semibold text-cyan-300">
              Partner Stream (Alex)
            </div>
            <div className="text-6xl mb-2">👤</div>
            <p className="text-gray-400 text-sm">Connecting video feed...</p>
          </div>

          {/* Your Video Box */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl h-80 flex flex-col items-center justify-center relative overflow-hidden shadow-xl">
            <div className="absolute top-4 left-4 bg-slate-950/70 px-3 py-1 rounded-lg text-xs font-semibold text-green-300">
              Your Camera ({camActive ? "Active" : "Off"})
            </div>
            {camActive ? (
              <div className="text-6xl mb-2">🧑‍💻</div>
            ) : (
              <div className="text-5xl mb-2 text-gray-600">📷🚫</div>
            )}
            <p className="text-gray-400 text-sm">{camActive ? "Camera Live" : "Camera Disabled"}</p>
          </div>

        </div>

        {/* Control Bar */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex justify-center items-center gap-4 shadow-xl max-w-md mx-auto">
          <button 
            onClick={() => setMicActive(!micActive)}
            className={`px-5 py-2.5 rounded-xl font-bold text-sm transition ${micActive ? 'bg-slate-800 hover:bg-slate-700 text-white' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}
          >
            {micActive ? "🎙️ Mute Mic" : "🎙️ Unmute"}
          </button>

          <button 
            onClick={() => setCamActive(!camActive)}
            className={`px-5 py-2.5 rounded-xl font-bold text-sm transition ${camActive ? 'bg-slate-800 hover:bg-slate-700 text-white' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}
          >
            {camActive ? "📹 Stop Cam" : "📹 Start Cam"}
          </button>

          <button 
            onClick={() => alert("Ending call...")}
            className="bg-red-500 hover:bg-red-400 text-black px-5 py-2.5 rounded-xl font-bold text-sm transition"
          >
            📞 End Call
          </button>
        </div>

      </div>
    </main>
  );
}