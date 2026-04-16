import { Check, Gem, Sparkles, Zap, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const TIERS = [
  {
    name: "Novice",
    price: "$4.99",
    period: "/once",
    coins: "500",
    bonus: "+50 Bonus",
    description: "For players just starting their journey in Astral.",
    icon: Gem,
    glow: "rgba(99,179,237,0.18)",
    border: "border-blue-500/20",
    badgeBg: "bg-blue-500/10 text-blue-300 border-blue-500/20",
    checkColor: "text-blue-400",
    btnClass: "bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 text-blue-200",
    features: [
      "500 Astral Coins",
      "+50 Bonus Coins",
      "1× Rare Summon Ticket",
      "5× Health Potions",
      "VIP Bronze (3 Days)",
    ],
  },
  {
    name: "Champion",
    price: "$19.99",
    period: "/once",
    coins: "2,200",
    bonus: "+300 Bonus",
    description: "For serious adventurers ready to dominate the dungeons.",
    icon: Sparkles,
    popular: true,
    glow: "rgba(78,205,196,0.25)",
    border: "border-[#4ecdc4]/30",
    badgeBg: "bg-[#4ecdc4]/10 text-[#4ecdc4] border-[#4ecdc4]/20",
    checkColor: "text-[#4ecdc4]",
    btnClass: "bg-[#4ecdc4]/20 hover:bg-[#4ecdc4]/30 border border-[#4ecdc4]/40 text-[#4ecdc4]",
    features: [
      "2,200 Astral Coins",
      "+300 Bonus Coins",
      "5× Rare Summon Tickets",
      "1× Epic Weapon Chest",
      "VIP Silver (14 Days)",
      "Custom Profile Tag",
    ],
  },
  {
    name: "Legendary",
    price: "$49.99",
    period: "/once",
    coins: "6,000",
    bonus: "+1,000 Bonus",
    description: "For guild leaders and top-tier warriors who demand the best.",
    icon: Zap,
    glow: "rgba(251,191,36,0.18)",
    border: "border-amber-500/25",
    badgeBg: "bg-amber-500/10 text-amber-300 border-amber-500/20",
    checkColor: "text-amber-400",
    btnClass: "bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/30 text-amber-200",
    features: [
      "6,000 Astral Coins",
      "+1,000 Bonus Coins",
      "15× Rare Summon Tickets",
      "1× Guaranteed SSR Card",
      "VIP Gold (30 Days)",
      "Exclusive Mount",
      "Global Server Announcement",
    ],
  },
];

export default function Topup() {
  return (
    <div className="flex flex-col gap-0 relative">

      {/* Hero header */}
      <div className="relative flex flex-col items-center text-center pt-6 pb-10 overflow-hidden">
        {/* Giant background text */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
          aria-hidden
        >
          <span
            className="text-[clamp(80px,22vw,220px)] font-black tracking-tighter leading-none whitespace-nowrap"
            style={{
              color: "transparent",
              WebkitTextStroke: "1px rgba(255,255,255,0.055)",
              letterSpacing: "-0.04em",
            }}
          >
            PRICING
          </span>
        </div>

        <div className="relative z-10 flex flex-col items-center gap-3">
          <div className="badge-spark">
            Premium Store
            <span className="spark" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight">
            Astral <span className="brand-text">Coin</span> Packs
          </h1>
          <p className="text-white/50 max-w-md text-sm leading-relaxed">
            Support Astral and unlock exclusive in-game benefits, cosmetics, and currency.
          </p>
        </div>
      </div>

      {/* Pricing cards */}
      <div className="grid md:grid-cols-3 gap-4 sm:gap-6 items-center pb-2">
        {TIERS.map((tier, i) => {
          const Icon = tier.icon;
          return (
            <div
              key={i}
              className={cn(
                "relative rounded-2xl border flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1",
                "bg-[#0d0d0d]/90",
                tier.border,
                tier.popular
                  ? "shadow-[0_0_50px_rgba(78,205,196,0.12),0_0_0_1px_rgba(78,205,196,0.15)] md:scale-105 md:z-10"
                  : "shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
              )}
              style={{
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                background: `linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)`,
              }}
            >
              {/* Top glow bar */}
              <div
                className="absolute top-0 left-0 right-0 h-[1px]"
                style={{ background: `linear-gradient(90deg, transparent, ${tier.glow}, transparent)` }}
              />

              {/* Ambient glow blob */}
              <div
                className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl pointer-events-none opacity-40"
                style={{ background: tier.glow }}
              />

              {/* Popular badge */}
              {tier.popular && (
                <div className="absolute -top-px left-1/2 -translate-x-1/2">
                  <div className="bg-gradient-to-r from-[#4ecdc4] to-[#2b8b84] text-white text-[10px] font-bold px-4 py-1 rounded-b-lg uppercase tracking-widest shadow-lg">
                    Most Popular
                  </div>
                </div>
              )}

              {/* Card header */}
              <div className="p-6 pb-4 relative z-10">
                <div className={cn("inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold mb-5", tier.badgeBg)}>
                  <Icon className="w-3.5 h-3.5" />
                  {tier.name}
                </div>

                <div className="flex items-end gap-1 mt-1">
                  <span className="text-5xl font-black tracking-tight text-white">{tier.price}</span>
                  <span className="text-white/30 text-sm mb-2 font-medium">{tier.period}</span>
                </div>

                <div className="flex items-baseline gap-2 mt-3">
                  <span className={cn("text-xl font-bold", tier.checkColor)}>{tier.coins}</span>
                  <span className="text-white/40 text-sm">Astral Coins</span>
                  <span className={cn("ml-auto text-xs font-semibold px-2 py-0.5 rounded-full", tier.badgeBg)}>{tier.bonus}</span>
                </div>

                <p className="text-white/35 text-xs mt-3 leading-relaxed">{tier.description}</p>
              </div>

              {/* Divider */}
              <div className="mx-6 h-px bg-white/5" />

              {/* Features */}
              <div className="p-6 pt-5 flex-1 flex flex-col gap-5 relative z-10">
                <ul className="flex flex-col gap-3">
                  {tier.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm text-white/65">
                      <span className={cn("w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0", tier.checkColor)}>
                        <Check className="w-3 h-3 stroke-[2.5]" />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  className={cn(
                    "w-full mt-auto py-3.5 rounded-xl font-bold text-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]",
                    tier.btnClass
                  )}
                  style={{
                    backdropFilter: "blur(10px)",
                  }}
                >
                  Choose Plan
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer CTA */}
      <div
        className="mt-10 rounded-2xl border border-white/8 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-5 relative overflow-hidden"
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
