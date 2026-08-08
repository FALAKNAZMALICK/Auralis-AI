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
