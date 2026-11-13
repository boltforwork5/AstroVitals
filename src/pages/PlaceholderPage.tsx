import type { LucideIcon } from 'lucide-react';

interface PlaceholderPageProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

export default function PlaceholderPage({ title, description, icon: Icon }: PlaceholderPageProps) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10 text-accent ring-1 ring-accent/30 transition-shadow duration-300 hover:shadow-glow-cyan">
        <Icon size={28} />
      </div>
      <h1 className="mt-6 text-2xl font-bold tracking-tight md:text-3xl">{title}</h1>
      <p className="mt-2 max-w-md text-sm text-ink-muted">{description}</p>
    </div>
  );
}
