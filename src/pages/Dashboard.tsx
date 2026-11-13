import { useMemo, useState } from 'react';
import { HeartPulse, Activity, Droplet, Thermometer, Moon, Smile, Dumbbell, type LucideIcon } from 'lucide-react';
import type { IndicatorDefinition, IndicatorKey } from '@/types/health';
import { INDICATORS } from '@/data/indicators';
import { CREW_MEMBER, MOCK_RECORDS } from '@/data/mockRecords';
import { calculateHealthScore } from '@/utils/score';
import HealthScoreCard from '@/components/dashboard/HealthScoreCard';
import AttentionPanel from '@/components/dashboard/AttentionPanel';
import IndicatorCard from '@/components/dashboard/IndicatorCard';
import RadiationMiniCard from '@/components/dashboard/RadiationMiniCard';
import IndicatorModal from '@/components/IndicatorModal';

const CARD_ICONS: Record<IndicatorKey, LucideIcon> = {
  heartRate: HeartPulse,
  systolic: Activity,
  diastolic: Activity,
  glucose: Droplet,
  temperature: Thermometer,
  sleep: Moon,
  mood: Smile,
  exercise: Dumbbell,
};

const DATE_FORMAT = new Intl.DateTimeFormat('en-US', {
  weekday: 'long',
  month: 'long',
  day: 'numeric',
  timeZone: 'UTC',
});

export default function Dashboard() {
  const [selected, setSelected] = useState<IndicatorDefinition | null>(null);

  const records = MOCK_RECORDS;
  const latest = records[records.length - 1];
  const latestDate = DATE_FORMAT.format(new Date(`${latest.date}T00:00:00Z`));

  const score = useMemo(() => calculateHealthScore(latest), [latest]);
  const weekDelta = useMemo(() => {
    const week = records.slice(-8, -1);
    const prev = records.slice(-15, -8);
    const weekAvg = week.reduce((s, r) => s + calculateHealthScore(r), 0) / week.length;
    const prevAvg = prev.reduce((s, r) => s + calculateHealthScore(r), 0) / prev.length;
    return Math.round(weekAvg - prevAvg);
  }, [records]);

  const latestValue = selected ? latest[selected.key] : null;

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Good day, {CREW_MEMBER.name}</h1>
        <p className="mt-1 text-sm text-ink-muted">
          Mission Day {latest.missionDay} · {latestDate}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <HealthScoreCard score={score} weekDelta={weekDelta} />
        <AttentionPanel latest={latest} recentRecords={records.slice(-14)} />
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {INDICATORS.map((indicator, i) => (
          <IndicatorCard
            key={indicator.key}
            indicator={indicator}
            latest={latest}
            history={records}
            icon={CARD_ICONS[indicator.key]}
            index={i}
            onClick={() => setSelected(indicator)}
          />
        ))}
      </div>

      <div className="mt-6">
        <RadiationMiniCard records={records} />
      </div>

      <IndicatorModal
        indicator={selected}
        value={latestValue}
        icon={selected ? CARD_ICONS[selected.key] : Activity}
        onClose={() => setSelected(null)}
      />
    </div>
  );
}
