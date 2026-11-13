import type { IndicatorKey, Status } from '@/types/health';
import { INDICATOR_BY_KEY } from '@/data/indicators';

export function getStatus(key: IndicatorKey, value: number): Status {
  const { normalRange, cautionRange } = INDICATOR_BY_KEY[key];
  const [nMin, nMax] = normalRange;
  const [cMin, cMax] = cautionRange;
  if (nMin <= value && value <= nMax) return 'normal';
  if (cMin <= value && value <= cMax) return 'caution';
  return 'critical';
}

export function statusColor(status: Status): string {
  switch (status) {
    case 'normal':
      return '#22C55E';
    case 'caution':
      return '#F59E0B';
    case 'critical':
      return '#EF4444';
  }
}

export function statusTextClass(status: Status): string {
  switch (status) {
    case 'normal':
      return 'text-status-normal';
    case 'caution':
      return 'text-status-caution';
    case 'critical':
      return 'text-status-critical';
  }
}

export function statusBgClass(status: Status): string {
  switch (status) {
    case 'normal':
      return 'bg-status-normal';
    case 'caution':
      return 'bg-status-caution';
    case 'critical':
      return 'bg-status-critical';
  }
}
