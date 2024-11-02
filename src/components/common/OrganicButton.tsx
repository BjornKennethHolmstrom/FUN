// src/components/common/OrganicButton.tsx
interface OrganicButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'seed' | 'bloom' | 'butterfly';
  children: React.ReactNode;
}

export function OrganicButton({ variant = 'seed', children, className = '', ...props }: OrganicButtonProps) {
  return (
    <button
      className={`
        group relative overflow-hidden rounded-full px-8 py-3
        transition-all duration-500
        ${variant === 'seed' ? 'gradient-seed' : 'gradient-bloom'}
        ${className}
      `}
      {...props}
    >
      {/* Ripple effect container */}
      <div className="absolute inset-0 overflow-hidden rounded-full">
        <div className="absolute inset-0 transform transition-transform duration-700 group-hover:scale-105" />
      </div>

      {/* Content */}
      <span className="relative z-10 font-medium text-white transition-all duration-500">
        {children}
      </span>

      {/* Growing border effect */}
      <div className="absolute inset-0 rounded-full border border-white/20 transition-all duration-700 group-hover:border-white/40" />
    </button>
  );
}
