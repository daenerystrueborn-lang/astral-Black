// src/lib/api.ts
// All calls go through /api proxy → bot at 93.177.64.145:7814

const BASE = '/api'

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers || {}),
    },
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }))
    throw new Error(err.error || `API error ${res.status}`)
  }
  return res.json()
}

export interface BotPlayer {
  id: string
  name: string
  class: string
  race: string
  level: number
  exp: number
  rank: string
  prestige: number
  hp: number
  maxHp: number
  mp: number
  maxMp: number
  str: number
  agi: number
  int: number
  def: number
  lck: number
  solars: number
  darkCrystals: number
  mond: number
  bankSolars: number
  location: string
  region: string
  dungeonsCleared: number
  pvpWins: number
  pvpLosses: number
  cards: number
  guildId: string | null
  joinDate: string | null
  isPremium: boolean
  premiumTier: string | null
}

export interface LeaderboardEntry {
  rank: number
  name: string
  class: string
  level: number
  rank_title: string
  prestige: number
}

export interface ServerStats {
  activePlayers: number
  dungeonsCleared: number
  cardsDrawn: number
  guildsFormed: number
}

export interface BuyCardResult {
  success: boolean
  message: string
  darkCrystals: number
}

export interface TopupResult {
  success: boolean
  player: string
  credited: string
  darkCrystals: number
}

export const TOPUP_PACKAGES = [
  {
    id: 'starter',
    name: 'Starter',
    price: '$4.99',
    dc: 500,
    bonus: 50,
    popular: false,
    color: { glow: 'rgba(99,179,237,0.18)', border: 'border-blue-500/20', badge: 'bg-blue-500/10 text-blue-300 border-blue-500/20', check: 'text-blue-400', btn: 'bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 text-blue-200' },
    perks: ['500 Dark Crystals', '+50 Bonus DC', '1× Rare Card Draw', '5× HP Potions'],
  },
  {
    id: 'adventurer',
    name: 'Adventurer',
    price: '$14.99',
    dc: 1600,
    bonus: 200,
    popular: true,
    color: { glow: 'rgba(78,205,196,0.25)', border: 'border-[#4ecdc4]/30', badge: 'bg-[#4ecdc4]/10 text-[#4ecdc4] border-[#4ecdc4]/20', check: 'text-[#4ecdc4]', btn: 'bg-[#4ecdc4]/20 hover:bg-[#4ecdc4]/30 border border-[#4ecdc4]/40 text-[#4ecdc4]' },
    perks: ['1,600 Dark Crystals', '+200 Bonus DC', '5× Rare Card Draws', '1× Epic Gear Chest', 'Premium Badge (30 Days)'],
  },
  {
    id: 'legendary',
    name: 'Legendary',
    price: '$39.99',
    dc: 5000,
    bonus: 1000,
    popular: false,
    color: { glow: 'rgba(251,191,36,0.18)', border: 'border-amber-500/25', badge: 'bg-amber-500/10 text-amber-300 border-amber-500/20', check: 'text-amber-400', btn: 'bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/30 text-amber-200' },
    perks: ['5,000 Dark Crystals', '+1,000 Bonus DC', '15× Card Draws', '1× Guaranteed SSR Card', 'Premium Badge (90 Days)', 'Exclusive Title: Astral Lord'],
  },
] as const

export const api = {
  health: () =>
    apiFetch<{ status: string; bot: string; ts: number }>('/health'),
  stats: () =>
    apiFetch<ServerStats>('/stats'),
  leaderboard: () =>
    apiFetch<{ leaderboard: LeaderboardEntry[]; total: number }>('/leaderboard'),
  worldBoss: () =>
    apiFetch<{ boss: Record<string, unknown> | null }>('/world-boss'),
  market: () =>
    apiFetch<{ listings: unknown[] }>('/market'),
  getPlayer: (phone: string, password?: string) =>
    password
      ? apiFetch<{ player: BotPlayer }>(`/player/${phone}`, {
          method: 'POST',
          body: JSON.stringify({ password }),
        })
      : apiFetch<{ player: BotPlayer }>(`/player/${phone}`),

  buyCard: (phone: string, cardName: string, tier: string) =>
    apiFetch<BuyCardResult>(`/player/${phone}/buy-card`, {
      method: 'POST',
      body: JSON.stringify({ cardName, tier }),
    }),

  creditTopup: (phone: string, packageId: string, dcAmount: number) =>
    apiFetch<TopupResult>('/topup/credit', {
      method: 'POST',
      body: JSON.stringify({ phone, packageId, dcAmount }),
    }),
}
