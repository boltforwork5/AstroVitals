import type { DailyRecord, IndicatorKey } from '@/types/health';

export interface Trend {
  direction: 'up' | 'down' | 'flat';
  percent: number;
}

/**
 * Compares the average of the last 3 records against the average of the
 * 7 records before that. Flat when the change is under 1.5%.
 */
export function getTrend(records: DailyRecord[], key: IndicatorKey): Trend {
  if (records.length < 4) return { direction: 'flat', percent: 0 };

  const recent = records.slice(-3);
  const previous = records.slice(-10, -3);

  const recentAvg = recent.reduce((s, r) => s + r[key], 0) / recent.length;
  if (previous.length === 0) return { direction: 'flat', percent: 0 };
  const previousAvg = previous.reduce((s, r) => s + r[key], 0) / previous.length;

  if (previousAvg === 0) return { direction: 'flat', percent: 0 };

  const percent = ((recentAvg - previousAvg) / previousAvg) * 100;
  if (Math.abs(percent) < 1.5) return { direction: 'flat', percent: 0 };
  return { direction: percent > 0 ? 'up' : 'down', percent };
}
