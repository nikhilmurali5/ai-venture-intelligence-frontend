import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import IdeaForm from "../components/IdeaForm";
import AnalysisResult from "../components/AnalysisResult";
import RecentAnalyses from "../components/RecentAnalyses";
import AnalysisChart from "../components/AnalysisChart";
import CompetitorSearch from "../components/CompetitorSearch";

export default function Dashboard() {
  const [latestAnalysis, setLatestAnalysis] = useState<any>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [showRecentAnalyses, setShowRecentAnalyses] = useState(false);
  const [analyses, setAnalyses] = useState<any[]>([]);

  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios.get(`${import.meta.env.VITE_API_URL}/my-analyses`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => setAnalyses(res.data))
    .catch((err) => console.error(err));
  }, []);

  // Click outside to close profile dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfile(false);
      }
    }
    if (showProfile) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showProfile]);

  return (
    <div className="relative min-h-screen bg-[#0d0614] text-pink-100 p-4 sm:p-6 md:p-10 overflow-x-hidden select-none font-sans selection:bg-cyan-500/40">

      {/* 80s Synthwave / Vice City Sunset Background Graphics */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#2a1147_1px,transparent_1px),linear-gradient(to_bottom,#2a1147_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:linear-gradient(to_bottom,rgba(0,0,0,1)_40%,rgba(0,0,0,0.1)_100%)] opacity-40" />

      {/* Neon Glow Radiants */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 -z-10 h-[500px] w-full max-w-[800px] rounded-full bg-gradient-to-b from-fuchsia-600/20 to-pink-600/0 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 -z-10 h-[350px] w-[350px] rounded-full bg-cyan-500/10 blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto z-10">

        {/* Vice City Style Header */}
        <header className="mb-8 md:mb-12 flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 border-b-4 border-cyan-400 pb-6 shadow-[0_4px_20px_rgba(34,211,238,0.2)]">
          <div className="text-left">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-black italic tracking-tighter uppercase bg-gradient-to-r from-pink-500 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_3px_3px_rgba(219,39,119,0.6)] break-words">
              VENTURE INTEL
            </h1>
            <p className="text-cyan-300 mt-1 text-xs sm:text-sm md:text-base font-bold uppercase tracking-widest drop-shadow-[0_2px_4px_rgba(6,182,212,0.4)]">
              // AI-Powered Startup Opportunity Engine
            </p>
          </div>

          {/* Retro Profile Dropdown */}
          <div className="relative align-middle self-start md:self-auto" ref={profileRef}>
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="w-full md:w-auto flex items-center justify-between gap-3 bg-pink-600 hover:bg-pink-500 border-2 border-fuchsia-300 text-white text-xs font-black uppercase tracking-wider px-5 py-3 skew-x-[-12deg] transition-all duration-150 active:scale-95 shadow-[0_0_15px_rgba(219,39,119,0.5)]"
            >
              <span className="inline-block skew-x-[12deg]">🌴 WORKSPACE</span>
              <svg className={`w-4 h-4 transition-transform duration-200 skew-x-[12deg] ${showProfile ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Neon Dropdown Menu */}
            <AnimatePresence>
              {showProfile && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scaleY: 0.8 }}
                  animate={{ opacity: 1, y: 0, scaleY: 1 }}
                  exit={{ opacity: 0, y: 10, scaleY: 0.8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 md:left-auto md:right-0 mt-4 w-64 bg-[#1a0b2e] border-2 border-pink-500 shadow-[0_0_30px_rgba(219,39,119,0.4)] z-50 origin-top overflow-hidden divide-y-2 divide-pink-900/60"
                >
                  <div className="px-4 py-3 bg-[#120522]">
                    <p className="text-[10px] font-black text-cyan-400 tracking-widest uppercase">OPERATOR</p>
                    <p className="text-xs font-bold text-pink-300 truncate mt-0.5">tommy.vercetti@oceanview.loc</p>
                  </div>
                  <div className="py-1 bg-[#1a0b2e]">
                    <button
                      onClick={() => {
                        setShowRecentAnalyses(true);
                        setShowProfile(false);
                      }}
                      className="w-full flex items-center gap-3 text-left px-4 py-3 hover:bg-cyan-400 hover:text-black text-pink-400 text-xs font-black uppercase tracking-wider transition-colors"
                    >
                       RECENT DOSSIERS
                    </button>
                  </div>
                  <div className="py-1 bg-[#1a0b2e]">
                    <button
                      onClick={() => {
                        localStorage.removeItem("token");
                        window.location.href = "/login";
                      }}
                      className="w-full flex items-center gap-3 text-left px-4 py-3 hover:bg-pink-600 hover:text-white text-rose-500 text-xs font-black uppercase tracking-wider transition-colors"
                    >
                       LEAVE EMPIRE
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </header>

        {/* Dashboard Dynamic Area */}
        <main>
          <AnimatePresence mode="wait">
            {showRecentAnalyses ? (
              <motion.div
                key="recent-analyses"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.2 }}
              >
                <div className="mb-6">
                  <button
                    onClick={() => setShowRecentAnalyses(false)}
                    className="inline-flex items-center gap-2 bg-slate-900 border-2 border-cyan-400 hover:bg-cyan-400 hover:text-black text-cyan-400 px-4 py-2 text-xs font-black uppercase tracking-wider skew-x-[-12deg] transition-all"
                  >
                    <span className="inline-block skew-x-[12deg]">⚡ RETURN TO CENTRAL HUB</span>
                  </button>
                </div>

                <div className="bg-[#150a24] border-2 border-cyan-400/80 p-4 sm:p-6 shadow-[0_0_25px_rgba(34,211,238,0.15)] overflow-x-auto">
                  <RecentAnalyses analyses={analyses} />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="dashboard-home"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.2 }}
                className="space-y-6 md:space-y-10"
              >
                {/* Main Input Form Retro Wrapper */}
                <div className="bg-[#140727] border-2 border-pink-500 p-4 sm:p-6 md:p-8 shadow-[0_0_30px_rgba(219,39,119,0.2)] relative before:absolute before:top-0 before:left-0 before:w-full before:h-1 before:bg-gradient-to-r before:from-pink-500 before:via-fuchsia-500 before:to-cyan-400">
                  <IdeaForm
                    onAnalysisComplete={(data) => {console.log("ANALYSIS DATA:", data);
                      setLatestAnalysis(data);
                    }}
                  />
                </div>

                {latestAnalysis && (
                  // FIXED GRID: Stack arrays sequentially on phones, use side-by-side matrices on large screens
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-start"
                  >
                    {/* AnalysisResult takes full screen horizontal row across grids cleanly */}
                    <div className="w-full lg:col-span-2 bg-[#140727] border-2 border-fuchsia-500 p-4 md:p-6 shadow-[0_0_20px_rgba(240,46,170,0.15)] overflow-hidden">
                      <AnalysisResult result={latestAnalysis} />
                    </div>

                    <div className="w-full bg-[#140727] border-2 border-cyan-400 p-4 md:p-6 shadow-[0_0_25px_rgba(34,211,238,0.15)] overflow-hidden">
                      <AnalysisChart result={latestAnalysis} />
                    </div>

                    <div className="w-full bg-[#140727] border-2 border-pink-500 p-4 md:p-6 shadow-[0_0_25px_rgba(219,39,119,0.15)] overflow-hidden">
                      <CompetitorSearch idea={latestAnalysis.idea} />
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}