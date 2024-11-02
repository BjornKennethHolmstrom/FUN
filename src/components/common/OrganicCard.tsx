// src/components/common/OrganicCard.tsx
import { useEffect, useRef, useState } from 'react';

interface OrganicCardProps {
  type: 'movement' | 'campaigns' | 'projects' | 'resources';
  title: string;
  description: string;
  stage?: 'egg' | 'larvae' | 'pupa' | 'butterfly';
  progress?: number;
}

const stageColors = {
  egg: 'from-[#F8FAFC] to-[#E2E8F0]',
  larvae: 'from-[#2D6A4F] to-[#52B788]',
  pupa: 'from-[#92400E] to-[#D97706]',
  butterfly: 'from-[#40916C] to-[#48CAE4]',
};

export function OrganicCard({ type, title, description, stage = 'egg', progress = 0 }: OrganicCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const iconRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (isHovered && iconRef.current) {
      // Add dynamic animation based on type
      const element = iconRef.current;
      element.style.transform = 'scale(1.1)';
      element.style.transition = 'transform 0.5s var(--motion-organic)';
    }
  }, [isHovered, type]);

  return (
    <div
      className={`
        group relative overflow-hidden rounded-xl
        bg-gradient-to-br ${stageColors[stage]}
        p-6 shadow-lg transition-all duration-700
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Organic background pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute h-full w-full bg-white/10 transition-opacity duration-700 group-hover:opacity-20">
          <div className="h-full w-full animate-emerge opacity-50 blur-3xl">
            <div className={`h-full w-full rounded-full bg-current transition-all duration-700
              ${type === 'movement' ? 'bg-blue-400/20' : ''}
              ${type === 'campaigns' ? 'bg-green-400/20' : ''}
              ${type === 'projects' ? 'bg-yellow-400/20' : ''}
              ${type === 'resources' ? 'bg-purple-400/20' : ''}
            `} />
          </div>
        </div>
      </div>

      {/* Icon */}
      <div className="relative mb-4">
        <svg 
          ref={iconRef}
          className={`h-12 w-12 transition-all duration-700
            ${type === 'movement' ? 'text-blue-600' : ''}
            ${type === 'campaigns' ? 'text-green-600' : ''}
            ${type === 'projects' ? 'text-yellow-600' : ''}
            ${type === 'resources' ? 'text-purple-600' : ''}
          `}
        >
          <use href={`#${type}-icon`} />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <h3 className="mb-2 text-xl font-semibold text-gray-900">{title}</h3>
        <p className="text-gray-700">{description}</p>
      </div>

      {/* Progress indicator */}
      {progress > 0 && (
        <div className="absolute bottom-0 left-0 h-1 w-full bg-white/20">
          <div
            className="h-full bg-current transition-all duration-700"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* Growing border */}
      <div className="absolute inset-0 rounded-xl border border-current opacity-20 transition-all duration-700 group-hover:opacity-40" />
    </div>
  );
}

