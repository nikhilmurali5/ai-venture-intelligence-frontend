import { motion } from "framer-motion";

type Props = {
  total: number;
  average: number;
  highest: number;
};

function StatsCards({ total, average, highest }: Props) {
  const cardData = [
    {
      title: "TOTAL SCANS RUN",
      value: total,
      borderColor: "border-pink-500",
      textColor: "text-pink-400",
      shadowGlow: "shadow-[0_0_15px_rgba(236,72,153,0.15)]",
      tag: "SYS_VOLUME"
    },
    {
      title: "AVERAGE VIABILITY",
      value: isNaN(average) ? 0 : Number(average).toFixed(1),
      borderColor: "border-cyan-400",
      textColor: "text-cyan-300",
      shadowGlow: "shadow-[0_0_15px_rgba(34,211,238,0.15)]",
      tag: "MEAN_INDEX"
    },
    {
      title: "HIGHEST SCORE RECORDED",
      value: highest,
      borderColor: "border-fuchsia-500",
      textColor: "text-fuchsia-400",
      shadowGlow: "shadow-[0_0_15px_rgba(240,46,170,0.15)]",
      tag: "MAX_YIELD"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8 font-mono w-full">
      {cardData.map((card, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.08, duration: 0.2 }}
          className={`bg-[#120620] border-2 ${card.borderColor} ${card.shadowGlow} p-4 sm:p-5 relative overflow-hidden group w-full ${
            index === 2 ? "sm:col-span-2 lg:col-span-1" : ""
          }`}
        >
          {/* Top internal decorative light streak */}
          <div className="absolute top-0 left-0 w-8 h-[2px] bg-white group-hover:w-full transition-all duration-300" />

          <div className="flex justify-between items-start mb-2 gap-2">
            <h3 className="text-slate-400 text-xs font-black tracking-wider uppercase truncate">
              {card.title}
            </h3>
            <span className="text-[9px] text-slate-600 font-bold tracking-tighter select-none shrink-0">
              [{card.tag}]
            </span>
          </div>

          <div className="flex items-baseline gap-2 mt-2 sm:mt-3">
            <p className={`text-3xl sm:text-4xl md:text-5xl font-black italic tracking-tighter ${card.textColor} drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]`}>
              {card.value}
            </p>
            {index > 0 && <span className="text-[10px] sm:text-xs text-slate-500 font-bold">PTS</span>}
          </div>

          {/* Bottom structural details row */}
          <div className="mt-4 pt-2 border-t border-slate-900/60 flex justify-between items-center text-[8px] text-slate-500 font-bold tracking-widest">
            <span>SECTOR_MATRIX_OK</span>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity text-cyan-400 flex items-center gap-1">
              <span className="inline-block w-1 h-1 rounded-full bg-cyan-400 animate-pulse" /> ACCESS_LIVE
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default StatsCards;