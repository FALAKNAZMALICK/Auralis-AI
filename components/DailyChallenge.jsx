"use client";

import { useState, useEffect } from "react";

export default function DailyChallenge() {
  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [streak, setStreak] = useState(0);
  const [completedToday, setCompletedToday] = useState(false);

  // User Inputs
  const [puzzleAnswer, setPuzzleAnswer] = useState("");
  const [codeAnswer, setCodeAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);

  const getDynamicChallenge = () => {
    const day = new Date().getDate();

    const puzzles = [
      { question: "I speak without a mouth and hear without ears. What am I?", answer: "echo" },
      { question: "What has to be broken before you can use it?", answer: "egg" },
      { question: "What goes up but never comes down?", answer: "age" },
      { question: "I have cities, but no houses; forests, but no trees. What am I?", answer: "map" },
      { question: "What can travel around the world while staying in a corner?", answer: "stamp" }
    ];

    const codingTasks = [
      "Write a JS function to check if two strings are anagrams.",
      "Write a function to remove duplicates from an array.",
      "Implement a Fibonacci sequence function in Javascript.",
      "Write a function to find the maximum number in an array.",
      "Create a function to reverse a string in Javascript."
    ];

    const words = [
      "Serendipity — Finding valuable or agreeable things not sought for.",
      "Ephemeral — Lasting for a very short period of time.",
      "Eloquence — Fluent or persuasive speaking or writing.",
      "Ubiquitous — Present, appearing, or found everywhere."
    ];

    const ideas = [
      "AI-Powered Legal Contract Analyzer for Freelancers.",
      "Personalized Smart Meal Planner based on leftover ingredients.",
      "Automated Code Refactoring Bot for Next.js.",
      "Voice-Activated Expense Tracker with Instant Analytics."
    ];

    return {
      puzzle: puzzles[day % puzzles.length].question,
      expectedPuzzleAns: puzzles[day % puzzles.length].answer,
      coding: codingTasks[day % codingTasks.length],
      word: words[day % words.length],
      idea: ideas[day % ideas.length]
    };
  };

  useEffect(() => {
    const savedStreak = localStorage.getItem("auralis_streak") || 0;
    const lastDate = localStorage.getItem("auralis_last_completed");
    const today = new Date().toDateString();

    setStreak(parseInt(savedStreak));
    if (lastDate === today) {
      setCompletedToday(true);
    }
  }, []);

  const fetchDailyChallenge = () => {
    setLoading(true);
    setTimeout(() => {
      setChallenge(getDynamicChallenge());
      setLoading(false);
    }, 500);
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!puzzleAnswer.trim() || !codeAnswer.trim()) {
      alert("Please answer both Puzzle and Coding task to submit!");
      return;
    }

    setVerifying(true);
    setFeedback(null);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: `Check if these challenge answers are acceptable:
Puzzle Question: "${challenge.puzzle}"
User's Puzzle Answer: "${puzzleAnswer}"

Coding Question: "${challenge.coding}"
User's Code: "${codeAnswer}"

Reply ONLY in this JSON format:
{"passed": true/false, "reason": "Short feedback explanation"}`,
          mode: "Coding"
        }),
      });

      const data = await res.json();
      const rawText = data?.reply || data?.text || "";
      const jsonText = rawText.replace(/```json|```/g, "").trim();
      const result = JSON.parse(jsonText);

      if (result.passed) {
        const today = new Date().toDateString();
        const newStreak = streak + 1;
        setStreak(newStreak);
        setCompletedToday(true);
        localStorage.setItem("auralis_streak", newStreak);
        localStorage.setItem("auralis_last_completed", today);
        setFeedback({ success: true, msg: "🎉 Excellent! Both answers verified by AI. Streak Unlocked!" });
      } else {
        setFeedback({ success: false, msg: `❌ ${result.reason || "Answers incorrect. Try again!"}` });
      }
    } catch (err) {
      // Local Backup Check if API is offline
      const isPuzzleCorrect = puzzleAnswer.toLowerCase().includes(challenge.expectedPuzzleAns);
      const isCodeValid = codeAnswer.length > 10;

      if (isPuzzleCorrect && isCodeValid) {
        const today = new Date().toDateString();
        const newStreak = streak + 1;
        setStreak(newStreak);
        setCompletedToday(true);
        localStorage.setItem("auralis_streak", newStreak);
        localStorage.setItem("auralis_last_completed", today);
        setFeedback({ success: true, msg: "🎉 Verified! Streak Unlocked!" });
      } else {
        setFeedback({ success: false, msg: "❌ Answers look incomplete or incorrect. Please try again!" });
      }
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl mx-auto my-8 text-white shadow-2xl">
      {/* Top Header */}
      <div className="flex justify-between items-center mb-6 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2">
            💡 Daily AI Challenge
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">Solve & submit to prove completion!</p>
        </div>
        <div className="px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-full text-sm font-semibold flex items-center gap-1">
          🔥 {streak} Day Streak
        </div>
      </div>

      {!challenge && (
        <button
          onClick={fetchDailyChallenge}
          disabled={loading}
          className="w-full py-3.5 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-xl transition cursor-pointer shadow-lg shadow-cyan-500/20"
        >
          {loading ? "⚡ Loading Tasks..." : "✨ Load Today's Challenge"}
        </button>
      )}

      {challenge && (
        <form onSubmit={handleVerify} className="space-y-5">
          {/* Puzzle Input */}
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
            <p className="text-cyan-400 text-xs font-bold uppercase mb-1">🧩 1. PUZZLE</p>
            <p className="text-sm text-gray-200 mb-3">{challenge.puzzle}</p>
            <input
              type="text"
              value={puzzleAnswer}
              onChange={(e) => setPuzzleAnswer(e.target.value)}
              placeholder="Type your puzzle answer here..."
              className="w-full p-3 rounded-lg bg-slate-900 border border-slate-800 text-sm text-white outline-none focus:border-cyan-500"
            />
          </div>

          {/* Coding Task Input */}
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
            <p className="text-cyan-400 text-xs font-bold uppercase mb-1">🧠 2. CODING TASK</p>
            <p className="text-sm text-gray-200 mb-3">{challenge.coding}</p>
            <textarea
              rows="3"
              value={codeAnswer}
              onChange={(e) => setCodeAnswer(e.target.value)}
              placeholder="Write your code solution here..."
              className="w-full p-3 rounded-lg bg-slate-900 border border-slate-800 text-sm font-mono text-cyan-300 outline-none focus:border-cyan-500 resize-none"
            ></textarea>
          </div>

          {/* Read-only Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <p className="text-cyan-400 text-xs font-bold uppercase mb-1">📖 WORD OF THE DAY</p>
              <p className="text-xs text-gray-300">{challenge.word}</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <p className="text-cyan-400 text-xs font-bold uppercase mb-1">💡 STARTUP IDEA</p>
              <p className="text-xs text-gray-300">{challenge.idea}</p>
            </div>
          </div>

          {/* Feedback Msg */}
          {feedback && (
            <div
              className={`p-3 rounded-xl text-sm font-medium ${
                feedback.success
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                  : "bg-rose-500/10 text-rose-400 border border-rose-500/30"
              }`}
            >
              {feedback.msg}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={completedToday || verifying}
            className={`w-full py-3.5 rounded-xl font-bold transition ${
              completedToday
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 cursor-default"
                : "bg-cyan-500 hover:bg-cyan-400 text-black cursor-pointer shadow-lg shadow-cyan-500/20 disabled:opacity-50"
            }`}
          >
            {completedToday
              ? "✅ Challenge Verified & Completed!"
              : verifying
              ? "🤖 AI Verifying Answers..."
              : "🚀 Submit & Verify with AI"}
          </button>
        </form>
      )}
    </div>
  );
}