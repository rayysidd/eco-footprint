import React from 'react';
import { motion } from 'framer-motion';

const ProgressBar = ({ 
  progress, 
  height = 'h-2.5', 
  variant = 'default',
  animated = true,
  showGlow = false,
  className = '' 
}) => {
  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  // Variant styles for grey, white, green theme
  const variantClasses = {
    default: {
      bg: 'bg-gray-200',
      fill: 'bg-gradient-to-r from-green-400 to-green-500'
    },
    success: {
      bg: 'bg-green-100',
      fill: 'bg-gradient-to-r from-green-500 to-green-600'
    },
    subtle: {
      bg: 'bg-gray-100',
      fill: 'bg-gradient-to-r from-green-300 to-emerald-400'
    },
    bold: {
      bg: 'bg-gray-300',
      fill: 'bg-gradient-to-r from-green-600 to-emerald-700'
    }
  };

  const { bg, fill } = variantClasses[variant] || variantClasses.default;

  return (
    <div className={`relative w-full ${bg} rounded-full ${height} overflow-hidden shadow-inner ${className}`}>
      {/* Main progress bar */}
      <motion.div
        className={`h-full ${fill} rounded-full relative overflow-hidden`}
        initial={animated ? { width: 0 } : { width: `${clampedProgress}%` }}
        animate={{ width: `${clampedProgress}%` }}
        transition={{ 
          duration: animated ? 1.2 : 0, 
          ease: 'easeOut',
          delay: 0.2
        }}
      >
        {/* Shimmer effect */}
        {animated && clampedProgress > 0 && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{ x: ["-100%", "100%"] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5
            }}
          />
        )}
      </motion.div>

      {/* Glow effect */}
      {showGlow && clampedProgress > 0 && (
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: `linear-gradient(to right, transparent ${clampedProgress - 10}%, rgba(34, 197, 94, 0.3) ${clampedProgress}%, transparent ${clampedProgress + 10}%)`,
            filter: 'blur(4px)'
          }}
          animate={{
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}

      {/* Progress indicators (dots) */}
      {[25, 50, 75].map((milestone) => (
        <div
          key={milestone}
          className="absolute top-0 bottom-0 w-px bg-white/50"
          style={{ left: `${milestone}%` }}
        />
      ))}
    </div>
  );
};

export const ProgressDisplay = ({ 
  progress, 
  showLabel = true, 
  label = "Progress",
  variant = 'default',
  size = 'medium',
  showMilestones = false,
  animated = true
}) => {
  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  // Size variants
  const sizeClasses = {
    small: 'h-1.5',
    medium: 'h-2.5',
    large: 'h-4'
  };

  // Get status color based on progress
  const getStatusColor = () => {
    if (clampedProgress >= 100) return 'text-green-600';
    if (clampedProgress >= 75) return 'text-green-500';
    if (clampedProgress >= 50) return 'text-green-400';
    if (clampedProgress >= 25) return 'text-gray-600';
    return 'text-gray-500';
  };

  return (
    <div>
      {/* Label and percentage */}
      {showLabel && (
        <motion.div 
          className="flex justify-between items-center mb-3"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-sm font-medium text-gray-700">{label}</span>
          <motion.span 
            className={`text-sm font-bold ${getStatusColor()}`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 500 }}
          >
            {Math.round(clampedProgress)}%
          </motion.span>
        </motion.div>
      )}

      {/* Progress bar */}
      <ProgressBar 
        progress={clampedProgress} 
        height={sizeClasses[size]}
        variant={variant}
        animated={animated}
        showGlow={clampedProgress > 90}
      />

      {/* Milestones */}
      {showMilestones && (
        <motion.div 
          className="flex justify-between mt-2 text-xs text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <span className={clampedProgress >= 0 ? 'text-green-600 font-medium' : ''}>Start</span>
          <span className={clampedProgress >= 25 ? 'text-green-600 font-medium' : ''}>25%</span>
          <span className={clampedProgress >= 50 ? 'text-green-600 font-medium' : ''}>50%</span>
          <span className={clampedProgress >= 75 ? 'text-green-600 font-medium' : ''}>75%</span>
          <span className={clampedProgress >= 100 ? 'text-green-600 font-medium' : ''}>Complete</span>
        </motion.div>
      )}
    </div>
  );
};

// Circular Progress Component
export const CircularProgress = ({ 
  progress, 
  size = 80, 
  strokeWidth = 8,
  showPercentage = true,
  variant = 'default'
}) => {
  const clampedProgress = Math.min(Math.max(progress, 0), 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (clampedProgress / 100) * circumference;

  const variantColors = {
    default: { stroke: '#10b981', bg: '#e5e7eb' },
    success: { stroke: '#059669', bg: '#dcfce7' },
    subtle: { stroke: '#6ee7b7', bg: '#f3f4f6' }
  };

  const colors = variantColors[variant] || variantColors.default;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={colors.bg}
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={colors.stroke}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
          style={{
            filter: `drop-shadow(0 0 6px ${colors.stroke}40)`
          }}
        />
      </svg>
      
      {/* Percentage text */}
      {showPercentage && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.8, type: "spring", stiffness: 500 }}
        >
          <span className="text-lg font-bold text-gray-800">
            {Math.round(clampedProgress)}%
          </span>
        </motion.div>
      )}
    </div>
  );
};

// Step Progress Component
export const StepProgress = ({ 
  currentStep, 
  totalSteps, 
  steps = [],
  variant = 'default'
}) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div>
      {/* Step indicators */}
      <div className="flex items-center justify-between mb-4">
        {Array.from({ length: totalSteps }, (_, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber <= currentStep;
          const isCurrent = stepNumber === currentStep;
          
          return (
            <motion.div
              key={index}
              className="flex flex-col items-center"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Step circle */}
              <motion.div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                  isActive
                    ? 'bg-green-500 text-white shadow-lg'
                    : 'bg-gray-200 text-gray-500'
                }`}
                animate={isCurrent ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 1, repeat: isCurrent ? Infinity : 0 }}
              >
                {stepNumber}
              </motion.div>
              
              {/* Step label */}
              {steps[index] && (
                <motion.span
                  className={`text-xs mt-2 font-medium ${
                    isActive ? 'text-green-600' : 'text-gray-500'
                  }`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  {steps[index]}
                </motion.span>
              )}
              
              {/* Connection line */}
              {index < totalSteps - 1 && (
                <div
                  className={`absolute top-4 left-8 w-full h-0.5 transition-all duration-500 ${
                    stepNumber < currentStep ? 'bg-green-500' : 'bg-gray-200'
                  }`}
                  style={{ width: 'calc(100vw / var(--steps) - 2rem)' }}
                />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Overall progress bar */}
      <ProgressBar 
        progress={progress} 
        variant={variant}
        height="h-2"
        animated={true}
      />
    </div>
  );
};

export default ProgressBar;
