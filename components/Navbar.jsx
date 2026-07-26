"use client";

import Link from "next/link";
import { useUser, UserButton, useClerk } from "@clerk/nextjs";

export default function Navbar() {
  const { isSignedIn, isLoaded } = useUser();
  const { openSignIn } = useClerk();

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-slate-950 text-white border-b border-slate-800 sticky top-0 z-50">
      {/* Logo */}
      <Link href="/" className="text-xl font-bold tracking-wide">
        Auralis <span className="text-cyan-400">AI</span>
      </Link>

      {/* Navigation Links */}
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
        <button
          onClick={() => scrollToSection("challenge")}
          className="hover:text-cyan-400 transition cursor-pointer text-amber-400 font-semibold"
        >
          💡 Daily Challenge
        </button>
        <button
          onClick={() => scrollToSection("features")}
          className="hover:text-cyan-400 transition cursor-pointer"
        >
          Features
        </button>
        <button
          onClick={() => scrollToSection("about")}
          className="hover:text-cyan-400 transition cursor-pointer"
        >
          About
        </button>
        <button
          onClick={() => scrollToSection("contact")}
          className="hover:text-cyan-400 transition cursor-pointer"
        >
          Contact
        </button>
      </div>

      {/* Auth Controls */}
      <div className="flex items-center gap-4">
        {!isLoaded ? (
          <div className="w-8 h-8 rounded-full bg-slate-800 animate-pulse" />
        ) : !isSignedIn ? (
          <button
            onClick={() => openSignIn()}
            className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-xl text-sm transition shadow-lg shadow-cyan-500/20 cursor-pointer"
          >
            ⚡ Quick Login
          </button>
        ) : (
          <div className="flex items-center gap-3">
            <Link
              href="/chat"
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-cyan-500/30 font-semibold rounded-xl text-sm transition"
            >
              Go to Chat 💬
            </Link>
            <UserButton afterSignOutUrl="/" />
          </div>
        )}
      </div>
    </nav>
  );
}