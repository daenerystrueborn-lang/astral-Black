import { useState } from "react";
import { Link, useLocation } from "wouter";
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, Swords } from "lucide-react";
import { useAuth } from "@/contexts/auth";
import worldBossImg from "@/assets/world-boss.jpg";
import iconImg from "@/assets/icon.jpg";

const CLASSES = [
  { id: "warrior", name: "Warrior", emoji: "⚔️", desc: "High HP, brute strength" },
  { id: "mage", name: "Mage", emoji: "🔮", desc: "Devastating magic spells" },
  { id: "rogue", name: "Rogue", emoji: "🗡️", desc: "Fast, high crit damage" },
  { id: "paladin", name: "Paladin", emoji: "🛡️", desc: "Tank with healing" },
];

export default function Signup() {
  const [, navigate] = useLocation();
  const { signup } = useAuth();
  const [step, setStep] = useState<1 | 2>(1);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [selectedClass, setSelectedClass] = useState("warrior");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !email || !password || !confirm) { setError("Please fill in all fields."); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters."); return; }
    if (password !== confirm) { setError("Passwords do not match."); return; }
    setError("");
    setStep(2);
  };

  const handleStep2 = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signup(username.trim(), email, password);
      navigate("/profile");
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

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

      <div className="relative z-10 w-full max-w-sm mx-4">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative mb-4">
            <div className="absolute inset-0 rounded-full blur-xl opacity-60" style={{ background: "radial-gradient(circle, rgba(255,107,107,0.8), transparent)" }} />
            <img src={iconImg} alt="Astral" className="relative w-16 h-16 rounded-full object-cover object-top border-2 border-white/20 shadow-2xl" />
          </div>
          <h1 className="text-2xl font-black tracking-widest text-white">ASTRAL</h1>
          <p className="text-xs text-white/40 tracking-[0.25em] uppercase mt-0.5">of the Forthless</p>
        </div>

        {/* Step indicators */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className={`w-20 h-1 rounded-full transition-colors duration-500 ${step >= 1 ? "bg-[#4ecdc4]" : "bg-white/10"}`} />
          <div className={`w-20 h-1 rounded-full transition-colors duration-500 ${step >= 2 ? "bg-[#4ecdc4]" : "bg-white/10"}`} />
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
          {step === 1 ? (
            <>
              <div>
                <h2 className="text-xl font-bold text-white">Create account</h2>
                <p className="text-white/40 text-sm mt-0.5">Begin your journey in the realm</p>
              </div>

              {error && (
                <div className="px-4 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm">{error}</div>
              )}

              <form onSubmit={handleStep1} className="flex flex-col gap-3">
                {[
                  { icon: User, type: "text", placeholder: "Username", value: username, set: setUsername },
                  { icon: Mail, type: "email", placeholder: "Email address", value: email, set: setEmail },
                ].map(({ icon: Icon, type, placeholder, value, set }) => (
                  <div
                    key={placeholder}
                    className="flex items-center gap-3 px-4 py-3.5 rounded-2xl border border-white/8 transition-all duration-200 focus-within:border-[#4ecdc4]/40 focus-within:shadow-[0_0_0_3px_rgba(78,205,196,0.08)]"
                    style={{ background: "rgba(0,0,0,0.3)", boxShadow: "inset 0 2px 8px rgba(0,0,0,0.4)" }}
                  >
                    <Icon className="w-4 h-4 text-white/30 flex-shrink-0" />
                    <input
                      type={type}
                      placeholder={placeholder}
                      value={value}
                      onChange={e => set(e.target.value)}
                      className="bg-transparent border-none outline-none w-full text-white text-sm placeholder:text-white/25"
                    />
                  </div>
                ))}

                {/* Password */}
                <div
                  className="flex items-center gap-3 px-4 py-3.5 rounded-2xl border border-white/8 transition-all duration-200 focus-within:border-[#4ecdc4]/40 focus-within:shadow-[0_0_0_3px_rgba(78,205,196,0.08)]"
                  style={{ background: "rgba(0,0,0,0.3)", boxShadow: "inset 0 2px 8px rgba(0,0,0,0.4)" }}
                >
                  <Lock className="w-4 h-4 text-white/30 flex-shrink-0" />
                  <input
                    type={showPass ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="bg-transparent border-none outline-none w-full text-white text-sm placeholder:text-white/25"
                  />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="text-white/30 hover:text-white/70 transition-colors flex-shrink-0">
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {/* Confirm password */}
                <div
                  className="flex items-center gap-3 px-4 py-3.5 rounded-2xl border border-white/8 transition-all duration-200 focus-within:border-[#4ecdc4]/40 focus-within:shadow-[0_0_0_3px_rgba(78,205,196,0.08)]"
                  style={{ background: "rgba(0,0,0,0.3)", boxShadow: "inset 0 2px 8px rgba(0,0,0,0.4)" }}
                >
                  <Lock className="w-4 h-4 text-white/30 flex-shrink-0" />
                  <input
                    type="password"
                    placeholder="Confirm password"
                    value={confirm}
                    onChange={e => setConfirm(e.target.value)}
                    className="bg-transparent border-none outline-none w-full text-white text-sm placeholder:text-white/25"
                  />
                </div>

                <button type="submit" className="astral-btn mt-1">
                  <span className="flex items-center gap-2">
                    Continue
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </button>
              </form>
            </>
          ) : (
            <>
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Swords className="w-5 h-5 text-[#4ecdc4]" />
                  Choose your class
                </h2>
                <p className="text-white/40 text-sm mt-0.5">This will define your battle style</p>
              </div>

              {error && (
                <div className="px-4 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm">{error}</div>
              )}

              <form onSubmit={handleStep2} className="flex flex-col gap-3">
                <div className="grid grid-cols-2 gap-2">
                  {CLASSES.map(cls => (
                    <button
                      key={cls.id}
                      type="button"
                      onClick={() => setSelectedClass(cls.id)}
                      className={`p-3 rounded-2xl border text-left transition-all duration-200 ${
                        selectedClass === cls.id
                          ? "border-[#4ecdc4]/50 bg-[#4ecdc4]/10 shadow-[0_0_16px_rgba(78,205,196,0.12)]"
                          : "border-white/8 bg-black/20 hover:border-white/20"
                      }`}
                    >
                      <div className="text-xl mb-1">{cls.emoji}</div>
                      <div className="font-bold text-sm text-white">{cls.name}</div>
                      <div className="text-[10px] text-white/40 mt-0.5">{cls.desc}</div>
                    </button>
                  ))}
                </div>

                <div className="flex gap-2 mt-1">
                  <button
                    type="button"
                    onClick={() => { setStep(1); setError(""); }}
                    className="flex-1 py-3 rounded-2xl border border-white/10 bg-white/5 text-white/60 font-semibold text-sm hover:bg-white/10 transition-colors"
                  >
                    Back
                  </button>
                  <button type="submit" disabled={loading} className="astral-btn flex-1">
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                        Creating...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        Enter realm
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    )}
                  </button>
                </div>
              </form>
            </>
          )}

          <p className="text-center text-sm text-white/35">
            Already have an account?{" "}
            <Link href="/login" className="text-[#4ecdc4] font-semibold hover:text-white transition-colors">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
