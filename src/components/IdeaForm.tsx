import { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  onAnalysisComplete: (data: any) => void;
};

function IdeaForm({ onAnalysisComplete }: Props) {
  const [idea, setIdea] = useState("");
  const [loading, setLoading] = useState(false);

  const analyzeIdea = async () => {
    if (!idea) return;

    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      // Note: Kept your live Render URL production endpoint intact
      const response = await axios.post(
        "https://ai-venture-intelligence-backend.onrender.com/analyze-idea",
        { idea },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      onAnalysisComplete(response.data);

    } catch (error: any) {
      console.log("FULL ERROR:", error);

      if (error.response) {
        alert(
          `Status: ${error.response.status}\n\n` +
          JSON.stringify(error.response.data, null, 2)
        );
      } else {
        alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#120620] border-2 border-pink-500 p-4 sm:p-6 shadow-[0_0_20px_rgba(236,72,153,0.15)] relative overflow-hidden">
      {/* Decorative Corner Accents */}
      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-400" />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-400" />

      <AnimatePresence mode="wait">
        {!loading ? (
          <motion.div
            key="form-input"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black italic tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400 uppercase mb-4 drop-shadow-[0_2px_8px_rgba(34,211,238,0.3)] break-words pr-12">
              🌴 Initiate Market Scan
            </h2>

            {/* Changed from an input field to a robust responsive Textarea for multi-line support on mobile */}
            <div className="relative mt-2">
              <textarea
                rows={3}
                placeholder="Describe the asset or business venture..."
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                className="w-full p-4 pr-16 rounded-none bg-[#1b0a2e] border-2 border-pink-500/40 text-cyan-300 placeholder-pink-700/60 font-mono text-xs sm:text-sm focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(34,211,238,0.4)] transition-all resize-none block leading-relaxed"
              />
              <span className="absolute right-3 top-4 text-[10px] font-mono text-pink-500/40 select-none hidden sm:inline">
                [SYS_v1.0]
              </span>
            </div>

            <button
              onClick={analyzeIdea}
              disabled={loading || !idea.trim()}
              className="mt-4 sm:mt-6 w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:from-slate-800 disabled:to-slate-900 disabled:text-slate-600 disabled:border-slate-700 disabled:shadow-none text-black font-black uppercase tracking-widest text-xs skew-x-[-12deg] border-2 border-cyan-300 transition-all shadow-[0_0_15px_rgba(6,182,212,0.4)] active:scale-95"
            >
              <span className="inline-block skew-x-[12deg]">Run Analysis Engine</span>
            </button>
          </motion.div>
        ) : (
          /* Professional Responsive Retro Loading Layout */
          <motion.div
            key="form-loading"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="py-4 sm:py-6 flex flex-col items-center justify-center text-center font-mono overflow-hidden"
          >
            <motion.div
              animate={{
                textShadow: ["0 0 4px #ec4899", "0 0 15px #ec4899", "0 0 4px #ec4899"]
              }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="text-pink-500 text-base sm:text-lg md:text-xl font-black uppercase tracking-widest mb-2 px-2"
            >
              ⚡ OVERCLOCKING MAINFRAME ⚡
            </motion.div>

            <p className="text-[10px] sm:text-xs text-cyan-400 uppercase tracking-wider mb-6 animate-pulse max-w-sm px-4">
              Crunching numbers, mapping competitors, intercepting satellite feeds...
            </p>

            {/* Glowing Neon Loading Bar Graphic (Added explicit mobile safety sizing boundary padding) */}
            <div className="w-full max-w-xs sm:max-w-md h-4 bg-slate-950 border-2 border-cyan-400 p-0.5 shadow-[0_0_15px_rgba(34,211,238,0.3)] mx-4">
              <motion.div
                className="h-full bg-gradient-to-r from-pink-500 via-fuchsia-500 to-cyan-400"
                initial={{ width: "0%" }}
                animate={{
                  width: ["0%", "30%", "45%", "70%", "92%", "99%"],
                }}
                transition={{
                  duration: 6,
                  ease: "easeInOut",
                  times: [0, 0.1, 0.3, 0.6, 0.8, 1],
                  repeat: Infinity
                }}
              />
            </div>

            {/* Micro logs grid wraps neatly on mobile devices */}
            <div className="mt-5 flex flex-wrap justify-center gap-x-6 gap-y-2 text-[9px] sm:text-[10px] text-pink-500/60 uppercase px-2">
              <span>BUFF_SZ: 4096K</span>
              <span className="flex items-center gap-1">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                <span className="text-cyan-400">LIVE LINK</span>
              </span>
              <span>EST: ~4s</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default IdeaForm;