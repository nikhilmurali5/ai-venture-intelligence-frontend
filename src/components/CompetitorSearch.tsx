import { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  idea: string;
};

export default function CompetitorSearch({ idea }: Props) {
  const [location, setLocation] = useState("");
  const [competitors, setCompetitors] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // State for Map view toggles & modal overlays
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [selectedBlip, setSelectedBlip] = useState<any | null>(null);

  // Helper utility to generate stable, aesthetic layout positions for the HUD map matrix
  const getDeterministicCoordinates = (name: string, index: number) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    // Mobile tweak: Narrowed safe marker zone (25% - 75%) to prevent markers touching phone screen borders
    const x = 25 + (Math.abs(Math.sin(hash + 1)) * 50);
    const y = 25 + (Math.abs(Math.cos(hash + index)) * 50);
    return { x: `${x}%`, y: `${y}%` };
  };

  const findCompetitors = async () => {
    if (!location) return;

    setLoading(true);
    setSelectedBlip(null);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/competitor-search`,
        { idea, location }
      );

      setCompetitors(response.data.competitors || []);
      // Auto switch focus view into tactical map mode once scan finishes
      if ((response.data.competitors || []).length > 0) {
        setViewMode("map");
      }
    } catch (error) {
      console.error(error);
      alert("ALERT: Signal jamming detected. Failed to map regional syndicates.");
    }

    setLoading(false);
  };

  return (
    <div className="bg-[#120620] border-2 border-pink-500 p-4 sm:p-6 relative overflow-hidden shadow-[0_0_20px_rgba(236,72,153,0.15)] w-full">
      {/* Decorative accent graphic */}
      <div className="absolute top-0 right-0 w-32 h-1 bg-gradient-to-l from-cyan-400 to-transparent" />

      <h2 className="text-xl md:text-2xl font-black italic tracking-tighter text-pink-400 uppercase mb-4 drop-shadow-[0_2px_4px_rgba(236,72,153,0.3)] break-words">
        🕵️ TARGET RECON TRACKER
      </h2>

      {/* Control Input Row */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6 font-mono">
        <input
          type="text"
          placeholder="ENTER TARGET REGION / CITY..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full sm:flex-1 p-3 rounded-none bg-[#1b0a2e] border-2 border-pink-500/40 text-cyan-300 placeholder-pink-800 font-bold text-xs focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_10px_rgba(34,211,238,0.3)] transition-all"
        />

        <div className="flex gap-2 w-full sm:w-auto">
          <button
            onClick={findCompetitors}
            disabled={loading || !location.trim()}
            className="flex-1 sm:flex-none px-4 sm:px-6 py-3 bg-pink-600 hover:bg-pink-500 disabled:bg-slate-900 border-2 border-fuchsia-300 text-white text-xs font-black uppercase tracking-wider skew-x-[-12deg] transition-all shadow-[0_0_12px_rgba(219,39,119,0.4)] active:scale-95"
          >
            <span className="inline-block skew-x-[12deg] whitespace-nowrap">
              {loading ? "SCANNING..." : "MAP COMPETITION"}
            </span>
          </button>

          {competitors.length > 0 && (
            <button
              onClick={() => setViewMode(viewMode === "list" ? "map" : "list")}
              className="px-3 sm:px-4 bg-[#1b0a2e] border-2 border-cyan-400 text-cyan-400 font-black text-xs skew-x-[-12deg] hover:bg-cyan-400 hover:text-black transition-all"
            >
              <span className="inline-block skew-x-[12deg] whitespace-nowrap">
                {viewMode === "list" ? "🗺️ HUD" : "📋 LIST"}
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Display Render Panels */}
      <div className="relative min-h-[380px] w-full">
        <AnimatePresence mode="wait">

          {/* VIEW A: RETRO RADAR CANVAS SYSTEM */}
          {viewMode === "map" && competitors.length > 0 && (
            <motion.div
              key="map-canvas"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-[380px] sm:h-[400px] bg-[#0c0416] border-2 border-dashed border-pink-500/30 relative overflow-hidden flex items-center justify-center p-4"
            >
              {/* GTA Style Vector Radar Grid Overlays */}
              <div className="absolute inset-0 bg-[radial-gradient(#ec4899_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />
              <div className="absolute top-1/2 left-0 w-full h-[1px] bg-pink-500/15 pointer-events-none" />
              <div className="absolute left-1/2 top-0 w-[1px] h-full bg-pink-500/15 pointer-events-none" />

              {/* Concentric Sonar Rings */}
              <div className="absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full border border-pink-500/5 animate-ping pointer-events-none [animation-duration:4s]" />
              <div className="absolute w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] rounded-full border border-cyan-500/10 pointer-events-none" />

              <div className="absolute bottom-3 left-3 font-mono text-[8px] sm:text-[9px] text-cyan-400/50">
                SCALE: 2.5KM
              </div>
              <div className="absolute top-3 right-3 font-mono text-[8px] sm:text-[9px] text-pink-500/60 animate-pulse truncate max-w-[180px]">
                🔴 LOCK: {location.toUpperCase()}
              </div>

              {/* Competitor Interactive Target Blips */}
              {competitors.map((competitor, index) => {
                const coord = getDeterministicCoordinates(competitor.name, index);
                const isSelected = selectedBlip?.name === competitor.name;

                return (
                  <button
                    key={index}
                    onClick={() => setSelectedBlip(competitor)}
                    style={{ left: coord.x, top: coord.y }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group"
                  >
                    <span className={`absolute -inset-2 rounded-full border animate-ping pointer-events-none ${
                      isSelected ? "border-cyan-400 bg-cyan-500/10" : "border-pink-500/30 group-hover:border-cyan-400"
                    }`} />

                    <div className={`w-3 h-3 rotate-45 transform border transition-all ${
                      isSelected
                        ? "bg-cyan-400 border-white shadow-[0_0_12px_#22d3ee]"
                        : "bg-pink-600 border-fuchsia-300 shadow-[0_0_8px_#db2777] group-hover:bg-cyan-500 group-hover:border-cyan-200"
                    }`} />

                    <span className="absolute left-4 -top-1.5 font-mono text-[8px] font-black tracking-wide text-slate-300 bg-[#120620] px-0.5 border border-pink-500/20 group-hover:text-cyan-300 whitespace-nowrap">
                      0{index + 1}
                    </span>
                  </button>
                );
              })}