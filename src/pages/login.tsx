import { useState } from 'react'
import { useLocation } from 'wouter'
import { Phone, Loader2, AlertCircle, MessageCircle, Lock, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '@/contexts/auth'
import iconImg from '@/assets/icon.jpg'
import bgImg from '@assets/quilora_1776350198247.jpg'

export default function Login() {
  const { login, isLoading, error, clearError } = useAuth()
  const [, setLocation] = useLocation()
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async () => {
    clearError()
    if (!phone.trim()) return
    try {
      await login(phone.trim(), password.trim() || undefined)
      setLocation('/')
    } catch {
      // error already set in context
    }
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden">

      {/* Background image */}
      <img
        src={bgImg}
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
        style={{ opacity: 0.35 }}
      />

      {/* Dark overlays */}
      <div className="absolute inset-0 bg-[#0a0a0a]/60" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-[#0a0a0a]/20" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/70 to-transparent" />

      <div className="relative z-10 w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex flex-col items-center gap-3 mb-4">
            <img
              src={iconImg}
              alt="Astral icon"
              className="w-16 h-16 rounded-2xl object-cover object-top border border-white/20 shadow-[0_0_32px_rgba(78,205,196,0.35)]"
            />
          </div>
          <h1 className="text-5xl font-black brand-text mb-1 drop-shadow-lg">Astral</h1>
          <p className="text-white/45 text-sm tracking-wide">of the Forthless</p>
        </div>

        {/* Card */}
        <div
          className="rounded-[24px] border border-white/12 p-7 sm:p-8"
          style={{
            background: 'linear-gradient(135deg, rgba(15,15,15,0.92) 0%, rgba(8,8,8,0.95) 100%)',
            backdropFilter: 'blur(32px)',
            WebkitBackdropFilter: 'blur(32px)',
            boxShadow: '0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.06), inset 0 1px 0 rgba(255,255,255,0.08)',
          }}
        >
          {/* Top shimmer */}
          <div className="absolute top-0 inset-x-0 h-px rounded-t-[24px]"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(78,205,196,0.4), transparent)' }}
          />

          <h2 className="text-xl font-bold text-white mb-1">Link your account</h2>
          <p className="text-white/40 text-sm mb-6">
            Enter your WhatsApp number and password to access your character.
          </p>

          {/* Error */}
          {error && (
            <div className="flex items-start gap-3 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm mb-5">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={e => { e.preventDefault(); handleSubmit(); }} className="flex flex-col gap-4">

            {/* Phone input */}
            <div>
              <label className="text-[10px] text-white/40 uppercase tracking-widest mb-2 block font-semibold">
                WhatsApp Number
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
                <input
                  type="tel"
                  placeholder="e.g. 2347062301848"
                  value={phone}
                  onChange={e => { setPhone(e.target.value); clearError(); }}
                  onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#4ecdc4]/60 focus:bg-white/8 transition-all"
                />
              </div>
              <p className="text-[11px] text-white/25 mt-1.5">
                Include country code — no + or spaces. e.g. <span className="text-white/45 font-mono">2347012345678</span>
              </p>
            </div>

            {/* Password input */}
            <div>
              <label className="text-[10px] text-white/40 uppercase tracking-widest mb-2 block font-semibold">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Your account password"
                  value={password}
                  onChange={e => { setPassword(e.target.value); clearError(); }}
                  onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-11 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#4ecdc4]/60 focus:bg-white/8 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/60 transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={isLoading || !phone.trim()}
              className="astral-btn w-full disabled:opacity-40 disabled:cursor-not-allowed mt-1"
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
          </form>

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
