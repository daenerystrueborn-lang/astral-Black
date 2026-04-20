// src/contexts/auth.tsx
// ─────────────────────────────────────────────────────
// Auth via username + password (players set theirs in WhatsApp via !portal)
// On login the bot returns the full player object.
// We store it in localStorage and re-hydrate on mount.
// refresh() re-fetches live data by WhatsApp ID.
// ─────────────────────────────────────────────────────
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { api, BotPlayer } from '@/lib/api'

export interface User {
  id:           string    // WhatsApp phone number — the DB key
  username:     string    // portal username (portalUsername from bot)
  password:     string    // kept in session so refresh() can re-auth if needed
  name:         string
  class:        string
  race:         string
  level:        number
  exp:          number
  prestige:     number
  hp:           number
  maxHp:        number
  mp:           number
  maxMp:        number
  // currencies (bot naming)
  gold:         number    // Solars equivalent (wallet)
  bankBalance:  number    // Bank Solars
  gems:         number    // Dark Crystals
  mond:         number
  // stats
  kills:        number
  dungeonFloor: number
  pvpWins:      number
  pvpLosses:    number
  cards:        number
  guild:        string | null
  guildRole:    string
  region:       string
  isKami:       boolean
  joinDate:     string | null
  isPremium:    boolean
  premiumTier:  string | null
  // web profile
  avatar?:      string    // local override or webPfp from bot
  webBanner?:   string
}

function botPlayerToUser(p: BotPlayer, username: string, password: string): User {
  return {
    id:           p.id,
    username,
    password,
    name:         p.name,
    class:        p.class     || 'Warrior',
    race:         p.race      || 'Human',
    level:        p.level     || 1,
    exp:          p.exp       || 0,
    prestige:     p.prestige  || 0,
    hp:           p.hp        || 100,
    maxHp:        p.maxHp     || 100,
    mp:           p.mp        || 50,
    maxMp:        p.maxMp     || 50,
    gold:         p.gold      || 0,
    bankBalance:  p.bankBalance || 0,
    gems:         p.gems      || 0,
    mond:         p.mond      || 0,
    kills:        p.kills     || 0,
    dungeonFloor: p.dungeonFloor || 1,
    pvpWins:      p.pvpWins   || 0,
    pvpLosses:    p.pvpLosses || 0,
    cards:        p.cards     || 0,
    guild:        p.guild     || null,
    guildRole:    p.guildRole || 'Adventurer',
    region:       p.region    || 'starter_village',
    isKami:       p.isKami    || false,
    joinDate:     p.joinDate  || null,
    isPremium:    p.isPremium || false,
    premiumTier:  p.premiumTier || null,
    avatar:       p.webPfp    || undefined,
    webBanner:    p.webBanner || undefined,
  }
}

interface AuthContextType {
  user:         User | null
  isLoading:    boolean
  error:        string | null
  login:        (username: string, password: string) => Promise<void>
  logout:       () => void
  refresh:      () => Promise<void>
  updateAvatar: (dataUrl: string) => void
  clearError:   () => void
}

const AuthContext = createContext<AuthContextType | null>(null)
const STORAGE_KEY = 'astral_user'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser]         = useState<User | null>(null)
  const [isLoading, setLoading] = useState(true)
  const [error, setError]       = useState<string | null>(null)

  // Restore session from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try { setUser(JSON.parse(stored)) } catch { localStorage.removeItem(STORAGE_KEY) }
    }
    setLoading(false)
  }, [])

  const login = async (username: string, password: string) => {
    setLoading(true)
    setError(null)
    try {
      const { player } = await api.login(username.trim(), password.trim())
      const u = botPlayerToUser(player, username.trim(), password.trim())
      setUser(u)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(u))
    } catch (e: any) {
      if (e.message?.includes('not found') || e.message?.includes('Username')) {
        setError('Username not found. Set one with !portal in WhatsApp first.')
      } else if (e.message?.includes('password') || e.message?.includes('Wrong')) {
        setError('Wrong password. Try again or use !resetportal in WhatsApp.')
      } else {
        setError(e.message || 'Connection error — bot server may be offline.')
      }
      throw e
    } finally {
      setLoading(false)
    }
  }

  // Re-fetch live data from bot DB
  const refresh = async () => {
    if (!user) return
    try {
      const player = await api.getPlayer(user.id)
      const updated = botPlayerToUser(player, user.username, user.password)
      // preserve local avatar override if user set it manually
      if (user.avatar && !player.webPfp) updated.avatar = user.avatar
      setUser(updated)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    } catch {
      // Silently fail — keep stale data
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem(STORAGE_KEY)
  }

  const updateAvatar = (dataUrl: string) => {
    if (!user) return
    const updated = { ...user, avatar: dataUrl }
    setUser(updated)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  }

  const clearError = () => setError(null)

  return (
    <AuthContext.Provider value={{ user, isLoading, error, login, logout, refresh, updateAvatar, clearError }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be inside AuthProvider')
  return ctx
}
