import React, { useState } from 'react';
import AnimatedStageIcon from './AnimatedStageIcon';

const StageProgress = ({ currentStage = 'egg', onStageClick }) => {
  const [hoveredStage, setHoveredStage] = useState(null);
  
  const stages = [
    {
      id: 'egg',
      label: 'Beginning',
      description: 'Carefully developing frameworks, structures, and digital tools. Like an egg containing all information for butterfly development, we build the foundation for future change.',
    },
    {
      id: 'larvae',
      label: 'Growing',
      description: 'Growing and gathering resources. Actively engaging members, testing ideas in practice, and building strong local networks.',
    },
    {
      id: 'pupa',
      label: 'Transforming',
      description: 'A period of deep transformation, implementing systems at scale and reorganizing societal structures for increased sustainability and justice.',
    },
    {
      id: 'butterfly',
      label: 'Emerging',
      description: 'The fully developed stage where our systems actively contribute to a flourishing society, just as the butterfly pollinates and spreads life.',
    }
  ];

  const getStageStatus = (stageId) => {
    const stageOrder = stages.findIndex(s => s.id === stageId);
    const currentOrder = stages.findIndex(s => s.id === currentStage);
    
    if (stageOrder < currentOrder) return 'completed';
    if (stageOrder === currentOrder) return 'current';
    return 'upcoming';
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="relative flex justify-between">
        {/* Connection Line */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-emerald-100 -z-10" />
        
        {/* Stages */}
        {stages.map((stage, index) => {
          const status = getStageStatus(stage.id);
          const isActive = hoveredStage === stage.id || status === 'current';
          
          return (
            <div 
              key={stage.id}
              className="relative flex flex-col items-center"
              onMouseEnter={() => setHoveredStage(stage.id)}
              onMouseLeave={() => setHoveredStage(null)}
              onClick={() => onStageClick?.(stage.id)}
            >
              {/* Stage Icon */}
              <div
                className={`
                  w-16 h-16 rounded-full flex items-center justify-center
                  transition-all duration-500 cursor-pointer
                  ${status === 'completed' ? 'bg-emerald-500 text-white' :
                    status === 'current' ? 'bg-emerald-400 text-white' :
                    'bg-gray-100 text-gray-400'}
                `}
              >
                <AnimatedStageIcon 
                  type={stage.id} 
                  className="w-8 h-8"
                  isActive={isActive}
                />
              </div>

              {/* Stage Label */}
              <div className="mt-4 text-center">
                <p className={`font-medium ${status === 'completed' || status === 'current' ? 'text-emerald-700' : 'text-gray-400'}`}>
                  {stage.label}
                </p>
              </div>

              {/* Hover Card */}
              {hoveredStage === stage.id && (
                <div className="absolute top-full mt-4 bg-white rounded-lg shadow-lg p-4 w-64 transform -translate-x-1/2 left-1/2 z-10">
                  <p className="text-sm text-gray-600">{stage.description}</p>
                </div>
              )}

              {/* Connection Line */}
              {index < stages.length - 1 && (
                <div className={`absolute h-1 w-8 -right-4 top-1/2 -translate-y-1/2
                  ${status === 'completed' ? 'bg-emerald-500' : 'bg-gray-300'}`} 
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StageProgress;
