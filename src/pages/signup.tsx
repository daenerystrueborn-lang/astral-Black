import { Link } from "wouter";
import { MessageCircle, ArrowRight, Swords, Terminal } from "lucide-react";
import worldBossImg from "@/assets/world-boss.jpg";
import iconImg from "@/assets/icon.jpg";

const STEPS = [
  {
    icon: "💬",
    title: "Add the bot on WhatsApp",
    desc: "Save the bot number and open a chat with it.",
  },
  {
    icon: "⚔️",
    title: "Type !register",
    desc: "This creates your character in the game. Choose your class and race.",
  },
  {
    icon: "🔑",
    title: "Type !portal",
    desc: "This sets your portal username and password for this website.",
  },
  {
    icon: "🌐",
    title: "Log in here",
    desc: "Use the username and password you set with !portal to sign in.",
  },
];

export default function Signup() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
      {/* Background */}
      <img
        src={worldBossImg}
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
        style={{ filter: "brightness(0.2) saturate(0.5)" }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 20%, rgba(0,0,0,0.75) 100%)" }}
      />
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-black to-transparent pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />

      {/* Particles */}
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className="absolute w-0.5 h-0.5 rounded-full bg-orange-400/30 animate-pulse"
          style={{
            left: `${8 + (i * 9.2) % 84}%`,
            top: `${12 + (i * 13.7) % 76}%`,
            animationDelay: `${i * 0.35}s`,
            animationDuration: `${2.5 + (i % 3) * 0.5}s`,
          }}
        />
      ))}

      <div className="relative z-10 w-full max-w-sm mx-4 overflow-y-auto max-h-screen py-8">
        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative mb-4">
            <div className="absolute inset-0 rounded-full blur-xl opacity-60" style={{ background: "radial-gradient(circle, rgba(255,107,107,0.8), transparent)" }} />
            <img src={iconImg} alt="Astral" className="relative w-16 h-16 rounded-full object-cover object-top border-2 border-white/20 shadow-2xl" />
          </div>
          <h1 className="text-2xl font-black tracking-widest text-white">ASTRAL</h1>
          <p className="text-xs text-white/40 tracking-[0.25em] uppercase mt-0.5">of the Forthless</p>
        </div>

        {/* Glass panel */}
        <div
          className="rounded-[28px] p-7 flex flex-col gap-5 border border-white/10"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            boxShadow: "0 0 0 1px rgba(255,255,255,0.05), 0 32px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.12)",
          }}
        >
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Swords className="w-5 h-5 text-[#4ecdc4]" />
              How to join
            </h2>
            <p className="text-white/40 text-sm mt-0.5">Registration happens inside WhatsApp</p>
          </div>

          <div className="flex flex-col gap-3">
            {STEPS.map((step, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-2xl bg-white/[0.04] border border-white/8">
                <div className="w-8 h-8 rounded-xl bg-white/8 border border-white/10 flex items-center justify-center text-base flex-shrink-0">
                  {step.icon}
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{step.title}</div>
                  <div className="text-xs text-white/40 mt-0.5">{step.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* WhatsApp command summary */}
          <div className="flex flex-col gap-2 p-4 rounded-2xl bg-black/30 border border-white/8">
            <div className="flex items-center gap-2 text-xs text-white/40 mb-1">
              <Terminal className="w-3.5 h-3.5" />
              <span>WhatsApp commands</span>
            </div>
            {["!register", "!portal"].map(cmd => (
              <div key={cmd} className="flex items-center gap-2">
                <span className="font-mono text-[#4ecdc4] text-sm font-bold">{cmd}</span>
              </div>
            ))}
          </div>

          <Link
            href="/login"
            className="astral-btn flex items-center justify-center gap-2"
          >
            Already registered? Sign in
            <ArrowRight className="w-4 h-4" />
          </Link>

          <p className="text-center text-sm text-white/35">
            Need help?{" "}
            <a href="#" className="text-[#4ecdc4] font-semibold hover:text-white transition-colors">
              Join our community
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
