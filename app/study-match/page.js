"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import students from "../data/students";
import StudyNavbar from "../../components/StudyNavbar";

export default function StudyMesh() {
  const [myProfile, setMyProfile] = useState(null);
  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedProfile = localStorage.getItem("studyProfile");
    if (savedProfile) {
      setMyProfile(JSON.parse(savedProfile));
    }
  }, []);

  function findPartner() {
    if (!myProfile) {
      alert("Please create your study profile first.");
      return;
    }

    setLoading(true);
    setMatch(null);

    setTimeout(() => {
      const partner = students.find(
        (student) =>
          student.skill.toLowerCase() === myProfile.wants.toLowerCase() &&
          student.wants.toLowerCase() === myProfile.skill.toLowerCase()
      );

      setLoading(false);

      if (partner) {
        setMatch(partner);
      } else {
        alert("No perfect mutual partner found right now. Try checking back soon!");
      }
    }, 2500);
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white pb-16">
      <StudyNavbar />

      <div className="max-w-7xl mx-auto px-6 pt-8">
        
        {/* Header Section */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-cyan-400 tracking-tight">
            🎓 Auralis Study Mesh
          </h1>
          <p className="text-gray-400 mt-2 text-lg">
            Connect globally and master new skills through peer-to-peer exchange.
          </p>
        </div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-12">
          <div className="bg-slate-900/80 backdrop-blur rounded-2xl p-6 text-center border border-slate-800 shadow-xl">
            <h2 className="text-3xl md:text-4xl font-bold text-cyan-400">{students.length}</h2>
            <p className="text-gray-400 mt-1 text-sm font-medium uppercase tracking-wider">Students</p>
          </div>
          <div className="bg-slate-900/80 backdrop-blur rounded-2xl p-6 text-center border border-slate-800 shadow-xl">
            <h2 className="text-3xl md:text-4xl font-bold text-green-400">{students.filter(s => s.online).length}</h2>
            <p className="text-gray-400 mt-1 text-sm font-medium uppercase tracking-wider">Online Now</p>
          </div>
          <div className="bg-slate-900/80 backdrop-blur rounded-2xl p-6 text-center border border-slate-800 shadow-xl">
            <h2 className="text-3xl md:text-4xl font-bold text-yellow-400">{new Set(students.map(s => s.skill)).size}</h2>
            <p className="text-gray-400 mt-1 text-sm font-medium uppercase tracking-wider">Unique Skills</p>
          </div>
          <div className="bg-slate-900/80 backdrop-blur rounded-2xl p-6 text-center border border-slate-800 shadow-xl">
            <h2 className="text-3xl md:text-4xl font-bold text-purple-400">{students.filter(s => s.level === "Expert").length}</h2>
            <p className="text-gray-400 mt-1 text-sm font-medium uppercase tracking-wider">Experts</p>
          </div>
        </div>

        {/* Main Action & Profile Section */}
        <div className="grid md:grid-cols-3 gap-8 items-start mb-12">
          
          {/* Left Column: Profile Card or Create Prompt */}
          <div className="md:col-span-1 bg-slate-900 rounded-2xl border border-slate-800 p-6 shadow-xl">
            <h2 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
              <span>👤</span> Your Status
            </h2>

            {myProfile ? (
              <div className="space-y-3 text-sm text-gray-300">
                <p><strong>Name:</strong> {myProfile.name}</p>
                <p><strong>University:</strong> {myProfile.university}</p>
                <p><strong>Can Teach:</strong> <span className="text-cyan-300">{myProfile.skill}</span></p>
                <p><strong>Wants to Learn:</strong> <span className="text-green-300">{myProfile.wants}</span></p>
                <p><strong>Level:</strong> {myProfile.level}</p>

                <div className="pt-4 flex flex-col gap-2">
                  <Link href="/study-match/profile">
                    <button className="w-full bg-slate-800 hover:bg-slate-700 text-cyan-400 py-2.5 rounded-xl font-semibold text-sm transition">
                      Edit Profile
                    </button>
                  </Link>
                  <button
                    onClick={() => {
                      localStorage.removeItem("studyProfile");
                      setMyProfile(null);
                      setMatch(null);
                    }}
                    className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 py-2 rounded-xl font-semibold text-sm transition"
                  >
                    Delete Profile
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-gray-400 text-sm mb-4">You haven't set up your exchange profile yet.</p>
                <Link href="/study-match/profile">
                  <button className="w-full bg-cyan-500 hover:bg-cyan-400 text-black py-3 rounded-xl font-bold transition shadow-lg shadow-cyan-500/20">
                    Create Profile Now
                  </button>
                </Link>
              </div>
            )}
          </div>

          {/* Right Column: Partner Matching Action Engine */}
          <div className="md:col-span-2 bg-slate-900 rounded-2xl border border-slate-800 p-8 shadow-xl flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">⚡ Intelligent Partner Matcher</h2>
              <p className="text-gray-400 text-sm mb-6">
                Our algorithm looks through active peers to pair you with someone who wants to learn what you teach, and vice-versa.
              </p>
            </div>

            <button
              onClick={findPartner}
              disabled={loading}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-extrabold text-lg transition shadow-xl shadow-cyan-500/20 disabled:opacity-50"
            >
              {loading ? "Analyzing Mesh..." : "🔍 Find My Perfect Study Partner"}
            </button>

            {/* Loading State Animation */}
            {loading && (
              <div className="mt-8 text-center py-8">
                <div className="animate-spin rounded-full h-14 w-14 border-b-4 border-cyan-400 mx-auto"></div>
                <h3 className="text-xl mt-4 font-bold text-cyan-400">Auralis AI is matching your skills...</h3>
                <p className="text-gray-400 text-sm mt-1">Cross-referencing global student nodes...</p>
              </div>
            )}

            {/* Match Result Card */}
            {match && (
              <div className="mt-8 bg-slate-950/80 rounded-xl p-6 border border-cyan-500/50 animate-fadeIn">
                <h3 className="text-2xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
                  <span>🎉</span> Perfect Match Found!
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-300 mb-6">
                  <p>👤 <strong>Name:</strong> {match.name}</p>
                  <p>🏫 <strong>University:</strong> {match.university}</p>
                  <p>🌍 <strong>Country:</strong> {match.country}</p>
                  <p>🧠 <strong>Teaches:</strong> <span className="text-cyan-300">{match.skill}</span></p>
                  <p>📚 <strong>Wants:</strong> <span className="text-green-300">{match.wants}</span></p>
                  <p>⭐ <strong>Level:</strong> {match.level}</p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link href="/study-match/chat">
                    <button className="bg-green-500 hover:bg-green-400 text-black px-5 py-2.5 rounded-xl font-bold text-sm transition">
                      💬 Open Chat
                    </button>
                  </Link>
                  <Link href="/study-match/video">
                    <button className="bg-purple-500 hover:bg-purple-400 text-black px-5 py-2.5 rounded-xl font-bold text-sm transition">
                      🎥 Video Call
                    </button>
                  </Link>
                  <Link href="/study-match/voice">
                    <button className="bg-yellow-500 hover:bg-yellow-400 text-black px-5 py-2.5 rounded-xl font-bold text-sm transition">
                      🎤 Voice Room
                    </button>
                  </Link>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Upcoming Features Footer Grid */}
        <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-6">
          <h2 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
            <span>🚀</span> Ecosystem Roadmap & Features
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-sm text-gray-300">
            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">✅ AI Skill Matching</div>
            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">✅ Live Voice Rooms</div>
            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">✅ AI Whiteboard</div>
            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">✅ AI Notes Generator</div>
            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">✅ Flashcards Sync</div>
            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">✅ XP & Leaderboard</div>
            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">✅ Skill Swap Roulette</div>
            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">✅ Real-time Analytics</div>
          </div>
        </div>

      </div>
    </main>
  );
}