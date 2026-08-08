import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

<footer className="w-full py-6 text-center border-t border-slate-800 bg-slate-950 text-slate-400 text-sm">
  <p>© 2026 Auralis AI. Built by Falak Naz. All rights reserved.</p>
  <div className="mt-3 flex justify-center items-center">
    <a 
      href="https://aifluency.flyrank.ai/" 
      target="_blank" 
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 text-xs text-amber-500 hover:underline"
    >
      <img 
        src="https://aifluency.flyrank.ai/badge.svg" 
        alt="FlyRank Graduate Badge" 
        className="h-6 w-auto" 
      />
      <span>Verified FlyRank Graduate</span>
    </a>
  </div>
</footer>

export const metadata = {
  title: "Auralis AI — AI Learning & Productivity Workspace",
  description:
    "Auralis AI is an AI-powered learning and productivity workspace for studying, coding, writing, translation, and more.",
  openGraph: {
    title: "Auralis AI — AI Learning & Productivity Workspace",
    description:
      "Study, code, write, translate, and learn with Auralis AI.",
    url: "https://auralis-ai-delta.vercel.app/",
    siteName: "Auralis AI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Auralis AI — AI Learning & Productivity Workspace",
    description:
      "An AI-powered learning and productivity workspace.",
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      >
        <body className="min-h-full flex flex-col">{children}</body>
      </html>
    </ClerkProvider>
  );
}
