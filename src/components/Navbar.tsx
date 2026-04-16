import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { Home, CreditCard, Layers, Store, Menu, X, User, LogOut, Settings, Crown, Coins, Zap, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/auth";
import iconImg from "@/assets/icon.jpg";

const NAV_LINKS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/topup", label: "Topup", icon: CreditCard },
  { href: "/cards", label: "Cards", icon: Layers },
  { href: "/shops", label: "Shops", icon: Store },
];

const CLASS_ACCENT: Record<string, string> = {
  Warrior: "#ef4444",
  Mage: "#60a5fa",
  Rogue: "#a855f7",
  Paladin: "#fbbf24",
};

export function Navbar() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuth();

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsProfileOpen(false);
  }, [location]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const userInitials = user ? user.username.slice(0, 2).toUpperCase() : null;
  const accentColor = user ? (CLASS_ACCENT[user.class] ?? "#4ecdc4") : "#4ecdc4";

  return (
    <>
      <nav className="navbar-container">
        <div className="navbar">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 text-white font-bold text-lg relative z-10">
            <img
              src={iconImg}
              alt="Astral"
              className="w-9 h-9 rounded-full object-cover object-top border border-white/20 shadow-[0_0_12px_rgba(78,205,196,0.3)]"
            />
            <span className="brand-text hidden sm:inline">Astral</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1 relative z-10">
            {NAV_LINKS.map((link) => {
              const Icon = link.icon;
              const isActive = location === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn("nav-link group", isActive && "active")}
                >
                  <Icon className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                  <span>{link.label}</span>
                </Link>
              );
            })}

            {/* Profile area */}
            <div ref={profileRef} className="relative ml-1">
              {user ? (
                <>
                  {/* Avatar button */}
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className={cn(
                      "flex items-center gap-2 pl-1 pr-3 py-1 rounded-full border transition-all duration-300",
                      isProfileOpen
                        ? "border-white/20 bg-white/10"
                        : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
                    )}
                  >
                    <div
                      className="w-7 h-7 rounded-full overflow-hidden border border-white/20 flex-shrink-0"
                      style={{ boxShadow: `0 0 8px ${accentColor}33` }}
                    >
                      {user.avatar ? (
                        <img src={user.avatar} alt="pfp" className="w-full h-full object-cover" />
                      ) : (
                        <div
                          className="w-full h-full flex items-center justify-center text-[11px] font-black text-white"
                          style={{ background: `linear-gradient(135deg, ${accentColor}44, ${accentColor}22)` }}
                        >
                          {userInitials}
                        </div>
                      )}
                    </div>
                    <span className="text-white/80 text-sm font-medium max-w-[80px] truncate hidden lg:block">{user.username}</span>
                  </button>

                  {/* Animated dropdown */}
                  <div
                    className={cn(
                      "absolute right-0 top-[calc(100%+10px)] w-64 rounded-2xl border border-white/10 overflow-hidden z-[200]",
                      "transition-all duration-300 origin-top-right",
                      isProfileOpen
                        ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                    )}
                    style={{
                      background: "linear-gradient(135deg, rgba(20,20,20,0.97) 0%, rgba(10,10,10,0.97) 100%)",
                      backdropFilter: "blur(24px)",
                      WebkitBackdropFilter: "blur(24px)",
                      boxShadow: "0 24px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.05), inset 0 1px 0 rgba(255,255,255,0.08)",
                    }}
                  >
                    {/* Shimmer top bar */}
                    <div
                      className="h-[1px] w-full"
                      style={{ background: `linear-gradient(90deg, transparent, ${accentColor}80, transparent)` }}
                    />

                    {/* User header */}
                    <div className="flex items-center gap-3 p-4 border-b border-white/6">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-base font-black text-white border border-white/15 flex-shrink-0"
                        style={{
                          background: `linear-gradient(135deg, ${accentColor}44, ${accentColor}22)`,
                          boxShadow: `0 0 16px ${accentColor}33`,
                        }}
                      >
                        {userInitials}
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-sm text-white truncate">{user.username}</div>
                        <div className="text-[11px] text-white/40 truncate">{user.email}</div>
                        <div className="text-[10px] mt-0.5" style={{ color: accentColor }}>Lv.{user.level} {user.class}</div>
                      </div>
                    </div>

                    {/* Stats row */}
                    <div className="flex divide-x divide-white/5 border-b border-white/6">
                      <div className="flex-1 flex flex-col items-center py-3">
                        <div className="flex items-center gap-1 text-amber-400 mb-0.5">
                          <Coins className="w-3 h-3" />
                          <span className="text-[11px] font-bold">{(user.gold / 1000).toFixed(1)}K</span>
                        </div>
                        <span className="text-[9px] text-white/30 uppercase tracking-wider">Gold</span>
                      </div>
                      <div className="flex-1 flex flex-col items-center py-3">
                        <div className="flex items-center gap-1 text-[#4ecdc4] mb-0.5">
                          <Zap className="w-3 h-3" />
                          <span className="text-[11px] font-bold">{user.coins}</span>
                        </div>
                        <span className="text-[9px] text-white/30 uppercase tracking-wider">Coins</span>
                      </div>
                      <div className="flex-1 flex flex-col items-center py-3">
                        <div className="flex items-center gap-1 text-purple-400 mb-0.5">
                          <span className="text-[11px] font-bold">{Math.floor(user.level * 2.3)}</span>
                        </div>
                        <span className="text-[9px] text-white/30 uppercase tracking-wider">Clears</span>
                      </div>
                    </div>

                    {/* Menu items */}
                    <div className="p-1.5">
                      {[
                        { href: "/profile", icon: User, label: "View Profile" },
                        { href: "/topup", icon: Crown, label: "Buy Coins" },
                        { href: "/settings", icon: Settings, label: "Settings" },
                      ].map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/70 font-medium hover:text-white hover:bg-white/8 transition-all duration-200 group"
                          >
                            <Icon className="w-4 h-4 text-white/30 group-hover:text-white/60 transition-colors" />
                            {item.label}
                            <ChevronRight className="w-3.5 h-3.5 ml-auto opacity-0 group-hover:opacity-50 transition-opacity" />
                          </Link>
                        );
                      })}

                      <div className="h-px bg-white/6 mx-1.5 my-1" />

                      <button
                        onClick={() => { logout(); setIsProfileOpen(false); }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-400/80 font-medium hover:text-red-300 hover:bg-red-500/8 transition-all duration-200 group"
                      >
                        <LogOut className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#4ecdc4]/30 bg-[#4ecdc4]/8 text-[#4ecdc4] font-semibold text-sm hover:bg-[#4ecdc4]/15 hover:border-[#4ecdc4]/50 transition-all duration-200"
                >
                  <User className="w-4 h-4" />
                  Sign In
                </Link>
              )}
            </div>
          </div>

          {/* Hamburger — mobile */}
          <button
            className="md:hidden relative z-10 text-white p-2 hover:bg-white/10 rounded-full transition-colors"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-black/80 backdrop-blur-md z-[1500] transition-all duration-300 md:hidden",
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        )}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed inset-0 z-[1600] flex flex-col md:hidden transition-transform duration-500",
          isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
        )}
        style={{
          background: "linear-gradient(135deg, #111 0%, #0a0a0a 100%)",
        }}
      >
        {/* Mobile header */}
        <div className="flex justify-between items-center p-5 border-b border-white/8">
          <Link href="/" className="flex items-center gap-3 text-white font-bold text-xl">
            <img src={iconImg} alt="Astral" className="w-9 h-9 rounded-full object-cover object-top border border-white/20" />
            <span className="brand-text">Astral</span>
          </Link>
          <button className="text-white p-2 hover:bg-white/10 rounded-full transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
            <X className="w-7 h-7" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-2">
          {/* Mobile: user profile area */}
          {user ? (
            <div
              className="flex items-center gap-3 p-4 rounded-2xl border border-white/10 mb-2"
              style={{
                background: `linear-gradient(135deg, ${accentColor}15, transparent)`,
                boxShadow: `0 0 20px ${accentColor}22`,
              }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-black text-white border border-white/15 flex-shrink-0"
                style={{ background: `linear-gradient(135deg, ${accentColor}44, ${accentColor}22)` }}
              >
                {userInitials}
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-bold text-white">{user.username}</div>
                <div className="text-sm" style={{ color: accentColor }}>Lv.{user.level} {user.class}</div>
                <div className="flex gap-3 mt-1">
                  <span className="text-xs text-amber-400">🪙 {user.gold.toLocaleString()}</span>
                  <span className="text-xs text-[#4ecdc4]">⚡ {user.coins}</span>
                </div>
              </div>
              <Link href="/profile" onClick={() => setIsMobileMenuOpen(false)} className="text-white/30 hover:text-white transition-colors">
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          ) : (
            <div className="flex gap-2 mb-2">
              <Link
                href="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-semibold text-sm astral-btn"
              >
                <User className="w-4 h-4" /> Sign In
              </Link>
              <Link
                href="/signup"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl border border-white/10 bg-white/5 text-white/60 font-semibold text-sm hover:bg-white/10 transition-colors"
              >
                Join Realm
              </Link>
            </div>
          )}

          {/* Nav links */}
          {NAV_LINKS.map((link) => {
            const Icon = link.icon;
            const isActive = location === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-4 px-5 py-4 text-white/90 font-medium text-base rounded-2xl transition-all duration-300 border border-white/8 bg-white/3",
                  isActive ? "bg-white/12 text-white border-white/15 translate-x-1.5" : "hover:bg-white/8 hover:translate-x-1.5"
                )}
              >
                <Icon className="w-5 h-5" />
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 ml-auto text-white/20" />
              </Link>
            );
          })}

          {/* Mobile profile/settings/logout */}
          {user && (
            <>
              <div className="h-px bg-white/6 my-2" />
              {[
                { href: "/profile", icon: User, label: "Profile" },
                { href: "/settings", icon: Settings, label: "Settings" },
              ].map(({ href, icon: Icon, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center gap-4 px-5 py-3.5 text-white/60 font-medium text-sm rounded-2xl transition-all duration-200 border border-white/5 bg-white/2 hover:bg-white/8 hover:text-white"
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </Link>
              ))}
              <button
                onClick={() => { logout(); setIsMobileMenuOpen(false); }}
                className="flex items-center gap-4 px-5 py-3.5 text-red-400/70 font-medium text-sm rounded-2xl transition-all duration-200 border border-red-500/10 bg-red-500/3 hover:bg-red-500/10 hover:text-red-300 w-full"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
