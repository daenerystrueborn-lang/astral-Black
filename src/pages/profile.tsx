import { useRef, useState } from "react";
import { Link } from "wouter";
import {
  Shield, Swords, Trophy, Layers, Star,
  Coins, Gem, LogOut, Crown, Camera, RefreshCw,
  MapPin, Landmark, CheckCircle2, AlertCircle, Skull
} from "lucide-react";
import { useAuth } from "@/contexts/auth";
import { cn } from "@/lib/utils";

const CLASS_COLORS: Record<string, { accent: string; badge: string }> = {
  Warrior: { accent: "text-red-400",    badge: "bg-red-500/10 border-red-500/20 text-red-300" },
  Mage:    { accent: "text-blue-400",   badge: "bg-blue-500/10 border-blue-500/20 text-blue-300" },
  Rogue:   { accent: "text-purple-400", badge: "bg-purple-500/10 border-purple-500/20 text-purple-300" },
  Paladin: { accent: "text-amber-400",  badge: "bg-amber-500/10 border-amber-500/20 text-amber-300" },
};

const CLASS_ICONS: Record<string, string> = {
  Warrior: "⚔️", Mage: "🔮", Rogue: "🗡️", Paladin: "🛡️",
};

export default function Profile() {
  const { user, logout, updateAvatar, refresh } = useAuth();
  const fileRef = useRef<HTMLInputElement>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [refreshMsg, setRefreshMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result as string;
      if (result) updateAvatar(result);
    };
    reader.readAsDataURL(file);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    setRefreshMsg(null);
    try {
      await refresh();
      setRefreshMsg({ type: "ok", text: "Balance updated!" });
    } catch {
      setRefreshMsg({ type: "err", text: "Could not reach bot server." });
    } finally {
      setRefreshing(false);
      setTimeout(() => setRefreshMsg(null), 3000);
    }
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-6 text-center">
        <div className="text-5xl">🔐</div>
        <h2 className="text-2xl font-bold text-white">Not signed in</h2>
        <p className="text-white/40 max-w-xs text-sm">Sign in with your portal username and password to view your profile, balance, and purchase cards.</p>
        <div className="flex gap-3">
          <Link href="/login" className="astral-btn">Sign In</Link>
        </div>
      </div>
    );
  }

  const palette = CLASS_COLORS[user.class] ?? CLASS_COLORS.Warrior;
  const classIcon = CLASS_ICONS[user.class] ?? "⚔️";
  const initials = user.name.slice(0, 2).toUpperCase();
  const xpForLevel = user.level * 1000;
  const xpCurrent = user.exp % xpForLevel || user.exp;
  const xpPct = Math.min(100, Math.round((xpCurrent / xpForLevel) * 100));
  const totalFights = (user.pvpWins || 0) + (user.pvpLosses || 0);
  const pvpRatio = totalFights > 0 ? ((user.pvpWins / totalFights) * 100).toFixed(0) : "100";

  return (
    <div className="flex flex-col gap-6 pb-10">

      {/* Profile banner */}
      <div
        className="relative rounded-[22px] overflow-hidden border border-white/10"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)",
          backdropFilter: "blur(20px)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
        }}
      >
        <div
          className="absolute top-0 inset-x-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)" }}
        />

        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-5 p-6 sm:p-8">

          {/* Avatar */}
          <div className="relative flex-shrink-0 group">
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
            <button
              onClick={() => fileRef.current?.click()}
              className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-white/20 focus:outline-none focus:ring-2 focus:ring-[#4ecdc4]/50"
              title="Click to change profile picture"
            >
              {user.avatar ? (
                <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div
                  className="w-full h-full flex items-center justify-center text-2xl font-black text-white"
                  style={{ background: "linear-gradient(135deg, rgba(78,205,196,0.25), rgba(255,255,255,0.08))" }}
                >
                  {initials}
                </div>
              )}
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-full">
                <Camera className="w-5 h-5 text-white" />
                <span className="text-[9px] text-white/80 mt-0.5 font-medium">Change</span>
              </div>
            </button>
            <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-[#0d0d0d] border border-white/20 flex items-center justify-center text-sm pointer-events-none">
              {classIcon}
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h1 className="text-2xl font-bold text-white">{user.name}</h1>
              <span className={cn("text-xs font-bold px-2.5 py-1 rounded-full border", palette.badge)}>
                {user.class}
              </span>
              {user.isKami && (
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-yellow-500/15 border border-yellow-500/30 text-yellow-300">
                  ✨ Kami
                </span>
              )}
              {user.isPremium && (
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300">
                  ★ Premium
                </span>
              )}
            </div>
            <div className="flex items-center gap-1.5 text-white/40 text-xs">
              <MapPin className="w-3 h-3" />
              <span>{user.region || "Unknown Region"}</span>
              <span className="mx-1">·</span>
              <span>{user.race}</span>
            </div>

            {/* XP bar */}
            <div className="mt-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-white/40">Level {user.level}</span>
                <span className="text-xs text-white/30">{xpCurrent.toLocaleString()} / {xpForLevel.toLocaleString()} XP</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-1000"
                  style={{
                    width: `${xpPct}%`,
                    background: "linear-gradient(90deg, #4ecdc4, #ff6b6b)",
                    boxShadow: "0 0 8px rgba(78,205,196,0.5)",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Balances */}
          <div className="flex flex-row sm:flex-col gap-2.5 shrink-0">
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <Coins className="w-4 h-4 text-amber-400" />
              <div>
                <div className="text-[10px] text-white/40 leading-none">Gold</div>
                <div className="font-bold text-sm text-amber-300">{(user.gold || 0).toLocaleString()}</div>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-purple-500/10 border border-purple-500/20">
              <Gem className="w-4 h-4 text-purple-400" />
              <div>
                <div className="text-[10px] text-white/40 leading-none">Gems</div>
                <div className="font-bold text-sm text-purple-300">{(user.gems || 0).toLocaleString()}</div>
              </div>
            </div>
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white/40 hover:text-white/70 hover:bg-white/8 transition-colors text-xs font-medium"
              title="Sync balance from bot"
            >
              <RefreshCw className={cn("w-3 h-3", refreshing && "animate-spin")} />
              Sync
            </button>
          </div>
        </div>

        {/* Sync message */}
        {refreshMsg && (
          <div className={cn(
            "mx-6 mb-4 flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium",
            refreshMsg.type === "ok"
              ? "bg-green-500/10 border border-green-500/20 text-green-300"
              : "bg-red-500/10 border border-red-500/20 text-red-300"
          )}>
            {refreshMsg.type === "ok"
              ? <CheckCircle2 className="w-3.5 h-3.5" />
              : <AlertCircle className="w-3.5 h-3.5" />
            }
            {refreshMsg.text}
          </div>
        )}
      </div>

      {/* Currency details */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Gold (Wallet)", value: (user.gold || 0).toLocaleString(), icon: Coins, color: "text-amber-400", bg: "bg-amber-500/8 border-amber-500/15" },
          { label: "Gems", value: (user.gems || 0).toLocaleString(), icon: Gem, color: "text-purple-400", bg: "bg-purple-500/8 border-purple-500/15" },
          { label: "Mond", value: (user.mond || 0).toLocaleString(), icon: Star, color: "text-blue-400", bg: "bg-blue-500/8 border-blue-500/15" },
          { label: "Bank Gold", value: (user.bankBalance || 0).toLocaleString(), icon: Landmark, color: "text-green-400", bg: "bg-green-500/8 border-green-500/15" },
        ].map((item, i) => (
          <div key={i} className={cn("glass-panel p-4 flex flex-col gap-1.5 border", item.bg)}>
            <div className="flex items-center gap-2">
              <item.icon className={cn("w-4 h-4", item.color)} />
              <span className="text-[10px] text-white/40 uppercase tracking-wider font-medium">{item.label}</span>
            </div>
            <div className={cn("text-xl font-bold", item.color)}>{item.value}</div>
          </div>
        ))}
      </div>

      {/* Combat stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Dungeon Floor", value: (user.dungeonFloor || 1).toString(), icon: Shield, color: "text-red-400" },
          { label: "Kills", value: (user.kills || 0).toLocaleString(), icon: Skull, color: "text-orange-400" },
          { label: "Cards Owned", value: (user.cards || 0).toLocaleString(), icon: Layers, color: "text-purple-400" },
          { label: "PVP Win Rate", value: `${pvpRatio}%`, icon: Trophy, color: "text-amber-400" },
        ].map((stat, i) => (
          <div key={i} className="glass-panel p-5 flex flex-col items-center text-center gap-2 hover:-translate-y-0.5 transition-transform">
            <stat.icon className={cn("w-5 h-5", stat.color)} />
            <div className="text-xl font-bold text-white">{stat.value}</div>
            <div className="text-[11px] text-white/40 uppercase tracking-wider">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Account details */}
      <div className="glass-panel overflow-hidden">
        <div className="px-6 py-4 border-b border-white/8 flex items-center gap-2">
          <Star className="w-4 h-4 text-white/40" />
          <span className="font-bold text-sm text-white/70">Account Details</span>
        </div>
        <div className="divide-y divide-white/5">
          {[
            { label: "Name",           value: user.name },
            { label: "Username",       value: `@${user.username}` },
            { label: "Class",          value: `${classIcon} ${user.class}` },
            { label: "Race",           value: user.race },
            { label: "Level",          value: `Level ${user.level}` },
            { label: "Prestige",       value: user.prestige > 0 ? `★ ${user.prestige}` : "None" },
            { label: "Region",         value: user.region || "Unknown" },
            { label: "Guild",          value: user.guild || "No Guild" },
            { label: "Guild Role",     value: user.guildRole || "—" },
            { label: "Joined",         value: user.joinDate ? new Date(user.joinDate).toLocaleDateString() : "Unknown" },
            { label: "Premium",        value: user.isPremium ? `Active — ${user.premiumTier ?? "Standard"}` : "Not Active" },
          ].map((row, i) => (
            <div key={i} className="flex items-center justify-between px-6 py-3.5">
              <span className="text-sm text-white/40">{row.label}</span>
              <span className={cn("text-sm font-medium", row.label === "Premium" && user.isPremium ? "text-purple-300" : "text-white/80")}>{row.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Link href="/topup" className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl font-semibold text-sm transition-all astral-btn">
          <Gem className="w-4 h-4" />
          Buy Gems
        </Link>
        <Link href="/cards" className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl border border-purple-500/20 bg-purple-500/8 text-purple-300 font-semibold text-sm hover:bg-purple-500/15 transition-colors">
          <Layers className="w-4 h-4" />
          Buy Cards
        </Link>
        <button
          onClick={logout}
          className="flex-1 sm:flex-initial flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl border border-red-500/20 bg-red-500/5 text-red-400 font-semibold text-sm hover:bg-red-500/15 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </div>
  );
}
