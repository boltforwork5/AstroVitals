import { Radio, Satellite } from 'lucide-react';
import { CREW_MEMBER } from '@/data/mockRecords';
import { MOCK_RECORDS } from '@/data/mockRecords';

export default function TopBar() {
  const missionDay = MOCK_RECORDS.length;
  const { missionLength } = CREW_MEMBER;

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-space-border bg-space-bg/80 px-4 py-3 backdrop-blur md:px-8">
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold">{CREW_MEMBER.name}</p>
        <p className="truncate text-xs text-ink-muted">{CREW_MEMBER.role}</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden text-right sm:block">
          <p className="text-sm font-medium">
            Mission Day {missionDay} / {missionLength}
          </p>
        </div>
        <div className="sm:hidden text-sm font-medium">
          MD {missionDay}/{missionLength}
        </div>

        <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
          <Satellite size={12} />
          ISS
        </span>

        <span className="hidden items-center gap-1.5 rounded-full border border-status-normal/30 bg-status-normal/10 px-3 py-1 text-xs font-medium text-status-normal sm:inline-flex">
          <Radio size={12} />
          Telemetry live
        </span>
      </div>
    </header>
  );
}
