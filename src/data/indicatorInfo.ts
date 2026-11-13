import type { IndicatorKey } from '@/types/health';

export interface IndicatorInfo {
  howToMeasure: string;
  whyItMatters: string;
  whatPushesOutOfRange: string;
}

export const INDICATOR_INFO: Record<IndicatorKey, IndicatorInfo> = {
  heartRate: {
    howToMeasure:
      'Measured by the chest-worn heart monitor, usually first thing in the morning before getting out of bed. A few days of readings give a much better picture than one single number.',
    whyItMatters:
      'In microgravity the heart does not have to pump against gravity, so it slowly works less hard and can lose some conditioning. A resting heart rate that creeps upward can be an early sign of fluid changes, stress, or losing fitness.',
    whatPushesOutOfRange:
      'Fluid shifting toward the head and chest, dehydration, fever, stress, missed exercise sessions, or poor sleep can all raise or lower resting heart rate.',
  },
  systolic: {
    howToMeasure:
      'Taken with an automated arm cuff during the daily medical check. The higher of the two blood pressure numbers, it reflects the pressure when the heart squeezes.',
    whyItMatters:
      'Without gravity pulling fluids down into the legs, more blood pools in the chest and head, and the body adjusts its blood pressure. Tracking the top number helps catch those changes before they cause dizziness or headaches.',
    whatPushesOutOfRange:
      'Headward fluid shifts, stress, a high-sodium diet, dehydration, or changes in the exercise schedule can push systolic pressure out of range.',
  },
  diastolic: {
    howToMeasure:
      'Recorded with the same arm cuff as the systolic reading. This lower number shows the pressure in the arteries while the heart rests between beats.',
    whyItMatters:
      'The resting pressure between heartbeats shows how well the blood vessels are coping with microgravity. A drifting lower number can flag circulation changes worth investigating early.',
    whatPushesOutOfRange:
      'Fluid redistribution, medication, inactivity, heat stress inside the station, or dehydration can move the diastolic reading out of range.',
  },
  glucose: {
    howToMeasure:
      'Sampled continuously by a small sensor on the upper arm, with calibration checks against fingerstick readings once a week.',
    whyItMatters:
      'Stable blood sugar keeps concentration and energy steady during demanding operations. Space food rations and altered meal schedules can quietly push glucose out of the healthy band.',
    whatPushesOutOfRange:
      'Skipped meals, high-carbohydrate ration choices, disrupted meal timing, stress hormones, and changes in muscle use all affect glucose levels.',
  },
  temperature: {
    howToMeasure:
      'Estimated from a skin sensor patch and compared against a forehead reading during the daily check-in. Core temperature is slightly lower on waking and higher later in the day.',
    whyItMatters:
      'In microgravity the body loses its ability to shed heat through convection, so even a mild fever matters more than it would on Earth. A rising trend is one of the first signs of infection.',
    whatPushesOutOfRange:
      'Infection, cabin temperature swings, hard exercise sessions close to measurement time, and dehydration can all shift the reading.',
  },
  sleep: {
    howToMeasure:
      'Tracked by a lightweight headband that records sleep stages, with a manual confirmation in the daily check-in. Total time asleep, not time in bed, is what counts here.',
    whyItMatters:
      'The station sees a sunrise and sunset every 90 minutes, which scrambles the body clock. Poor sleep weakens the immune system, slows reaction time, and compounds every other health risk on the mission.',
    whatPushesOutOfRange:
      'Disrupted day/night cycles, workload, noise, the excitement and stress of mission milestones, and a lack of natural darkness all shorten or fragment sleep.',
  },
  mood: {
    howToMeasure:
      'A short self-report in the daily check-in, from 1 (very poor) to 5 (excellent), supported by a brief journal entry when the score drops below 3.',
    whyItMatters:
      'Isolation, confinement, and being far from family weigh on the mind in ways that are just as real as physical risks. Mood shapes decision-making and crew cohesion, so it is monitored as seriously as any vital sign.',
    whatPushesOutOfRange:
      'Confinement, isolation from loved ones, monotony, sleep loss, interpersonal friction, and the pressure of high-stakes work can all wear mood down.',
  },
  exercise: {
    howToMeasure:
      'Logged automatically by the station exercise machines, combining resistance training and cardio, and checked against the prescribed daily program.',
    whyItMatters:
      'Without gravity, bones and muscles lose strength quickly because the body no longer needs to hold itself up. Daily exercise is the single most important countermeasure keeping the crew strong enough for return to Earth.',
    whatPushesOutOfRange:
      'A busy mission schedule, equipment maintenance downtime, fatigue, injury, or simply underestimating the daily target can cut exercise below the healthy band.',
  },
};
