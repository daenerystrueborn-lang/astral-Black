// src/pages/login.tsx
import { useState } from 'react'
import { useLocation } from 'wouter'
import { Phone, Loader2, AlertCircle, MessageCircle } from 'lucide-react'
import { useAuth } from '@/contexts/auth'

export default function Login() {
  const { login, isLoading, error, clearError } = useAuth()
  const [, setLocation] = useLocation()
  const [phone, setPhone] = useState('')

  const handleSubmit = async () => {
    clearError()
    if (!phone.trim()) return
    try {
      await login(phone.trim())
      setLocation('/')
    } catch {
      // error already set in context
    }
  }

  return (
    <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black brand-text mb-2">Astral</h1>
          <p className="text-white/40 text-sm">of the Forthless</p>
        </div>

        {/* Card */}
        <div
          className="rounded-[22px] border border-white/10 p-8"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)',
            backdropFilter: 'blur(20px)',
          }}
        >
          <h2 className="text-xl font-bold text-white mb-1">Link your account</h2>
          <p className="text-white/40 text-sm mb-6">
            Enter the WhatsApp number you used to register with the bot.
          </p>

          {/* Error */}
          {error && (
            <div className="flex items-start gap-3 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm mb-5">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              {error}
            </div>
          )}

          {/* Phone input */}
          <div className="flex flex-col gap-4">
            <div>
              <label className="text-xs text-white/40 uppercase tracking-wider mb-2 block">
                WhatsApp Number
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  type="tel"
                  placeholder="e.g. 2347062301848"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#4ecdc4]/50 transition-colors"
                />
              </div>
              <p className="text-xs text-white/30 mt-1.5">
                Include country code — no + or spaces. e.g. <span className="text-white/50">2347012345678</span>
              </p>
            </div>

            <button
              onClick={handleSubmit}
              disabled={isLoading || !phone.trim()}
              className="astral-btn w-full disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Phone className="w-4 h-4" />
                  Find My Character
                </>
              )}
            </button>
          </div>

          {/* Not registered hint */}
          <div className="mt-6 pt-5 border-t border-white/8 flex items-start gap-3 text-sm text-white/40">
            <MessageCircle className="w-4 h-4 shrink-0 mt-0.5 text-[#4ecdc4]/60" />
            <p>
              No account yet? Open WhatsApp, add the bot, and type{' '}
              <span className="text-white/60 font-mono">!register</span> to create your character first.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
