import { useState } from "react";
import { Check, Gem, Sparkles, Zap, MessageCircle, Lock, CheckCircle2, AlertCircle, Loader } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "wouter";
import { useAuth } from "@/contexts/auth";
import { api, TOPUP_PACKAGES } from "@/lib/api";

export default function Topup() {
  const { user, refresh } = useAuth();
  const [buying, setBuying] = useState<string | null>(null);
  const [result, setResult] = useState<{ type: "ok" | "err"; text: string; pkg?: string } | null>(null);

  const handleBuy = async (pkg: typeof TOPUP_PACKAGES[number]) => {
    if (!user) return;
    setBuying(pkg.id);
    setResult(null);
    try {
      const res = await api.creditTopup(user.phone, pkg.id, pkg.dc + pkg.bonus);
      await refresh();
      setResult({
        type: "ok",
        pkg: pkg.id,
        text: `Success! ${(pkg.dc + pkg.bonus).toLocaleString()} Dark Crystals credited to your account.`,
      });
    } catch (e: any) {
      setResult({
        type: "err",
        pkg: pkg.id,
        text: e.message || "Purchase failed. Please try again.",
      });
    } finally {
      setBuying(null);
    }
  };

  return (
    <div className="flex flex-col gap-0 relative">

      {/* Hero header */}
      <div className="relative flex flex-col items-center text-center pt-6 pb-10 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none" aria-hidden>
          <span
            className="text-[clamp(80px,22vw,220px)] font-black tracking-tighter leading-none whitespace-nowrap"
            style={{
              color: "transparent",
              WebkitTextStroke: "1px rgba(255,255,255,0.055)",
              letterSpacing: "-0.04em",
            }}
          >
            TOPUP
          </span>
        </div>

        <div className="relative z-10 flex flex-col items-center gap-3">
          <div className="badge-spark">
            Premium Store
            <span className="spark" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight">
            Dark <span className="brand-text">Crystal</span> Packs
          </h1>
          <p className="text-white/50 max-w-md text-sm leading-relaxed">
            Dark Crystals are the premium currency used to buy cards, season passes, class changes, and exclusive cosmetics.
          </p>
        </div>
      </div>

      {/* Login notice */}
      {!user && (
        <div className="mb-6 flex items-center gap-4 px-5 py-4 rounded-2xl border border-amber-500/25 bg-amber-500/8">
          <Lock className="w-5 h-5 text-amber-400 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-white/80">Sign in to purchase</p>
            <p className="text-xs text-white/45 mt-0.5">Dark Crystals will be credited directly to your bot account after purchase.</p>
          </div>
          <Link href="/login" className="shrink-0 px-4 py-2 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold hover:bg-amber-500/25 transition-colors">
            Sign In
          </Link>
        </div>
      )}

      {/* Balance display when logged in */}
      {user && (
        <div className="mb-6 flex items-center gap-4 px-5 py-4 rounded-2xl border border-purple-500/25 bg-purple-500/8">
          <Gem className="w-5 h-5 text-purple-400 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-white/80">Your Dark Crystal Balance</p>
            <p className="text-xs text-white/45 mt-0.5">Credited to <span className="text-white/60 font-mono">+{user.phone}</span></p>
          </div>
          <div className="text-2xl font-black text-purple-300">{user.darkCrystals.toLocaleString()} <span className="text-sm font-semibold">DC</span></div>
        </div>
      )}

      {/* Result toast */}
      {result && (
        <div className={cn(
          "mb-4 flex items-center gap-3 px-5 py-4 rounded-2xl border text-sm font-medium",
          result.type === "ok"
            ? "bg-green-500/10 border-green-500/25 text-green-300"
            : "bg-red-500/10 border-red-500/25 text-red-300"
        )}>
          {result.type === "ok" ? <CheckCircle2 className="w-5 h-5 flex-shrink-0" /> : <AlertCircle className="w-5 h-5 flex-shrink-0" />}
          {result.text}
        </div>
      )}

      {/* Pricing cards */}
      <div className="grid md:grid-cols-3 gap-4 sm:gap-6 items-center pb-2">
        {TOPUP_PACKAGES.map((pkg) => {
          const isBuying = buying === pkg.id;
          const wasSuccess = result?.type === "ok" && result.pkg === pkg.id;

          return (
            <div
              key={pkg.id}
              className={cn(
                "relative rounded-2xl border flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1",
                "bg-[#0d0d0d]/90",
                pkg.color.border,
                pkg.popular
                  ? "shadow-[0_0_50px_rgba(78,205,196,0.12),0_0_0_1px_rgba(78,205,196,0.15)] md:scale-105 md:z-10"
                  : "shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
              )}
              style={{
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                background: `linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)`,
              }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-[1px]"
                style={{ background: `linear-gradient(90deg, transparent, ${pkg.color.glow}, transparent)` }}
              />
              <div
                className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl pointer-events-none opacity-40"
                style={{ background: pkg.color.glow }}
              />

              {pkg.popular && (
                <div className="absolute -top-px left-1/2 -translate-x-1/2">
                  <div className="bg-gradient-to-r from-[#4ecdc4] to-[#2b8b84] text-white text-[10px] font-bold px-4 py-1 rounded-b-lg uppercase tracking-widest shadow-lg">
                    Best Value
                  </div>
                </div>
              )}

              <div className="p-6 pb-4 relative z-10">
                <div className={cn("inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold mb-5", pkg.color.badge)}>
                  <Gem className="w-3.5 h-3.5" />
                  {pkg.name}
                </div>

                <div className="flex items-end gap-1 mt-1">
                  <span className="text-5xl font-black tracking-tight text-white">{pkg.price}</span>
                  <span className="text-white/30 text-sm mb-2 font-medium">/once</span>
                </div>

                <div className="flex items-baseline gap-2 mt-3">
                  <span className={cn("text-xl font-bold", pkg.color.check)}>{pkg.dc.toLocaleString()}</span>
                  <span className="text-white/40 text-sm">Dark Crystals</span>
                  <span className={cn("ml-auto text-xs font-semibold px-2 py-0.5 rounded-full", pkg.color.badge)}>
                    +{pkg.bonus} Bonus
                  </span>
                </div>

                <div className="mt-2 text-xs text-white/35">
                  Total: <span className={cn("font-bold", pkg.color.check)}>{(pkg.dc + pkg.bonus).toLocaleString()} DC</span> credited to your account
                </div>
              </div>

              <div className="mx-6 h-px bg-white/5" />

              <div className="p-6 pt-5 flex-1 flex flex-col gap-5 relative z-10">
                <ul className="flex flex-col gap-3">
                  {pkg.perks.map((f, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm text-white/65">
                      <span className={cn("w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0", pkg.color.check)}>
                        <Check className="w-3 h-3 stroke-[2.5]" />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  disabled={isBuying || !user}
                  onClick={() => handleBuy(pkg)}
                  className={cn(
                    "w-full mt-auto py-3.5 rounded-xl font-bold text-sm transition-all duration-300",
                    !user
                      ? "opacity-40 cursor-not-allowed bg-white/5 border border-white/10 text-white/40"
                      : wasSuccess
                        ? "bg-green-500/20 border border-green-500/30 text-green-300 cursor-default"
                        : cn("hover:scale-[1.02] active:scale-[0.98]", pkg.color.btn)
                  )}
                  style={{ backdropFilter: "blur(10px)" }}
                >
                  {isBuying ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader className="w-4 h-4 animate-spin" />
                      Processing…
                    </span>
                  ) : wasSuccess ? (
                    <span className="flex items-center justify-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      Credited!
                    </span>
                  ) : !user ? (
                    "Sign In to Purchase"
                  ) : (
                    `Get ${(pkg.dc + pkg.bonus).toLocaleString()} DC`
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* DC usage explanation */}
      <div className="mt-8 grid sm:grid-cols-3 gap-3">
        {[
          { icon: "💎", title: "Buy Cards", desc: "Purchase anime cards directly from the card gallery — reflects instantly on your account." },
          { icon: "🎫", title: "Season Pass", desc: "Upgrade to Premium Season Pass for exclusive weekly rewards and Dark Crystal payouts." },
          { icon: "✨", title: "Shop Items", desc: "Use DC in the Crystal Exchange for class changes, XP boosts, titles, and premium draws." },
        ].map((item, i) => (
          <div key={i} className="flex gap-3 p-4 rounded-[18px] border border-white/6 bg-white/[0.02]">
            <span className="text-2xl flex-shrink-0">{item.icon}</span>
            <div>
              <p className="font-semibold text-sm text-white/80">{item.title}</p>
              <p className="text-xs text-white/40 leading-relaxed mt-0.5">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer CTA */}
      <div
        className="mt-8 rounded-2xl border border-white/8 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-5 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
          backdropFilter: "blur(20px)",
        }}
      >
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)" }}
        />
        <div className="text-center sm:text-left">
          <h3 className="text-base font-bold text-white/90 mb-1">Need a custom amount?</h3>
          <p className="text-white/45 text-sm max-w-md">
            Contact a server admin on our WhatsApp group for bulk purchases, guild packages, or alternative payment methods.
          </p>
        </div>
        <button className="flex items-center gap-2 px-5 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-medium text-sm transition-colors whitespace-nowrap">
          <MessageCircle className="w-4 h-4 text-green-400" />
          Join WhatsApp Group
        </button>
      </div>
    </div>
  );
}
