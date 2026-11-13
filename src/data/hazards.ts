export type HazardId = 'radiation' | 'isolation' | 'distance' | 'gravity' | 'closedEnvironment';

export interface Hazard {
  id: HazardId;
  label: string;
  description: string;
  color: string;
}

export const HAZARDS: Hazard[] = [
  {
    id: 'radiation',
    label: 'Space Radiation',
    description:
      'High-energy particles pass through tissue and can damage DNA, raising long-term cancer and tissue risks.',
    color: '#EF4444',
  },
  {
    id: 'isolation',
    label: 'Isolation and Confinement',
    description:
      'Living in a small space far from family and friends places lasting strain on mood, sleep, and crew cohesion.',
    color: '#F59E0B',
  },
  {
    id: 'distance',
    label: 'Distance from Earth',
    description:
      'Being far from home means delayed communication and no quick trip back for resupply or medical care.',
    color: '#22D3EE',
  },
  {
    id: 'gravity',
    label: 'Altered Gravity',
    description:
      'Microgravity removes the constant loading the body is built for, letting bones, muscles, and the heart slowly decondition.',
    color: '#22C55E',
  },
  {
    id: 'closedEnvironment',
    label: 'Hostile/Closed Environments',
    description:
      'A sealed cabin with recycled air, limited food variety, and shared space changes immunity, nutrition, and stress levels.',
    color: '#38BDF8',
  },
];
