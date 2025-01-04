// src/types/auth.ts

// Signup form types
export type FormStep = 'basics' | 'interests' | 'journey' | 'confirm';

export interface SignupFormData {
  email: string;
  password: string;
  name: string;
  location: string;
  interests: string[];
  motivation: string;
  startingPath: 'personal' | 'community' | 'global';
  preferredLanguage: string;
  agreeToTerms: boolean;
  subscribeToUpdates: boolean;
}

// Login form types
export interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

// Shared types
export interface AuthResponse {
  user: {
    id: string;
    email: string;
    name: string;
    stage: string;
  };
  token: string;
}

// Path options for signup
export interface PathOption {
  id: 'personal' | 'community' | 'global';
  title: string;
  description: string;
}

export const SIGNUP_PATHS: PathOption[] = [
  {
    id: 'personal',
    title: 'Personal Growth',
    description: 'Focus on individual transformation and local impact'
  },
  {
    id: 'community',
    title: 'Community Builder',
    description: 'Connect and strengthen local networks'
  },
  {
    id: 'global',
    title: 'Global Catalyst',
    description: 'Work on international initiatives and connections'
  }
];

// Interest categories
export const INTEREST_CATEGORIES = [
  'Environmental Sustainability',
  'Social Justice',
  'Education',
  'Healthcare',
  'Technology',
  'Community Building',
  'Economic Justice',
  'Arts & Culture',
  'Democracy & Governance',
  'Peace & Conflict Resolution'
] as const;

export type InterestCategory = typeof INTEREST_CATEGORIES[number];

// Form validation types
export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

// API types
export interface SignupMutationInput {
  email: string;
  password: string;
  name: string;
  location?: string;
  interests: string[];
  motivation: string;
  startingPath: 'personal' | 'community' | 'global';
  preferredLanguage: string;
  subscribeToUpdates: boolean;
}

export interface LoginMutationInput {
  email: string;
  password: string;
}
