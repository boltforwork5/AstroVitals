import type { IndicatorDefinition, IndicatorKey } from '@/types/health';

export const INDICATORS: IndicatorDefinition[] = [
  {
    key: 'heartRate',
    label: 'Heart Rate',
    unit: 'bpm',
    normalRange: [60, 100],
    cautionRange: [50, 110],
    icon: 'HeartPulse',
    description: 'Resting heart rate tracked from wearable telemetry.',
  },
  {
    key: 'systolic',
    label: 'Systolic BP',
    unit: 'mmHg',
    normalRange: [90, 120],
    cautionRange: [80, 140],
    icon: 'Activity',
    description: 'Upper blood pressure reading from the daily cuff check.',
  },
  {
    key: 'diastolic',
    label: 'Diastolic BP',
    unit: 'mmHg',
    normalRange: [60, 80],
    cautionRange: [50, 90],
    icon: 'Activity',
    description: 'Lower blood pressure reading from the daily cuff check.',
  },
  {
    key: 'glucose',
    label: 'Glucose',
    unit: 'mg/dL',
    normalRange: [70, 100],
    cautionRange: [60, 125],
    icon: 'Droplet',
    description: 'Fasting blood glucose from the continuous monitor.',
  },
  {
    key: 'temperature',
    label: 'Temperature',
    unit: '°C',
    normalRange: [36.1, 37.2],
    cautionRange: [35.5, 38.0],
    icon: 'Thermometer',
    description: 'Core body temperature estimated from skin sensors.',
  },
  {
    key: 'sleep',
    label: 'Sleep',
    unit: 'hours',
    normalRange: [7, 9],
    cautionRange: [5, 10],
    icon: 'Moon',
    description: 'Total sleep duration from the sleep-tracking headband.',
  },
  {
    key: 'mood',
    label: 'Mood',
    unit: 'score',
    normalRange: [3.5, 5],
    cautionRange: [2.5, 5],
    icon: 'Smile',
    description: 'Self-reported wellbeing score from the daily check-in.',
  },
  {
    key: 'exercise',
    label: 'Exercise',
    unit: 'minutes',
    normalRange: [120, 180],
    cautionRange: [60, 240],
    icon: 'Dumbbell',
    description: 'Minutes of resistance and cardio training completed.',
  },
];

export const INDICATOR_BY_KEY: Record<IndicatorKey, IndicatorDefinition> = Object.fromEntries(
  INDICATORS.map((i) => [i.key, i])
) as Record<IndicatorKey, IndicatorDefinition>;
