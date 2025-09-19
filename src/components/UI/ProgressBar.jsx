import React from 'react';
import { motion } from 'framer-motion';

const ProgressBar = ({ progress, height = 'h-2.5', className = '' }) => {
  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <div className={`w-full bg-gray-200 rounded-full ${height} overflow-hidden ${className}`}>
      <motion.div
        className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"
        style={{ width: `${clampedProgress}%` }}
        initial={{ width: 0 }}
        animate={{ width: `${clampedProgress}%` }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      />
    </div>
  );
};

export const ProgressDisplay = ({ progress, showLabel = true }) => {
    const clampedProgress = Math.min(Math.max(progress, 0), 100);

    return (
        <div>
            {showLabel && (
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Progress</span>
                    <span className="text-sm font-medium text-green-600">{Math.round(clampedProgress)}%</span>
                </div>
            )}
            <ProgressBar progress={clampedProgress} />
        </div>
    );
};


export default ProgressBar;