import { motion } from 'framer-motion';
import { ArrowDownRight, ArrowRight, ArrowUpRight, Hand, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { RegionId } from '@/data/bodyRegions';
import { BODY_REGIONS } from '@/data/bodyRegions';
import { HAZARDS } from '@/data/hazards';
import { INDICATOR_BY_KEY } from '@/data/indicators';
import { getRegionStatus } from '@/utils/regionStatus';
import { statusColor, statusTextClass } from '@/utils/status';
import { getTrend } from '@/utils/trend';
import type { DailyRecord } from '@/types/health';

interface RegionPanelProps {
  selected: RegionId | null;
  latest: DailyRecord;
  history: DailyRecord[];
}

const SECTION_HEADINGS = [
  ['function', 'What it does'],
  ['spaceEffect', 'How space affects it'],
  ['warningSigns', 'Warning signs'],
] as const;

export default function RegionPanel({ selected, latest, history }: RegionPanelProps) {
  const navigate = useNavigate();
  const region = BODY_REGIONS.find((r) => r.id === selected) ?? null;

  if (!region) {
    return (
      <div className="flex min-h-[300px] flex-col items-center justify-center gap-4 rounded-xl border border-space-border bg-space-surface p-8 text-center md:min-h-[520px]">
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent ring-1 ring-accent/30"
        >
          <Hand size={22} />
        </motion.div>
        <p className="max-w-[15rem] text-sm text-ink-muted">
          Tap any part of the body to see its health status
        </p>
      </div>
    );
  }

  const result = getRegionStatus(region.id, latest);
  const color = statusColor(result.status);
  const hazardList = HAZARDS.filter((h) => region.hazards.includes(h.id));

  return (
    <motion.div
      key={region.id}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="rounded-xl border border-space-border bg-space-surface p-6"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold">{region.name}</h2>
            <span
              className="rounded-full px-2.5 py-0.5 text-xs font-semibold"
              style={{ color, backgroundColor: `${color}1A` }}
            >
              {result.status.charAt(0).toUpperCase() + result.status.slice(1)}
            </span>
          </div>
          <div className="mt-3 flex items-center gap-3">
            <div className="h-2 w-40 overflow-hidden rounded-full bg-space-border">
              <div className="h-full rounded-full" style={{ width: `${result.score}%`, backgroundColor: color }} />
            </div>
            <span className="text-sm font-semibold" style={{ color }}>{result.score}/100</span>
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {hazardList.map((h) => (
          <span
            key={h.id}
            className="rounded-full px-2.5 py-1 text-[11px] font-medium"
            style={{ color: h.color, backgroundColor: `${h.color}1A`, border: `1px solid ${h.color}40` }}
          >
            {h.label}
          </span>
        ))}
      </div>

      <div className="mt-5 rounded-lg border border-space-border bg-space-bg/60 p-4">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
          Related indicators
        </h3>
        <ul className="mt-3 space-y-2.5">
          {result.indicators.map(({ key, value, status }) => {
            const def = INDICATOR_BY_KEY[key];
            const trend = getTrend(history, key);
            const TrendIcon =
              trend.direction === 'up' ? ArrowUpRight : trend.direction === 'down' ? ArrowDownRight : ArrowRight;
            return (
              <li key={key} className="flex items-center justify-between gap-3 text-sm">
                <span className="flex items-center gap-2">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: statusColor(status), boxShadow: `0 0 6px ${statusColor(status)}` }}
                  />
                  {def.label}
                </span>
                <span className="flex items-center gap-2">
                  <span className={statusTextClass(status)}>
                    {value} {def.unit}
                  </span>
                  <span className={`flex items-center gap-0.5 text-xs ${trend.direction === 'flat' ? 'text-ink-muted' : 'text-ink'}`}>
                    <TrendIcon size={12} />
                    {trend.direction !== 'flat' && `${Math.abs(trend.percent).toFixed(1)}%`}
                  </span>
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-5 space-y-4">
        {SECTION_HEADINGS.map(([field, heading]) => (
          <section key={field}>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-accent">{heading}</h3>
            <p className="mt-1 text-sm leading-relaxed text-ink-muted">{region[field]}</p>
          </section>
        ))}
        <section>
          <h3 className="text-xs font-semibold uppercase tracking-wide text-accent">What you can do</h3>
          <ul className="mt-2 space-y-1.5">
            {region.whatToDo.map((tip) => (
              <li key={tip} className="flex items-start gap-2 text-sm text-ink-muted">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {tip}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <button
        type="button"
        onClick={() => navigate('/trends')}
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-space-bg transition-shadow duration-300 hover:shadow-glow-cyan"
      >
        <TrendingUp size={16} />
        View trends
      </button>
    </motion.div>
  );
}
