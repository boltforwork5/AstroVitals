import { motion } from 'framer-motion';
import { statusColor } from '@/utils/status';
import { getScoreLabel } from '@/utils/score';

interface HealthScoreCardProps {
  score: number;
  weekDelta: number;
}

const RADIUS = 84;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function HealthScoreCard({ score, weekDelta }: HealthScoreCardProps) {
  const { label, status } = getScoreLabel(score);
  const color = statusColor(status);
  const deltaText = weekDelta >= 0 ? `+${weekDelta}` : `${weekDelta}`;

  return (
    <div className="flex h-full flex-col items-center justify-center rounded-xl border border-space-border bg-space-surface p-6 transition-shadow duration-300 hover:shadow-glow-cyan">
      <div className="relative h-52 w-52">
        <svg viewBox="0 0 200 200" className="h-full w-full -rotate-90">
          <circle cx="100" cy="100" r={RADIUS} fill="none" stroke="#1C2740" strokeWidth="14" />
          <motion.circle
            cx="100"
            cy="100"
            r={RADIUS}
            fill="none"
            stroke={color}
            strokeWidth="14"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            initial={{ strokeDashoffset: CIRCUMFERENCE }}
            animate={{ strokeDashoffset: CIRCUMFERENCE * (1 - score / 100) }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            style={{ filter: `drop-shadow(0 0 8px ${color}66)` }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className="text-5xl font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            {score}
          </motion.span>
          <span className="text-xs text-ink-muted">Health Score</span>
        </div>
      </div>

      <span
        className="mt-4 rounded-full px-3 py-1 text-sm font-semibold"
        style={{ color, backgroundColor: `${color}1A` }}
      >
        {label}
      </span>
      <p className="mt-2 text-xs text-ink-muted">
        vs last week:{' '}
        <span className={weekDelta >= 0 ? 'text-status-normal' : 'text-status-critical'}>
          {deltaText} points
        </span>
      </p>
    </div>
  );
}
