import { motion } from "framer-motion";

type Props = {
  analyses: any[];
};

function RecentAnalyses({ analyses }: Props) {
  return (
    <div className="bg-[#120620] border-2 border-cyan-400 p-6 relative overflow-hidden shadow-[0_0_20px_rgba(34,211,238,0.15)]">
      {/* Structural Accent Stripe */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-purple-600 to-pink-500" />

      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-xl md:text-2xl font-black italic tracking-tighter text-cyan-300 uppercase drop-shadow-[0_2px_4px_rgba(6,182,212,0.3)]">
          💾 ARCHIVED LOGS & DOSSIERS
        </h2>
        <span className="text-[10px] font-mono text-pink-500 font-bold border border-pink-500/30 px-2 py-0.5 bg-pink-950/20">
          TOTAL_RECORDS: {analyses.length}
        </span>
      </div>

      <div className="overflow-x-auto w-full border border-pink-500/20">
        <table className="w-full border-collapse font-mono text-xs text-left">
          <thead>
            <tr className="bg-[#1b0a2e] border-b-2 border-pink-500 text-pink-400 font-black tracking-wider uppercase">
              <th className="p-3 md:p-4 text-center">ID</th>
              <th className="p-3 md:p-4">VENTURE ASSET DESCRIPTION</th>
              <th className="p-3 md:p-4 text-center">SCORE</th>
              <th className="p-3 md:p-4">CORE DIRECTIVE</th>
              <th className="p-3 md:p-4 text-right">ACTION</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-pink-950/50">
            {analyses.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-pink-700/60 font-bold tracking-widest uppercase">
                  ⚡ NO ACTIVE DOSSIERS FOUND IN DATABASE ⚡
                </td>
              </tr>
            ) : (
              analyses.map((analysis, index) => (
                <motion.tr
                  key={analysis.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-cyan-950/20 group transition-colors odd:bg-[#150727]/40 even:bg-[#1b0a2e]/20"
                >
                  {/* ID Column */}
                  <td className="p-3 md:p-4 text-center text-pink-500 font-bold border-r border-pink-950/30">
                    #{analysis.id}
                  </td>

                  {/* Idea/Description */}
                  <td className="p-3 md:p-4 text-slate-200 font-sans max-w-xs md:max-w-md truncate group-hover:text-cyan-200 transition-colors">
                    {analysis.idea}
                  </td>

                  {/* Score Column with Dynamic Neon Intensity */}
                  <td className="p-3 md:p-4 text-center border-x border-pink-950/30">
                    <span className={`px-2 py-0.5 font-black italic rounded text-[11px] ${
                      (analysis.overall_score || 0) >= 70
                        ? "text-cyan-300 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]"
                        : (analysis.overall_score || 0) >= 40
                        ? "text-amber-400"
                        : "text-rose-500"
                    }`}>
                      {analysis.overall_score}
                    </span>
                  </td>

                  {/* Recommendation Directive */}
                  <td className="p-3 md:p-4 text-slate-400 font-medium truncate max-w-[150px] md:max-w-xs">
                    {analysis.recommendation}
                  </td>

                  {/* Report Export Button */}
                  <td className="p-3 md:p-4 text-right border-l border-pink-950/30">
                    <a
                      href={`http://127.0.0.1:8000/export-report/${analysis.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-[#1a0c2c] border border-cyan-500/40 hover:border-cyan-400 text-cyan-400 hover:text-black hover:bg-cyan-400 font-black px-3 py-1.5 text-[10px] tracking-wider uppercase skew-x-[-8deg] transition-all"
                    >
                      <span className="inline-block skew-x-[8deg]">GET_RAW_DATA</span>
                    </a>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-between items-center text-[9px] font-mono text-cyan-500/40 tracking-widest">
        <span>CONNECTED TO MAIN REGIONAL GRID</span>
        <span>SECURE SHIFT ENCRYPTED</span>
      </div>
    </div>
  );
}

export default RecentAnalyses;