import { ArrowDownRight, ArrowRight, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import type { DailyRecord, IndicatorDefinition } from '@/types/health';
import { getStatus, statusColor } from '@/utils/status';
import { getTrend, type Trend } from '@/utils/trend';
import type { LucideIcon } from 'lucide-react';
import Sparkline from './Sparkline';

interface IndicatorCardProps {
  indicator: IndicatorDefinition;
  latest: DailyRecord;
  history: DailyRecord[];
  icon: LucideIcon;
  index: number;
  onClick: () => void;
}

const TREND_META: Record<Trend['direction'], { icon: typeof ArrowRight; sign: string; cls: string }> = {
  up: { icon: ArrowUpRight, sign: '+', cls: 'text-status-caution' },
  down: { icon: ArrowDownRight, sign: '', cls: 'text-accent' },
  flat: { icon: ArrowRight, sign: '', cls: 'text-ink-muted' },
};

const STATUS_NAME = { normal: 'Normal', caution: 'Caution', critical: 'Critical' } as const;

export default function IndicatorCard({
  indicator,
  latest,
  history,
  icon: Icon,
  index,
  onClick,
}: IndicatorCardProps) {
  const value = latest[indicator.key];
  const status = getStatus(indicator.key, value);
  const color = statusColor(status);
  const trend = getTrend(history, indicator.key);
  const TrendIcon = TREND_META[trend.direction].icon;
  const percent = trend.direction === 'flat' ? '' : `${Math.abs(trend.percent).toFixed(1)}%`;
  const sign = trend.direction === 'down' ? '-' : TREND_META[trend.direction].sign;
  const sparkData = history.slice(-14).map((r) => ({ value: r[indicator.key] }));

  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4, ease: 'easeOut' }}
      whileHover={{ y: -2 }}
      className="group rounded-xl border border-space-border bg-space-surface p-4 text-left transition-shadow duration-300 hover:shadow-glow-cyan"
      style={{ borderLeft: `3px solid ${color}` }}
    >
      <div className="flex items-center justify-between">
        <span
          className="flex h-8 w-8 items-center justify-center rounded-lg"
          style={{ backgroundColor: `${color}1A`, color }}
        >
          <Icon size={16} />
        </span>
        <span
          className="rounded-full px-2 py-0.5 text-[11px] font-semibold"
          style={{ color, backgroundColor: `${color}1A` }}
        >
          {STATUS_NAME[status]}
        </span>
      </div>

      <p className="mt-3 text-xs font-medium uppercase tracking-wide text-ink-muted">
        {indicator.label}
      </p>
      <p className="mt-1 text-2xl font-bold">
        {value}
        <span className="ml-1 text-sm font-medium text-ink-muted">{indicator.unit}</span>
      </p>

      <div className="mt-2 flex items-center justify-between gap-2">
        <span className={`flex items-center gap-0.5 text-xs font-medium ${TREND_META[trend.direction].cls}`}>
          <TrendIcon size={13} />
          {percent ? `${sign}${percent}` : 'Stable'}
        </span>
        <div className="h-8 w-20">
          <Sparkline data={sparkData} color={color} />
        </div>
      </div>
    </motion.button>
  );
}
