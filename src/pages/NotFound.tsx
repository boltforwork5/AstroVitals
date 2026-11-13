import { Link } from 'react-router-dom';
import { ArrowLeft, Satellite } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-status-caution/10 text-status-caution ring-1 ring-status-caution/30">
        <Satellite size={28} />
      </div>
      <h1 className="mt-6 text-3xl font-bold tracking-tight">Lost in space</h1>
      <p className="mt-2 text-sm text-ink-muted">This route does not exist on the mission plan.</p>
      <Link
        to="/dashboard"
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-space-bg transition-shadow duration-300 hover:shadow-glow-cyan"
      >
        <ArrowLeft size={16} />
        Back to Dashboard
      </Link>
    </div>
  );
}
