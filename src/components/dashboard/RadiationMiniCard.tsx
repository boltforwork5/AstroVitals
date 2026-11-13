import { useNavigate } from 'react-router-dom';
import { ChevronRight, Radiation } from 'lucide-react';
import type { DailyRecord } from '@/types/health';

const MISSION_LIMIT_MSV = 250;

export default function RadiationMiniCard({ records }: { records: DailyRecord[] }) {
  const navigate = useNavigate();
  const total = records.reduce((s, r) => s + r.radiationDose, 0);
  const percent = Math.min((total / MISSION_LIMIT_MSV) * 100, 100);

  return (
    <button
      type="button"
      onClick={() => navigate('/radiation')}
      className="flex w-full items-center gap-4 rounded-xl border border-space-border bg-space-surface p-5 text-left transition-shadow duration-300 hover:shadow-glow-cyan"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
        <Radiation size={20} />
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <p className="text-sm font-medium">Cumulative Radiation Dose</p>
          <p className="text-lg font-bold">
            {total.toFixed(1)}
            <span className="ml-1 text-xs font-medium text-ink-muted">mSv</span>
          </p>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-space-border">
          <div
            className="h-full rounded-full bg-accent transition-all duration-500"
            style={{ width: `${percent}%` }}
          />
        </div>
        <p className="mt-1.5 text-[11px] text-ink-muted">
          {percent.toFixed(1)}% of {MISSION_LIMIT_MSV} mSv · Illustrative limit for demo
        </p>
      </div>

      <ChevronRight size={18} className="shrink-0 text-ink-muted" />
    </button>
  );
}
