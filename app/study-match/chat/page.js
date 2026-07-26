"use client";

import { useState } from "react";
import StudyNavbar from "../../../components/StudyNavbar";

export default function ChatPage() {
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([
    {
      sender: "Partner",
      text: "Hi 👋 Ready to study together?",
      time: "10:00 AM",
    },
  ]);

  function sendMessage() {
    if (!message.trim()) return;

    setMessages([
      ...messages,
      {
        sender: "You",
        text: message,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);

    setMessage("");

    // Fake Reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "Partner",
          text: "Sounds good! Let's start 🚀",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    }, 1200);
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white flex flex-col">
      <StudyNavbar />

      <div className="bg-slate-900 p-5 border-b border-slate-800">
        <h1 className="text-2xl font-bold text-cyan-400">
          💬 Study Chat
        </h1>
      </div>

      <div className="flex-1 p-6 overflow-y-auto space-y-4">

        {messages.map((m, i) => (
          <div
            key={i}
            className={`max-w-md p-4 rounded-xl ${
              m.sender === "You"
                ? "ml-auto bg-cyan-500 text-black"
                : "bg-slate-800"
            }`}
          >
            <p>{m.text}</p>

            <p className="text-xs mt-2 opacity-70">
              {m.time}
            </p>
          </div>
        ))}

      </div>

      <div className="p-5 flex gap-3">

        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 p-3 rounded-xl bg-slate-800 outline-none"
          placeholder="Type message..."
        />

        <button
          onClick={sendMessage}
          className="bg-cyan-500 px-6 rounded-xl text-black font-bold"
        >
          Send
        </button>

      </div>

    </main>
  );
}