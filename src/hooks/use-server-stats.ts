// src/hooks/use-server-stats.ts
// Fetches live stats from the bot for the homepage counters.
import { useEffect, useState } from 'react'
import { api, ServerStats } from '@/lib/api'

const FALLBACK: ServerStats = {
  activePlayers:  12450,
  dungeonsCleared: 842000,
  cardsDrawn:     2100000,
  guildsFormed:   850,
}

export function useServerStats() {
  const [stats, setStats]       = useState<ServerStats>(FALLBACK)
  const [loading, setLoading]   = useState(true)
  const [isLive, setIsLive]     = useState(false)

  useEffect(() => {
    api.stats()
      .then(data => {
        setStats(data)
        setIsLive(true)
      })
      .catch(() => {
        // Bot offline — keep fallback numbers, don't break the UI
        setIsLive(false)
      })
      .finally(() => setLoading(false))
  }, [])

  return { stats, loading, isLive }
}
