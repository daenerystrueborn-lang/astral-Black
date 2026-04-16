import { useRef } from "react";
import { Link } from "wouter";
import {
  Shield, Swords, Trophy, Layers, Star, Calendar,
  Coins, Zap, Settings, LogOut, Crown, Camera
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
  const { user, logout, updateAvatar } = useAuth();
  const fileRef = useRef<HTMLInputElement>(null);

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

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-6 text-center">
        <div className="text-5xl">🔐</div>
        <h2 className="text-2xl font-bold text-white">Not signed in</h2>
        <p className="text-white/40 max-w-xs text-sm">You need an account to view your profile and track your progress.</p>
        <div className="flex gap-3">
          <Link href="/login" className="astral-btn">Sign In</Link>
          <Link href="/signup" className="px-6 py-3 rounded-2xl border border-white/10 bg-white/5 text-white/70 font-semibold text-sm hover:bg-white/10 transition-colors">Create Account</Link>
        </div>
      </div>
    );
  }

  const palette = CLASS_COLORS[user.class] ?? CLASS_COLORS.Warrior;
  const classIcon = CLASS_ICONS[user.class] ?? "⚔️";
  const initials = user.username.slice(0, 2).toUpperCase();
  const xpCurrent = (user.level * 137) % 1000;
  const xpToNext = 1000;
  const xpPct = Math.round((xpCurrent / xpToNext) * 100);

  const stats = [
    { label: "Dungeons Cleared", value: Math.floor(user.level * 2.3 + 4), icon: Shield, color: "text-red-400" },
    { label: "PVP Wins",         value: Math.floor(user.level * 1.2),     icon: Swords, color: "text-orange-400" },
    { label: "Cards Owned",      value: Math.floor(user.level * 3.5 + 10), icon: Layers, color: "text-purple-400" },
    { label: "Rank",             value: `#${(user.level * 7) % 498 + 1}`,  icon: Trophy, color: "text-amber-400" },
  ];

  return (
    <div className="flex flex-col gap-6 pb-10">

      {/* Hero profile banner — no colored glow/shadow */}
      <div
        className="relative rounded-[22px] overflow-hidden border border-white/10"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)",
          backdropFilter: "blur(20px)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
        }}
      >
        {/* Subtle top shimmer — neutral white only */}
        <div
          className="absolute top-0 inset-x-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)" }}
        />

        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-5 p-6 sm:p-8">

          {/* Avatar — clickable to upload */}
          <div className="relative flex-shrink-0 group">
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
            <button
              onClick={() => fileRef.current?.click()}
              className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-white/20 focus:outline-none focus:ring-2 focus:ring-[#4ecdc4]/50"
              title="Click to change profile picture"
            >
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div
                  className="w-full h-full flex items-center justify-center text-2xl font-black text-white"
                  style={{ background: "linear-gradient(135deg, rgba(78,205,196,0.25), rgba(255,255,255,0.08))" }}
                >
                  {initials}
                </div>
              )}
              {/* Camera overlay on hover */}
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-full">
                <Camera className="w-5 h-5 text-white" />
                <span className="text-[9px] text-white/80 mt-0.5 font-medium">Change</span>
              </div>
            </button>

            {/* Class badge */}
            <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-[#0d0d0d] border border-white/20 flex items-center justify-center text-sm pointer-events-none">
              {classIcon}
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h1 className="text-2xl font-bold text-white">{user.username}</h1>
              <span className={cn("text-xs font-bold px-2.5 py-1 rounded-full border", palette.badge)}>
                {user.class}
              </span>
            </div>
            <p className="text-white/40 text-sm">{user.email}</p>

            {/* XP bar */}
            <div className="mt-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-white/40">Level {user.level}</span>
                <span className="text-xs text-white/30">{xpCurrent} / {xpToNext} XP</span>
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

          {/* Right: Gold & Coins */}
          <div className="flex flex-row sm:flex-col gap-3">
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <Coins className="w-4 h-4 text-amber-400" />
              <div>
                <div className="text-xs text-white/40 leading-none">Gold</div>
                <div className="font-bold text-sm text-amber-300">{user.gold.toLocaleString()}</div>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#4ecdc4]/10 border border-[#4ecdc4]/20">
              <Zap className="w-4 h-4 text-[#4ecdc4]" />
              <div>
                <div className="text-xs text-white/40 leading-none">Coins</div>
                <div className="font-bold text-sm text-[#4ecdc4]">{user.coins.toLocaleString()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {stats.map((stat, i) => (
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
            { label: "Username",     value: user.username },
            { label: "Email",        value: user.email },
            { label: "Class",        value: `${classIcon} ${user.class}` },
            { label: "Player Level", value: `Level ${user.level}` },
            { label: "Member Since", value: user.joinDate, icon: Calendar },
          ].map((row, i) => (
            <div key={i} className="flex items-center justify-between px-6 py-4">
              <span className="text-sm text-white/40">{row.label}</span>
              <span className="text-sm font-medium text-white/80">{row.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Link href="/topup" className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl font-semibold text-sm transition-all astral-btn">
          <Crown className="w-4 h-4" />
          Buy Astral Coins
        </Link>
        <Link href="/settings" className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl border border-white/10 bg-white/5 text-white/60 font-semibold text-sm hover:bg-white/10 transition-colors">
          <Settings className="w-4 h-4" />
          Settings
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
