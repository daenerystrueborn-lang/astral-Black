import { useState } from "react";
import { Hammer, Gavel, Scale, Skull, ArrowLeft, Gem, Coins, Package, Scroll, Shield, Sword, ChevronRight, Sparkles, Lock, ShoppingCart, Star } from "lucide-react";
import { cn } from "@/lib/utils";

type ShopItem = {
  name: string;
  price: string;
  currency: "solars" | "dc" | "craft" | "free";
  type: string;
  desc: string;
  rarity?: "common" | "uncommon" | "rare" | "epic" | "legendary";
};

type Shop = {
  id: string;
  name: string;
  subtitle: string;
  desc: string;
  lore: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  accentColor: string;
  glowRgb: string;
  locked?: boolean;
  command: string;
  items: ShopItem[];
};

const RARITY_STYLES: Record<string, string> = {
  common: "text-gray-400 border-gray-500/30 bg-gray-500/8",
  uncommon: "text-green-400 border-green-500/30 bg-green-500/8",
  rare: "text-blue-400 border-blue-500/30 bg-blue-500/8",
  epic: "text-purple-400 border-purple-500/30 bg-purple-500/8",
  legendary: "text-amber-400 border-amber-500/30 bg-amber-500/8",
};

const SHOPS: Shop[] = [
  {
    id: "blacksmith",
    name: "The Blacksmith",
    subtitle: "Weapons & Armor",
    desc: "Master Rowan's forge never cools. Legendary weapons have been born here since Season 1.",
    lore: "\"I've hammered steel for champions and corpses alike. Your gold spends the same either way.\"",
    icon: Hammer,
    accentColor: "#f97316",
    glowRgb: "249,115,22",
    command: "!shop blacksmith",
    items: [
      { name: "Iron Sword Upgrade", price: "500", currency: "solars", type: "Upgrade", desc: "Upgrades your iron sword to +1 quality, adding +25 ATK.", rarity: "common" },
      { name: "Repair Kit ×5", price: "200", currency: "solars", type: "Consumable", desc: "Restores 100 durability per kit. Don't let your gear break mid-dungeon.", rarity: "common" },
      { name: "Steel Plating", price: "1,200", currency: "solars", type: "Material", desc: "Reinforces armor to steel tier. Required for T3 crafting.", rarity: "uncommon" },
      { name: "Enchant Scroll (ATK)", price: "3,000", currency: "solars", type: "Scroll", desc: "Adds permanent +50 ATK to any weapon. One use.", rarity: "rare" },
      { name: "Mithril Ingot", price: "4,500", currency: "solars", type: "Material", desc: "Ultra-rare crafting material. Required for legendary-tier gear.", rarity: "epic" },
      { name: "Weapon Polish", price: "150", currency: "solars", type: "Consumable", desc: "Boosts weapon sharpness for 1 dungeon run. +10% crit chance.", rarity: "common" },
    ],
  },
  {
    id: "forge",
    name: "The Forge",
    subtitle: "Legendary Crafting",
    desc: "Deep inside a volcanic mountain, a forge burns eternal. Only the rarest materials are accepted here.",
    lore: "\"Materials of legend require a forge of legend. No gold — only the right components.\"",
    icon: Gavel,
    accentColor: "#ef4444",
    glowRgb: "239,68,68",
    command: "!shop forge",
    items: [
      { name: "Dragon Bone Sword", price: "Dragon Bone ×3 + Mithril ×2", currency: "craft", type: "Weapon", desc: "+250 ATK. Burns enemies for 3 turns.", rarity: "legendary" },
      { name: "Titan Shield", price: "Titan Fragment ×5 + Steel ×4", currency: "craft", type: "Armor", desc: "+400 DEF. 15% chance to reflect damage.", rarity: "legendary" },
      { name: "Void Daggers", price: "Void Shard ×2 + Shadow ×1", currency: "craft", type: "Weapon", desc: "+180 ATK with guaranteed first-strike bonus.", rarity: "epic" },
      { name: "Phoenix Helm", price: "Phoenix Feather ×3 + Ruby ×2", currency: "craft", type: "Armor", desc: "Revive once per dungeon with 50% HP.", rarity: "legendary" },
      { name: "Abyssal Greatsword", price: "Abyssal Core ×1 + Dark Steel ×6", currency: "craft", type: "Weapon", desc: "+300 ATK. Deals bonus damage to bosses.", rarity: "legendary" },
      { name: "Guardian Gauntlets", price: "Iron Knuckle ×4 + Leather ×3", currency: "craft", type: "Armor", desc: "+120 DEF. +10% parry chance.", rarity: "rare" },
    ],
  },
  {
    id: "auction",
    name: "Player Auction",
    subtitle: "Player Trade Hub",
    desc: "Where player economies live. Prices shift every cycle — watch the market wisely.",
    lore: "\"The market doesn't lie. Only the players do.\"",
    icon: Scale,
    accentColor: "#3b82f6",
    glowRgb: "59,130,246",
    command: "!market",
    items: [
      { name: "SSR Card: Toji Fushiguro", price: "2,000,000", currency: "solars", type: "Card", desc: "Epic Jujutsu Kaisen card. High demand — price rising.", rarity: "legendary" },
      { name: "Legendary Card Pack", price: "5,000,000", currency: "solars", type: "Pack", desc: "Guaranteed Legendary tier card inside. Random selection.", rarity: "legendary" },
      { name: "Void Shard", price: "120,000", currency: "solars", type: "Material", desc: "Rare drop from Void dungeon floors 40-60. Forge material.", rarity: "rare" },
      { name: "Boss Soul (Floor 50)", price: "85,000", currency: "solars", type: "Material", desc: "Dropped by Floor 50 boss. Used in advanced crafting.", rarity: "epic" },
      { name: "Elixir of Life", price: "9,000", currency: "solars", type: "Consumable", desc: "Fully restores HP. Extremely rare dungeon drop.", rarity: "rare" },
      { name: "Guild Banner Dye", price: "25,000", currency: "solars", type: "Cosmetic", desc: "Customize your guild banner with any color.", rarity: "uncommon" },
    ],
  },
  {
    id: "crystal",
    name: "Crystal Exchange",
    subtitle: "Dark Crystal Shop",
    desc: "Exclusive items purchasable only with Dark Crystals — the rarest currency in Astral.",
    lore: "\"Dark Crystals don't grow on trees. Spend them wisely, warrior.\"",
    icon: Gem,
    accentColor: "#a855f7",
    glowRgb: "168,85,247",
    command: "!dcshop",
    items: [
      { name: "Anime Card Draw ×1", price: "50", currency: "dc", type: "Card", desc: "Pull 1 random card from the full collection. Luck favors the brave.", rarity: "uncommon" },
      { name: "Premium Card Draw ×10", price: "450", currency: "dc", type: "Card", desc: "10 card draws with guaranteed Rare or higher at pity.", rarity: "rare" },
      { name: "Class Change Scroll", price: "200", currency: "dc", type: "Scroll", desc: "Respec your class without losing level or gear.", rarity: "epic" },
      { name: "Title: Shadow Walker", price: "800", currency: "dc", type: "Cosmetic", desc: "Exclusive title shown before your name in rankings.", rarity: "legendary" },
      { name: "XP Boost (24h)", price: "100", currency: "dc", type: "Boost", desc: "+50% XP from all dungeon floors for 24 hours.", rarity: "rare" },
      { name: "Prestige Badge", price: "2,000", currency: "dc", type: "Cosmetic", desc: "Cosmetic badge showing your prestige. Bragging rights.", rarity: "legendary" },
    ],
  },
  {
    id: "blackmarket",
    name: "Black Market",
    subtitle: "Forbidden Goods",
    desc: "He appears when the moon is darkest. No one knows his name. No one asks twice.",
    lore: "\"I was never here. You were never here.\"",
    icon: Skull,
    accentColor: "#6b7280",
    glowRgb: "107,114,128",
    locked: true,
    command: "???",
    items: [],
  },
];

function CurrencyIcon({ currency, className }: { currency: ShopItem["currency"]; className?: string }) {
  if (currency === "dc") return <Gem className={cn("text-purple-400", className)} />;
  if (currency === "solars") return <Coins className={cn("text-amber-400", className)} />;
  if (currency === "craft") return <Package className={cn("text-blue-400", className)} />;
  return <Star className={cn("text-green-400", className)} />;
}

function PriceDisplay({ item }: { item: ShopItem }) {
  if (item.currency === "craft") {
    return (
      <div className="flex items-center gap-1.5">
        <Package className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
        <span className="text-blue-300 font-semibold text-xs leading-tight">{item.price}</span>
      </div>
    );
  }
  if (item.currency === "dc") {
    return (
      <div className="flex items-center gap-1">
        <Gem className="w-3.5 h-3.5 text-purple-400" />
        <span className="text-purple-300 font-bold text-sm">{item.price} DC</span>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-1">
      <Coins className="w-3.5 h-3.5 text-amber-400" />
      <span className="text-amber-300 font-bold text-sm">{parseInt(item.price.replace(/,/g, "")).toLocaleString()}</span>
    </div>
  );
}

function ShopDetail({ shop, onBack }: { shop: Shop; onBack: () => void }) {
  const Icon = shop.icon;

  return (
    <div className="flex flex-col gap-5">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm w-fit group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
        Town Hub
      </button>

      <div
        className="relative rounded-[22px] border overflow-hidden p-6 sm:p-8"
        style={{
          background: `linear-gradient(135deg, rgba(${shop.glowRgb},0.1) 0%, rgba(0,0,0,0.6) 70%)`,
          borderColor: `rgba(${shop.glowRgb},0.25)`,
        }}
      >
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 60% 50% at 80% 50%, rgba(${shop.glowRgb},0.25), transparent)` }}
        />
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: `linear-gradient(90deg, transparent, rgba(${shop.glowRgb},0.6), transparent)` }}
        />

        <div className="relative z-10 flex items-start gap-5">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{ background: `rgba(${shop.glowRgb},0.15)`, border: `1px solid rgba(${shop.glowRgb},0.3)`, boxShadow: `0 0 20px rgba(${shop.glowRgb},0.12)` }}
          >
            <Icon className="w-7 h-7" style={{ color: shop.accentColor }} />
          </div>
          <div className="flex-1">
            <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: shop.accentColor }}>{shop.subtitle}</p>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">{shop.name}</h1>
            <p className="text-white/50 text-sm mt-1.5 italic leading-relaxed">"{shop.lore.replace(/"/g, "")}"</p>
          </div>
        </div>

        <div className="relative z-10 mt-4 flex items-center gap-3 px-4 py-2.5 rounded-xl bg-black/30 border border-white/8 w-fit">
          <span className="text-xs text-white/40">Bot command:</span>
          <span className="font-mono text-[#4ecdc4] text-sm font-bold">{shop.command}</span>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {shop.items.map((item, i) => {
          const rarityStyle = RARITY_STYLES[item.rarity ?? "common"];
          return (
            <div
              key={i}
              className="relative group rounded-[18px] border border-white/8 p-4 flex flex-col gap-3 transition-all duration-200 hover:border-white/15 hover:-translate-y-0.5"
              style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)" }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-col gap-1 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold text-sm text-white">{item.name}</h3>
                    <span className={cn("text-[9px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider", rarityStyle)}>
                      {item.rarity}
                    </span>
                  </div>
                  <p className="text-xs text-white/40 leading-relaxed">{item.desc}</p>
                </div>
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `rgba(${shop.glowRgb},0.1)`, border: `1px solid rgba(${shop.glowRgb},0.18)` }}
                >
                  <CurrencyIcon currency={item.currency} className="w-4 h-4" />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white/6">
                <PriceDisplay item={item} />
                <button
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 hover:scale-105"
                  style={{
                    background: `rgba(${shop.glowRgb},0.12)`,
                    border: `1px solid rgba(${shop.glowRgb},0.22)`,
                    color: shop.accentColor,
                  }}
                >
                  <ShoppingCart className="w-3 h-3" />
                  {item.currency === "craft" ? "Craft" : "Buy"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Shops() {
  const [entered, setEntered] = useState<string | null>(null);
  const enteredShop = SHOPS.find(s => s.id === entered);

  if (enteredShop && !enteredShop.locked) {
    return <ShopDetail shop={enteredShop} onBack={() => setEntered(null)} />;
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="relative flex flex-col items-center text-center pt-4 pb-6 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none" aria-hidden>
          <span
            className="font-black whitespace-nowrap leading-none"
            style={{
              fontSize: "clamp(60px,18vw,180px)",
              color: "transparent",
              WebkitTextStroke: "1.5px rgba(255,255,255,0.07)",
              letterSpacing: "-0.04em",
            }}
          >
            TOWN HUB
          </span>
        </div>
        <div className="relative z-10 flex flex-col items-center gap-3">
          <div className="badge-spark">
            Town Hub
            <span className="spark" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold">Choose a Shop</h1>
          <p className="text-white/50 text-sm max-w-sm">
            Spend Solars, craft with materials, or use Dark Crystals for premium items.
          </p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {SHOPS.map((shop) => {
          const Icon = shop.icon;
          const isLocked = shop.locked;

          return (
            <button
              key={shop.id}
              disabled={isLocked}
              onClick={() => !isLocked && setEntered(shop.id)}
              className={cn(
                "relative group rounded-[22px] border text-left p-5 sm:p-6 flex flex-col gap-4 transition-all duration-300 overflow-hidden",
                isLocked
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:-translate-y-1 cursor-pointer"
              )}
              style={{
                background: `linear-gradient(135deg, rgba(${shop.glowRgb},0.07) 0%, rgba(5,5,5,0.9) 70%)`,
                borderColor: `rgba(${shop.glowRgb},0.2)`,
              }}
            >
              <div
                className="absolute top-0 right-0 w-56 h-56 rounded-full blur-3xl pointer-events-none transition-opacity duration-300 group-hover:opacity-40 opacity-20"
                style={{ background: `rgba(${shop.glowRgb},1)`, transform: "translate(30%, -30%)" }}
              />
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: `linear-gradient(90deg, transparent, rgba(${shop.glowRgb},0.5), transparent)` }}
              />

              <div className="relative z-10 flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: `rgba(${shop.glowRgb},0.12)`,
                    border: `1px solid rgba(${shop.glowRgb},0.25)`,
                    boxShadow: `0 0 16px rgba(${shop.glowRgb},0.1)`,
                  }}
                >
                  {isLocked
                    ? <Lock className="w-5 h-5 text-white/25" />
                    : <Icon className="w-5 h-5" style={{ color: shop.accentColor }} />
                  }
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{ color: isLocked ? "rgba(255,255,255,0.25)" : shop.accentColor }}>
                    {isLocked ? "Locked" : shop.subtitle}
                  </p>
                  <h3 className="font-bold text-base text-white">{shop.name}</h3>
                  <p className="text-xs text-white/40 mt-1 leading-relaxed line-clamp-2">{shop.desc}</p>
                </div>
              </div>

              {!isLocked && (
                <div className="relative z-10 flex items-center justify-between pt-3 border-t border-white/6">
                  <div className="flex gap-1.5">
                    {[...new Set(shop.items.map(i => i.currency))].map(cur => (
                      <div key={cur} className="flex items-center gap-1 px-2 py-1 rounded-lg bg-black/30 border border-white/8">
                        <CurrencyIcon currency={cur} className="w-3 h-3" />
                        <span className="text-[10px] text-white/40 font-medium capitalize">{cur === "dc" ? "Dark Crystals" : cur === "solars" ? "Solars" : cur === "craft" ? "Materials" : "Free"}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-1 text-white/30 group-hover:text-white/60 transition-colors">
                    <span className="text-xs font-medium">Enter</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              )}

              {isLocked && (
                <div className="relative z-10 pt-3 border-t border-white/6">
                  <p className="text-xs text-white/25 italic">Appears randomly at night. Check back later...</p>
                </div>
              )}
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-3 px-5 py-4 rounded-2xl border border-white/6 bg-white/[0.02]">
        <Sparkles className="w-4 h-4 text-[#4ecdc4] flex-shrink-0" />
        <p className="text-xs text-white/40 leading-relaxed">
          Access shops in-game via <span className="font-mono text-white/70">!shop</span> in WhatsApp. Solars are earned from dungeons, quests, and world bosses. Dark Crystals from premium topups.
        </p>
      </div>
    </div>
  );
}
