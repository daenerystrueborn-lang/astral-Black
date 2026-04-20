import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Sword, Shield, Gem as GemIcon, Package, FlaskConical, Scroll, Lock, Star } from "lucide-react";
import { useAuth } from "@/contexts/auth";
import { cn } from "@/lib/utils";

interface InventoryItem {
  id: string; name: string; type: string; rarity: string;
  desc?: string; emoji?: string; qty?: number;
  str?: number; agi?: number; int?: number; def?: number; lck?: number;
  price?: number;
}
interface EquippedSlots {
  weapon?: InventoryItem;
  armor?: InventoryItem;
  accessory?: InventoryItem;
}

const RARITY_STYLES: Record<string, string> = {
  common:    "text-gray-300   border-gray-500/30   bg-gray-500/8",
  uncommon:  "text-green-400  border-green-500/30  bg-green-500/8",
  rare:      "text-blue-400   border-blue-500/30   bg-blue-500/8",
  epic:      "text-purple-400 border-purple-500/30 bg-purple-500/8",
  legendary: "text-amber-400  border-amber-500/30  bg-amber-500/8",
  mythic:    "text-pink-400   border-pink-500/30   bg-pink-500/8",
};
const RARITY_GLOW: Record<string, string> = {
  legendary: "shadow-[0_0_20px_rgba(251,191,36,0.15)]",
  mythic:    "shadow-[0_0_20px_rgba(236,72,153,0.2)]",
  epic:      "shadow-[0_0_16px_rgba(168,85,247,0.12)]",
};
const TYPE_ICON: Record<string, React.ReactNode> = {
  weapon:      <Sword className="w-4 h-4" />,
  armor:       <Shield className="w-4 h-4" />,
  accessory:   <GemIcon className="w-4 h-4" />,
  consumable:  <FlaskConical className="w-4 h-4" />,
  material:    <Package className="w-4 h-4" />,
  quest:       <Scroll className="w-4 h-4" />,
  spell_scroll:<Scroll className="w-4 h-4" />,
};
const CATEGORY_ORDER = ["weapon","armor","accessory","consumable","material","quest","spell_scroll","dnd_item"];
const CATEGORY_LABELS: Record<string, string> = {
  weapon:"⚔️ Weapons", armor:"🛡️ Armor", accessory:"💍 Accessories",
  consumable:"🧪 Consumables", material:"⚗️ Materials", quest:"📜 Quest Items",
  spell_scroll:"📜 Spell Scrolls", dnd_item:"🔮 Arcane Items",
};

function StatBadge({ label, val }: { label: string; val: number }) {
  if (!val) return null;
  return (
    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-white/8 border border-white/10 text-white/60">
      {label}+{val}
    </span>
  );
}

function ItemCard({ item, equipped }: { item: InventoryItem; equipped?: boolean }) {
  const rStyle = RARITY_STYLES[item.rarity] ?? RARITY_STYLES.common;
  const glow   = RARITY_GLOW[item.rarity] ?? "";
  const hasStats = item.str || item.agi || item.int || item.def || item.lck;
  return (
    <div className={cn(
      "relative rounded-[16px] border p-3.5 flex flex-col gap-2 transition-all duration-200 hover:-translate-y-0.5",
      rStyle, glow, equipped && "ring-1 ring-[#4ecdc4]/40"
    )} style={{ background: "linear-gradient(135deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))" }}>
      {equipped && (
        <span className="absolute top-2 right-2 text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-[#4ecdc4]/15 border border-[#4ecdc4]/30 text-[#4ecdc4]">
          EQUIPPED
        </span>
      )}
      <div className="flex items-start gap-2">
        <div className="w-8 h-8 rounded-xl bg-white/8 border border-white/10 flex items-center justify-center text-base flex-shrink-0">
          {item.emoji || (TYPE_ICON[item.type] ?? <Package className="w-4 h-4 text-white/40" />)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-bold text-sm text-white leading-tight truncate">{item.name}</div>
          <div className={cn("text-[10px] font-bold uppercase tracking-wider", rStyle.split(" ")[0])}>
            {item.rarity}
          </div>
        </div>
        {(item.qty ?? 1) > 1 && (
          <span className="text-xs font-bold text-white/50 flex-shrink-0">×{item.qty}</span>
        )}
      </div>
      {item.desc && <p className="text-[11px] text-white/40 leading-relaxed">{item.desc}</p>}
      {hasStats && (
        <div className="flex flex-wrap gap-1 pt-1 border-t border-white/6">
          <StatBadge label="STR" val={item.str!} />
          <StatBadge label="AGI" val={item.agi!} />
          <StatBadge label="INT" val={item.int!} />
          <StatBadge label="DEF" val={item.def!} />
          <StatBadge label="LCK" val={item.lck!} />
        </div>
      )}
    </div>
  );
}

export default function Inventory() {
  const { user } = useAuth();
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [equipped, setEquipped] = useState<EquippedSlots>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    fetch(`/api/player/${user.id}/inventory`)
      .then(r => r.json())
      .then(data => {
        if (data.error) throw new Error(data.error);
        setInventory(data.inventory || []);
        setEquipped(data.equipped || {});
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [user]);

  if (!user) return (
    <div className="flex flex-col items-center justify-center py-24 gap-6 text-center">
      <div className="text-5xl">🎒</div>
      <h2 className="text-2xl font-bold text-white">Not signed in</h2>
      <p className="text-white/40 text-sm max-w-xs">Sign in to view your inventory and equipped gear.</p>
      <Link href="/login" className="astral-btn">Sign In</Link>
    </div>
  );

  // Categorise
  const categorised: Record<string, InventoryItem[]> = {};
  for (const item of inventory) {
    const cat = CATEGORY_ORDER.includes(item.type) ? item.type : "material";
    if (!categorised[cat]) categorised[cat] = [];
    categorised[cat].push(item);
  }
  const categories = ["all", ...CATEGORY_ORDER.filter(c => categorised[c]?.length)];
  const displayed = activeCategory === "all" ? inventory : (categorised[activeCategory] || []);

  const equippedList = Object.entries(equipped) as [string, InventoryItem][];

  return (
    <div className="flex flex-col gap-6 pb-10">
      {/* Header */}
      <div className="relative flex flex-col items-center text-center pt-4 pb-4 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none" aria-hidden>
          <span className="font-black whitespace-nowrap leading-none" style={{
            fontSize:"clamp(60px,18vw,160px)", color:"transparent",
            WebkitTextStroke:"1.5px rgba(255,255,255,0.06)", letterSpacing:"-0.04em"
          }}>GEAR</span>
        </div>
        <div className="relative z-10 flex flex-col items-center gap-3">
          <div className="badge-spark">Inventory <span className="spark"/></div>
          <h1 className="text-3xl font-bold">Your Gear</h1>
          <p className="text-white/50 text-sm">{inventory.length} item{inventory.length !== 1 ? "s" : ""} in your bag</p>
        </div>
      </div>

      {/* Equipped gear */}
      {equippedList.length > 0 && (
        <div className="glass-panel overflow-hidden">
          <div className="px-5 py-3.5 border-b border-white/8 flex items-center gap-2">
            <Star className="w-4 h-4 text-[#4ecdc4]" />
            <span className="font-bold text-sm text-white/70">Currently Equipped</span>
          </div>
          <div className="p-4 grid sm:grid-cols-3 gap-3">
            {equippedList.map(([slot, item]) => (
              <div key={slot}>
                <div className="text-[10px] text-white/30 uppercase tracking-widest mb-1.5 font-semibold">{slot}</div>
                <ItemCard item={item} equipped />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Loading / Error */}
      {loading && (
        <div className="flex items-center justify-center py-16 gap-3 text-white/40">
          <div className="w-5 h-5 rounded-full border-2 border-white/20 border-t-[#4ecdc4] animate-spin" />
          Loading inventory…
        </div>
      )}
      {error && (
        <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm">
          ⚠️ {error}
        </div>
      )}

      {/* Category filter */}
      {!loading && !error && inventory.length > 0 && (
        <>
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={cn("px-3 py-1.5 rounded-full text-xs font-medium border transition-colors",
                  activeCategory === cat
                    ? "bg-white/10 border-white/20 text-white"
                    : "bg-transparent border-white/10 text-white/50 hover:border-white/25 hover:text-white"
                )}>
                {cat === "all" ? `All (${inventory.length})` : CATEGORY_LABELS[cat]}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {displayed.map((item, i) => (
              <ItemCard key={`${item.id}-${i}`} item={item}
                equipped={Object.values(equipped).some(e => e?.id === item.id)} />
            ))}
          </div>
        </>
      )}

      {!loading && !error && inventory.length === 0 && (
        <div className="text-center py-16 text-white/30 flex flex-col items-center gap-3">
          <Package className="w-10 h-10 opacity-40" />
          <p className="text-lg font-medium">Inventory is empty</p>
          <p className="text-sm">Go fight some dungeons and earn your gear!</p>
        </div>
      )}
    </div>
  );
}
