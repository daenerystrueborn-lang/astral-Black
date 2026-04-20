import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Gem, Coins, Star, Trophy, Swords, Target, CheckCircle2, Lock, Zap } from "lucide-react";
import { useAuth } from "@/contexts/auth";
import { cn } from "@/lib/utils";

interface PassTier {
  tier: number; tokens: number; name: string;
  free:    { gold?: number; gems?: number; item?: string; spinTicket?: number; title?: string };
  premium: { gold?: number; gems?: number; item?: string; spinTicket?: number; title?: string; unlockForm?: string };
}
interface Mission {
  id: string; desc: string; type: string; target: number; reward: number;
  progress: number; claimed: boolean;
}
interface SeasonData {
  seasonId: number; seasonName: string;
  tokens: number; currentTier: number; currentTierName: string;
  nextTier: number; nextTierName: string; nextTokens: number; progress: number;
  premium: boolean; claimed: string[]; claimedPre: string[];
  tiers: PassTier[]; missions: Mission[]; titles: string[];
}

function RewardPill({ reward }: { reward: PassTier["free"] }) {
  if (!reward) return null;
  return (
    <div className="flex flex-col gap-1">
      {reward.gold    && <span className="text-[10px] text-amber-300 font-semibold">☀️ {reward.gold.toLocaleString()}</span>}
      {reward.gems    && <span className="text-[10px] text-purple-300 font-semibold">💎 {reward.gems}</span>}
      {reward.item    && <span className="text-[10px] text-blue-300 font-semibold">📦 {reward.item.replace(/_/g," ")}</span>}
      {reward.spinTicket && <span className="text-[10px] text-green-300 font-semibold">🎰 Spin ×{reward.spinTicket}</span>}
      {reward.title   && <span className="text-[10px] text-pink-300 font-semibold">🏅 Title</span>}
      {reward.unlockForm && <span className="text-[10px] text-yellow-300 font-semibold">✨ Form</span>}
    </div>
  );
}

export default function SeasonPass() {
  const { user } = useAuth();
  const [data, setData] = useState<SeasonData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    fetch(`/api/player/${user.id}/seasonpass`)
      .then(r => r.json())
      .then(d => { if (d.error) throw new Error(d.error); setData(d); })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [user]);

  if (!user) return (
    <div className="flex flex-col items-center justify-center py-24 gap-6 text-center">
      <div className="text-5xl">🎫</div>
      <h2 className="text-2xl font-bold text-white">Not signed in</h2>
      <p className="text-white/40 text-sm max-w-xs">Sign in to view your Season Pass progress.</p>
      <Link href="/login" className="astral-btn">Sign In</Link>
    </div>
  );

  if (loading) return (
    <div className="flex items-center justify-center py-24 gap-3 text-white/40">
      <div className="w-5 h-5 rounded-full border-2 border-white/20 border-t-[#4ecdc4] animate-spin" />
      Loading Season Pass…
    </div>
  );
  if (error) return (
    <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm mt-8">
      ⚠️ {error}
    </div>
  );
  if (!data) return null;

  return (
    <div className="flex flex-col gap-6 pb-10">

      {/* Hero */}
      <div className="relative rounded-[22px] overflow-hidden border border-amber-500/20 p-6 sm:p-8"
        style={{ background:"linear-gradient(135deg,rgba(251,191,36,0.08),rgba(0,0,0,0.6))" }}>
        <div className="absolute inset-0 opacity-20 pointer-events-none"
          style={{ background:"radial-gradient(ellipse 60% 60% at 80% 40%,rgba(251,191,36,0.4),transparent)" }}/>
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background:"linear-gradient(90deg,transparent,rgba(251,191,36,0.6),transparent)" }}/>
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="flex-1">
            <div className="text-[10px] font-bold uppercase tracking-widest text-amber-400 mb-1">Season {data.seasonId}</div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">{data.seasonName}</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm text-white/60">Tier {data.currentTier}</span>
              <span className="text-white/20">·</span>
              <span className="text-sm font-semibold text-amber-300">{data.currentTierName}</span>
              {data.premium && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300">✨ PREMIUM</span>
              )}
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <div className="text-3xl font-black text-amber-300">{data.tokens}</div>
            <div className="text-[11px] text-white/40 uppercase tracking-wider">Season Tokens</div>
          </div>
        </div>

        {/* XP bar */}
        <div className="relative z-10 mt-5">
          <div className="flex justify-between text-xs text-white/40 mb-2">
            <span>Tier {data.currentTier} → {data.nextTierName}</span>
            <span>{data.tokens} / {data.nextTokens} tokens</span>
          </div>
          <div className="h-2.5 rounded-full bg-white/8 overflow-hidden">
            <div className="h-full rounded-full transition-all duration-1000"
              style={{ width:`${data.progress}%`,
                background:"linear-gradient(90deg,#f59e0b,#fbbf24)",
                boxShadow:"0 0 10px rgba(251,191,36,0.5)" }}/>
          </div>
        </div>

        {!data.premium && (
          <div className="relative z-10 mt-4 flex items-center gap-3 px-4 py-3 rounded-xl bg-black/30 border border-amber-500/20">
            <Lock className="w-4 h-4 text-amber-400 flex-shrink-0"/>
            <div>
              <div className="text-xs font-semibold text-amber-300">Upgrade to Premium Track</div>
              <div className="text-[11px] text-white/40 mt-0.5">Type <span className="font-mono text-[#4ecdc4]">!seasonpass premium</span> in WhatsApp — costs 150 gems</div>
            </div>
          </div>
        )}
      </div>

      {/* Missions */}
      <div className="glass-panel overflow-hidden">
        <div className="px-5 py-4 border-b border-white/8 flex items-center gap-2">
          <Target className="w-4 h-4 text-[#4ecdc4]"/>
          <span className="font-bold text-sm text-white/70">Season Missions</span>
          <span className="ml-auto text-xs text-white/30">
            {data.missions.filter(m => m.claimed).length}/{data.missions.length} complete
          </span>
        </div>
        <div className="divide-y divide-white/5">
          {data.missions.map(m => {
            const pct = Math.min(100, Math.round((m.progress / m.target) * 100));
            return (
              <div key={m.id} className="px-5 py-4 flex items-center gap-4">
                <div className={cn("w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0",
                  m.claimed ? "bg-green-500/15 border border-green-500/25" : "bg-white/5 border border-white/10")}>
                  {m.claimed
                    ? <CheckCircle2 className="w-4 h-4 text-green-400"/>
                    : <Target className="w-4 h-4 text-white/30"/>}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-white/80 font-medium">{m.desc}</div>
                  <div className="mt-1.5 h-1.5 rounded-full bg-white/8 overflow-hidden">
                    <div className="h-full rounded-full transition-all"
                      style={{ width:`${pct}%`,
                        background: m.claimed ? "rgba(74,222,128,0.7)" : "linear-gradient(90deg,#4ecdc4,#ff6b6b)" }}/>
                  </div>
                  <div className="text-[11px] text-white/30 mt-1">{m.progress}/{m.target}</div>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <Zap className="w-3.5 h-3.5 text-amber-400"/>
                  <span className="text-xs font-bold text-amber-300">+{m.reward}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tier rewards track */}
      <div className="glass-panel overflow-hidden">
        <div className="px-5 py-4 border-b border-white/8 flex items-center gap-2">
          <Trophy className="w-4 h-4 text-amber-400"/>
          <span className="font-bold text-sm text-white/70">Reward Track — All 15 Tiers</span>
        </div>
        <div className="overflow-x-auto">
          <div className="min-w-[600px] p-4 flex flex-col gap-2">
            {data.tiers.map(t => {
              const unlocked  = data.currentTier >= t.tier;
              const freeClaimed  = data.claimed.includes(String(t.tier));
              const premClaimed  = data.claimedPre.includes(String(t.tier));
              return (
                <div key={t.tier} className={cn(
                  "flex items-center gap-3 p-3 rounded-xl border transition-all",
                  unlocked ? "border-amber-500/20 bg-amber-500/5" : "border-white/6 bg-white/[0.02] opacity-50"
                )}>
                  {/* Tier number */}
                  <div className={cn(
                    "w-9 h-9 rounded-xl flex items-center justify-center text-sm font-black flex-shrink-0",
                    unlocked ? "bg-amber-500/20 text-amber-300" : "bg-white/5 text-white/30"
                  )}>{t.tier}</div>

                  {/* Name + token req */}
                  <div className="w-32 flex-shrink-0">
                    <div className="text-xs font-bold text-white/80">{t.name}</div>
                    <div className="text-[10px] text-white/30">{t.tokens} tokens</div>
                  </div>

                  {/* Free track */}
                  <div className={cn("flex-1 p-2.5 rounded-xl border",
                    freeClaimed ? "bg-green-500/8 border-green-500/20" : "bg-white/4 border-white/8")}>
                    <div className="text-[9px] text-white/40 uppercase tracking-widest mb-1">Free</div>
                    {freeClaimed
                      ? <span className="text-[10px] text-green-400 font-semibold flex items-center gap-1"><CheckCircle2 className="w-3 h-3"/>Claimed</span>
                      : <RewardPill reward={t.free}/>}
                  </div>

                  {/* Premium track */}
                  <div className={cn("flex-1 p-2.5 rounded-xl border",
                    !data.premium ? "bg-amber-500/4 border-amber-500/10 opacity-60"
                    : premClaimed ? "bg-green-500/8 border-green-500/20"
                    : "bg-amber-500/8 border-amber-500/15")}>
                    <div className="flex items-center gap-1 mb-1">
                      <div className="text-[9px] text-amber-400/70 uppercase tracking-widest">Premium</div>
                      {!data.premium && <Lock className="w-2.5 h-2.5 text-amber-400/50"/>}
                    </div>
                    {premClaimed
                      ? <span className="text-[10px] text-green-400 font-semibold flex items-center gap-1"><CheckCircle2 className="w-3 h-3"/>Claimed</span>
                      : <RewardPill reward={t.premium}/>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Claim hint */}
      <div className="flex items-center gap-3 px-5 py-4 rounded-2xl border border-white/6 bg-white/[0.02]">
        <Star className="w-4 h-4 text-[#4ecdc4] flex-shrink-0"/>
        <p className="text-xs text-white/40 leading-relaxed">
          Claim rewards in WhatsApp with <span className="font-mono text-white/70">!seasonpass claim</span>. 
          Earn tokens by doing dungeons, PVP, daily quests, and world bosses.
        </p>
      </div>
    </div>
  );
}
