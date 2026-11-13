import { Line, LineChart, ResponsiveContainer, YAxis } from 'recharts';

interface SparklineProps {
  data: { value: number }[];
  color: string;
}

export default function Sparkline({ data, color }: SparklineProps) {
  return (
    <div className="h-10 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 4, bottom: 4, left: 0, right: 0 }}>
          <YAxis hide domain={['dataMin', 'dataMax']} />
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
