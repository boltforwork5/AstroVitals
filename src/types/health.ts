export type IndicatorKey =
  | 'heartRate'
  | 'systolic'
  | 'diastolic'
  | 'glucose'
  | 'temperature'
  | 'sleep'
  | 'mood'
  | 'exercise';

export type Status = 'normal' | 'caution' | 'critical';

export type Range = [min: number, max: number];

export interface IndicatorDefinition {
  key: IndicatorKey;
  label: string;
  unit: string;
  normalRange: Range;
  cautionRange: Range;
  /** lucide-react icon name */
  icon: string;
  description: string;
}

export interface DailyRecord {
  date: string;
  missionDay: number;
  radiationDose: number;
  heartRate: number;
  systolic: number;
  diastolic: number;
  glucose: number;
  temperature: number;
  sleep: number;
  mood: number;
  exercise: number;
}

export interface CrewMember {
  name: string;
  role: string;
  missionLength: number;
}
