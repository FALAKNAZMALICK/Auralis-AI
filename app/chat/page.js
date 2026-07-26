"use client";
import Link from "next/link";

import { useState, useRef, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import ReactMarkdown from "react-markdown";
import { useUser, useClerk, UserButton } from "@clerk/nextjs";

export default function ChatPage() {
  const { user, isLoaded, isSignedIn } = useUser();
  const { openSignIn } = useClerk();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [mode, setMode] = useState("Quick");
  const [loading, setLoading] = useState(false);
  const [chats, setChats] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [file, setFile] = useState(null);
  const [darkMode, setDarkMode] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const stopGeneration = useRef(false);

  // 🌐 Internet Search Toggle State
  const [useSearch, setUseSearch] = useState(false);

  const chatEndRef = useRef(null);

  useEffect(() => {
    const savedChats = localStorage.getItem("auralis_chats");
    if (savedChats) {
      try {
        const parsedChats = JSON.parse(savedChats);
        setChats(parsedChats);
        if (parsedChats.length > 0) {
          setCurrentChatId(parsedChats[0].id);
          setMessages(parsedChats[0].messages);
        }
      } catch (e) {
        console.error("Failed to parse saved chats:", e);
      }
    }
  }, []);

  useEffect(() => {
    if (chats.length > 0) {
      localStorage.setItem("auralis_chats", JSON.stringify(chats));
    } else {
      localStorage.removeItem("auralis_chats");
    }
  }, [chats]);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

const templates = {
    Quick: "",
    Study: "Explain this topic in simple words:\n",
    Coding: "Help me write code for:\n",
    Flashcards: "Generate 5 revision flashcards (Question & Answer format) and a 3-question MCQ quiz based on:\n",
    PDF: "Summarize this document and extract key takeaways:\n",
    Writer: "Write a professional article about:\n",
  };

  const startNewChat = () => {
    setMessages([]);
    setCurrentChatId(null);
    setMessage("");
    setFile(null);
  };
  
  function startListening() {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Speech Recognition is not supported in this browser.");
    return;
  }

  const recognition = new SpeechRecognition();

  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.start();

  recognition.onresult = (event) => {
    const text = event.results[0][0].transcript;
    setMessage(text);
  };

  recognition.onerror = (event) => {
    console.log(event.error);
  };
}

  async function sendMessage() {
    if (!message.trim() && !file) return;

    stopGeneration.current = false;

    const userMessage = message;
    const currentFile = file;

    setMessage("");
    setFile(null);
    setLoading(true);

    const updatedUserMessages = [
      ...messages,
      {
        sender: "You",
        text: userMessage || (currentFile ? `[Uploaded File: ${currentFile.name}]` : ""),
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ];

    setMessages(updatedUserMessages);

    const formData = new FormData();
    formData.append("message", userMessage);
    formData.append("mode", mode);
    formData.append("useSearch", useSearch ? "true" : "false");
    formData.append("history", JSON.stringify(messages));

    if (currentFile) {
      formData.append("file", currentFile);
    }

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      const replyText = data.reply || data.text || "No response received.";


      setLoading(false);

// Add an empty AI message first
setMessages([
  ...updatedUserMessages,
  {
    sender: "Auralis",
    text: "",
    time: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
  },
]);

setLoading(false);

let currentText = "";

for (let i = 0; i < replyText.length; i += 3) {
  if (stopGeneration.current) break;

  currentText += replyText.slice(i, i + 3);

  setMessages((prev) => {
    const copy = [...prev];
    copy[copy.length - 1].text = currentText;
    return copy;
  });

  await new Promise((r) => setTimeout(r, 12));
}

const completedMessages = [
  ...updatedUserMessages,
  {
    sender: "Auralis",
    text: currentText,
    time: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
  },
];
      

      setChats((prev) => {
        let activeId = currentChatId;
        if (!activeId) {
          activeId = Date.now().toString();
          setCurrentChatId(activeId);
          return [
            {
              id: activeId,
              title: userMessage.slice(0, 25) || (currentFile ? currentFile.name : "New Chat"),
              messages: completedMessages,
            },
            ...prev,
          ];
        }

        return prev.map((c) =>
          c.id === activeId ? { ...c, messages: completedMessages } : c
        );
      });
    } catch (err) {
      console.error("Failed to send message:", err);
      setLoading(false);
    }
  }

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (files) => files.length > 0 && setFile(files[0]),
    accept: {
      "application/pdf": [".pdf"],
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
      "image/webp": [".webp"],
    },
  });

  return (
    <main
      className={`min-h-screen flex relative font-sans transition-colors duration-300 ${
        darkMode ? "bg-slate-950 text-white" : "bg-gray-50 text-slate-900"
      }`}
    >
      {/* Sidebar */}
      <div
        className={`border-r shrink-0 min-h-screen transition-all duration-300 relative z-10 flex flex-col justify-between ${
          darkMode 
            ? "bg-slate-900 border-slate-800 text-white" 
            : "bg-white border-gray-200 text-slate-900 shadow-sm"
        } ${
          isSidebarOpen ? "w-72 p-5" : "w-0 p-0 overflow-hidden border-none"
        }`}
      >
        <div className="w-60">
          <div className="flex justify-between items-center mb-4">
            <h2 className={`text-xl font-bold ${darkMode ? "text-cyan-400" : "text-cyan-600"}`}>
              💬 Conversations
            </h2>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className={`cursor-pointer ${darkMode ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-slate-900"}`}
            >
              ◀
            </button>
          </div>

          <button
            onClick={startNewChat}
            className="w-full mb-4 py-2.5 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-semibold transition cursor-pointer"
          >
            ➕ New Chat
          </button>


          <Link href="/study-match">
  <button className="w-full mb-4 py-2.5 px-4 rounded-xl bg-green-500 hover:bg-green-400 text-black font-semibold transition cursor-pointer">
    🎲 Live Study Match
  </button>
</Link>

          <div className="space-y-2 max-h-[70vh] overflow-y-auto">
            {chats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => {
                  setCurrentChatId(chat.id);
                  setMessages(chat.messages);
                }}
                className={`p-3 rounded-xl border cursor-pointer truncate text-sm transition ${
                  currentChatId === chat.id
                    ? darkMode
                      ? "bg-slate-800 border-cyan-500/50 text-white"
                      : "bg-cyan-50 border-cyan-500 text-cyan-900 font-medium"
                    : darkMode
                      ? "bg-slate-900/50 border-slate-800/80 text-gray-400 hover:bg-slate-800/50"
                      : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"
                }`}
              >
                {chat.title}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="flex-1 p-6 md:p-10 h-screen overflow-y-auto flex flex-col justify-between">
        <div className="max-w-4xl mx-auto w-full">
          {/* Header Controls */}
          <div className="flex justify-between items-center mb-8 gap-4 flex-wrap">
            {!isSidebarOpen && (
              <button
                onClick={() => setIsSidebarOpen(true)}
                className={`px-4 py-2 rounded-xl cursor-pointer transition ${
                  darkMode ? "bg-slate-800 hover:bg-slate-700 text-white" : "bg-white border border-gray-200 hover:bg-gray-100 text-slate-800 shadow-sm"
                }`}
              >
                💬 History
              </button>
            )}

            <div className="flex items-center gap-3 ml-auto flex-wrap">
              {/* 👤 Clerk Authentication Section */}
              {!isLoaded ? (
                <div className={`w-8 h-8 rounded-full animate-pulse ${darkMode ? "bg-slate-800" : "bg-gray-200"}`} />
              ) : isSignedIn ? (
                <div className={`flex items-center gap-3 border p-1.5 px-3 rounded-xl ${darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-gray-200 shadow-sm"}`}>
                  <span className={`text-xs font-semibold hidden sm:inline ${darkMode ? "text-white" : "text-slate-800"}`}>
                    {user?.fullName || user?.firstName || "Auralis User"}
                  </span>
                  <UserButton afterSignOutUrl="/" />
                </div>
              ) : (
                <button
                  onClick={() => openSignIn()}
                  className="px-3 py-2 text-xs bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-xl transition cursor-pointer"
                >
                  ⚡ Quick Login
                </button>
              )}

              {/* 🌐 Web Search Toggle */}
              <button
                onClick={() => setUseSearch(!useSearch)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold border transition flex items-center gap-1.5 cursor-pointer ${
                  useSearch
                    ? "bg-green-500/20 border-green-500 text-green-400 shadow-md shadow-green-500/10"
                    : darkMode
                      ? "bg-slate-900 border-slate-800 text-gray-400 hover:text-white"
                      : "bg-white border-gray-200 text-gray-600 hover:text-slate-900 shadow-sm"
                }`}
              >
                🌐 Internet {useSearch ? "ON" : "OFF"}
              </button>

              <button
                onClick={() => setDarkMode(!darkMode)}
                className="px-3 py-2 text-xs rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-semibold transition cursor-pointer"
              >
                {darkMode ? "☀ Light" : "🌙 Dark"}
              </button>
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-5xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Auralis AI
            </h1>
            <p className={`mt-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Your Intelligent Workspace</p>
          </div>

          {/* Mode Selector */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-6">
            {Object.keys(templates).map((m) => (
              <button
                key={m}
                onClick={() => {
                  setMode(m);
                  setMessage(templates[m]);
                }}
                className={`rounded-xl p-4 text-center transition cursor-pointer ${
                  mode === m
                    ? "bg-cyan-500 text-black font-bold"
                    : darkMode
                      ? "bg-slate-900 border border-slate-800 text-gray-300 hover:bg-slate-800"
                      : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-100 shadow-sm"
                }`}
              >
                <div className="text-xl mb-1">
                  {m === "Quick" && "⚡"}
                  {m === "Study" && "🎓"}
                  {m === "Coding" && "💻"}
                  {m === "Translate" && "🌍"}
                  {m === "PDF" && "📄"}
                  {m === "Writer" && "✍"}
                  {m === "Flashcards" && "🧠"}
                </div>
                <span className="text-xs">{m}</span>
              </button>
            ))}
          </div>

          {/* Dropzone */}
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-2xl p-4 text-center cursor-pointer mb-6 transition ${
              darkMode ? "border-cyan-500/50 bg-slate-900/50" : "border-cyan-500 bg-cyan-50/50"
            }`}
          >
            <input {...getInputProps()} />
            {file ? (
              <p className="text-green-500 font-medium">✅ {file.name}</p>
            ) : (
              <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                📎 Attach Image or PDF for AI analysis
              </p>
            )}
          </div>

         {/* Messages List */}
          <div className="space-y-6 mb-8">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex gap-4 p-5 rounded-2xl border ${
                  msg.sender === "You"
                    ? darkMode
                      ? "bg-cyan-600/10 border-cyan-500/30 ml-auto max-w-[85%]"
                      : "bg-cyan-50 border-cyan-200 ml-auto max-w-[85%]"
                    : darkMode
                      ? "bg-slate-900 border-slate-800 max-w-full text-white"
                      : "bg-white border-gray-200 max-w-full text-slate-900 shadow-sm"
                }`}
              >
                <div className="shrink-0 w-10 h-10 rounded-xl bg-cyan-500 text-black flex items-center justify-center font-bold">
                  {msg.sender === "You" ? "👤" : "🤖"}
                </div>

                <div className="flex-1 overflow-hidden">
                  <div className="flex justify-between mb-2">
                    <span className={`font-semibold text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                      {msg.sender === "You" ? "You" : "Auralis AI"}
                    </span>
                    <span className={`text-xs ${darkMode ? "text-gray-500" : "text-gray-400"}`}>{msg.time}</span>
                  </div>

                  <div className={`prose max-w-none text-sm md:text-base leading-relaxed ${darkMode ? "prose-invert" : ""}`}>
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                  </div>

                  {/* 🛠️ Action Buttons (Only for AI Messages) */}
                  {msg.sender === "Auralis" && (
                    <div className={`flex items-center gap-4 mt-4 pt-3 border-t text-xs ${darkMode ? "border-slate-800 text-gray-400" : "border-gray-100 text-gray-500"}`}>
                      {/* 🔊 Listen Option */}
                      <button
                        onClick={() => {
                          const utterance = new SpeechSynthesisUtterance(msg.text);
                          window.speechSynthesis.speak(utterance);
                        }}
                        className="flex items-center gap-1 hover:text-cyan-500 cursor-pointer transition"
                      >
                        🔊 Listen
                      </button>

                      {/* 📋 Copy Option */}
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(msg.text);
                          alert("Copied to clipboard!");
                        }}
                        className="flex items-center gap-1 hover:text-cyan-500 cursor-pointer transition"
                      >
                        📋 Copy
                      </button>

                      {/* 🔄 Regenerate Option */}
<button
  onClick={() => {
    const lastUser = [...messages]
      .reverse()
      .find((m) => m.sender === "You");

    if (lastUser) {
const lastUser = [...messages]
  .reverse()
  .find((m) => m.sender === "You");

if (!lastUser) return;

const temp = lastUser.text;

setMessage(temp);

requestAnimationFrame(() => {
  sendMessage();
});
    }
  }}
  className="flex items-center gap-1 hover:text-cyan-500 cursor-pointer transition"
>
  🔄 Regenerate
</button>
                    </div>
                  )}
                </div>
              </div>
            ))}


{loading && (
  <div
    className={`p-5 rounded-2xl border text-sm animate-pulse ${
      darkMode
        ? "bg-slate-900 border-slate-800 text-cyan-400"
        : "bg-white border-gray-200 text-cyan-600"
    }`}
  >
    {useSearch
      ? "🌐 Searching the Internet..."
      : "🤖 Auralis is thinking..."}
  </div>
)}


            <div ref={chatEndRef} />
          </div>
        </div>

        {/* Input Bar */}
        <div className={`max-w-4xl mx-auto w-full sticky bottom-0 backdrop-blur-md pt-2 pb-4 ${darkMode ? "bg-slate-950/80" : "bg-gray-50/80"}`}>
          <div className="relative">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              placeholder={
                useSearch
                  ? "Ask for live news, sports scores, current prices..."
                  : "Ask Auralis anything..."
              }
              className={`w-full rounded-2xl border p-4 pr-32 outline-none resize-none h-24 transition ${
                darkMode
                  ? "bg-slate-900 border-slate-800 text-white focus:border-cyan-500"
                  : "bg-white border-gray-300 text-slate-900 focus:border-cyan-500 shadow-sm"
              }`}
            />

           <div className="absolute right-3 bottom-5 flex gap-2">

  <button
    onClick={startListening}
    className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white"
  >
    🎤
  </button>

<div className="flex gap-3">

  <button
    onClick={sendMessage}
    disabled={loading}
    className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold"
  >
    Send ➜
  </button>

  {loading && (
    <button
onClick={() => {
  stopGeneration.current = true;
  window.speechSynthesis.cancel();
  setLoading(false);
}}
      className="px-5 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold"
    >
      ⏹ Stop
    </button>
  )}

</div>

</div>
          </div>
        </div>
      </div>
    </main>
  );
}