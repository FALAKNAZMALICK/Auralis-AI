"use client";

import { useState } from "react";

export default function StudyRoom() {

  const [notes, setNotes] = useState("");

  return (

    <main className="min-h-screen bg-slate-950 text-white p-8">

      <h1 className="text-4xl font-bold text-cyan-400">
        🎓 AI Study Room
      </h1>

      <p className="text-gray-400 mt-2">
        Study together with AI assistance.
      </p>

      <div className="grid md:grid-cols-2 gap-8 mt-10">

        <div className="bg-slate-900 rounded-2xl p-6">

          <h2 className="text-2xl font-bold mb-4">
            📄 Shared Notes
          </h2>

          <textarea
            value={notes}
            onChange={(e)=>setNotes(e.target.value)}
            className="w-full h-72 bg-slate-800 rounded-xl p-4 outline-none"
            placeholder="Write notes here..."
          />

        </div>

        <div className="bg-slate-900 rounded-2xl p-6">

          <h2 className="text-2xl font-bold mb-4">
            🤖 AI Assistant
          </h2>

          <button className="w-full py-3 rounded-xl bg-cyan-500 text-black font-bold">
            ✨ Generate Summary
          </button>

          <button className="w-full py-3 rounded-xl bg-green-500 mt-4 text-black font-bold">
            🧠 Generate Quiz
          </button>

          <button className="w-full py-3 rounded-xl bg-purple-500 mt-4 text-black font-bold">
            📚 Make Flashcards
          </button>

        </div>

      </div>

    </main>

  );

}