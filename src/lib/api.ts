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
  getPlayer: (phone: string) =>
    apiFetch<{ player: BotPlayer }>(`/player/${phone}`),
  creditTopup: (phone: string, type: string, packageId: string) =>
    apiFetch<{ success: boolean; player: string; credited: string }>('/topup/credit', {
      method: 'POST',
      body: JSON.stringify({ phone, type, packageId }),
    }),
}
