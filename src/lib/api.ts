// src/lib/api.ts
// All calls go through /api proxy → bot backend-bridge on port 7202
// Auth: username + password (set via !portal in WhatsApp)
// Player lookup: GET /api/player/:id  (id = WhatsApp phone number)

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

// ── Player shape returned by bot ──────────────────────────────────
export interface BotPlayer {
  id: string
  name: string
  class: string
  race: string
  level: number
  exp: number
  rank?: string
  prestige: number
  hp: number
  maxHp: number
  mp: number
  maxMp: number
  str?: number
  agi?: number
  int?: number
  def?: number
  lck?: number
  // currencies — bot uses gold/gems naming
  gold: number
  bankBalance: number
  gems: number
  mond?: number
  // stats
  kills: number
  dungeonFloor: number
  pvpWins?: number
  pvpLosses?: number
  cards?: number
  guild: string | null
  guildRole?: string
  region: string
  isKami?: boolean
  joinDate?: string | null
  isPremium?: boolean
  premiumTier?: string | null
  // portal / web profile fields
  portalUsername?: string
  webPfp?: string
  webBanner?: string
}

export interface LoginResult {
  ok: boolean
  player: BotPlayer
}

export interface LeaderboardEntry {
  id: string
  name: string
  class: string
  level: number
  prestige: number
  kills: number
  gold: number
  bankGold: number
  gems: number
  guild: string | null
}

export interface LeaderboardData {
  byLevel: LeaderboardEntry[]
  byKills: LeaderboardEntry[]
  byGold:  LeaderboardEntry[]
}

export interface ShopItem {
  id: string
  name: string
  description: string
  rarity: string
  type: string
  price?: number
  seller?: string
  qty?: number
  gemCost?: number | null
  goldCost?: number | null
  shop?: string
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
  gems: number
}

export interface TopupResult {
  success: boolean
  player: string
  credited: string
  gems: number
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
    apiFetch<{ status: string; bot: string }>('/ping'),

  stats: async (): Promise<ServerStats> => {
    const all = await apiFetch<LeaderboardData>('/leaderboard').catch(() => null)
    if (!all) throw new Error('offline')
    const players = all.byLevel || []
    return {
      activePlayers:   players.length,
      dungeonsCleared: players.reduce((s, p: any) => s + (p.dungeonFloor || 1), 0),
      cardsDrawn:      players.reduce((s, p: any) => s + (p.cards || 0), 0),
      guildsFormed:    [...new Set(players.filter((p: any) => p.guild).map((p: any) => p.guild))].length,
    }
  },

  leaderboard: () =>
    apiFetch<LeaderboardData>('/leaderboard'),

  // Login: username + password (players set this via !portal in WhatsApp)
  login: (username: string, password: string) =>
    apiFetch<LoginResult>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    }),

  // Re-fetch live player data by WhatsApp ID
  getPlayer: (id: string) =>
    apiFetch<BotPlayer>(`/player/${id}`),

  market: () =>
    apiFetch<ShopItem[]>('/shop'),

  catalog: () =>
    apiFetch<ShopItem[]>('/catalog'),

  astralCatalog: () =>
    apiFetch<ShopItem[]>('/astral-catalog'),

  updateProfileImage: (username: string, password: string, type: 'pfp' | 'banner', image: string) =>
    apiFetch<{ ok: boolean }>('/profile/image', {
      method: 'POST',
      body: JSON.stringify({ username, password, type, image }),
    }),

  resetPassword: (username: string, code: string, newPassword: string) =>
    apiFetch<{ ok: boolean; message: string }>('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ username, code, newPassword }),
    }),

  buyCard: (playerId: string, cardName: string, tier: string) =>
    apiFetch<BuyCardResult>(`/player/${playerId}/buy-card`, {
      method: 'POST',
      body: JSON.stringify({ cardName, tier }),
    }),

  creditTopup: (playerId: string, packageId: string, dcAmount: number) =>
    apiFetch<TopupResult>('/topup/credit', {
      method: 'POST',
      body: JSON.stringify({ phone: playerId, packageId, dcAmount }),
    }),
}
