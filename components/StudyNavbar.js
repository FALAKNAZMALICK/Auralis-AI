"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function StudyNavbar() {
  const router = useRouter();

  const handleLogout = () => {
    router.push("/");
  };

  return (
    <nav className="w-full bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 h-16">

        <h1 className="text-cyan-400 text-2xl font-bold">
          🎓 Auralis Study Mesh
        </h1>

        <div className="flex gap-6 items-center">
          <Link href="/study-match">Dashboard</Link>
          <Link href="/study-match/profile">Profile</Link>
          <Link href="/study-match/chat">Chat</Link>
          <Link href="/study-match/video">Video</Link>
          <Link href="/study-match/voice">Voice</Link>

          {/* Added User Name and Logout Button */}
          <div className="flex items-center gap-3 ml-4 pl-4 border-l border-slate-700">
            <span className="text-sm font-medium text-white">👤 Falak</span>
            <button
              onClick={handleLogout}
              className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 px-3 py-1 rounded-xl text-sm font-semibold transition"
            >
              Logout
            </button>
          </div>
        </div>

      </div>
    </nav>
  );
}