import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import type { IndicatorDefinition } from '@/types/health';
import { INDICATOR_INFO } from '@/data/indicatorInfo';
import { getStatus, statusColor } from '@/utils/status';
import type { LucideIcon } from 'lucide-react';

interface IndicatorModalProps {
  indicator: IndicatorDefinition | null;
  value: number | null;
  icon: LucideIcon;
  onClose: () => void;
}

function rangeText([min, max]: [number, number], unit: string): string {
  return `${min}–${max} ${unit}`;
}

export default function IndicatorModal({ indicator, value, icon: Icon, onClose }: IndicatorModalProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const info = indicator ? INDICATOR_INFO[indicator.key] : null;
  const status = indicator && value !== null ? getStatus(indicator.key, value) : null;
  const color = status ? statusColor(status) : '#22D3EE';

  return (
    <AnimatePresence>
      {indicator && info && value !== null && status && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${indicator.label} details`}
            className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-xl border border-space-border bg-space-surface p-6"
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-lg"
                  style={{ backgroundColor: `${color}1A`, color }}
                >
                  <Icon size={20} />
                </span>
                <div>
                  <h2 className="text-lg font-bold">{indicator.label}</h2>
                  <p className="text-sm" style={{ color }}>
                    {value} {indicator.unit} · {status.charAt(0).toUpperCase() + status.slice(1)}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="rounded-lg p-1.5 text-ink-muted transition-colors hover:bg-white/5 hover:text-ink"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-lg border border-space-border bg-space-bg/60 p-3">
                <p className="text-[11px] uppercase tracking-wide text-ink-muted">Normal range</p>
                <p className="mt-0.5 text-sm font-semibold text-status-normal">
                  {rangeText(indicator.normalRange, indicator.unit)}
                </p>
              </div>
              <div className="rounded-lg border border-space-border bg-space-bg/60 p-3">
                <p className="text-[11px] uppercase tracking-wide text-ink-muted">Caution range</p>
                <p className="mt-0.5 text-sm font-semibold text-status-caution">
                  {rangeText(indicator.cautionRange, indicator.unit)}
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-4">
              {(
                [
                  ['How to measure it', info.howToMeasure],
                  ['Why it matters in space', info.whyItMatters],
                  ['What can push it out of range', info.whatPushesOutOfRange],
                ] as const
              ).map(([heading, text]) => (
                <section key={heading}>
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-accent">
                    {heading}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-muted">{text}</p>
                </section>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
