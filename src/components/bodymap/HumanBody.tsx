import { useState } from 'react';
import { motion } from 'framer-motion';
import type { DailyRecord } from '@/types/health';
import { BODY_REGIONS, type RegionId } from '@/data/bodyRegions';
import type { HazardId } from '@/data/hazards';
import { getRegionStatus } from '@/utils/regionStatus';
import { statusColor } from '@/utils/status';

interface HumanBodyProps {
  latest: DailyRecord;
  selected: RegionId | null;
  onSelect: (id: RegionId) => void;
  activeHazard: HazardId | null;
}

interface LabelAnchor {
  line: [number, number];
  text: [number, number];
  anchor: 'start' | 'end';
}

const LABELS: Record<RegionId, LabelAnchor> = {
  brain: { line: [136, 52], text: [18, 34], anchor: 'start' },
  eyes: { line: [172, 64], text: [236, 60], anchor: 'start' },
  heart: { line: [116, 196], text: [16, 192], anchor: 'start' },
  immune: { line: [162, 142], text: [236, 138], anchor: 'start' },
  gut: { line: [127, 285], text: [16, 281], anchor: 'start' },
  bones: { line: [180, 480], text: [236, 476], anchor: 'start' },
  muscles: { line: [190, 430], text: [236, 426], anchor: 'start' },
};

export default function HumanBody({ latest, selected, onSelect, activeHazard }: HumanBodyProps) {
  const [hovered, setHovered] = useState<RegionId | null>(null);
  const heartRate = latest.heartRate;
  const beatDuration = 60 / Math.min(Math.max(heartRate, 40), 140);

  const handleKey = (e: React.KeyboardEvent, id: RegionId) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect(id);
    }
  };

  return (
    <div className="relative">
      <svg
        viewBox="0 0 300 640"
        className="mx-auto h-auto w-full max-w-sm"
        style={{ filter: 'drop-shadow(0 0 12px rgba(34, 211, 238, 0.15))' }}
      >
        {/* Body outline */}
        <g fill="#0D1526" stroke="#26436B" strokeWidth={2.5}>
          <ellipse cx={150} cy={68} rx={36} ry={46} />
          <rect x={136} y={104} width={28} height={24} rx={9} />
          <path d="M 96 132 Q 150 118 204 132 L 206 250 Q 204 315 192 362 L 108 362 Q 96 315 94 250 Z" />
          <polyline points="92,145 74,250 70,345" fill="none" strokeWidth={28} strokeLinecap="round" />
          <polyline points="208,145 226,250 230,345" fill="none" strokeWidth={28} strokeLinecap="round" />
          <polyline points="128,368 122,495 126,614" fill="none" strokeWidth={38} strokeLinecap="round" />
          <polyline points="172,368 178,495 174,614" fill="none" strokeWidth={38} strokeLinecap="round" />
          <ellipse cx={116} cy={626} rx={22} ry={10} />
          <ellipse cx={184} cy={626} rx={22} ry={10} />
        </g>

        {/* Interactive regions */}
        {BODY_REGIONS.map((region) => {
          const result = getRegionStatus(region.id, latest);
          const color = statusColor(result.status);
          const dimmed = activeHazard !== null && !region.hazards.includes(activeHazard);
          const isHovered = hovered === region.id;
          const isSelected = selected === region.id;

          const shared = {
            tabIndex: 0,
            role: 'button' as const,
            'aria-label': `${region.name}, score ${result.score} out of 100`,
            onClick: () => onSelect(region.id),
            onKeyDown: (e: React.KeyboardEvent) => handleKey(e, region.id),
            onMouseEnter: () => setHovered(region.id),
            onMouseLeave: () => setHovered(null),
            style: { cursor: 'pointer' as const, opacity: dimmed ? 0.25 : 1 },
            className: 'focus:outline-none focus-visible:opacity-100',
          };

          return (
            <motion.g key={region.id} {...shared} data-region={region.id}>
              {/* soft pulsing halo for the selected region */}
              {isSelected && (
                <motion.circle
                  cx={region.id === 'bones' ? 150 : region.id === 'muscles' ? 150 : 150}
                  cy={region.id === 'brain' ? 58 : region.id === 'eyes' ? 64 : region.id === 'heart' ? 196 : region.id === 'immune' ? 142 : region.id === 'gut' ? 285 : region.id === 'bones' ? 300 : 420}
                  r={region.id === 'gut' ? 46 : 36}
                  fill="none"
                  stroke={color}
                  strokeWidth={2}
                  initial={{ opacity: 0.7, scale: 0.9 }}
                  animate={{ opacity: 0, scale: 1.35 }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
                  style={{ transformOrigin: 'center', transformBox: 'fill-box' }}
                />
              )}

              <RegionShapes
                region={region.id}
                color={color}
                isHovered={isHovered}
                isSelected={isSelected}
                beatDuration={beatDuration}
              />
            </motion.g>
          );
        })}

        {/* Floating labels with leader lines (hidden on small screens) */}
        {BODY_REGIONS.map((region) => {
            const result = getRegionStatus(region.id, latest);
            const color = statusColor(result.status);
            const dimmed = activeHazard !== null && !region.hazards.includes(activeHazard);
            const label = LABELS[region.id];
            return (
              <g key={`label-${region.id}`} className="hidden lg:block" opacity={dimmed ? 0.2 : 1}>
                <line
                  x1={label.line[0]}
                  y1={label.line[1]}
                  x2={label.text[0] + (label.anchor === 'start' ? 0 : 60)}
                  y2={label.text[1]}
                  stroke="#8A97B5"
                  strokeWidth={1}
                  strokeDasharray="3 3"
                />
                <circle cx={label.line[0]} cy={label.line[1]} r={2.5} fill={color} />
                <text
                  x={label.text[0]}
                  y={label.text[1] - 6}
                  fill="#E6ECF8"
                  fontSize={13}
                  fontWeight={600}
                >
                  {region.name}
                </text>
                <text x={label.text[0]} y={label.text[1] + 10} fill={color} fontSize={11}>
                  {result.score}
                </text>
              </g>
            );
          })}
      </svg>

      {/* Hover tooltip */}
      {hovered && (
        <div
          className="pointer-events-none absolute left-1/2 top-2 z-10 -translate-x-1/2 rounded-lg border border-space-border bg-space-surface px-3 py-1.5 text-xs font-medium shadow-glow-cyan"
        >
          {BODY_REGIONS.find((r) => r.id === hovered)?.name} · {getRegionStatus(hovered, latest).score}
        </div>
      )}
    </div>
  );
}

function RegionShapes({
  region,
  color,
  isHovered,
  isSelected,
  beatDuration,
}: {
  region: RegionId;
  color: string;
  isHovered: boolean;
  isSelected: boolean;
  beatDuration: number;
}) {
  const fill = `${color}40`; // ~25% opacity
  const stroke = color;
  const strokeWidth = isSelected ? 3 : isHovered ? 2.5 : 1.8;
  const glow = isHovered || isSelected ? { filter: `drop-shadow(0 0 6px ${color})` } : {};

  const shapeProps = {
    fill,
    stroke,
    strokeWidth,
    ...glow,
  };

  switch (region) {
    case 'brain':
      return <ellipse cx={150} cy={56} rx={25} ry={18} {...shapeProps} />;
    case 'eyes':
      return (
        <g {...shapeProps}>
          <ellipse cx={136} cy={64} rx={8} ry={5} />
          <ellipse cx={164} cy={64} rx={8} ry={5} />
        </g>
      );
    case 'heart':
      return (
        <motion.g
          animate={{ scale: [1, 1.07, 1] }}
          transition={{ duration: beatDuration, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '131px 196px' }}
        >
          <ellipse cx={131} cy={196} rx={17} ry={21} transform="rotate(-12 131 196)" {...shapeProps} />
        </motion.g>
      );
    case 'immune':
      return <ellipse cx={150} cy={142} rx={13} ry={11} {...shapeProps} />;
    case 'gut':
      return <ellipse cx={150} cy={285} rx={25} ry={27} {...shapeProps} />;
    case 'bones':
      return (
        <g {...shapeProps}>
          <rect x={146} y={150} width={8} height={205} rx={4} />
          <rect x={118} y={390} width={7} height={100} rx={3.5} />
          <rect x={175} y={390} width={7} height={100} rx={3.5} />
        </g>
      );
    case 'muscles':
      return (
        <g {...shapeProps}>
          <rect x={63} y={158} width={23} height={78} rx={11.5} />
          <rect x={214} y={158} width={23} height={78} rx={11.5} />
          <rect x={108} y={385} width={27} height={98} rx={13.5} />
          <rect x={165} y={385} width={27} height={98} rx={13.5} />
        </g>
      );
  }
}
