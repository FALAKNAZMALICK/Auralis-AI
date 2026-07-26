"use client";

import StudyNavbar from "../../../components/StudyNavbar";
import { useState } from "react";

export default function VoiceRoom() {
  const [isMuted, setIsMuted] = useState(false);

  return (
    <main className="min-h-screen bg-slate-950 text-white pb-16">
      <StudyNavbar />

      <div className="max-w-4xl mx-auto px-6 pt-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold text-cyan-400 flex items-center gap-3">
            <span>🎤</span> Voice Study Room
          </h1>
          <p className="text-gray-400 mt-2">
            Low-latency audio channel for focused peer brainstorming and active recall.
          </p>
        </div>

        {/* Room Participants Box */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl mb-6">
          <h2 className="text-xl font-bold text-white mb-4">Active Speakers</h2>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between bg-slate-950 p-4 rounded-xl border border-slate-800">
              <div className="flex items-center gap-3">
                <span className="h-3 w-3 rounded-full bg-green-500 animate-pulse"></span>
                <span className="font-medium">Alex (Partner)</span>
              </div>
              <span className="text-xs text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full">Speaking</span>
            </div>

            <div className="flex items-center justify-between bg-slate-950 p-4 rounded-xl border border-slate-800">
              <div className="flex items-center gap-3">
                <span className={`h-3 w-3 rounded-full ${isMuted ? 'bg-red-500' : 'bg-green-500'}`}></span>
                <span className="font-medium">You</span>
              </div>
              <span className="text-xs text-gray-400 bg-slate-800 px-3 py-1 rounded-full">
                {isMuted ? "Muted" : "Connected"}
              </span>
            </div>
          </div>
        </div>

        {/* Audio Controls */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`px-8 py-3 rounded-xl font-bold transition shadow-lg ${
              isMuted 
                ? 'bg-red-500 hover:bg-red-400 text-black' 
                : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
            }`}
          >
            {isMuted ? "🔇 Unmute Voice" : "🎙️ Mute Voice"}
          </button>

          <button
            onClick={() => alert("Leaving voice room...")}
            className="bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 px-8 py-3 rounded-xl font-bold transition"
          >
            Leave Room
          </button>
        </div>

      </div>
    </main>
  );
}