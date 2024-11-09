// src/components/common/OrganicButton.tsx
import Link from 'next/link';

interface OrganicButtonProps {
  variant?: 'seed' | 'bloom' | 'butterfly';
  href?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function OrganicButton({ 
  variant = 'seed', 
  href, 
  children, 
  className = '',
  onClick
}: OrganicButtonProps) {
  const buttonClasses = `
    group relative overflow-hidden rounded-full px-8 py-3
    transition-all duration-500
    ${variant === 'seed' ? 'gradient-seed' : 'gradient-bloom'}
    ${className}
  `;

  // If href is provided, render as Link
  if (href) {
    return (
      <Link href={href} className={buttonClasses}>
        <span className="relative z-10 font-medium text-white transition-all duration-500">
          {children}
        </span>
        <div className="absolute inset-0 rounded-full border border-white/20 transition-all duration-700 group-hover:border-white/40" />
      </Link>
    );
  }

  // Otherwise render as button
  return (
    <button
      className={buttonClasses}
      onClick={onClick}
    >
      <span className="relative z-10 font-medium text-white transition-all duration-500">
        {children}
      </span>
      <div className="absolute inset-0 rounded-full border border-white/20 transition-all duration-700 group-hover:border-white/40" />
    </button>
  );
}
