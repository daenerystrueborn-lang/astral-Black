import { useEffect, useState } from "react";

export function LoadingScreen() {
  const [phase, setPhase] = useState<"loading" | "done">("loading");

  useEffect(() => {
    const t = setTimeout(() => setPhase("done"), 1600);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black transition-opacity duration-700 ${
        phase === "done" ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* SVG clip mask — hidden, just needed for masking */}
      <svg
        width="0"
        height="0"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: "absolute" }}
      >
        <defs>
          <clipPath id="astral-clipping" clipPathUnits="userSpaceOnUse">
            <polygon points="50,10 80,25 80,75 50,90 20,75 20,25" />
            <polygon points="50,20 75,35 75,65 50,80 25,65 25,35" />
            <polygon points="50,15 78,30 78,70 50,85 22,70 22,30" />
            <polygon points="50,5 82,22 82,78 50,95 18,78 18,22" />
            <polygon points="50,25 72,40 72,60 50,75 28,60 28,40" />
            <polygon points="35,15 65,15 78,50 65,85 35,85 22,50" />
            <polygon points="40,10 60,10 75,50 60,90 40,90 25,50" />
          </clipPath>
        </defs>
      </svg>

      <div className="astral-orb-loader">
        <div className="orb-shell" />
        <div className="orb-fill" />
      </div>
    </div>
  );
}
