import type { DailyRecord, IndicatorKey, Status } from '@/types/health';
import { INDICATOR_BY_KEY } from '@/data/indicators';

const WEIGHTS: Record<IndicatorKey, number> = {
  sleep: 20,
  heartRate: 15,
  systolic: 10,
  diastolic: 10,
  glucose: 10,
  temperature: 10,
  mood: 15,
  exercise: 10,
};

export function scoreForIndicator(key: IndicatorKey, value: number): number {
  const { normalRange, cautionRange } = INDICATOR_BY_KEY[key];
  const [nMin, nMax] = normalRange;
  const [cMin, cMax] = cautionRange;

  if (value >= nMin && value <= nMax) return 100;

  if (value >= cMin && value <= cMax) {
    // Interpolate 100 at the normal edge down to 60 at the caution edge.
    if (value < nMin) {
      const progress = nMin === cMin ? 1 : (nMin - value) / (nMin - cMin);
      return 100 - 40 * progress;
    }
    const progress = cMax === nMax ? 1 : (value - nMax) / (cMax - nMax);
    return 100 - 40 * progress;
  }

  // Outside caution: fall from 60 to 20 across a distance equal to
  // half the caution span on that side, then clamp.
  const span = cMax - cMin;
  const reference = Math.max(span / 2, 1e-9);
  const dist = value < cMin ? cMin - value : value - cMax;
  const progress = Math.min(dist / reference, 1);
  return 60 - 40 * progress;
}

export function calculateHealthScore(record: DailyRecord): number {
  const keys = Object.keys(WEIGHTS) as IndicatorKey[];
  const totalWeight = keys.reduce((sum, k) => sum + WEIGHTS[k], 0);
  const weighted = keys.reduce(
    (sum, k) => sum + scoreForIndicator(k, record[k]) * WEIGHTS[k],
    0
  );
  return Math.round(weighted / totalWeight);
}

export function getScoreLabel(score: number): { label: string; status: Status } {
  if (score >= 85) return { label: 'Excellent', status: 'normal' };
  if (score >= 70) return { label: 'Good', status: 'normal' };
  if (score >= 50) return { label: 'Needs attention', status: 'caution' };
  return { label: 'Critical', status: 'critical' };
}
