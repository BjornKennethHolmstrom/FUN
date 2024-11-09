import React from 'react';

const AnimatedStageIcon = ({ type, className = '', isActive = false }) => {
  // Common animation classes for path elements
  const pathAnimation = "transition-all duration-1000";
  
  switch (type) {
    case 'egg':
      return (
        <svg className={`${className} transition-transform duration-700 ${isActive ? 'scale-110' : ''}`} viewBox="0 0 24 24">
          {/* Pulsing egg outline */}
          <ellipse 
            cx="12" cy="14" rx="8" ry="10" 
            className={`${pathAnimation} ${isActive ? 'stroke-emerald-500' : 'stroke-current'}`}
            fill="none" 
            strokeWidth="1.5"
            style={{
              animation: isActive ? 'eggPulse 2s ease-in-out infinite' : 'none'
            }}
          />
          {/* Flowing internal lines */}
          <path 
            d="M8 10 Q12 14 16 10" 
            className={`${pathAnimation} ${isActive ? 'stroke-emerald-400' : 'stroke-current'}`}
            fill="none" 
            strokeWidth="1.5" 
            opacity="0.6"
            style={{
              animation: isActive ? 'flowLines 3s ease-in-out infinite' : 'none'
            }}
          />
          <path 
            d="M8 12 Q12 16 16 12" 
            className={`${pathAnimation} ${isActive ? 'stroke-emerald-400' : 'stroke-current'}`}
            fill="none" 
            strokeWidth="1.5" 
            opacity="0.6"
            style={{
              animation: isActive ? 'flowLines 3s ease-in-out infinite 0.5s' : 'none'
            }}
          />
        </svg>
      );

    case 'larvae':
      return (
        <svg className={`${className} transition-transform duration-700 ${isActive ? 'scale-110' : ''}`} viewBox="0 0 24 24">
          {/* Undulating body */}
          <path 
            d="M4 12 Q8 8 12 12 Q16 16 20 12" 
            className={`${pathAnimation} ${isActive ? 'stroke-emerald-500' : 'stroke-current'}`}
            fill="none" 
            strokeWidth="1.5"
            style={{
              animation: isActive ? 'undulate 3s ease-in-out infinite' : 'none'
            }}
          />
          {/* Segments that move along the body */}
          {[6, 10, 14, 18].map((cx, i) => (
            <circle 
              key={cx}
              cx={cx} 
              cy="12" 
              r="1.5" 
              className={`${pathAnimation} ${isActive ? 'fill-emerald-500' : 'fill-current'}`}
              style={{
                animation: isActive ? `moveSegment 3s ease-in-out infinite ${i * 0.2}s` : 'none'
              }}
            />
          ))}
          {/* Antenna */}
          <path 
            d="M5 11.5 Q6 10 7 9" 
            className={`${pathAnimation} ${isActive ? 'stroke-emerald-400' : 'stroke-current'}`}
            fill="none" 
            strokeWidth="1.5"
            style={{
              animation: isActive ? 'antennaWave 2s ease-in-out infinite' : 'none'
            }}
          />
        </svg>
      );

    case 'pupa':
      return (
        <svg className={`${className} transition-transform duration-700 ${isActive ? 'scale-110' : ''}`} viewBox="0 0 24 24">
          {/* Hanging thread */}
          <path 
            d="M12 4 L12 6" 
            className={`${pathAnimation} ${isActive ? 'stroke-emerald-500' : 'stroke-current'}`}
            fill="none" 
            strokeWidth="1.5"
            style={{
              animation: isActive ? 'threadSway 2s ease-in-out infinite' : 'none'
            }}
          />
          {/* Chrysalis outline */}
          <path 
            d="M8 6 Q12 5 16 6 Q17 12 16 18 Q12 19 8 18 Q7 12 8 6Z" 
            className={`${pathAnimation} ${isActive ? 'stroke-emerald-500' : 'stroke-current'}`}
            fill="none" 
            strokeWidth="1.5"
            style={{
              animation: isActive ? 'chrysalisPulse 4s ease-in-out infinite' : 'none'
            }}
          />
          {/* Internal transformation lines */}
          {[9, 12, 15].map((y, i) => (
            <path 
              key={y}
              d={`M10 ${y} Q12 ${y + 1} 14 ${y}`} 
              className={`${pathAnimation} ${isActive ? 'stroke-emerald-400' : 'stroke-current'}`}
              fill="none" 
              strokeWidth="1.5" 
              opacity="0.6"
              style={{
                animation: isActive ? `transformLines 3s ease-in-out infinite ${i * 0.3}s` : 'none'
              }}
            />
          ))}
        </svg>
      );

    case 'butterfly':
      return (
        <svg className={`${className} transition-transform duration-700 ${isActive ? 'scale-110' : ''}`} viewBox="0 0 24 24">
          {/* Body */}
          <line 
            x1="12" y1="8" x2="12" y2="16" 
            className={`${pathAnimation} ${isActive ? 'stroke-emerald-500' : 'stroke-current'}`}
            strokeWidth="1.5"
          />
          {/* Wings */}
          <path 
            d="M12 12 Q8 8 4 12 Q8 16 12 12" 
            className={`${pathAnimation} ${isActive ? 'stroke-emerald-500' : 'stroke-current'}`}
            fill="none" 
            strokeWidth="1.5"
            style={{
              animation: isActive ? 'wingFlap 2s ease-in-out infinite' : 'none',
              transformOrigin: '12px 12px'
            }}
          />
          <path 
            d="M12 12 Q16 8 20 12 Q16 16 12 12" 
            className={`${pathAnimation} ${isActive ? 'stroke-emerald-500' : 'stroke-current'}`}
            fill="none" 
            strokeWidth="1.5"
            style={{
              animation: isActive ? 'wingFlap 2s ease-in-out infinite' : 'none',
              transformOrigin: '12px 12px'
            }}
          />
          {/* Antennae */}
          <path 
            d="M11 8 Q10 6 9 5" 
            className={`${pathAnimation} ${isActive ? 'stroke-emerald-400' : 'stroke-current'}`}
            fill="none" 
            strokeWidth="1.5"
            style={{
              animation: isActive ? 'antennaWave 2s ease-in-out infinite' : 'none'
            }}
          />
          <path 
            d="M13 8 Q14 6 15 5" 
            className={`${pathAnimation} ${isActive ? 'stroke-emerald-400' : 'stroke-current'}`}
            fill="none" 
            strokeWidth="1.5"
            style={{
              animation: isActive ? 'antennaWave 2s ease-in-out infinite 0.5s' : 'none'
            }}
          />
        </svg>
      );

    default:
      return null;
  }
};

export default AnimatedStageIcon;
