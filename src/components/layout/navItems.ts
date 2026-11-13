import {
  Activity,
  Brain,
  ClipboardCheck,
  Dumbbell,
  LayoutDashboard,
  MessageSquare,
  Radiation,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react';

export interface NavItem {
  path: string;
  label: string;
  icon: LucideIcon;
}

export const NAV_ITEMS: NavItem[] = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/body-map', label: 'Body Map', icon: Activity },
  { path: '/check-in', label: 'Check-in', icon: ClipboardCheck },
  { path: '/trends', label: 'Trends', icon: TrendingUp },
  { path: '/radiation', label: 'Radiation', icon: Radiation },
  { path: '/mind', label: 'Mind', icon: Brain },
  { path: '/training', label: 'Training', icon: Dumbbell },
  { path: '/assistant', label: 'Assistant', icon: MessageSquare },
];

/** Nav items shown in the mobile bottom tab bar (subset that fits). */
export const MOBILE_NAV_ITEMS = NAV_ITEMS.filter((item) =>
  ['Dashboard', 'Body Map', 'Check-in', 'Trends'].includes(item.label)
);
