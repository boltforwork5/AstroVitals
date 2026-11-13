import type { IndicatorKey } from '@/types/health';
import type { HazardId } from './hazards';

// NOTE: the indicator-to-region mapping below is a simplified demo model;
// some links are indirect (e.g. blood pressure readings stand in for the
// fluid-pressure changes behind eye and heart effects).
export type RegionId = 'brain' | 'eyes' | 'heart' | 'immune' | 'gut' | 'bones' | 'muscles';

export interface BodyRegion {
  id: RegionId;
  name: string;
  relatedIndicators: IndicatorKey[];
  hazards: HazardId[];
  /** What the region does in plain language. */
  function: string;
  /** Why spaceflight affects it. */
  spaceEffect: string;
  warningSigns: string;
  /** Three short actionable tips. */
  whatToDo: [string, string, string];
}

export const BODY_REGIONS: BodyRegion[] = [
  {
    id: 'brain',
    name: 'Brain',
    relatedIndicators: ['sleep', 'mood'],
    hazards: ['isolation', 'radiation', 'closedEnvironment', 'gravity'],
    function:
      'The brain runs the whole mission: it controls movement, decisions, memory, and the body clock that tells every organ when to work. It also processes the constant stream of sensor data and procedures an astronaut handles every day.',
    spaceEffect:
      'Fluid that gravity normally holds in the legs drifts toward the head, raising pressure inside the skull. On top of that, seeing a sunrise every 90 minutes and the stress of isolation scramble the internal clock, so sleep and mood often suffer together.',
    warningSigns:
      'Trouble falling asleep, unusually low mood or irritability, headaches, and slower reaction times during critical tasks.',
    whatToDo: [
      'Stick to a strict sleep and light-exposure schedule',
      'Use the daily check-in to flag mood changes early',
      'Keep regular contact with family and the ground team',
    ],
  },
  {
    id: 'eyes',
    name: 'Eyes',
    relatedIndicators: ['systolic', 'diastolic', 'sleep'],
    hazards: ['gravity', 'closedEnvironment'],
    function:
      'The eyes turn light into the detailed vision needed for docking, repairs, and reading instrument panels — some of the most safety-critical work on the station.',
    spaceEffect:
      'The same headward fluid shift that puffs the face can also change the shape of the eye and the optic nerve, a condition called spaceflight-associated neuro-ocular syndrome (SANS). It can blur vision during the mission and sometimes for years after return.',
    warningSigns:
      'Blurred vision, difficulty focusing on close work, or needing longer to adjust between bright and dark areas.',
    whatToDo: [
      'Report any vision changes at the daily check-in right away',
      'Keep blood pressure in range through diet and exercise',
      'Run the prescribed onboard vision tests on schedule',
    ],
  },
  {
    id: 'heart',
    name: 'Heart',
    relatedIndicators: ['heartRate', 'systolic', 'diastolic'],
    hazards: ['gravity', 'radiation'],
    function:
      'The heart pumps blood to every organ, delivering oxygen and nutrients around the body day and night without a break.',
    spaceEffect:
      'In microgravity the heart no longer fights gravity, so it pumps with less effort and slowly loses conditioning, while fluids shift into the chest and change blood pressure. This cardiovascular deconditioning is why astronauts can feel faint when standing after landing.',
    warningSigns:
      'A resting heart rate that keeps creeping up, blood pressure drifting out of range, or unusual fatigue during light activity.',
    whatToDo: [
      'Complete the full daily cardio session',
      'Keep salt intake within the prescribed limits',
      'Watch the heart-rate trend, not just single readings',
    ],
  },
  {
    id: 'immune',
    name: 'Immune System',
    relatedIndicators: ['sleep', 'temperature', 'mood'],
    hazards: ['radiation', 'isolation', 'closedEnvironment'],
    function:
      'The immune system is the body’s defense network: it finds and fights infections while telling the difference between the body’s own cells and invaders.',
    spaceEffect:
      'Radiation, stress, and disrupted sleep can dysregulate the immune system, making it weaker against new bugs and more likely to misfire. Dormant viruses, like the one that causes cold sores, can reactivate during long missions.',
    warningSigns:
      'Cold sores or skin rashes appearing, low-grade temperature changes, slow recovery from minor illness, or swollen lymph areas.',
    whatToDo: [
      'Keep sleep on target — it powers immune recovery',
      'Follow hygiene protocols in the closed cabin',
      'Report fever or rash symptoms to medical immediately',
    ],
  },
  {
    id: 'gut',
    name: 'Gut',
    relatedIndicators: ['glucose'],
    hazards: ['closedEnvironment', 'distance', 'isolation'],
    function:
      'The digestive system breaks food into fuel and absorbs nutrients, while the gut microbiome living there influences immunity, mood, and metabolism.',
    spaceEffect:
      'Rations limit variety and freshness, and microgravity changes how food moves through the digestive tract. Altered metabolism and a less diverse microbiome can affect energy, glucose, and even mood.',
    warningSigns:
      'Digestive discomfort, appetite loss, glucose drifting out of range, or unintended weight change.',
    whatToDo: [
      'Eat the full prescribed menu, including fresh items when available',
      'Keep meal timing consistent with the mission schedule',
      'Flag persistent digestive issues at check-in',
    ],
  },
  {
    id: 'bones',
    name: 'Bones',
    relatedIndicators: ['exercise'],
    hazards: ['gravity', 'radiation'],
    function:
      'The skeleton is the body’s frame: it supports every movement, protects organs, and stores minerals the blood needs.',
    spaceEffect:
      'Without gravity, weight-bearing bones stop getting the loading that keeps them strong, and density can drop around 1% per month in areas like the spine and hips — like severe osteoporosis, but far faster. Recovery after the mission can take years.',
    warningSigns:
      'There is no direct pain until late — the real warning signs are the exercise trend, bone scans, and a higher risk of kidney stones.',
    whatToDo: [
      'Never skip the daily resistance training sessions',
      'Hit the full exercise minutes target, not the minimum',
      'Keep calcium and vitamin D intake on plan',
    ],
  },
  {
    id: 'muscles',
    name: 'Muscles',
    relatedIndicators: ['exercise', 'heartRate'],
    hazards: ['gravity', 'distance'],
    function:
      'Muscles move the body, stabilize joints, and burn energy; the heart is a muscle too, and it depends on regular workload to stay strong.',
    spaceEffect:
      'With nothing to push against, muscles get little load and slowly atrophy — the body effectively decides that strength is no longer needed. Without daily countermeasures, astronauts would struggle to walk after landing.',
    warningSigns:
      'Noticeable strength loss during workouts, muscle soreness that lingers, or exercise minutes trending down over days.',
    whatToDo: [
      'Split resistance and cardio across the daily schedule',
      'Increase load gradually as the training plan prescribes',
      'Use the trends view to catch declining exercise early',
    ],
  },
];
