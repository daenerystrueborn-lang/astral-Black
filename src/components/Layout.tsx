import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Crown, Code2, Cpu } from "lucide-react";
import { Link } from "wouter";
import iconImg from "@/assets/icon.jpg";

export function Footer() {
  return (
    <footer className="mt-16 sm:mt-20 border-t border-white/10 bg-black/40 py-10 sm:py-12">
      <div className="w-[calc(100%-40px)] sm:w-[calc(100%-60px)] max-w-[1000px] mx-auto flex flex-col md:flex-row justify-between gap-8">
        <div className="flex flex-col gap-4 max-w-sm">
          <div className="flex items-center gap-3 text-white font-bold text-lg">
            <img
              src={iconImg}
              alt="Astral"
              className="w-8 h-8 rounded-full object-cover object-top border border-white/20"
            />
            <span className="brand-text">Astral of the Forthless</span>
          </div>
          <p className="text-sm text-white/50 leading-relaxed">
            The ultimate fantasy RPG living directly inside WhatsApp. Battle through 100 floors, collect cards, and become a legend.
          </p>
        </div>

        <div className="flex gap-10 sm:gap-16 flex-wrap">
          <div className="flex flex-col gap-3">
            <h4 className="font-bold text-white/90 text-sm">Team</h4>
            <ul className="flex flex-col gap-2 text-sm text-white/50">
              <li className="flex items-center gap-2">
                <Crown className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                Nieves (Owner)
              </li>
              <li className="flex items-center gap-2">
                <Code2 className="w-3.5 h-3.5 text-[#4ecdc4] shrink-0" />
                William (Dev)
              </li>
              <li className="flex items-center gap-2">
                <Cpu className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                Emmy (Dev)
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="font-bold text-white/90 text-sm">Links</h4>
            <ul className="flex flex-col gap-2 text-sm text-white/50">
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">WhatsApp Group</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="w-[calc(100%-40px)] sm:w-[calc(100%-60px)] max-w-[1000px] mx-auto mt-10 pt-6 border-t border-white/5 text-center text-xs text-white/30">
        &copy; {new Date().getFullYear()} Astral of the Forthless. All rights reserved. Not affiliated with Meta or WhatsApp Inc.
      </div>
    </footer>
  );
}

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-[#1c1c1c] text-white">
      <svg style={{ display: "none" }}>
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      <Navbar />

      <main className="page-content">
        {children}
      </main>

      <Footer />
    </div>
  );
}
