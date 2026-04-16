import { useState } from "react";
import { Hammer, Gavel, Scale, Skull, ArrowLeft, ShoppingBag, Sparkles, Lock, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const SHOPS = [
  {
    id: "blacksmith",
    name: "The Blacksmith",
    subtitle: "Weapon & Armor Upgrades",
    desc: "Master Rowan has forged weapons for champions since the first season. His anvil never cools.",
    icon: Hammer,
    accentColor: "#f97316",
    glowRgb: "249,115,22",
    borderClass: "border-orange-500/20",
    badgeClass: "bg-orange-500/10 text-orange-300 border-orange-500/20",
    tagClass: "bg-orange-500/10 text-orange-400",
    items: [
      { name: "Iron Sword Upgrade", price: "500G", type: "Service" },
      { name: "Repair Kit x5", price: "200G", type: "Consumable" },
      { name: "Steel Plating", price: "1,200G", type: "Material" },
      { name: "Mithril Ingot", price: "4,500G", type: "Material" },
      { name: "Enchant Scroll (ATK)", price: "3,000G", type: "Scroll" },
      { name: "Weapon Polish", price: "150G", type: "Consumable" },
    ],
    allItems: [
      { name: "Iron Sword Upgrade", price: "500G", type: "Service", desc: "Upgrades your iron sword to +1 quality." },
      { name: "Repair Kit x5", price: "200G", type: "Consumable", desc: "Restores 100 durability per use." },
      { name: "Steel Plating", price: "1,200G", type: "Material", desc: "Reinforces armor to steel tier." },
      { name: "Mithril Ingot", price: "4,500G", type: "Material", desc: "Rare crafting material for legendary gear." },
      { name: "Enchant Scroll (ATK)", price: "3,000G", type: "Scroll", desc: "Adds +50 ATK bonus to any weapon." },
      { name: "Weapon Polish", price: "150G", type: "Consumable", desc: "Boosts weapon sharpness for 1 dungeon run." },
    ]
  },
  {
    id: "forge",
    name: "The Forge",
    subtitle: "Legendary Crafting",
    desc: "Deep in the volcanic mountain, a forge burns eternal. Only the bravest warriors dare bring their materials here.",
    icon: Gavel,
    accentColor: "#ef4444",
    glowRgb: "239,68,68",
    borderClass: "border-red-500/20",
    badgeClass: "bg-red-500/10 text-red-300 border-red-500/20",
    tagClass: "bg-red-500/10 text-red-400",
    items: [
      { name: "Dragon Bone Sword", price: "Craft", type: "Weapon" },
      { name: "Titan Shield", price: "Craft", type: "Armor" },
      { name: "Void Daggers", price: "Craft", type: "Weapon" },
      { name: "Phoenix Helm", price: "Craft", type: "Armor" },
      { name: "Abyssal Greatsword", price: "Craft", type: "Weapon" },
      { name: "Guardian Gauntlets", price: "Craft", type: "Armor" },
    ],
    allItems: [
      { name: "Dragon Bone Sword", price: "Craft", type: "Weapon", desc: "Requires: Dragon Bone x3 + Mithril x2." },
      { name: "Titan Shield", price: "Craft", type: "Armor", desc: "Requires: Titan Fragment x5 + Steel x4." },
      { name: "Void Daggers", price: "Craft", type: "Weapon", desc: "Requires: Void Shard x2 + Shadow x1." },
      { name: "Phoenix Helm", price: "Craft", type: "Armor", desc: "Requires: Phoenix Feather x3 + Ruby x2." },
      { name: "Abyssal Greatsword", price: "Craft", type: "Weapon", desc: "Requires: Abyssal Core x1 + Dark Steel x6." },
      { name: "Guardian Gauntlets", price: "Craft", type: "Armor", desc: "Requires: Iron Knuckle x4 + Leather x3." },
    ]
  },
  {
    id: "auction",
    name: "Player Auction",
    subtitle: "Trade With Others",
    desc: "Where fortunes are made and lost. Player-set prices shift every cycle. Watch the market wisely.",
    icon: Scale,
    accentColor: "#3b82f6",
    glowRgb: "59,130,246",
    borderClass: "border-blue-500/20",
    badgeClass: "bg-blue-500/10 text-blue-300 border-blue-500/20",
    tagClass: "bg-blue-500/10 text-blue-400",
    items: [
      { name: "SSR Card: Toji Fushiguro", price: "2,000,000G", type: "Card" },
      { name: "Boss Soul (Floor 50)", price: "85,000G", type: "Material" },
      { name: "Elixir of Life", price: "9,000G", type: "Consumable" },
      { name: "Legendary Card Pack", price: "5,000,000G", type: "Pack" },
      { name: "Void Shard", price: "120,000G", type: "Material" },
      { name: "Guild Banner Dye", price: "25,000G", type: "Cosmetic" },
    ],
    allItems: [
      { name: "SSR Card: Toji Fushiguro", price: "2,000,000G", type: "Card", desc: "Epic Jujutsu Kaisen card. High demand." },
      { name: "Boss Soul (Floor 50)", price: "85,000G", type: "Material", desc: "Dropped by Floor 50 boss." },
      { name: "Elixir of Life", price: "9,000G", type: "Consumable", desc: "Fully restores HP. Rare drop." },
      { name: "Legendary Card Pack", price: "5,000,000G", type: "Pack", desc: "Guaranteed Legendary tier inside." },
      { name: "Void Shard", price: "120,000G", type: "Material", desc: "Rare Void dungeon drop." },
      { name: "Guild Banner Dye", price: "25,000G", type: "Cosmetic", desc: "Customize your guild banner color." },
    ]
  },
  {
    id: "blackmarket",
    name: "Black Market",
    subtitle: "Forbidden Goods",
    desc: "He appears when the moon is darkest. No one knows his name. No one asks twice.",
    icon: Skull,
    locked: true,
    accentColor: "#a855f7",
    glowRgb: "168,85,247",
    borderClass: "border-purple-500/20",
    badgeClass: "bg-purple-500/10 text-purple-300 border-purple-500/20",
    tagClass: "bg-purple-500/10 text-purple-400",
    items: [],
    allItems: []
  }
];

export default function Shops() {
  const [entered, setEntered] = useState<string | null>(null);

  const enteredShop = SHOPS.find(s => s.id === entered);

  if (enteredShop) {
    const Icon = enteredShop.icon;
    return (
      <div className="flex flex-col gap-6">
        <button
          onClick={() => setEntered(null)}
          className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm w-fit"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Town Hub
        </button>

        {/* Shop header */}
        <div
          className="relative rounded-2xl border overflow-hidden p-6 sm:p-8"
          style={{
            background: `linear-gradient(135deg, rgba(${enteredShop.glowRgb},0.12) 0%, rgba(0,0,0,0) 60%)`,
            borderColor: `rgba(${enteredShop.glowRgb},0.2)`,
            boxShadow: `0 0 40px rgba(${enteredShop.glowRgb},0.06)`,
          }}
        >
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{ background: `linear-gradient(90deg, transparent, rgba(${enteredShop.glowRgb},0.4), transparent)` }}
          />
          <div className="flex items-start gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: `rgba(${enteredShop.glowRgb},0.12)`, border: `1px solid rgba(${enteredShop.glowRgb},0.2)` }}
            >
              <Icon className="w-6 h-6" style={{ color: enteredShop.accentColor }} />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: enteredShop.accentColor }}>{enteredShop.subtitle}</span>
              <h1 className="text-2xl font-bold mt-0.5">{enteredShop.name}</h1>
              <p className="text-white/45 text-sm mt-1 italic">{enteredShop.desc}</p>
            </div>
          </div>
        </div>

        {/* Items */}
        <div className="glass-panel overflow-hidden">
          <div className="px-5 py-3 border-b border-white/8 bg-white/5 flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-white/40" />
            <span className="text-sm font-medium text-white/60">Available Items</span>
            <span className="ml-auto text-xs text-white/30">{enteredShop.allItems.length} items</span>
          </div>
          <div className="divide-y divide-white/5">
            {enteredShop.allItems.map((item, j) => (
              <div key={j} className="flex items-start justify-between gap-3 px-5 py-4 hover:bg-white/4 transition-colors">
                <div className="flex flex-col gap-1 flex-1 min-w-0">
                  <span className="font-semibold text-sm text-white">{item.name}</span>
                  <span className="text-xs text-white/40">{item.desc}</span>
                  <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-full w-fit mt-0.5", enteredShop.tagClass)}>{item.type}</span>
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <span className={cn("font-bold text-sm whitespace-nowrap", item.price === "Craft" ? "text-blue-400" : "text-amber-400")}>{item.price}</span>
                  <button
                    className="px-3 py-1 bg-white/8 hover:bg-white/15 rounded-lg text-xs font-medium transition-colors"
                    style={{ border: `1px solid rgba(${enteredShop.glowRgb},0.2)` }}
                  >
                    {item.price === "Craft" ? "Craft" : "Buy"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Page header */}
      <div className="relative flex flex-col items-center text-center pt-4 pb-6 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none" aria-hidden>
          <span
            className="font-black whitespace-nowrap leading-none"
            style={{
              fontSize: "clamp(80px,22vw,220px)",
              color: "transparent",
              WebkitTextStroke: "1.5px rgba(255,255,255,0.09)",
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
          <p className="text-white/50 text-sm max-w-sm">Spend your hard-earned gold, craft legendary gear, or trade with other players.</p>
        </div>
      </div>

      {/* Shop cards — clean list */}
      <div className="flex flex-col gap-4">
        {SHOPS.map((shop) => {
          const Icon = shop.icon;
          return (
            <div
              key={shop.id}
              className={cn(
                "relative rounded-2xl border overflow-hidden transition-all duration-300",
                shop.locked ? "opacity-70" : "hover:-translate-y-0.5 cursor-pointer group"
              )}
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
                backdropFilter: "blur(20px)",
                borderColor: `rgba(${shop.glowRgb},0.18)`,
                boxShadow: `0 4px 30px rgba(0,0,0,0.4), 0 0 0 0 rgba(${shop.glowRgb},0)`,
              }}
              onClick={() => !shop.locked && setEntered(shop.id)}
            >
              {/* Top accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-[1px]"
                style={{ background: `linear-gradient(90deg, transparent, rgba(${shop.glowRgb},0.5), transparent)` }}
              />

              {/* Ambient glow */}
              <div
                className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl pointer-events-none opacity-20"
                style={{ background: `rgba(${shop.glowRgb},1)` }}
              />

              <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 sm:p-6">
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: `rgba(${shop.glowRgb},0.1)`,
                    border: `1px solid rgba(${shop.glowRgb},0.2)`,
                  }}
                >
                  {shop.locked
                    ? <Lock className="w-5 h-5 text-white/30" />
                    : <Icon className="w-5 h-5" style={{ color: shop.accentColor }} />
                  }
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold text-base text-white">{shop.name}</h3>
                    <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-full border", shop.badgeClass)}>
                      {shop.locked ? "Locked" : shop.subtitle}
                    </span>
                  </div>
                  <p className="text-sm text-white/45 mt-1 leading-relaxed line-clamp-1">{shop.desc}</p>

                  {/* Item tags */}
                  {!shop.locked && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {shop.items.slice(0, 4).map((item, j) => (
                        <span key={j} className={cn("text-[10px] font-medium px-2 py-0.5 rounded-md", shop.tagClass)}>
                          {item.name}
                        </span>
                      ))}
                      {shop.items.length > 4 && (
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-white/5 text-white/30">
                          +{shop.items.length - 4} more
                        </span>
                      )}
                    </div>
                  )}

                  {shop.locked && (
                    <p className="text-xs text-purple-400/60 mt-2 italic">Appears randomly at night. Check back later...</p>
                  )}
                </div>

                {/* CTA */}
                {!shop.locked && (
                  <button
                    className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 group-hover:scale-105"
                    style={{
                      background: `rgba(${shop.glowRgb},0.12)`,
                      border: `1px solid rgba(${shop.glowRgb},0.25)`,
                      color: shop.accentColor,
                    }}
                    onClick={(e) => { e.stopPropagation(); setEntered(shop.id); }}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Enter
                    <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer note */}
      <div className="flex items-center gap-3 px-5 py-4 rounded-2xl border border-white/6 bg-white/3">
        <Sparkles className="w-4 h-4 text-[#4ecdc4] flex-shrink-0" />
        <p className="text-xs text-white/40 leading-relaxed">
          Use <span className="text-white/70 font-mono">/shop</span> in WhatsApp to access shops in-game. Gold earned from dungeons, quests, and world bosses.
        </p>
      </div>
    </div>
  );
}
