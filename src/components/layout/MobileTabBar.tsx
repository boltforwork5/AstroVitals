import { NavLink } from 'react-router-dom';
import { MoreHorizontal } from 'lucide-react';
import { MOBILE_NAV_ITEMS, NAV_ITEMS } from './navItems';

export default function MobileTabBar() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 flex items-stretch justify-around border-t border-space-border bg-space-surface/95 backdrop-blur md:hidden">
      {MOBILE_NAV_ITEMS.map(({ path, label, icon: Icon }) => (
        <NavLink
          key={path}
          to={path}
          className={({ isActive }) =>
            `flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] font-medium transition-colors duration-200 ${
              isActive ? 'text-accent' : 'text-ink-muted'
            }`
          }
        >
          <Icon size={20} />
          {label}
        </NavLink>
      ))}
      <NavLink
        to={NAV_ITEMS[4].path}
        className="flex flex-1 flex-col items-center justify-center gap-1 py-2.5 text-[11px] font-medium text-ink-muted"
      >
        <MoreHorizontal size={20} />
        More
      </NavLink>
    </nav>
  );
}
