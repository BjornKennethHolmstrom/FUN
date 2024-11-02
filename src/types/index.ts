// src/types/index.ts
export type CardType = 'movement' | 'campaigns' | 'projects' | 'resources';
export type StageType = 'egg' | 'larvae' | 'pupa' | 'butterfly';

export interface CardAction {
  type: CardType;
  title: string;
  description: string;
  stage: StageType;
  progress?: number;
}

// Update src/components/common/OrganicCard.tsx to use these types
import type { CardType, StageType } from '@/types';

interface OrganicCardProps {
  type: CardType;
  title: string;
  description: string;
  stage?: StageType;
  progress?: number;
}
