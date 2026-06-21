import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  result: any;
};

// --- Creative Custom Layout Parsers for Markdown ---
const markdownRenderers = {
  // Convert standard markdown horizontal rules (---) into stylized system dividers
  hr: () => (
    <div className="my-6 border-b-2 border-dashed border-pink-500/20 relative">
      <span className="absolute right-0 -top-2 text-[8px] font-mono text-cyan-400 bg-[#1b0a2e] px-1.5 tracking-widest">
        [BREAK_SEGMENT]
      </span>
    </div>
  ),
  // Turn bold weights (**text**) into eye-catching neon badge wrappers
  strong: ({ children }: any) => (
    <span className="text-fuchsia-400 font-black tracking-wide bg-fuchsia-950/30 px-1.5 py-0.5 rounded border border-fuchsia-500/10 font-mono text-xs inline-block my-0.5">
      {children}
    </span>
  ),
  // Map secondary headings to prominent subsection modular banners
  h2: ({ children }: any) => (
    <div className="mt-6 mb-3 flex items-center gap-3 bg-[#170a24] border-l-4 border-cyan-400 p-2">
      <span className="text-[10px] text-pink-500 font-mono font-black">[SUB_SECTION]</span>
      <h4 className="text-xs font-mono font-black uppercase tracking-widest text-slate-100">{children}</h4>
    </div>
  ),
  // Map lists to use modern technical chevron points instead of browser defaults
  li: ({ children }: any) => (
    <li className="list-none flex items-start gap-2 text-slate-300 text-sm my-2 font-sans">
      <span className="text-cyan-400 font-mono mt-0.5 text-xs select-none">▷</span>
      <div className="leading-relaxed">{children}</div>
    </li>
  ),
  p: ({ children }: any) => (
    <p className="mb-4 text-slate-300 font-sans text-sm leading-relaxed text-justify">
      {children}
    </p>
  )
};

function AnalysisResult({ result }: Props) {
  const [activeTab, setActiveTab] = useState("overview");

  if (!result) return null;

  const tabs = [
    { id: "overview", label: "📋 DOSSIER OVERVIEW" },
    { id: "swot", label: "🎯 SWOT MATRIX" },
    { id: "business", label: "💼 STRATEGY PLAN" },
    { id: "pitch", label: "🎤 PITCH INTEL" },
    { id: "report", label: "🛡️ VIABILITY LOG" },
  ];

  return (
    <div className="bg-[#120620] border-2 border-fuchsia-500 p-6 shadow-[0_0_25px_rgba(240,46,170,0.15)] relative">
      {/* Absolute top decorative warning strip */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-400" />

      <h2 className="text-2xl md:text-4xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-fuchsia-400 uppercase mb-6 drop-shadow-[0_2px_6px_rgba(219,39,119,0.4)]">
        🌴 VENTURE INTELLIGENCE DOSSIER
      </h2>

      {/* Vice City Angled Navigation Tabs */}
      <div className="flex gap-2 mb-8 flex-wrap">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 text-xs font-black uppercase tracking-wider skew-x-[-10deg] transition-all duration-150 ${
                isActive
                  ? "bg-pink-600 text-white border border-fuchsia-300 shadow-[0_0_15px_rgba(219,39,119,0.6)]"
                  : "bg-[#1b0a2e] text-cyan-400 border border-cyan-500/30 hover:border-cyan-400 hover:bg-[#250f3e]"
              }`}
            >
              <span className="inline-block skew-x-[10deg]">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Dynamic Animated Content Grid Panels */}
      <div className="min-h-[250px]">
        <AnimatePresence mode="wait">
          {/* OVERVIEW PANEL */}
          {activeTab === "overview" && (
            <motion.div
              key="overview-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.18 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-sm"
            >
              <div className="bg-[#1b0a2e] border border-pink-500/30 p-4">
                <h3 className="text-cyan-400 font-black text-xs uppercase tracking-widest mb-1">// ASSET DESCRIPTION</h3>
                <p className="text-slate-200 leading-relaxed font-sans">{result.idea}</p>
              </div>

              <div className="bg-[#1b0a2e] border border-cyan-400/30 p-4 flex flex-col justify-center items-center text-center relative overflow-hidden">
                <div className="absolute -right-6 -bottom-6 text-cyan-500/5 font-black text-7xl italic pointer-events-none select-none">VIP</div>
                <h3 className="text-pink-500 font-black text-xs uppercase tracking-widest mb-1">// OVERALL VIABILITY SCORE</h3>
                <p className="text-5xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
                  {result.overall_score}<span className="text-lg text-cyan-600">/100</span>
                </p>
              </div>

              <div className="bg-[#1b0a2e] border border-pink-500/30 p-4 md:col-span-2">
                <h3 className="text-fuchsia-400 font-black text-xs uppercase tracking-widest mb-1">// COMMAND RECOMMENDATION</h3>
                <p className="text-amber-300 font-bold border-l-2 border-amber-400 pl-3 py-1 bg-amber-500/5 font-sans">{result.recommendation}</p>
              </div>
            </motion.div>
          )}

          {/* SWOT MATRIX PANEL */}
          {activeTab === "swot" && (
            <motion.div
              key="swot-tab"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs"
            >
              {/* STRENGTHS */}
              <div className="bg-[#1c0827] border-l-4 border-fuchsia-500 p-4 shadow-md shadow-black/30">
                <h3 className="font-black tracking-widest text-sm text-fuchsia-400 uppercase mb-3 flex items-center gap-2">
                  <span>▲</span> STRENGTHS
                </h3>
                <ul className="space-y-2 text-slate-300 font-medium font-sans">
                  {result.swot_analysis?.strengths?.map((item: string, index: number) => (
                    <li key={index} className="flex items-start gap-2"><span className="text-fuchsia-500 font-mono">▶</span> {item}</li>
                  ))}
                </ul>
              </div>

              {/* WEAKNESSES */}
              <div className="bg-[#241315] border-l-4 border-amber-500 p-4 shadow-md shadow-black/30">
                <h3 className="font-black tracking-widest text-sm text-amber-400 uppercase mb-3 flex items-center gap-2">
                  <span>▼</span> WEAKNESSES
                </h3>
                <ul className="space-y-2 text-slate-300 font-medium font-sans">
                  {result.swot_analysis?.weaknesses?.map((item: string, index: number) => (
                    <li key={index} className="flex items-start gap-2"><span className="text-amber-500 font-mono">▶</span> {item}</li>
                  ))}
                </ul>
              </div>

              {/* OPPORTUNITIES */}
              <div className="bg-[#0b1c24] border-l-4 border-cyan-400 p-4 shadow-md shadow-black/30">
                <h3 className="font-black tracking-widest text-sm text-cyan-400 uppercase mb-3 flex items-center gap-2">
                  <span>★</span> OPPORTUNITIES
                </h3>
                <ul className="space-y-2 text-slate-300 font-medium font-sans">
                  {result.swot_analysis?.opportunities?.map((item: string, index: number) => (
                    <li key={index} className="flex items-start gap-2"><span className="text-cyan-400 font-mono">▶</span> {item}</li>
                  ))}
                </ul>
              </div>

              {/* THREATS */}
              <div className="bg-[#250a14] border-l-4 border-rose-600 p-4 shadow-md shadow-black/30">
                <h3 className="font-black tracking-widest text-sm text-rose-500 uppercase mb-3 flex items-center gap-2">
                  <span>✖</span> THREATS
                </h3>
                <ul className="space-y-2 text-slate-300 font-medium font-sans">
                  {result.swot_analysis?.threats?.map((item: string, index: number) => (
                    <li key={index} className="flex items-start gap-2"><span className="text-rose-500 font-mono">▶</span> {item}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}

          {/* STRATEGY PLAN PANEL */}
          {activeTab === "business" && (
            <motion.div
              key="business-tab"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-[#1b0a2e] border border-pink-500/20 p-6 relative overflow-hidden"
            >
              <div className="absolute top-2 right-3 text-[9px] font-mono text-cyan-500/40 font-bold">// EXEC_STRAT_v2</div>
              <h3 className="text-xl font-black italic tracking-tight text-cyan-300 uppercase mb-6 font-mono border-b border-cyan-500/20 pb-2">
                // STRATEGIC EXECUTION PLAN
              </h3>
              <div className="max-w-none">
                <ReactMarkdown components={markdownRenderers}>
                  {result.business_plan}
                </ReactMarkdown>
              </div>
            </motion.div>
          )}

          {/* PITCH INTEL PANEL */}
          {activeTab === "pitch" && (
            <motion.div
              key="pitch-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-6 font-mono"
            >
              <div className="text-right text-[10px] text-pink-500/40 font-bold tracking-widest">// TARGET_DECK_PARSE: TRUE</div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {result.pitch_deck?.split(/Slide\s\d+:/gi).filter(Boolean).map((slideText: string, index: number) => {
                  const lines = slideText.trim().split("\n");
                  const slideTitle = lines[0] || `SLIDE COMPONENT 0${index + 1}`;
                  const slideContent = lines.slice(1).join("\n");

                  return (
                    <div
                      key={index}
                      className="bg-[#170a24] border border-pink-500/30 p-5 rounded-tr-3xl relative shadow-md hover:border-cyan-400 transition-all group"
                    >
                      <div className="absolute -top-2.5 -left-2.5 bg-gradient-to-r from-pink-500 to-fuchsia-600 text-white text-[9px] font-black px-2 py-0.5 tracking-wider">
                        SLIDE_0{index + 1}
                      </div>

                      <h4 className="text-cyan-300 font-black tracking-wide text-xs uppercase mb-4 border-b border-pink-950/60 pb-1 mt-1">
                        {slideTitle.replace(/[\*#]/g, '')}
                      </h4>

                      <div className="max-w-none text-xs text-slate-300 font-sans space-y-2 leading-relaxed">
                        <ReactMarkdown
                          components={{
                            li: ({ children }) => (
                              <li className="list-none flex items-start gap-1.5 my-1.5 text-slate-300">
                                <span className="text-pink-500 text-[10px] mt-0.5">⚡</span>
                                <div>{children}</div>
                              </li>
                            ),
                            strong: ({ children }) => <strong className="text-fuchsia-400 font-bold">{children}</strong>
                          }}
                        >
                          {slideContent}
                        </ReactMarkdown>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* VIABILITY LOG PANEL */}
          {activeTab === "report" && (
            <motion.div
              key="report-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-[#1b0a2e] border border-pink-500/20 p-6 relative"
            >
              <div className="absolute top-2 right-3 text-[9px] font-mono text-amber-500/40 font-bold">// CORE_METRIC_REPORT</div>
              <h3 className="text-xl font-black italic tracking-tight text-amber-400 uppercase mb-6 font-mono border-b border-amber-500/20 pb-2">
                // CORE VIABILITY REPORT LOG
              </h3>

              <div className="max-w-none mb-6">
                <ReactMarkdown components={markdownRenderers}>
                  {result.viability_report}
                </ReactMarkdown>
              </div>

              <div className="pt-4 border-t border-pink-950/40 font-mono">
                <a
                  href={`http://127.0.0.1:8000/export-report/${result.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-cyan-500 hover:bg-cyan-400 text-black font-black uppercase tracking-widest text-xs px-6 py-3.5 skew-x-[-12deg] border border-cyan-300 inline-block transition-all shadow-[0_0_15px_rgba(34,211,238,0.4)] active:scale-95"
                >
                  <span className="inline-block skew-x-[12deg]">💾 DOWNLOAD SECURE RAW FILE</span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default AnalysisResult;