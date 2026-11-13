import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { RegionId } from '@/data/bodyRegions';
import type { HazardId } from '@/data/hazards';
import { HAZARDS } from '@/data/hazards';
import { CREW_MEMBER, MOCK_RECORDS } from '@/data/mockRecords';
import HumanBody from '@/components/bodymap/HumanBody';
import RegionPanel from '@/components/bodymap/RegionPanel';

export default function BodyMap() {
  const [selected, setSelected] = useState<RegionId | null>(null);
  const [hazard, setHazard] = useState<HazardId | null>(null);

  const latest = MOCK_RECORDS[MOCK_RECORDS.length - 1];
  const activeHazard = HAZARDS.find((h) => h.id === hazard) ?? null;

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Body Map</h1>
        <p className="mt-1 text-sm text-ink-muted">
          Health status by body region for {CREW_MEMBER.name} · Mission Day {latest.missionDay}
        </p>
      </div>

      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setHazard(null)}
            className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
              hazard === null
                ? 'bg-accent text-space-bg'
                : 'border border-space-border bg-space-surface text-ink-muted hover:text-ink'
            }`}
          >
            All
          </button>
          {HAZARDS.map((h) => (
            <button
              key={h.id}
              type="button"
              onClick={() => setHazard(hazard === h.id ? null : h.id)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                hazard === h.id
                  ? 'text-space-bg'
                  : 'border border-space-border bg-space-surface text-ink-muted hover:text-ink'
              }`}
              style={hazard === h.id ? { backgroundColor: h.color } : undefined}
            >
              {h.label}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          {activeHazard && (
            <motion.p
              key={activeHazard.id}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="mt-3 text-sm text-ink-muted"
            >
              {activeHazard.description}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile: detail panel becomes a bottom sheet when a region is selected */}
      <div className="grid gap-6 lg:grid-cols-[55%_1fr]">
        <div className="order-1">
          <HumanBody
            latest={latest}
            selected={selected}
            onSelect={setSelected}
            activeHazard={hazard}
          />
        </div>

        <div className="order-2 hidden lg:block">
          <RegionPanel selected={selected} latest={latest} history={MOCK_RECORDS} />
        </div>
      </div>

      {/* Bottom sheet on mobile */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              className="fixed inset-0 z-30 bg-black/50 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
            />
            <motion.div
              className="fixed inset-x-0 bottom-0 z-40 max-h-[75vh] overflow-y-auto rounded-t-2xl border-t border-space-border bg-space-surface p-1 pb-24 lg:hidden"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            >
              <div className="sticky top-0 flex justify-center bg-space-surface py-2">
                <div className="h-1.5 w-12 rounded-full bg-space-border" />
              </div>
              <div className="p-4">
                <RegionPanel selected={selected} latest={latest} history={MOCK_RECORDS} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
