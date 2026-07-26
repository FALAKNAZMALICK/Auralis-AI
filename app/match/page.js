"use client";

import { useState } from "react";

export default function MatchPage() {
  const [searching, setSearching] = useState(false);
  const [partner, setPartner] = useState(null);

  const findPartner = () => {
    setPartner(null);
    setSearching(true);

    setTimeout(() => {
      setPartner({
        name: "Sara Ahmed",
        university: "FAST NUCES",
        subject: "Python Programming",
        level: "Advanced",
        rating: 4.9,
      });

      setSearching(false);
    }, 3000);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl p-8">

        <h1 className="text-4xl font-black text-cyan-400 text-center">
          🎲 Live Study Match
        </h1>

        <p className="text-gray-400 text-center mt-2">
          Find students around the world to study together.
        </p>

        <button
          onClick={findPartner}
          disabled={searching}
          className="mt-8 w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-4 rounded-xl"
        >
          {searching ? "Searching..." : "Find Study Partner"}
        </button>

        {searching && (
          <div className="mt-8 text-center">
            <div className="animate-pulse text-cyan-400">
              🔍 Looking for the perfect study partner...
            </div>
          </div>
        )}

        {partner && (
          <div className="mt-8 bg-slate-800 rounded-2xl p-6">

            <h2 className="text-2xl font-bold text-green-400">
              🎉 Match Found
            </h2>

            <div className="mt-4 space-y-2">

              <p>
                👤 <strong>Name:</strong> {partner.name}
              </p>

              <p>
                🎓 <strong>University:</strong> {partner.university}
              </p>

              <p>
                📚 <strong>Subject:</strong> {partner.subject}
              </p>

              <p>
                🏆 <strong>Level:</strong> {partner.level}
              </p>

              <p>
                ⭐ <strong>Rating:</strong> {partner.rating}
              </p>

            </div>

            <button
              className="mt-6 w-full bg-green-500 hover:bg-green-400 text-black font-bold py-3 rounded-xl"
            >
              🚀 Start Study Session
            </button>

          </div>
        )}

      </div>
    </main>
  );
}