// src/components/home/QuickActions.tsx
import { OrganicCard } from '../common/OrganicCard';
import Link from 'next/link';

const actions = [
  {
    type: 'movement' as const,  // Type assertion helps TypeScript understand valid values
    title: 'Join the Movement',
    description: 'Be part of the transformation.',
    stage: 'butterfly' as const,
    progress: 75,
    href: '/join'
  },
  {
    type: 'campaigns' as const,
    title: 'Active Campaigns',
    description: 'Unite for meaningful change.',
    stage: 'larvae' as const,
    progress: 45,
  },
  {
    type: 'projects' as const,
    title: 'Current Projects',
    description: 'From ideas to reality.',
    stage: 'pupa' as const,
    progress: 60,
  },
  {
    type: 'resources' as const,
    title: 'Knowledge Base',
    description: 'Grow and learn together.',
    stage: 'egg' as const,
    progress: 30,
  },
];

export default function QuickActions() {
  return (
    <div className="my-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {actions.map((action, index) => (
        <div key={action.type} className="animate-emerge" style={{ animationDelay: `${index * 150}ms` }}>
          {action.href ? (
            <Link href={action.href}>
              <OrganicCard {...action} />
            </Link>
          ) : (
            <OrganicCard {...action} />
          )}
        </div>
      ))}
    </div>
  );
}
