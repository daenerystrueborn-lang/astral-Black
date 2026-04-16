import { Shield, Sparkles, Swords, Trophy, Users, Flame, Target, Layers, Gem, Star, Crown, ChevronRight, Zap, Gift } from "lucide-react";
import { Link } from "wouter";
import { cn } from "@/lib/utils";
import heroImg from "@/assets/hero-bg.jpg";
import dungeonImg from "@/assets/dungeon.jpg";
import cardsImg from "@/assets/cards.jpg";
import worldBossImg from "@/assets/world-boss.jpg";
import pvpImg from "@/assets/pvp.jpg";
import characterPng from "@/assets/character.png";

const SEASON_REWARDS = [
  { week: 1, free: "500 Solars", premium: "50 Dark Crystals", icon: Gem, done: true },
  { week: 2, free: "HP Potion ×3", premium: "Rare Card Draw", icon: Star, done: true },
  { week: 3, free: "1,000 Solars", premium: "100 Dark Crystals", icon: Gem, done: true },
  { week: 4, free: "ATK Scroll", premium: "Epic Card Draw", icon: Sparkles, done: false },
  { week: 5, free: "2,000 Solars", premium: "200 Dark Crystals", icon: Gem, done: false },
  { week: 6, free: "XP Boost (24h)", premium: "Legendary Card Draw", icon: Zap, done: false },
  { week: 7, free: "Guild Banner Dye", premium: "300 Dark Crystals", icon: Gift, done: false },
  { week: 8, free: "5,000 Solars", premium: "Title: Shadow Walker", icon: Crown, done: false },
];

const CURRENT_WEEK = 4;

export default function Home() {
  return (
    <div className="flex flex-col gap-12 pb-16">
      {/* Hero Section */}
      <section className="glass-panel relative flex flex-col md:flex-row items-end min-h-[500px] sm:min-h-[540px] overflow-hidden rounded-[18px]">
        <img
          src={heroImg}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
          style={{ opacity: 0.22, mixBlendMode: "luminosity" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d0d] via-[#0d0d0d]/90 to-[#0d0d0d]/20 md:via-[#0d0d0d]/85 md:to-[#0d0d0d]/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d0d]/95 via-[#0d0d0d]/80 to-transparent md:hidden" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent" />

        <div className="relative z-10 flex-1 flex flex-col gap-6 p-8 md:p-12 pb-10 md:pb-14 items-start">
          <div className="badge-spark">
            <span className="w-2 h-2 rounded-full bg-[#4ecdc4] animate-pulse inline-block" />
            Season 4 Live
            <span className="spark" />
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tight">
            Forged in<br />
            <span className="brand-text">Shadow</span>
          </h1>

          <p className="text-white/55 max-w-md leading-relaxed text-sm sm:text-base">
            The ultimate fantasy RPG living directly inside WhatsApp. Battle through 100 floors of perilous dungeons, collect legendary anime cards, and evolve your class.
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-2">
            <div className="btn-glow-wrap btn-glow-pink">
              <button data-testid="button-add-bot">Add Bot to WhatsApp</button>
            </div>
            <div className="btn-glow-wrap btn-glow-red">
              <Link href="/cards">View Cards</Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 right-0 z-[2] pointer-events-none select-none flex items-end justify-end">
          <img
            src={characterPng}
            alt="Astral character"
            className="h-[380px] sm:h-[460px] md:h-[520px] w-auto object-contain object-bottom drop-shadow-2xl"
            style={{ mixBlendMode: "screen" }}
          />
        </div>

        <div className="absolute top-0 right-0 w-48 h-full bg-gradient-to-l from-[#0d0d0d]/60 to-transparent z-[3] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-full h-24 bg-gradient-to-t from-[#0d0d0d] to-transparent z-[3] pointer-events-none" />
      </section>

      {/* Stats */}
      <section className="relative grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {[
          { label: "Active Players", value: "12,450+", icon: Users, color: "text-blue-400" },
          { label: "Dungeons Cleared", value: "842K", icon: Shield, color: "text-red-400" },
          { label: "Cards Drawn", value: "2.1M", icon: Layers, color: "text-purple-400" },
          { label: "Guilds Formed", value: "850", icon: Swords, color: "text-green-400" },
        ].map((stat, i) => (
          <div key={i} className="glass-panel p-6 flex flex-col items-center justify-center text-center gap-2 hover:-translate-y-1 transition-transform">
            <stat.icon className={cn("w-6 h-6 mb-2 opacity-80", stat.color)} />
            <h4 className="text-2xl md:text-3xl font-bold">{stat.value}</h4>
            <p className="text-xs text-white/50 uppercase tracking-wider">{stat.label}</p>
          </div>
        ))}
      </section>

      {/* Season Pass */}
      <section className="flex flex-col gap-6">
        <div className="relative flex flex-col items-center text-center py-4 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none" aria-hidden>
            <span
              className="font-black whitespace-nowrap leading-none"
              style={{
                fontSize: "clamp(60px,16vw,180px)",
                color: "transparent",
                WebkitTextStroke: "1.5px rgba(255,255,255,0.07)",
                letterSpacing: "-0.04em",
              }}
            >
              SEASON 4
            </span>
          </div>
          <div className="relative z-10 flex flex-col items-center gap-2">
            <div className="badge-spark">
              Season 4 Pass
              <span className="spark" />
            </div>
            <h2 className="text-3xl font-bold">Season Battle Pass</h2>
            <p className="text-white/50 text-sm max-w-sm">Earn weekly rewards just by playing. Upgrade to Premium for Dark Crystals and exclusive drops.</p>
          </div>
        </div>

        {/* Pass tiers CTA */}
        <div className="grid sm:grid-cols-2 gap-4">
          {/* Free pass */}
          <div className="relative rounded-[22px] border border-white/10 p-5 flex flex-col gap-3 overflow-hidden"
            style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)" }}>
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/8 border border-white/12 flex items-center justify-center">
                <Shield className="w-5 h-5 text-white/60" />
              </div>
              <div>
                <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Standard</p>
                <h3 className="font-bold text-white text-base">Free Pass</h3>
              </div>
              <div className="ml-auto">
                <span className="text-xl font-black text-white">Free</span>
              </div>
            </div>
            <ul className="flex flex-col gap-1.5 text-xs text-white/50">
              <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-white/30" />Weekly Solars rewards</li>
              <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-white/30" />Basic consumable drops</li>
              <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-white/30" />Seasonal title at Week 8</li>
            </ul>
            <p className="text-xs text-white/25 mt-auto pt-2 border-t border-white/6">Active with any game activity</p>
          </div>

          {/* Premium pass */}
          <div className="relative rounded-[22px] border overflow-hidden p-5 flex flex-col gap-3"
            style={{
              background: "linear-gradient(135deg, rgba(168,85,247,0.12) 0%, rgba(78,205,196,0.06) 60%, rgba(0,0,0,0.8) 100%)",
              borderColor: "rgba(168,85,247,0.35)",
            }}>
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/70 to-transparent" />
            <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl opacity-25 pointer-events-none" style={{ background: "rgba(168,85,247,1)", transform: "translate(30%, -30%)" }} />
            <div className="relative z-10 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(168,85,247,0.2)", border: "1px solid rgba(168,85,247,0.4)" }}>
                <Crown className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <p className="text-[10px] text-purple-400/80 uppercase tracking-widest font-bold">Exclusive</p>
                <h3 className="font-bold text-white text-base">Premium Pass</h3>
              </div>
              <div className="ml-auto flex flex-col items-end">
                <div className="flex items-center gap-1">
                  <Gem className="w-4 h-4 text-purple-400" />
                  <span className="text-xl font-black text-white">500 <span className="text-sm font-semibold text-purple-300">DC</span></span>
                </div>
              </div>
            </div>
            <ul className="relative z-10 flex flex-col gap-1.5 text-xs text-white/60">
              <li className="flex items-center gap-2"><Gem className="w-3 h-3 text-purple-400" />Dark Crystal rewards every week</li>
              <li className="flex items-center gap-2"><Star className="w-3 h-3 text-purple-400" />Guaranteed card draws (Rare+)</li>
              <li className="flex items-center gap-2"><Crown className="w-3 h-3 text-purple-400" />Exclusive titles &amp; cosmetics</li>
              <li className="flex items-center gap-2"><Zap className="w-3 h-3 text-purple-400" />XP boosts &amp; premium materials</li>
            </ul>
            <Link href="/topup" className="relative z-10 mt-auto astral-btn flex items-center justify-center gap-2 text-sm w-full">
              <Crown className="w-4 h-4" />
              Upgrade to Premium
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            </Link>
          </div>
        </div>

        {/* Weekly reward track */}
        <div className="relative rounded-[22px] border border-white/10 overflow-hidden"
          style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(0,0,0,0.6) 100%)" }}>
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

          <div className="px-5 py-4 border-b border-white/8 flex items-center gap-3">
            <Sparkles className="w-4 h-4 text-[#4ecdc4]" />
            <span className="font-semibold text-sm text-white">Season 4 Reward Track</span>
            <span className="ml-auto text-xs text-white/30">Week {CURRENT_WEEK} of 8</span>
          </div>

          <div className="p-4 sm:p-5">
            {/* Progress bar */}
            <div className="relative h-1.5 rounded-full bg-white/8 mb-6 overflow-hidden">
              <div
                className="absolute left-0 top-0 h-full rounded-full transition-all duration-700"
                style={{ width: `${((CURRENT_WEEK - 1) / 8) * 100}%`, background: "linear-gradient(90deg, #4ecdc4, #a855f7)" }}
              />
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
              {SEASON_REWARDS.map((r, i) => {
                const isCurrent = r.week === CURRENT_WEEK;
                const isPast = r.week < CURRENT_WEEK;
                const Icon = r.icon;
                return (
                  <div
                    key={i}
                    className={cn(
                      "relative flex flex-col items-center gap-2 p-2 rounded-xl border transition-all duration-200",
                      isPast ? "border-[#4ecdc4]/30 bg-[#4ecdc4]/6" :
                      isCurrent ? "border-purple-500/40 bg-purple-500/8 shadow-[0_0_16px_rgba(168,85,247,0.1)]" :
                      "border-white/6 bg-white/[0.02]"
                    )}
                  >
                    {isCurrent && (
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider bg-purple-500 text-white whitespace-nowrap">
                        Now
                      </div>
                    )}
                    <span className={cn(
                      "text-[9px] font-bold uppercase tracking-wider",
                      isPast ? "text-[#4ecdc4]/70" : isCurrent ? "text-purple-400/80" : "text-white/25"
                    )}>W{r.week}</span>
                    <Icon className={cn(
                      "w-4 h-4",
                      isPast ? "text-[#4ecdc4]" : isCurrent ? "text-purple-400" : "text-white/20"
                    )} />
                    <div className="w-full flex flex-col gap-1 text-center">
                      <p className={cn("text-[9px] leading-tight", isPast ? "text-white/60" : isCurrent ? "text-white/50" : "text-white/20")}>
                        {r.free}
                      </p>
                      <p className={cn("text-[9px] leading-tight font-semibold", isPast ? "text-purple-400/70" : isCurrent ? "text-purple-400/60" : "text-purple-400/20")}>
                        ★ {r.premium}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <p className="mt-4 text-[10px] text-white/25 text-center">
              ★ = Premium Pass exclusive. Earn rewards by completing daily quests, dungeon runs, or PVP matches in WhatsApp.
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="flex flex-col gap-6">
        <div className="relative flex flex-col items-center text-center py-4 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none" aria-hidden>
            <span
              className="font-black whitespace-nowrap leading-none"
              style={{
                fontSize: "clamp(80px,20vw,200px)",
                color: "transparent",
                WebkitTextStroke: "1.5px rgba(255,255,255,0.07)",
                letterSpacing: "-0.04em",
              }}
            >
              FEATURES
            </span>
          </div>
          <div className="relative z-10 flex flex-col items-center gap-2">
            <div className="badge-spark">
              Game Features
              <span className="spark" />
            </div>
            <h2 className="text-3xl font-bold">What Can You Do?</h2>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="glass-panel group relative overflow-hidden rounded-[18px] p-6 flex flex-col gap-4 min-h-[260px] md:col-span-2">
            <img
              src={dungeonImg}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none transition-transform duration-700 group-hover:scale-105"
              style={{ opacity: 0.25, mixBlendMode: "luminosity" }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-red-950/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d]/85 via-[#0d0d0d]/20 to-transparent" />
            <div className="relative z-10 flex flex-col gap-4">
              <Flame className="w-8 h-8 text-red-400" />
              <h3 className="text-2xl font-bold">100-Floor Dungeons</h3>
              <p className="text-white/60 leading-relaxed max-w-md">
                Descend into the abyss. Each floor introduces harder enemies, unique biomes, and epic boss fights. Only the strongest guilds have reached Floor 100.
              </p>
            </div>
          </div>

          <div className="glass-panel group relative overflow-hidden rounded-[18px] p-6 flex flex-col gap-4 min-h-[260px]">
            <img
              src={cardsImg}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none transition-transform duration-700 group-hover:scale-105"
              style={{ opacity: 0.22, mixBlendMode: "luminosity" }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-purple-950/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d]/85 via-[#0d0d0d]/20 to-transparent" />
            <div className="relative z-10 flex flex-col gap-4">
              <Sparkles className="w-8 h-8 text-purple-400" />
              <h3 className="text-xl font-bold">Anime Cards</h3>
              <p className="text-white/60 leading-relaxed text-sm">
                Collect, trade, and evolve beautifully illustrated character cards. Build your ultimate deck to boost your stats.
              </p>
            </div>
          </div>

          <div className="glass-panel group relative overflow-hidden rounded-[18px] p-6 flex flex-col gap-4 min-h-[260px]">
            <img
              src={worldBossImg}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none transition-transform duration-700 group-hover:scale-105"
              style={{ opacity: 0.25, mixBlendMode: "luminosity" }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-950/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d]/85 via-[#0d0d0d]/20 to-transparent" />
            <div className="relative z-10 flex flex-col gap-4">
              <Target className="w-8 h-8 text-blue-400" />
              <h3 className="text-xl font-bold">World Bosses</h3>
              <p className="text-white/60 leading-relaxed text-sm">
                Server-wide events where everyone works together to defeat massive dragons and titans for legendary loot.
              </p>
            </div>
          </div>

          <div className="glass-panel group relative overflow-hidden rounded-[18px] p-6 flex flex-col gap-4 min-h-[260px] md:col-span-2">
            <img
              src={pvpImg}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none transition-transform duration-700 group-hover:scale-105"
              style={{ opacity: 0.25, mixBlendMode: "luminosity" }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-amber-950/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d]/85 via-[#0d0d0d]/20 to-transparent" />
            <div className="relative z-10 flex flex-col gap-4">
              <Trophy className="w-8 h-8 text-amber-400" />
              <h3 className="text-2xl font-bold">PVP Arena</h3>
              <p className="text-white/60 leading-relaxed max-w-md">
                Test your build against other players. Climb the leaderboards, earn seasonal titles, and prove you are the strongest in the realm.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
