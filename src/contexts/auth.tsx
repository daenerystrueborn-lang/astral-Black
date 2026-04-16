// src/contexts/auth.tsx
// ─────────────────────────────────────────────────────
// Real auth: user enters their WhatsApp number,
// we look them up in the bot database.
// No passwords needed — WhatsApp number IS the identity.
// ─────────────────────────────────────────────────────
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { api, BotPlayer } from '@/lib/api'

// What the website stores about the logged-in user
export interface User {
  phone:        string          // WhatsApp number — the key
  name:         string
  class:        string
  race:         string
  level:        number
  exp:          number
  rank:         string
  prestige:     number
  hp:           number
  maxHp:        number
  mp:           number
  maxMp:        number
  solars:       number
  darkCrystals: number
  mond:         number
  bankSolars:   number
  location:     string
  dungeonsCleared: number
  pvpWins:      number
  pvpLosses:    number
  cards:        number
  guildId:      string | null
  joinDate:     string | null
  isPremium:    boolean
  premiumTier:  string | null
  avatar?:      string          // local-only profile pic
}

function botPlayerToUser(phone: string, p: BotPlayer, avatar?: string): User {
  return {
    phone,
    name:           p.name,
    class:          p.class,
    race:           p.race,
    level:          p.level,
    exp:            p.exp,
    rank:           p.rank,
    prestige:       p.prestige,
    hp:             p.hp,
    maxHp:          p.maxHp,
    mp:             p.mp,
    maxMp:          p.maxMp,
    solars:         p.solars,
    darkCrystals:   p.darkCrystals,
    mond:           p.mond,
    bankSolars:     p.bankSolars,
    location:       p.location,
    dungeonsCleared: p.dungeonsCleared,
    pvpWins:        p.pvpWins,
    pvpLosses:      p.pvpLosses,
    cards:          p.cards,
    guildId:        p.guildId,
    joinDate:       p.joinDate,
    isPremium:      p.isPremium,
    premiumTier:    p.premiumTier,
    avatar,
  }
}

interface AuthContextType {
  user:          User | null
  isLoading:     boolean
  error:         string | null
  // Login: just needs WhatsApp number — no password
  login:         (phone: string) => Promise<void>
  logout:        () => void
  refresh:       () => Promise<void>   // re-fetch latest data from bot
  updateAvatar:  (dataUrl: string) => void
  clearError:    () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

const STORAGE_KEY = 'astral_user'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser]       = useState<User | null>(null)
  const [isLoading, setLoading] = useState(true)
  const [error, setError]     = useState<string | null>(null)

  // Restore session from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try { setUser(JSON.parse(stored)) } catch { localStorage.removeItem(STORAGE_KEY) }
    }
    setLoading(false)
  }, [])

  // Login by WhatsApp number
  const login = async (phone: string) => {
    setLoading(true)
    setError(null)
    try {
      const clean = phone.replace(/\D/g, '')
      const { player } = await api.getPlayer(clean)
      const u = botPlayerToUser(clean, player)
      setUser(u)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(u))
    } catch (e: any) {
      // Give a friendly message if not registered
      if (e.message?.includes('not found')) {
        setError('No player found with that number. Make sure you registered with !register in WhatsApp first.')
      } else {
        setError(e.message || 'Connection error — bot server may be offline.')
      }
      throw e
    } finally {
      setLoading(false)
    }
  }

  // Re-fetch latest data from bot (call after topup etc.)
  const refresh = async () => {
    if (!user) return
    try {
      const { player } = await api.getPlayer(user.phone)
      const updated = botPlayerToUser(user.phone, player, user.avatar)
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
