import { AlertTriangle, CheckCircle2 } from 'lucide-react';
import type { DailyRecord, IndicatorDefinition, Status } from '@/types/health';
import { INDICATORS } from '@/data/indicators';
import { getStatus, statusColor } from '@/utils/status';

interface AttentionItem {
  indicator: IndicatorDefinition;
  value: number;
  status: Status;
  message: string;
}

function buildItems(latest: DailyRecord, recentRecords: DailyRecord[]): AttentionItem[] {
  const items: AttentionItem[] = [];
  for (const indicator of INDICATORS) {
    const value = latest[indicator.key];
    const status = getStatus(indicator.key, value);
    if (status === 'normal') continue;

    const [nMin] = indicator.normalRange;
    const below = value < nMin;
    let streak = 0;
    for (let i = recentRecords.length - 1; i >= 0; i--) {
      const v = recentRecords[i][indicator.key];
      const wasBelow = v < nMin;
      if (wasBelow === below) streak++;
      else break;
    }
    const direction = below ? 'below' : 'above';
    const message = `Value ${direction} target for ${streak} day${streak === 1 ? '' : 's'}`;
    items.push({ indicator, value, status, message });
  }
  return items;
}

export default function AttentionPanel({
  latest,
  recentRecords,
}: {
  latest: DailyRecord;
  recentRecords: DailyRecord[];
}) {
  const items = buildItems(latest, recentRecords);

  return (
    <div className="flex h-full flex-col rounded-xl border border-space-border bg-space-surface p-6 transition-shadow duration-300 hover:shadow-glow-cyan">
      <div className="flex items-center gap-2">
        <AlertTriangle size={18} className="text-status-caution" />
        <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-muted">
          Needs Attention
        </h2>
      </div>

      {items.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 py-10 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-status-normal/10 text-status-normal ring-1 ring-status-normal/30">
            <CheckCircle2 size={24} />
          </div>
          <p className="text-sm font-medium text-status-normal">All indicators in range</p>
          <p className="max-w-[16rem] text-xs text-ink-muted">
            Every vital sign is inside its normal band. Keep up the routine.
          </p>
        </div>
      ) : (
        <ul className="mt-4 flex flex-1 flex-col gap-3">
          {items.map(({ indicator, value, status, message }) => (
            <li
              key={indicator.key}
              className="flex items-start gap-3 rounded-lg border border-space-border bg-space-bg/60 p-3"
            >
              <span
                className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: statusColor(status), boxShadow: `0 0 8px ${statusColor(status)}` }}
              />
              <div className="min-w-0">
                <p className="text-sm font-medium">
                  {indicator.label}
                  <span className="ml-2 text-ink-muted">
                    {value} {indicator.unit}
                  </span>
                </p>
                <p className="text-xs text-ink-muted">{message}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
