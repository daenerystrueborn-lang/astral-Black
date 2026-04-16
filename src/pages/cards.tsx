import { useState } from "react";
import { Search, Star, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

const TIER_LABELS: Record<string, string> = {
  "1": "Common",
  "2": "Uncommon",
  "3": "Rare",
  "4": "Epic",
  "5": "Legendary",
};

const TIER_COLORS: Record<string, string> = {
  "1": "text-gray-400 border-gray-400/40",
  "2": "text-green-400 border-green-400/40",
  "3": "text-blue-400 border-blue-400/40",
  "4": "text-purple-400 border-purple-400/40",
  "5": "text-amber-400 border-amber-400/40",
};

const TIER_GLOW: Record<string, string> = {
  "1": "",
  "2": "group-hover:shadow-[0_0_20px_rgba(74,222,128,0.12)]",
  "3": "group-hover:shadow-[0_0_20px_rgba(96,165,250,0.12)]",
  "4": "group-hover:shadow-[0_0_20px_rgba(192,132,252,0.15)]",
  "5": "group-hover:shadow-[0_0_24px_rgba(251,191,36,0.18)]",
};

const TIER_PRICE: Record<string, string> = {
  "1": "100,000",
  "2": "350,000",
  "3": "900,000",
  "4": "2,000,000",
  "5": "5,000,000",
};

const CARDS = [
  { index: 1, title: "Kakeru Ryuen", tier: "2", origin: "Classroom of the Elite", image: "https://cdn.shoob.gg/images/cards/2/37faeb862822d804701c6ae39696caf0c0f6c589a5439f1224a324742800aa92.png", url: "https://shoob.gg/cards/info/69a5bd44bade113ae7cb18ba", cardMaker: "noelle_psd" },
  { index: 2, title: "Yue", tier: "4", origin: "Arifureta", image: "https://cdn.shoob.gg/images/cards/4/c2b97a29a818aaab9ef6f180d64ebd2df4d25285e63a0b9f9c7e47e464c1ebae.png", url: "https://shoob.gg/cards/info/69a5b90ebade113ae7cb1735", cardMaker: "noelle_psd" },
  { index: 3, title: "Riven", tier: "4", origin: "League of Legends", image: "https://cdn.shoob.gg/images/cards/4/9795edf5fd4ab4fb0c72d08ecc5fee170d06f4f9201d9eb04bb3a479ba670bd4.png", url: "https://shoob.gg/cards/info/69a5b8f7bade113ae7cb172d", cardMaker: "noelle_psd" },
  { index: 4, title: "Senna", tier: "4", origin: "League of Legends", image: "https://cdn.shoob.gg/images/cards/4/c622694772b7c724b52a3fa7a29e4dbc46e63c4acc25f0e460fd3ea0b773b137.png", url: "https://shoob.gg/cards/info/69a5b8f3bade113ae7cb1725", cardMaker: "noelle_psd" },
  { index: 5, title: "Tim Drake", tier: "5", origin: "DC Comics", image: "https://cdn.shoob.gg/images/cards/5/5940fe9dc0cb99500ad625d15c3857acd1cee1155931bfa1ab7aa978a56ef66f.png", url: "https://shoob.gg/cards/info/69a3fc923413962a17cec507", cardMaker: "sammyjax__" },
  { index: 6, title: "Nightwing", tier: "5", origin: "DC Comics", image: "https://cdn.shoob.gg/images/cards/5/31976a6e17d21d780510171a7ce1913f63ec56df0f2797e34e86bb2b357b4766.png", url: "https://shoob.gg/cards/info/69a3fc8f3413962a17cec4ff", cardMaker: "sammyjax__" },
  { index: 7, title: "Kiana Kaslana", tier: "5", origin: "Honkai Impact 3rd", image: "https://cdn.shoob.gg/images/cards/5/b7dbccb1383284194480d9cca55e6eed69768d53bcdcc0d0664f0ee8a4e449bb.png", url: "https://shoob.gg/cards/info/69a3fc8d3413962a17cec4f7", cardMaker: "sammyjax__" },
  { index: 8, title: "Burnice White", tier: "5", origin: "Zenless Zone Zero", image: "https://cdn.shoob.gg/images/cards/5/098d1de5d9fde501b7d2ead16c1926738a8fbf05bff8bf2fb15f0a30d194eae0.png", url: "https://shoob.gg/cards/info/69a3fc8a3413962a17cec4ef", cardMaker: "sammyjax__" },
  { index: 9, title: "Batman", tier: "5", origin: "DC Comics", image: "https://cdn.shoob.gg/images/cards/5/0d88e88a6953de41d9fe5c6139763ed2d6873760823d08248e1446755a0d0eec.png", url: "https://shoob.gg/cards/info/69a3fc883413962a17cec4e7", cardMaker: "sammyjax__" },
  { index: 10, title: "C.C.", tier: "1", origin: "Code Geass", image: "https://cdn.shoob.gg/images/cards/1/d4be356e8da7e8baf71d71e51671dc97794da28d33f4f4c2266633ce3723fe5d.png", url: "https://shoob.gg/cards/info/69a38180068f310078d1cfc6", cardMaker: "moong1ade" },
  { index: 11, title: "Toji Fushiguro", tier: "4", origin: "Jujutsu Kaisen", image: "https://cdn.shoob.gg/images/cards/4/7560c0697ae9cdbb58815ac6e4822210b75e6a9d61efc080aad180380db384e0.png", url: "https://shoob.gg/cards/info/69a38180068f310078d1cfc3", cardMaker: "kaiser123_" },
  { index: 12, title: "Dialyn", tier: "4", origin: "Zenless Zone Zero", image: "https://cdn.shoob.gg/images/cards/4/420fdffd5a548748e58d14c436468e897dfaef2a11b4d6caf0d57c66003a9f40.png", url: "https://shoob.gg/cards/info/69a38180068f310078d1cfc0", cardMaker: "regenensis" },
  { index: 13, title: "Lucia Elowen", tier: "4", origin: "Zenless Zone Zero", image: "https://cdn.shoob.gg/images/cards/4/9d0c6ee5f6d38f549c297e0473853594711361f00f3d0680d722e52adb49d3f5.png", url: "https://shoob.gg/cards/info/69a38180068f310078d1cfbd", cardMaker: "regenensis" },
  { index: 14, title: "Ellen Joe", tier: "4", origin: "Zenless Zone Zero", image: "https://cdn.shoob.gg/images/cards/4/09483b06600bf6fa4ee3483150e180e83cd4e24dde442efb023ffb1ff4019366.png", url: "https://shoob.gg/cards/info/69a38180068f310078d1cfba", cardMaker: "regenensis" },
  { index: 15, title: "Tsukishiro Yanagi", tier: "4", origin: "Zenless Zone Zero", image: "https://cdn.shoob.gg/images/cards/4/3c9bc017b840235cd47004a6bf83c7303b9f54a7a686556acb03b4df1d7852fe.png", url: "https://shoob.gg/cards/info/69a38180068f310078d1cfb7", cardMaker: "regenensis" },
  { index: 16, title: "Qingyi", tier: "4", origin: "Zenless Zone Zero", image: "https://cdn.shoob.gg/images/cards/4/ace884bc3d595a1a2ca6ab99f24ac55ab02ed3e4820f38832934061d7f4622a4.png", url: "https://shoob.gg/cards/info/69a38180068f310078d1cfb4", cardMaker: "regenensis" },
  { index: 17, title: "Jane Doe", tier: "4", origin: "Zenless Zone Zero", image: "https://cdn.shoob.gg/images/cards/4/7adce63572d476671a76ae0d411d564bc814f941ba6072e3f2081b0de95fb344.png", url: "https://shoob.gg/cards/info/69a38180068f310078d1cfb1", cardMaker: "regenensis" },
  { index: 18, title: "Koleda Belobog", tier: "4", origin: "Zenless Zone Zero", image: "https://cdn.shoob.gg/images/cards/4/ff12b30667ca04ffd6c0e5566bb7763dcf1f9816dba33d1b075f24da64a7e564.png", url: "https://shoob.gg/cards/info/69a38180068f310078d1cfae", cardMaker: "regenensis" },
  { index: 19, title: "Vivian Banshee", tier: "4", origin: "Zenless Zone Zero", image: "https://cdn.shoob.gg/images/cards/4/1427eeeb02fb120469cecef1f0b292e7d7f0e1f9a2a98d2a89b1ef3577427695.png", url: "https://shoob.gg/cards/info/69a38180068f310078d1cfab", cardMaker: "regenensis" },
  { index: 20, title: "Seed", tier: "4", origin: "Zenless Zone Zero", image: "https://cdn.shoob.gg/images/cards/4/4bfa13f28c40417c9d2818287ac7f94818c67ec5368f8d6c2a61b3cd836d6320.png", url: "https://shoob.gg/cards/info/69a38180068f310078d1cfa8", cardMaker: "regenensis" },
  { index: 21, title: "Anton Ivanov", tier: "4", origin: "Zenless Zone Zero", image: "https://cdn.shoob.gg/images/cards/4/aacf31052175bb9976eb2db44c9681610febd07fe2391c79317793d47c7254da.png", url: "https://shoob.gg/cards/info/69a38180068f310078d1cfa5", cardMaker: "regenensis" },
  { index: 22, title: "Übel", tier: "3", origin: "Sousou no Frieren", image: "https://cdn.shoob.gg/images/cards/3/4e41ee23bd6ba81efc41c3e60ee3dae24779624019b15acc4fd8d08c9eeab922.png", url: "https://shoob.gg/cards/info/69a38180068f310078d1cfa2", cardMaker: "regenensis" },
  { index: 23, title: "Yoshida", tier: "2", origin: "Higehiro", image: "https://cdn.shoob.gg/images/cards/2/f163ae7caa9173ce03f0a0fdf14064d089e35f28052cd74bc74e4e60988ce240.png", url: "https://shoob.gg/cards/info/69a38180068f310078d1cf9f", cardMaker: "moong1ade" },
  { index: 24, title: "Cthoni Andor", tier: "1", origin: "Gachiakuta", image: "https://cdn.shoob.gg/images/cards/1/c090c78b2c8081f5334a0cc1bb5ad76a3ba1db6fc56bdba13573285dfcf61f7c.png", url: "https://shoob.gg/cards/info/69a38180068f310078d1cf9c", cardMaker: "moong1ade" },
  { index: 25, title: "Remlin Tysark", tier: "1", origin: "Gachiakuta", image: "https://cdn.shoob.gg/images/cards/1/9cf4887299413fc78c085669b92993f53ba96d60d8ab615c8cbac99d29246251.png", url: "https://shoob.gg/cards/info/69a38180068f310078d1cf99", cardMaker: "moong1ade" },
  { index: 26, title: "Bro Santa", tier: "1", origin: "Gachiakuta", image: "https://cdn.shoob.gg/images/cards/1/744882fe7814ab41fa89ab3cabddfc04b95ebea4c4cdb74161bc72f6db01394a.png", url: "https://shoob.gg/cards/info/69a38180068f310078d1cf96", cardMaker: "moong1ade" },
  { index: 27, title: "Chiwa", tier: "1", origin: "Gachiakuta", image: "https://cdn.shoob.gg/images/cards/1/fbfc2cb86b58d24ccbca14e440e326b00bec45475e0ec931924728970de1ae98.png", url: "https://shoob.gg/cards/info/69a38180068f310078d1cf93", cardMaker: "moong1ade" },
  { index: 28, title: "Akiho Senomiya", tier: "1", origin: "Robotic;Notes", image: "https://cdn.shoob.gg/images/cards/1/53c3067e8f8987fdb526b658095c6fcc9044406167d714775ee5f6dde87cde4a.png", url: "https://shoob.gg/cards/info/69a38180068f310078d1cf90", cardMaker: "otakusenpa1" },
  { index: 29, title: "August Stilza", tier: "1", origin: "Gachiakuta", image: "https://cdn.shoob.gg/images/cards/1/68aa8dd150f783f60d2980bcb571e5ec8dc6c123e1151188df765401bb73b05d.png", url: "https://shoob.gg/cards/info/69a38180068f310078d1cf8d", cardMaker: "moong1ade" },
  { index: 30, title: "Airi", tier: "1", origin: "Robotic;Notes", image: "https://cdn.shoob.gg/images/cards/1/a6cdcb39d3d738a36c3958c23d4b04d1e325242497cb5d9f0da399def2aca773.png", url: "https://shoob.gg/cards/info/69a38180068f310078d1cf8a", cardMaker: "otakusenpa1" },
  { index: 31, title: "Dear Santa", tier: "1", origin: "Gachiakuta", image: "https://cdn.shoob.gg/images/cards/1/b0048476ac26db9e04cd628a94fdd37712304370d24b509604cb46f51d9c2452.png", url: "https://shoob.gg/cards/info/69a38180068f310078d1cf87", cardMaker: "moong1ade" },
  { index: 32, title: "Kaito Yashio", tier: "1", origin: "Robotic;Notes", image: "https://cdn.shoob.gg/images/cards/1/b58e410b471d6f0ec6f9b316a3a08d6dbe571cef38fb3c3e1c71a6d0a252757c.png", url: "https://shoob.gg/cards/info/69a38180068f310078d1cf84", cardMaker: "otakusenpa1" },
  { index: 33, title: "Subaru Hidaka", tier: "1", origin: "Robotic;Notes", image: "https://cdn.shoob.gg/images/cards/1/fcda112fcf670f4bb63bf6d67b3884146d0b360673203fc26160603c404fa9ac.png", url: "https://shoob.gg/cards/info/69a38180068f310078d1cf81", cardMaker: "otakusenpa1" },
  { index: 34, title: "Junna Daitoku", tier: "1", origin: "Robotic;Notes", image: "https://cdn.shoob.gg/images/cards/1/af59e7ddad6013c0462d726600b647a4afe011df51ced8dee3a87ce625dac7ac.png", url: "https://shoob.gg/cards/info/69a38180068f310078d1cf7e", cardMaker: "otakusenpa1" },
  { index: 35, title: "Frau Koujiro", tier: "1", origin: "Robotic;Notes", image: "https://cdn.shoob.gg/images/cards/1/2b504f8621b1e0009c187f6ae85379cbb7ae3582e0dd56de786f96bc8b0d0fe9.png", url: "https://shoob.gg/cards/info/69a38180068f310078d1cf7b", cardMaker: "otakusenpa1" },
  { index: 36, title: "Sakura Chitose O", tier: "2", origin: "Uma Musume: Pretty Derby", image: "https://cdn.shoob.gg/images/cards/2/7d1d4771bfd3503d4d7c92232aefde8b2ed3ad1ec528d6a4c8c26b8d8749419d.png", url: "https://shoob.gg/cards/info/69a38180068f310078d1cf78", cardMaker: "izumojeanne" },
  { index: 37, title: "Hairi Takahara", tier: "2", origin: "Summer Pockets", image: "https://cdn.shoob.gg/images/cards/2/44a29b5244045e264fb46869552d05b97243e92784e7d4b43f9637cf10e8cde3.png", url: "https://shoob.gg/cards/info/69a38180068f310078d1cf75", cardMaker: "voidbern" },
  { index: 38, title: "Shiroha Naruse", tier: "2", origin: "Summer Pockets", image: "https://cdn.shoob.gg/images/cards/2/d7e06a19ac453f83026a6c937f6ef0fd83a216f83f4411e7d8e359f03222fb85.png", url: "https://shoob.gg/cards/info/69a38180068f310078d1cf72", cardMaker: "voidbern" },
  { index: 39, title: "Umi Katou", tier: "2", origin: "Summer Pockets", image: "https://cdn.shoob.gg/images/cards/2/6fec81a417df64a15d848b1d0adf927152bc06e3c68629de1cf143bee0c25e19.png", url: "https://shoob.gg/cards/info/69a38180068f310078d1cf6f", cardMaker: "voidbern" },
  { index: 40, title: "Tsumugi Wenders", tier: "2", origin: "Summer Pockets", image: "https://cdn.shoob.gg/images/cards/2/a77e7b9a179d35a47a7e7f8c94cc6ce7fd29aba2403e727c450c15e19116e616.png", url: "https://shoob.gg/cards/info/69a38180068f310078d1cf6c", cardMaker: "voidbern" },
  { index: 41, title: "Kamome Kushima", tier: "2", origin: "Summer Pockets", image: "https://cdn.shoob.gg/images/cards/2/b92c5fd48e7f15ba67805d34b68a0675f67a3027aa6a29b4c5ddbd4832dec578.png", url: "https://shoob.gg/cards/info/69a38180068f310078d1cf69", cardMaker: "voidbern" },
  { index: 42, title: "Mokuba Kaiba", tier: "3", origin: "Yu-Gi-Oh!", image: "https://cdn.shoob.gg/images/cards/3/c3a436f584416d033bcd301759dcf53fbe93260e1ccb4dcbbee9cd46a5a04f47.png", url: "https://shoob.gg/cards/info/69a38180068f310078d1cf66", cardMaker: "iam_nemesix" },
  { index: 43, title: "Ao Sorakado", tier: "2", origin: "Summer Pockets", image: "https://cdn.shoob.gg/images/cards/2/51e343d20fe408c6d12574d9679ac174083e80826950425262569a216e599451.png", url: "https://shoob.gg/cards/info/69a38180068f310078d1cf63", cardMaker: "voidbern" },
  { index: 44, title: "Rize Kamishiro", tier: "3", origin: "Tokyo Ghoul", image: "https://cdn.shoob.gg/images/cards/3/371f384cf15cad501f14dacf700a87cf9e202a60b4e28276189ef4cc262fddb5.png", url: "https://shoob.gg/cards/info/69a38180068f310078d1cf60", cardMaker: "1600eternal" },
  { index: 45, title: "Durandal", tier: "3", origin: "Uma Musume: Pretty Derby", image: "https://cdn.shoob.gg/images/cards/3/fdcae1a559aa5f25107207a693fd7c1d52e99624a8a4b2d606892287d96e7603.png", url: "https://shoob.gg/cards/info/69a38180068f310078d1cf5d", cardMaker: "izumojeanne" },
  { index: 46, title: "Rei Ayanami", tier: "4", origin: "Neon Genesis Evangelion", image: "https://cdn.shoob.gg/images/cards/4/b1b55a295b2fa424e0ae0162b648eea0b090d9de68f5f665067b24c9891762bd.png", url: "https://shoob.gg/cards/info/69a38180068f310078d1cf5a", cardMaker: "kaiser123_" },
  { index: 47, title: "Rhein Kraft", tier: "3", origin: "Uma Musume: Pretty Derby", image: "https://cdn.shoob.gg/images/cards/3/116200eb0c42327b2dd878225340f9a9c94bf9e86d57538de8c0a40487eab8c6.png", url: "https://shoob.gg/cards/info/69a38180068f310078d1cf57", cardMaker: "izumojeanne" },
  { index: 48, title: "Wuxian Wei", tier: "4", origin: "Mo Dao Zu Shi", image: "https://cdn.shoob.gg/images/cards/4/39f03877fd23eaff24542e08005fd5524993d1f05328bbf69fcb5fe8698b44c9.png", url: "https://shoob.gg/cards/info/69a38180068f310078d1cf54", cardMaker: "kaiser123_" },
  { index: 49, title: "Hanuman", tier: "4", origin: "Ramayana", image: "https://cdn.shoob.gg/images/cards/4/ae79c63798fc089c26bc8385472875ae98e23f13d5b7a8188251c9c91eb7a129.png", url: "https://shoob.gg/cards/info/69a38180068f310078d1cf51", cardMaker: "kaiser123_" },
  { index: 50, title: "Regto", tier: "1", origin: "Gachiakuta", image: "https://cdn.shoob.gg/images/cards/1/ed78621c9926333783ad8c8b007600755f68eba468370e41e8f37f4a90c16348.png", url: "https://shoob.gg/cards/info/69a38180068f310078d1cf4e", cardMaker: "moong1ade" },
];

const FILTER_TIERS = ["All", "1", "2", "3", "4", "5"];

export default function Cards() {
  const [search, setSearch] = useState("");
  const [activeTier, setActiveTier] = useState("All");

  const filtered = CARDS.filter((c) => {
    const matchSearch =
      search.trim() === "" ||
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.origin.toLowerCase().includes(search.toLowerCase());
    const matchTier = activeTier === "All" || c.tier === activeTier;
    return matchSearch && matchTier;
  });

  return (
    <div className="flex flex-col gap-6">
      {/* Page header */}
      <div className="relative flex flex-col items-center text-center pt-4 pb-6 overflow-hidden">
        {/* Ghost background text */}
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
            CARDS
          </span>
        </div>
        <div className="relative z-10 flex flex-col items-center gap-3">
          <div className="badge-spark">
            Card Gallery
            <span className="spark" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold">Browse the Collection</h1>
          <p className="text-white/50 max-w-md text-sm">500+ anime &amp; game cards available in-bot. Collect, trade, and battle.</p>
        </div>
      </div>

      {/* Search + filter row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="relative flex-1 w-full sm:max-w-xs">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by name or series..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#0d0d0d] border border-white/10 rounded-full py-2.5 pl-10 pr-8 text-sm focus:outline-none focus:border-[#4ecdc4]/50 transition-colors text-white placeholder:text-white/30"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors text-xs"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Tier filter */}
      <div className="flex flex-wrap gap-2">
        {FILTER_TIERS.map((t) => (
          <button
            key={t}
            onClick={() => setActiveTier(t)}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium border transition-colors",
              activeTier === t
                ? "bg-white/10 border-white/20 text-white"
                : "bg-transparent border-white/10 text-white/60 hover:border-white/30 hover:text-white"
            )}
          >
            {t === "All" ? "All" : `T${t} — ${TIER_LABELS[t]}`}
          </button>
        ))}
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
        {filtered.map((card) => {
          const rarity = TIER_LABELS[card.tier] ?? "Common";
          const colorClass = TIER_COLORS[card.tier] ?? "text-gray-400 border-gray-400/40";
          const glowClass = TIER_GLOW[card.tier] ?? "";
          const price = TIER_PRICE[card.tier] ?? "100,000";
          return (
            <a
              key={card.index}
              href={card.url}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "group glass-panel flex flex-col overflow-hidden rounded-[14px] sm:rounded-[18px] cursor-pointer transition-all duration-300 hover:-translate-y-1",
                glowClass
              )}
            >
              {/* Card image */}
              <div className="relative w-full aspect-[3/4] overflow-hidden bg-[#0a0a0a]">
                <img
                  src={card.image}
                  alt={card.title}
                  className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Tier badge */}
                <div className={cn(
                  "absolute top-1.5 right-1.5 flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md border text-[9px] font-bold uppercase tracking-wider",
                  colorClass
                )}>
                  <Star className="w-2 h-2" />
                  {rarity}
                </div>
                {/* Glossy hover sheen */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/0 to-white/10 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500 mix-blend-overlay" />
              </div>

              {/* Card info */}
              <div className="p-2 sm:p-3 flex flex-col gap-0.5 flex-1">
                <h3 className="font-bold text-xs sm:text-sm leading-tight text-white">{card.title}</h3>
                <p className="text-[10px] text-white/40 leading-tight truncate">{card.origin}</p>
                <div className="mt-1.5 pt-1.5 border-t border-white/10 flex items-center justify-between">
                  <span className={cn("text-[11px] font-bold", TIER_COLORS[card.tier]?.split(" ")[0])}>
                    🪙 {price}
                  </span>
                  <ExternalLink className="w-3 h-3 text-white/20 group-hover:text-white/60 transition-colors" />
                </div>
              </div>
            </a>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-white/30">
          <p className="text-lg font-medium">No cards found</p>
          <p className="text-sm mt-1">Try adjusting your search or filter</p>
        </div>
      )}
    </div>
  );
}
