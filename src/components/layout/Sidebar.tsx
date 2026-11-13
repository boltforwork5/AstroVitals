import { NavLink } from 'react-router-dom';
import { Rocket } from 'lucide-react';
import { NAV_ITEMS } from './navItems';

export default function Sidebar() {
  return (
    <aside className="hidden md:flex h-screen w-60 shrink-0 flex-col border-r border-space-border bg-space-surface/50">
      <div className="flex items-center gap-2.5 px-5 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/10 text-accent ring-1 ring-accent/30">
          <Rocket size={18} />
        </div>
        <span className="text-lg font-bold tracking-tight">AstroVitals</span>
      </div>

      <nav className="mt-2 flex flex-1 flex-col gap-1 px-3">
        {NAV_ITEMS.map(({ path, label, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors duration-200 ${
                isActive
                  ? 'bg-accent/10 text-accent'
                  : 'text-ink-muted hover:bg-white/5 hover:text-ink'
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="px-5 py-4 text-xs text-ink-muted">Mission telemetry v0.1</div>
    </aside>
  );
}
