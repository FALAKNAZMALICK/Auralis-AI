import Link from "next/link";
import Navbar from "../components/Navbar";
import DailyChallenge from "../components/DailyChallenge";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white">
        {/* Hero Section (Fixed: min-h-screen hata kar py-16 / pt-12 kar diya taaki unwanted gap na ho) */}
        <section className="relative flex flex-col items-center justify-center text-center pt-12 pb-10 px-6 overflow-hidden">
          {/* Glowing Background */}
          <div className="absolute w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none"></div>

          <span className="relative px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm mb-4">
            ✨ Powered by Google Gemini
          </span>

          <h1 className="relative text-5xl md:text-7xl font-extrabold tracking-tight">
            Meet <span className="text-cyan-400">Auralis AI</span>
          </h1>

          <p className="relative mt-4 max-w-2xl text-base md:text-lg text-gray-300 leading-relaxed">
            Your intelligent AI workspace. Chat, speak, translate, summarize PDFs,
            generate emails, debug code, and much more with one powerful AI
            assistant.
          </p>

<div className="relative mt-8 flex flex-wrap justify-center gap-4">

  <Link href="/chat">
    <button className="bg-cyan-500 hover:bg-cyan-400 transition px-8 py-3.5 rounded-xl font-semibold text-black shadow-lg shadow-cyan-500/30 cursor-pointer">
      🎤 Start Talking
    </button>
  </Link>
<Link href="/study-match">
<button className="bg-green-500 hover:bg-green-400 transition px-8 py-3.5 rounded-xl font-semibold text-black shadow-lg shadow-green-500/30 flex flex-col items-center justify-center gap-1">
  <span className="flex items-center gap-2">
    <span>🎲</span> Live Study Match
  </span>
  <span className="text-xs opacity-80 font-normal">Smart AI Matching Engine (Beta)</span>
</button>
</Link>

  <a href="#about">
    <button className="border border-gray-600 hover:border-cyan-400 hover:text-cyan-400 transition px-8 py-3.5 rounded-xl cursor-pointer">
      Learn More
    </button>
  </a>

</div>
        </section>

        {/* 💡 Daily AI Challenge Section (Gaps perfectly reduced) */}
        <section id="challenge" className="max-w-7xl mx-auto px-6 py-6">
          <DailyChallenge />
        </section>

        {/* Features Section */}
        <section
          id="features"
          className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {[
            { icon: "🎤", title: "Voice Assistant", text: "Talk naturally with AI." },
            { icon: "🤖", title: "AI Chat", text: "Ask anything instantly." },
            { icon: "🌍", title: "Translator", text: "Translate over 100 languages." },
            { icon: "📄", title: "PDF Assistant", text: "Chat with your PDF documents." },
            { icon: "💻", title: "Code Helper", text: "Explain and debug code." },
            { icon: "📧", title: "Email Writer", text: "Generate professional emails." },
          ].map((feature) => (
            <div
              key={feature.title}
              className="bg-slate-900 border border-gray-800 rounded-2xl p-6 hover:border-cyan-400 hover:-translate-y-1 transition duration-300"
            >
              <div className="text-4xl mb-3">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.text}</p>
            </div>
          ))}
        </section>

        {/* About Section */}
        <section
          id="about"
          className="max-w-7xl mx-auto px-6 py-16 border-t border-slate-800"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                About <span className="text-cyan-400">Auralis AI</span>
              </h2>
              <p className="text-gray-300 text-base leading-relaxed mb-4">
                Auralis AI is designed to simplify your everyday tasks. From fast
                voice interactions and document analysis to writing clean code
                and generating professional content, Auralis AI brings all your
                tools into one seamless interface.
              </p>
              <p className="text-gray-400 text-sm leading-relaxed">
                Powered by state-of-the-art language models, it provides fast,
                accurate, and interactive responses tailored to your specific
                needs.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl text-center">
              <div className="text-5xl font-black text-cyan-400 mb-2">10x</div>
              <p className="text-lg font-semibold text-gray-200">
                Faster Workflow & Output
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className="max-w-3xl mx-auto px-6 py-16 border-t border-slate-800 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold mb-3">
            Get In <span className="text-cyan-400">Touch</span>
          </h2>
          <p className="text-gray-400 text-sm mb-8">
            Have questions or feedback? Send us a message below.
          </p>

          <form className="space-y-4 max-w-md mx-auto">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-white outline-none focus:border-cyan-400 text-sm"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-white outline-none focus:border-cyan-400 text-sm"
            />
            <textarea
              placeholder="Your Message"
              rows="3"
              className="w-full p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-white outline-none focus:border-cyan-400 text-sm resize-none"
            ></textarea>
            <button
              type="button"
              className="w-full py-3.5 bg-cyan-500 hover:bg-cyan-400 transition text-black font-semibold rounded-xl cursor-pointer text-sm"
            >
              Send Message
            </button>
          </form>
        </section>

        {/* Footer */}
        <footer className="border-t border-slate-800 py-6 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Auralis AI. All rights reserved.
        </footer>
      </main>
    </>
  );
}