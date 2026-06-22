import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

type Props = {
  data: any[];
};

function ScoreChart({ data }: Props) {
  return (
    <div className="bg-[#120620] border-2 border-fuchsia-500 p-4 sm:p-6 relative overflow-hidden shadow-[0_0_20px_rgba(240,46,170,0.15)] mt-8 w-full">
      {/* Structural Accent Top Stripe */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-fuchsia-500 via-pink-500 to-cyan-400" />

      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <h2 className="text-xl md:text-2xl font-black italic tracking-tighter text-fuchsia-400 uppercase drop-shadow-[0_2px_4px_rgba(240,46,170,0.3)] break-words">
          📈 METRIC TRAJECTORY
        </h2>
        <span className="text-[9px] sm:text-[10px] font-mono text-cyan-400 font-bold border border-cyan-500/30 px-2 py-0.5 bg-cyan-950/20 self-start sm:self-auto">
          LIVE_FEED
        </span>
      </div>

      <div className="w-full font-mono text-[9px] sm:text-[10px] text-pink-400/80 select-none">
        {/* Adjusted height slightly on mobile to keep things compact and aesthetic */}
        <ResponsiveContainer width="100%" height={window.innerWidth < 640 ? 220 : 300}>
          <LineChart data={data} margin={{ top: 10, right: 15, left: -25, bottom: 5 }}>
            {/* Darker synthwave coordinate grid lines */}
            <CartesianGrid stroke="#2a1147" strokeDasharray="4 4" />

            {/* Horizon and Metric Axises */}
            <XAxis
              dataKey="id"
              tick={{ fill: '#22d3ee', fontWeight: 'bold', fontSize: 9 }}
              stroke="#2a1147"
              dy={5}
            />
            <YAxis
              tick={{ fill: '#ec4899', fontSize: 9 }}
              stroke="#2a1147"
              domain={[0, 100]}
              dx={5}
            />

            {/* Custom Terminal styled overlay */}
            <Tooltip
              contentStyle={{
                backgroundColor: '#1b0a2e',
                border: '2px solid #ec4899',
                borderRadius: '0px',
                color: '#fff',
                fontFamily: 'monospace',
                boxShadow: '0 0 15px rgba(236,72,153,0.3)',
                fontSize: '11px'
              }}
              itemStyle={{ color: '#22d3ee', fontWeight: 'bold' }}
              labelStyle={{ color: '#ec4899', fontWeight: 'black', marginBottom: '4px' }}
            />

            {/* Radiant Neon Hot Pink Line Data Vector */}
            <Line
              type="monotone"
              dataKey="score"
              stroke="#components-pink"
              strokeWidth={3}
              dot={{ fill: '#22d3ee', stroke: '#ec4899', strokeWidth: 2, r: 3.5 }}
              activeDot={{ r: 6, fill: '#fff', stroke: '#22d3ee', strokeWidth: 2 }}
              style={{
                filter: 'drop-shadow(0px 0px 6px #ec4899)'
              }}
              className="stroke-pink-500"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 pt-3 border-t border-pink-950/40 flex justify-between items-center text-[9px] font-mono text-pink-500/40 tracking-widest">
        <span>MATRIX VECTOR GENERATION ACTIVE</span>
        <span>SYS_EXEC_SUCCESS</span>
      </div>
    </div>
  );
}

export default ScoreChart;