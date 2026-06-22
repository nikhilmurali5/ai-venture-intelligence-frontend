import { useEffect, useState } from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip
} from "recharts";

type Props = {
  result: any;
};

export default function AnalysisChart({ result }: Props) {
  // Dynamic screen monitoring state for scaling radar margins on mobile viewports
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkViewport = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  if (!result) return null;

  const data = [
    {
      metric: "MARKET CAP",
      score: result.market?.market_score || 0,
    },
    {
      metric: "PROFIT MARGIN",
      score: result.profitability?.profitability_score || 0,
    },
    {
      metric: "RISK EXPOSURE",
      score: result.risk?.risk_score || 0,
    },
    {
      metric: "TREND MOMENTUM",
      score: result.trend_forecast?.trend_score || 0,
    },
    {
      metric: "COMPETITION",
      score:
        result.competition?.competition_score ||
        result.competition?.competition_analysis?.competition_score ||
        0,
    },
  ];

  return (
    <div className="bg-[#120620] border-2 border-cyan-400 p-4 sm:p-6 relative overflow-hidden shadow-[0_0_20px_rgba(34,211,238,0.15)] w-full">
      {/* Visual Retro Header Accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-pink-500" />

      <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <h2 className="text-xl md:text-2xl font-black italic tracking-tighter text-cyan-300 uppercase drop-shadow-[0_2px_4px_rgba(6,182,212,0.3)] break-words">
          📊 TELEMETRY RADAR
        </h2>
        <span className="text-[9px] sm:text-[10px] font-mono text-pink-500 font-bold tracking-widest border border-pink-500/30 px-2 py-0.5 bg-pink-950/20 self-start sm:self-auto">
          GRID_MODE // ACTIVE
        </span>
      </div>

      {/* Responsive outer layout height wrapper */}
      <div className="h-[280px] sm:h-[350px] md:h-[400px] w-full font-mono text-xs select-none">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart
            cx="50%"
            cy="50%"
            // Crucial fix: Reduces the radius on mobile to give text labels side padding to exist safely
            outerRadius={isMobile ? "55%" : "75%"}
            data={data}
          >
            {/* Dark synthwave web grid lines */}
            <PolarGrid stroke="#f43f5e" strokeOpacity={0.25} />

            {/* Outer Metric Labels */}
            <PolarAngleAxis
              dataKey="metric"
              tick={{
                fill: '#22d3ee',
                fontWeight: 'bold',
                fontSize: isMobile ? 8 : 10, // Scales label down slightly on mobile screen layouts
                letterSpacing: '0.03em'
              }}
            />

            {/* Value Rings */}
            <PolarRadiusAxis
              angle={90}
              domain={[0, 100]}
              tick={{ fill: '#ec4899', fontSize: 8 }}
              axisLine={false}
              orientation="middle"
            />

            {/* Glowing Hot Pink Data Vector */}
            <Radar
              name="ASSET SCORE"
              dataKey="score"
              stroke="#ec4899"
              strokeWidth={3}
              fill="#f43f5e"
              fillOpacity={0.45}
            />

            {/* Arcade Terminal Style Tooltip */}
            <Tooltip
              contentStyle={{
                backgroundColor: '#1b0a2e',
                border: '2px solid #22d3ee',
                borderRadius: '0px',
                color: '#fff',
                fontFamily: 'monospace',
                boxShadow: '0 0 15px rgba(34,211,238,0.3)',
                fontSize: '11px'
              }}
              itemStyle={{ color: '#ec4899', fontWeight: 'bold' }}
              labelStyle={{ color: '#22d3ee', fontWeight: 'black', marginBottom: '4px' }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-2 pt-3 border-t border-pink-950/60 flex justify-between items-center text-[9px] sm:text-[10px] font-mono text-pink-400/60">
        <span>RADAR MATRIX SCAN V2.4</span>
        <span>SYS_OK</span>
      </div>
    </div>
  );
}