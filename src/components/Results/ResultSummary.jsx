import React from 'react';
import { motion } from 'framer-motion';

// Enhanced SVG icons with better styling
const GlobeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-8 h-8 text-white"
  >
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L8 12v1c0 1.1.9 2 2 2v3.93zm2-14.45c1.02.23 1.94.74 2.7 1.42L12 11h2c1.1 0 2 .9 2 2v.21c.53-.78.89-1.68 1-2.65-.19-.03-.38-.06-.58-.06-1.55 0-2.93.5-4.06 1.34-.4-.53-.87-1-1.4-1.39zM10 5.07c.53.39 1 .86 1.4 1.39.4-1.13.93-2.14 1.57-3 .42.27.82.58 1.19.92-1.39 1.54-2.3 3.48-2.58 5.61h-2c-.37-1.42-1.29-2.63-2.58-3.61zM14 14v-1c0-1.1-.9-2-2-2h-2L7.21 6.21c-.53.78-.89 1.68-1 2.65.19.03.38.06.58.06 1.55 0 2.93-.5 4.06-1.34.4.53.87 1 1.4 1.39C13.23 10.23 14 11.58 14 13v1zm-1 5.93c3.95-.49 7-3.85 7-7.93 0-.62-.08-1.21-.21-1.79L16 12v1c0 1.1-.9 2-2 2v3.93z" />
  </svg>
);

const LeafIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-8 h-8 text-white"
  >
    <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 7,18C8,17 20,16 20,16C20,16 17,8 17,8Z" />
  </svg>
);

// Color mapping for different score ranges (Grey, White & Green theme)
const getResultStyling = (totalScore, resultCategory) => {
  if (totalScore <= 30) {
    return {
      gradient: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      textColor: 'text-green-700',
      icon: LeafIcon,
      particles: '#10b981'
    };
  } else if (totalScore <= 60) {
    return {
      gradient: 'from-green-400 to-green-500',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      textColor: 'text-green-600',
      icon: GlobeIcon,
      particles: '#10b981'
    };
  } else {
    return {
      gradient: 'from-gray-500 to-gray-600',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200',
      textColor: 'text-gray-700',
      icon: GlobeIcon,
      particles: '#6b7280'
    };
  }
};

const ResultSummary = ({ totalScore, resultCategory }) => {
  const styling = getResultStyling(totalScore, resultCategory);
  const IconComponent = styling.icon;

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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="text-center"
    >
      {/* Enhanced Icon Container */}
      <motion.div
        variants={itemVariants}
        className="relative inline-block mb-6"
      >
        <motion.div
          className={`relative inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${styling.gradient} rounded-full shadow-2xl`}
          whileHover={{ scale: 1.1 }}
          animate={{
            boxShadow: [
              "0 10px 30px rgba(0,0,0,0.2)",
              "0 15px 40px rgba(16, 185, 129, 0.3)",
              "0 10px 30px rgba(0,0,0,0.2)"
            ]
          }}
          transition={{
            boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" },
            scale: { type: "spring", stiffness: 400 }
          }}
        >
          <IconComponent />
          
          {/* Animated outer ring */}
          <motion.div
            className={`absolute inset-0 rounded-full border-3 ${styling.gradient.includes('green') ? 'border-green-400' : 'border-gray-400'}`}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Secondary pulsing ring */}
          <motion.div
            className={`absolute -inset-2 rounded-full border-2 ${styling.gradient.includes('green') ? 'border-green-300' : 'border-gray-300'}`}
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
          />

          {/* Floating particles around the icon */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                backgroundColor: styling.particles,
                left: `${50 + 40 * Math.cos(i * Math.PI / 3)}%`,
                top: `${50 + 40 * Math.sin(i * Math.PI / 3)}%`,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 0.8, 0],
                rotate: 360
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Score Display */}
      <motion.div
        variants={itemVariants}
        className={`inline-block px-6 py-3 rounded-full ${styling.bgColor} border ${styling.borderColor} mb-6`}
      >
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-600">Your Score:</span>
          <motion.span
            className={`text-2xl font-bold ${styling.textColor}`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.8, type: "spring", stiffness: 500 }}
          >
            {totalScore}/100
          </motion.span>
        </div>
      </motion.div>

      {/* Enhanced Title */}
      <motion.h1 
        variants={itemVariants}
        className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-gray-700 bg-clip-text text-transparent mb-4"
      >
        Your Eco Footprint Score
      </motion.h1>

      {/* Category Badge */}
      <motion.div
        variants={itemVariants}
        className={`inline-block px-4 py-2 rounded-full ${styling.bgColor} border ${styling.borderColor} mb-6`}
      >
        <span className={`font-semibold ${styling.textColor}`}>
          {resultCategory.label}
        </span>
      </motion.div>

      {/* Enhanced Message */}
      <motion.div
        variants={itemVariants}
        className="max-w-3xl mx-auto"
      >
        <p className="text-lg text-gray-600 leading-relaxed mb-6">
          {resultCategory.message}
        </p>

        {/* Progress indicator */}
        <motion.div
          className="w-full max-w-md mx-auto h-2 bg-gray-200 rounded-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.div
            className={`h-full bg-gradient-to-r ${styling.gradient} rounded-full`}
            initial={{ width: 0 }}
            animate={{ width: `${totalScore}%` }}
            transition={{ delay: 1.2, duration: 1.5, ease: "easeOut" }}
          />
        </motion.div>

        {/* Score interpretation */}
        <motion.p
          className="text-sm text-gray-500 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        >
          {totalScore <= 30 && "🌟 Excellent! You're making a positive impact."}
          {totalScore > 30 && totalScore <= 60 && "👍 Good progress! There's room for improvement."}
          {totalScore > 60 && "💪 Let's work together to reduce your footprint."}
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default ResultSummary;
