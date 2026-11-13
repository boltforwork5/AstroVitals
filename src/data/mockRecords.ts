import type { CrewMember, DailyRecord } from '@/types/health';

export const CREW_MEMBER: CrewMember = {
  name: 'Cdr. Alex Rivera',
  role: 'Commander / Flight Engineer',
  missionLength: 180,
};

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

// Deterministic seeded PRNG (LCG) so the dataset is stable between reloads.
function mulberry32(seed: number): () => number {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rand = mulberry32(47);

function noise(magnitude: number): number {
  return (rand() * 2 - 1) * magnitude;
}

export const MOCK_RECORDS: DailyRecord[] = Array.from({ length: 47 }, (_, i) => {
  const day = i + 1;
  const t = i / 46; // 0..1 progress through the window so far

  const sleep = clamp(7.8 - 1.1 * t + noise(0.45), 4.5, 9.5);
  const heartRate = clamp(68 + 7 * t + noise(3), 55, 95);
  const systolic = clamp(112 + 6 * t + noise(4), 85, 140);
  const diastolic = clamp(72 + 4 * t + noise(3), 55, 95);
  const glucose = clamp(88 - 6 * t + noise(5), 65, 125);
  const temperature = clamp(36.6 + 0.15 * t + noise(0.15), 35.8, 37.6);
  const mood = clamp(4.3 - 1.1 * t + noise(0.3), 2, 5);
  const exercise = clamp(155 - 35 * t + noise(20), 50, 210);
  const radiationDose = clamp(0.6 + noise(0.08), 0.4, 0.8);

  const startDate = new Date(Date.UTC(2026, 8, 28)); // mission day 1
  const date = new Date(startDate.getTime() + (day - 1) * 86_400_000);

  return {
    date: date.toISOString().slice(0, 10),
    missionDay: day,
    radiationDose: round(radiationDose, 2),
    heartRate: round(heartRate, 0),
    systolic: round(systolic, 0),
    diastolic: round(diastolic, 0),
    glucose: round(glucose, 0),
    temperature: round(temperature, 1),
    sleep: round(sleep, 1),
    mood: round(mood, 1),
    exercise: round(exercise, 0),
  };
});

function round(value: number, decimals: number): number {
  const f = 10 ** decimals;
  return Math.round(value * f) / f;
}
