import React from 'react';
import { motion } from 'framer-motion';

const ScoreGauge = ({ score, maxScore = 50, label = "Carbon Score" }) => {
  const percentage = (score / maxScore) * 100;
  const circumference = 2 * Math.PI * 45; // 2 * pi * radius (radius is 45)
  const offset = circumference - (percentage / 100) * circumference;

  // Color scheme based on grey, white, green theme
  const getScoreColor = () => {
    if (percentage <= 30) {
      return {
        primary: '#10b981', // green-500
        secondary: '#34d399', // green-400
        bg: '#dcfce7', // green-100
        text: 'text-green-700'
      };
    }
    if (percentage <= 60) {
      return {
        primary: '#10b981', // green-500 (still green for moderate)
        secondary: '#6ee7b7', // green-300
        bg: '#d1fae5', // green-100
        text: 'text-green-600'
      };
    }
    return {
      primary: '#6b7280', // gray-500 (grey for high impact)
      secondary: '#9ca3af', // gray-400
      bg: '#f3f4f6', // gray-100
      text: 'text-gray-700'
    };
  };

  const colors = getScoreColor();

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.2
      }
    }
  };

  const gaugeVariants = {
    hidden: { rotate: -180, opacity: 0 },
    visible: {
      rotate: 0,
      opacity: 1,
      transition: {
        duration: 1,
        ease: "easeOut"
      }
    }
  };

  const textVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        delay: 0.8,
        duration: 0.6,
        type: "spring",
        stiffness: 500
      }
    }
  };

  return (
    <motion.div 
      className="flex flex-col items-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Gauge Container */}
      <motion.div
        className="relative flex items-center justify-center w-56 h-56 mx-auto"
        variants={gaugeVariants}
      >
        {/* Background Card */}
        <div 
          className="absolute inset-0 rounded-full shadow-2xl border-4 border-white"
          style={{ backgroundColor: colors.bg }}
        />

        {/* SVG Gauge */}
        <svg className="w-full h-full relative z-10" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="42"
            stroke="#e5e7eb"
            strokeWidth="6"
            fill="transparent"
            className="drop-shadow-sm"
          />
          
          {/* Secondary glow circle */}
          <motion.circle
            cx="50"
            cy="50"
            r="42"
            stroke={colors.secondary}
            strokeWidth="2"
            fill="transparent"
            strokeLinecap="round"
            transform="rotate(-90 50 50)"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 2, ease: 'easeOut', delay: 0.2 }}
            style={{ filter: 'blur(2px)' }}
          />
          
          {/* Main progress circle */}
          <motion.circle
            cx="50"
            cy="50"
            r="42"
            stroke={colors.primary}
            strokeWidth="6"
            fill="transparent"
            strokeLinecap="round"
            transform="rotate(-90 50 50)"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.8, ease: 'easeOut', delay: 0.3 }}
            className="drop-shadow-sm"
          />

          {/* Animated dots on the progress line */}
          {percentage > 0 && (
            <motion.circle
              cx="50"
              cy="8"
              r="2"
              fill={colors.primary}
              transform={`rotate(${(percentage / 100) * 360 - 90} 50 50)`}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 1, 0.7],
                scale: [0, 1.5, 1],
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.5
              }}
            />
          )}
        </svg>

        {/* Center Content */}
        <motion.div 
          className="absolute flex flex-col items-center justify-center"
          variants={textVariants}
        >
          {/* Main Score */}
          <motion.div
            className={`text-6xl font-bold ${colors.text} mb-1`}
            animate={{
              scale: [1, 1.05, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.8
            }}
          >
            {score}
          </motion.div>
          
          {/* Max Score */}
          <div className="text-lg text-gray-500 mb-2">
            / {maxScore}
          </div>
          
          {/* Percentage */}
          <motion.div 
            className={`text-sm font-semibold px-3 py-1 rounded-full ${colors.bg} ${colors.text} border-2`}
            style={{ borderColor: colors.primary }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            {Math.round(percentage)}%
          </motion.div>
        </motion.div>

        {/* Floating particles around the gauge */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              backgroundColor: colors.primary,
              left: `${50 + 35 * Math.cos(i * Math.PI / 4)}%`,
              top: `${50 + 35 * Math.sin(i * Math.PI / 4)}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 0.6, 0],
              rotate: 360
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: 2 + i * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Pulsing outer ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 opacity-30"
          style={{ borderColor: colors.primary }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5
          }}
        />
      </motion.div>

      {/* Label and Status */}
      <motion.div
        className="text-center mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          {label}
        </h3>
        
        <motion.div
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${colors.bg} border`}
          style={{ borderColor: colors.primary }}
          whileHover={{ scale: 1.05 }}
        >
          <div 
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: colors.primary }}
          />
          <span className={`font-medium ${colors.text}`}>
            {percentage <= 30 ? '🌟 Excellent Impact' : 
             percentage <= 60 ? '👍 Good Progress' : 
             '💪 Room for Improvement'}
          </span>
        </motion.div>

        {/* Impact description */}
        <motion.p
          className="text-sm text-gray-600 mt-3 max-w-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.5 }}
        >
          {percentage <= 30 ? 'Your carbon footprint is well below average. Keep up the great work!' : 
           percentage <= 60 ? 'You\'re making good progress toward a more sustainable lifestyle.' : 
           'There are opportunities to significantly reduce your environmental impact.'}
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default ScoreGauge;
