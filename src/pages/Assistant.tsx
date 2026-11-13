import { MessageSquare } from 'lucide-react';
import PlaceholderPage from './PlaceholderPage';

export default function Assistant() {
  return (
    <PlaceholderPage
      title="Assistant"
      description="Your AI health copilot for the mission arrives here."
      icon={MessageSquare}
    />
  );
}
