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
    // Keep markers centered safely away from outer container borders (20% - 80%)
    const x = 20 + (Math.abs(Math.sin(hash + 1)) * 60);
    const y = 20 + (Math.abs(Math.cos(hash + index)) * 60);
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
    <div className="bg-[#120620] border-2 border-pink-500 p-6 relative overflow-hidden shadow-[0_0_20px_rgba(236,72,153,0.15)]">
      {/* Decorative accent graphic */}
      <div className="absolute top-0 right-0 w-32 h-1 bg-gradient-to-l from-cyan-400 to-transparent" />

      <h2 className="text-xl md:text-2xl font-black italic tracking-tighter text-pink-400 uppercase mb-4 drop-shadow-[0_2px_4px_rgba(236,72,153,0.3)]">
        🕵️ TARGET RECONNAISSANCE TRACKER
      </h2>

      {/* Control Input Row */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6 font-mono">
        <input
          type="text"
          placeholder="ENTER TARGET REGION / CITY..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="flex-1 p-3 rounded-none bg-[#1b0a2e] border-2 border-pink-500/40 text-cyan-300 placeholder-pink-800 font-bold text-xs focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_10px_rgba(34,211,238,0.3)] transition-all"
        />

        <div className="flex gap-2">
          <button
            onClick={findCompetitors}
            disabled={loading || !location.trim()}
            className="flex-1 sm:flex-none px-6 py-3 bg-pink-600 hover:bg-pink-500 disabled:bg-slate-900 border-2 border-fuchsia-300 text-white text-xs font-black uppercase tracking-wider skew-x-[-12deg] transition-all shadow-[0_0_12px_rgba(219,39,119,0.4)] active:scale-95"
          >
            <span className="inline-block skew-x-[12deg]">
              {loading ? "SCANNING SECTOR..." : "MAP COMPETITION"}
            </span>
          </button>

          {competitors.length > 0 && (
            <button
              onClick={() => setViewMode(viewMode === "list" ? "map" : "list")}
              className="px-4 bg-[#1b0a2e] border-2 border-cyan-400 text-cyan-400 font-black text-xs skew-x-[-12deg] hover:bg-cyan-400 hover:text-black transition-all"
            >
              <span className="inline-block skew-x-[12deg]">
                {viewMode === "list" ? "🗺️ RADAR HUD" : "📋 DOSSIER LIST"}
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Display Render Panels */}
      <div className="relative min-h-[380px]">
        <AnimatePresence mode="wait">

          {/* VIEW A: RETRO RADAR CANVAS SYSTEM */}
          {viewMode === "map" && competitors.length > 0 && (
            <motion.div
              key="map-canvas"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-[400px] bg-[#0c0416] border-2 border-dashed border-pink-500/30 relative overflow-hidden flex items-center justify-center p-4"
            >
              {/* GTA Style Vector Radar Grid Overlays */}
              <div className="absolute inset-0 bg-[radial-gradient(#ec4899_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />
              <div className="absolute top-1/2 left-0 w-full h-[1px] bg-pink-500/15 pointer-events-none" />
              <div className="absolute left-1/2 top-0 w-[1px] h-full bg-pink-500/15 pointer-events-none" />

              {/* Concentric Sonar Rings */}
              <div className="absolute w-80 h-80 rounded-full border border-pink-500/5 animate-ping pointer-events-none [animation-duration:4s]" />
              <div className="absolute w-[450px] h-[450px] rounded-full border border-cyan-500/10 pointer-events-none" />
              <div className="absolute w-[200px] h-[200px] rounded-full border border-pink-500/10 border-dashed pointer-events-none" />

              <div className="absolute bottom-3 left-4 font-mono text-[9px] text-cyan-400/50">
                RANGE_SCALE: 2.5KM // RANGE_FINDER_SYS
              </div>
              <div className="absolute top-3 right-4 font-mono text-[9px] text-pink-500/60 animate-pulse">
                🔴 RADAR LOCK: {location.toUpperCase()} SEC_08
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
                    {/* Pulsing targeting vector highlight ring */}
                    <span className={`absolute -inset-2.5 rounded-full border animate-ping pointer-events-none ${
                      isSelected ? "border-cyan-400 bg-cyan-500/10" : "border-pink-500/30 group-hover:border-cyan-400"
                    }`} />

                    {/* Core Terminal Blip Core Square */}
                    <div className={`w-3.5 h-3.5 rotate-45 transform border transition-all ${
                      isSelected
                        ? "bg-cyan-400 border-white shadow-[0_0_12px_#22d3ee]"
                        : "bg-pink-600 border-fuchsia-300 shadow-[0_0_8px_#db2777] group-hover:bg-cyan-500 group-hover:border-cyan-200"
                    }`} />

                    {/* Miniature Index Indicator Label */}
                    <span className="absolute left-5 -top-1 font-mono text-[9px] font-black tracking-wide text-slate-300 bg-[#120620] px-1 border border-pink-500/20 group-hover:text-cyan-300 whitespace-nowrap">
                      0{index + 1}
                    </span>
                  </button>
                );
              })}

              {/* POPUP SUB-WINDOW (GTA INTEL HUD INTERFACE) */}
              <AnimatePresence>
                {selectedBlip && (
                  <motion.div
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    className="absolute bottom-4 left-4 right-4 md:left-auto md:w-[380px] bg-[#170a24] border-2 border-cyan-400 p-4 shadow-2xl z-30 font-mono"
                  >
                    {/* Close window anchor */}
                    <button
                      onClick={() => setSelectedBlip(null)}
                      className="absolute top-2 right-3 text-pink-500 hover:text-white font-black text-xs"
                    >
                      [✖ CLOSE]
                    </button>

                    <div className="border-b border-cyan-500/20 pb-1.5 mb-2">
                      <div className="text-[8px] text-cyan-400/60 font-black">TARGET CRITICAL INTEL OVERLAY</div>
                      <h3 className="text-sm font-black text-cyan-300 uppercase tracking-wide">
                        💥 {selectedBlip.name}
                      </h3>
                    </div>

                    <p className="text-slate-300 text-[11px] font-sans leading-relaxed mb-3">
                      {selectedBlip.description}
                    </p>

                    <div className="space-y-1.5 text-[10px]">
                      <div className="p-2 bg-[#0e2124] border border-cyan-500/30">
                        <span className="font-black text-cyan-400 block mb-0.5">⚡ INTEL STRENGTH</span>
                        <span className="text-slate-200 font-sans">{selectedBlip.strength}</span>
                      </div>
                      <div className="p-2 bg-[#250e18] border border-rose-500/30">
                        <span className="font-black text-rose-400 block mb-0.5">⚠️ OPERATIONAL FLAW</span>
                        <span className="text-slate-200 font-sans">{selectedBlip.weakness}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* VIEW B: ORIGINAL GRID DOSSIER PROFILE LIST */}
          {viewMode === "list" && competitors.length > 0 && (
            <motion.div
              key="list-canvas"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4 font-mono text-xs"
            >
              {competitors.map((competitor: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-[#1b0a2e] border-2 border-cyan-500/20 p-4 relative hover:border-cyan-400 transition-all group"
                >
                  <div className="absolute top-0 left-0 w-2 h-2 bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="flex justify-between items-start border-b border-cyan-500/10 pb-2 mb-2">
                    <h3 className="text-sm md:text-base font-black text-cyan-300 tracking-tight uppercase">
                      💥 {competitor.name}
                    </h3>
                    <span className="text-[9px] text-pink-500/60 font-bold">PROFILE_0{index + 1}</span>
                  </div>

                  <p className="text-slate-300 leading-relaxed text-[11px] font-sans">
                    {competitor.description}
                  </p>

                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-2 border-t border-pink-950/40">
                    <div className="p-2 bg-[#0e2124] border border-cyan-500/20">
                      <span className="font-black text-cyan-400 uppercase tracking-wider block mb-0.5">⚡ INTEL STRENGTH</span>
                      <span className="text-slate-200">{competitor.strength}</span>
                    </div>

                    <div className="p-2 bg-[#250e18] border border-rose-500/20">
                      <span className="font-black text-rose-400 uppercase tracking-wider block mb-0.5">⚠️ OPERATIONAL FLAW</span>
                      <span className="text-slate-200">{competitor.weakness}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}