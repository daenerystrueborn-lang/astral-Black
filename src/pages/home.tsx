import { Shield, Sparkles, Swords, Trophy, Users, Flame, Target, Layers } from "lucide-react";
import { Link } from "wouter";
import { cn } from "@/lib/utils";
import heroImg from "@/assets/hero-bg.jpg";
import dungeonImg from "@/assets/dungeon.jpg";
import cardsImg from "@/assets/cards.jpg";
import worldBossImg from "@/assets/world-boss.jpg";
import pvpImg from "@/assets/pvp.jpg";
import characterPng from "@/assets/character.png";

export default function Home() {
  return (
    <div className="flex flex-col gap-12 pb-16">
      {/* Hero Section */}
      <section className="glass-panel relative flex flex-col md:flex-row items-end min-h-[500px] sm:min-h-[540px] overflow-hidden rounded-[18px]">
        {/* Background image */}
        <img
          src={heroImg}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
          style={{ opacity: 0.14, mixBlendMode: "luminosity" }}
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d0d] via-[#0d0d0d]/90 to-[#0d0d0d]/20 md:via-[#0d0d0d]/85 md:to-[#0d0d0d]/10" />
        {/* Stronger left coverage on mobile so text is readable over character */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d0d]/95 via-[#0d0d0d]/80 to-transparent md:hidden" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent" />

        {/* Left content */}
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

        {/* Character PNG — anchored bottom-right */}
        <div className="absolute bottom-0 right-0 z-[2] pointer-events-none select-none flex items-end justify-end">
          <img
            src={characterPng}
            alt="Astral character"
            className="h-[380px] sm:h-[460px] md:h-[520px] w-auto object-contain object-bottom drop-shadow-2xl"
            style={{ mixBlendMode: "screen" }}
          />
        </div>

        {/* Right fade so character blends into dark edge */}
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

      {/* Features Grid */}
      <section className="flex flex-col gap-6">
        <div className="relative flex flex-col items-center text-center py-4 overflow-hidden">
          {/* Ghost text */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none" aria-hidden>
            <span
              className="font-black whitespace-nowrap leading-none"
              style={{
                fontSize: "clamp(80px,20vw,200px)",
                color: "transparent",
                WebkitTextStroke: "1.5px rgba(255,255,255,0.09)",
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
          {/* Dungeon — col-span-2 */}
          <div className="glass-panel group relative overflow-hidden rounded-[18px] p-6 flex flex-col gap-4 min-h-[260px] md:col-span-2">
            <img
              src={dungeonImg}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none transition-transform duration-700 group-hover:scale-105"
              style={{ opacity: 0.15, mixBlendMode: "luminosity" }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-red-950/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d]/80 to-transparent" />
            <div className="relative z-10 flex flex-col gap-4">
              <Flame className="w-8 h-8 text-red-400" />
              <h3 className="text-2xl font-bold">100-Floor Dungeons</h3>
              <p className="text-white/60 leading-relaxed max-w-md">
                Descend into the abyss. Each floor introduces harder enemies, unique biomes, and epic boss fights. Only the strongest guilds have reached Floor 100.
              </p>
            </div>
          </div>

          {/* Anime Cards */}
          <div className="glass-panel group relative overflow-hidden rounded-[18px] p-6 flex flex-col gap-4 min-h-[260px]">
            <img
              src={cardsImg}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none transition-transform duration-700 group-hover:scale-105"
              style={{ opacity: 0.14, mixBlendMode: "luminosity" }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-purple-950/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d]/80 to-transparent" />
            <div className="relative z-10 flex flex-col gap-4">
              <Sparkles className="w-8 h-8 text-purple-400" />
              <h3 className="text-xl font-bold">Anime Cards</h3>
              <p className="text-white/60 leading-relaxed text-sm">
                Collect, trade, and evolve beautifully illustrated character cards. Build your ultimate deck to boost your stats.
              </p>
            </div>
          </div>

          {/* World Bosses */}
          <div className="glass-panel group relative overflow-hidden rounded-[18px] p-6 flex flex-col gap-4 min-h-[260px]">
            <img
              src={worldBossImg}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none transition-transform duration-700 group-hover:scale-105"
              style={{ opacity: 0.15, mixBlendMode: "luminosity" }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-950/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d]/80 to-transparent" />
            <div className="relative z-10 flex flex-col gap-4">
              <Target className="w-8 h-8 text-blue-400" />
              <h3 className="text-xl font-bold">World Bosses</h3>
              <p className="text-white/60 leading-relaxed text-sm">
                Server-wide events where everyone works together to defeat massive dragons and titans for legendary loot.
              </p>
            </div>
          </div>

          {/* PVP — col-span-2 */}
          <div className="glass-panel group relative overflow-hidden rounded-[18px] p-6 flex flex-col gap-4 min-h-[260px] md:col-span-2">
            <img
              src={pvpImg}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none transition-transform duration-700 group-hover:scale-105"
              style={{ opacity: 0.15, mixBlendMode: "luminosity" }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-amber-950/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d]/80 to-transparent" />
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
