import type { DailyRecord, IndicatorKey, Status } from '@/types/health';
import { BODY_REGIONS, type BodyRegion, type RegionId } from '@/data/bodyRegions';
import { scoreForIndicator } from './score';
import { getStatus } from './status';

export interface RegionIndicatorStatus {
  key: IndicatorKey;
  value: number;
  status: Status;
}

export interface RegionStatusResult {
  score: number;
  status: Status;
  worstIndicator: IndicatorKey;
  indicators: RegionIndicatorStatus[];
}

export interface RegionView {
  region: BodyRegion;
  result: RegionStatusResult;
  dimmed: boolean;
}

export function getRegionStatus(regionId: RegionId, record: DailyRecord): RegionStatusResult {
  const region = BODY_REGIONS.find((r) => r.id === regionId);
  if (!region) throw new Error(`Unknown region: ${regionId}`);

  const scored = region.relatedIndicators.map((key) => ({
    key,
    score: scoreForIndicator(key, record[key]),
  }));
  const score = Math.round(scored.reduce((s, x) => s + x.score, 0) / scored.length);
  const worst = scored.reduce((a, b) => (a.score <= b.score ? a : b));
  const status: Status = score >= 80 ? 'normal' : score >= 55 ? 'caution' : 'critical';

  const indicators: RegionIndicatorStatus[] = region.relatedIndicators.map((key) => ({
    key,
    value: record[key],
    status: getStatus(key, record[key]),
  }));

  return { score, status, worstIndicator: worst.key, indicators };
}
