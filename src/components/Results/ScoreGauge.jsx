// src/components/Results/ScoreGauge.jsx
import React from 'react';
import { motion } from 'framer-motion';

const ScoreGauge = ({ score, maxScore = 50 }) => {
  const percentage = (score / maxScore) * 100;
  const circumference = 2 * Math.PI * 45; // 2 * pi * radius (radius is 45)
  const offset = circumference - (percentage / 100) * circumference;

  const getScoreColor = () => {
    if (percentage <= 30) return '#22c55e'; // green-500
    if (percentage <= 60) return '#f59e0b'; // yellow-500
    return '#ef4444'; // red-500
  };

  const color = getScoreColor();

  return (
    <div className="relative flex items-center justify-center w-48 h-48 mx-auto">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="#e5e7eb" // gray-200
          strokeWidth="10"
          fill="transparent"
        />
        {/* Progress circle */}
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          stroke={color}
          strokeWidth="10"
          fill="transparent"
          strokeLinecap="round"
          transform="rotate(-90 50 50)"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <motion.span
          className="text-5xl font-bold text-gray-800"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          {score}
        </motion.span>
        <span className="text-lg text-gray-500">/ {maxScore}</span>
      </div>
    </div>
  );
};

export default ScoreGauge;