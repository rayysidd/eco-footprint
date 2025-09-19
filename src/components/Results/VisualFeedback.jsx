import React, { useEffect, useRef } from 'react';
import { motion, animate } from 'framer-motion';

/**
 * A simple component to animate a number counting up from 0 to a target value.
 * It uses framer-motion's `animate` function to directly manipulate the DOM
 * for performance, avoiding re-renders on each frame.
 */
const Counter = ({ to, duration = 2 }) => {
  const nodeRef = useRef();

  useEffect(() => {
    const node = nodeRef.current;

    // Animate from 0 to the target `to` value.
    const controls = animate(0, to, {
      duration,
      ease: "easeOut",
      onUpdate(value) {
        // Update the node's textContent with the rounded animation value.
        if (node) {
          node.textContent = Math.round(value);
        }
      }
    });

    // Cleanup function to stop the animation when the component unmounts.
    return () => controls.stop();
  }, [to, duration]);

  // The span is rendered with an initial value of 0,
  // and the ref allows the animation to control it directly.
  return <span ref={nodeRef}>0</span>;
};

const VisualFeedback = ({ totalScore, resultCategory }) => {
  const maxScore = 100; // Assuming a max score of 100 for percentage calculation
  const scorePercentage = (totalScore / maxScore) * 100;
  const circumference = 2 * Math.PI * 55; // 2 * pi * radius (radius is 55)

  // Color scheme based on grey, white, green theme
  const getScoreColors = (score) => {
    if (score <= 30) {
      return {
        strokeClass: 'stroke-green-500',
        textClass: 'text-green-600',
        bgClass: 'bg-green-50',
        borderClass: 'border-green-200',
        glowColor: '#10b981',
        statusText: 'Excellent',
        statusIcon: '🌟'
      };
    } else if (score <= 60) {
      return {
        strokeClass: 'stroke-green-400',
        textClass: 'text-green-500',
        bgClass: 'bg-green-50',
        borderClass: 'border-green-200',
        glowColor: '#22c55e',
        statusText: 'Good',
        statusIcon: '👍'
      };
    } else {
      return {
        strokeClass: 'stroke-gray-500',
        textClass: 'text-gray-600',
        bgClass: 'bg-gray-50',
        borderClass: 'border-gray-200',
        glowColor: '#6b7280',
        statusText: 'Needs Work',
        statusIcon: '💪'
      };
    }
  };

  const colors = getScoreColors(totalScore);

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.5, rotate: -180 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 1,
        ease: "easeOut",
        staggerChildren: 0.2
      }
    }
  };

  const circleVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 2,
        ease: "easeInOut"
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
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative flex flex-col items-center justify-center my-12"
    >
      {/* Main Gauge Container */}
      <div className="relative">
        {/* Background glow effect */}
        <motion.div
          className="absolute inset-0 rounded-full opacity-20"
          style={{ 
            background: `radial-gradient(circle, ${colors.glowColor}40 0%, transparent 70%)`,
            width: '240px',
            height: '240px',
            left: '-48px',
            top: '-48px'
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Main SVG Gauge */}
        <svg className="w-48 h-48 transform -rotate-90 relative z-10" viewBox="0 0 120 120">
          {/* Background Circle */}
          <circle
            cx="60"
            cy="60"
            r="55"
            strokeWidth="8"
            className="text-gray-200"
            stroke="currentColor"
            fill="transparent"
            opacity="0.3"
          />

          {/* Secondary glow circle */}
          <motion.circle
            cx="60"
            cy="60"
            r="55"
            strokeWidth="4"
            strokeLinecap="round"
            className={colors.strokeClass}
            fill="transparent"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ 
              strokeDashoffset: circumference - (scorePercentage / 100) * circumference,
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              strokeDashoffset: { duration: 2, delay: 0.6, ease: "circOut" },
              opacity: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
            style={{ filter: 'blur(2px)' }}
          />

          {/* Main Progress Circle */}
          <motion.circle
            cx="60"
            cy="60"
            r="55"
            strokeWidth="8"
            strokeLinecap="round"
            className={colors.strokeClass}
            fill="transparent"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: circumference - (scorePercentage / 100) * circumference }}
            transition={{
              duration: 2,
              delay: 0.6,
              ease: "circOut",
            }}
            style={{
              filter: `drop-shadow(0 0 8px ${colors.glowColor}50)`
            }}
          />

          {/* Progress indicator dot */}
          {scorePercentage > 0 && (
            <motion.circle
              cx="60"
              cy="5"
              r="4"
              className={colors.strokeClass}
              fill="currentColor"
              transform={`rotate(${(scorePercentage / 100) * 360} 60 60)`}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: [0, 1.2, 1],
                opacity: [0, 1, 0.8]
              }}
              transition={{ 
                delay: 2.2,
                duration: 0.8,
                type: "spring" 
              }}
            />
          )}
        </svg>

        {/* Center Content */}
        <motion.div 
          className="absolute inset-0 flex flex-col items-center justify-center"
          variants={textVariants}
        >
          {/* Score Number */}
          <motion.div
            className={`text-6xl font-bold ${colors.textClass} mb-1`}
            animate={{
              scale: [1, 1.05, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2.5
            }}
          >
            <Counter to={totalScore} duration={2.5} />
          </motion.div>

          {/* Score Label */}
          <motion.span 
            className="text-gray-500 font-medium text-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            Eco Points
          </motion.span>

          {/* Percentage */}
          <motion.div
            className={`mt-2 px-2 py-1 rounded-full text-xs font-semibold ${colors.bgClass} ${colors.textClass} border ${colors.borderClass}`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2, duration: 0.4, type: "spring" }}
          >
            {Math.round(scorePercentage)}%
          </motion.div>
        </motion.div>

        {/* Floating particles around the gauge */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              backgroundColor: colors.glowColor,
              left: `${50 + 40 * Math.cos(i * Math.PI / 3)}%`,
              top: `${50 + 40 * Math.sin(i * Math.PI / 3)}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 0.8, 0],
              rotate: 360
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: 2.5 + i * 0.3,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Status Badge */}
      <motion.div
        className={`mt-6 flex items-center gap-2 px-6 py-3 rounded-full ${colors.bgClass} border ${colors.borderClass} shadow-lg`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.8, duration: 0.6 }}
        whileHover={{ scale: 1.05 }}
      >
        <span className="text-lg">{colors.statusIcon}</span>
        <span className={`font-bold ${colors.textClass}`}>
          {colors.statusText} Impact Level
        </span>
      </motion.div>

      {/* Score interpretation */}
      <motion.p
        className="text-center text-sm text-gray-600 mt-4 max-w-xs leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.2, duration: 0.5 }}
      >
        {totalScore <= 30 ? 
          'Outstanding! Your eco-friendly choices are making a real difference.' :
          totalScore <= 60 ?
          'Great progress! You\'re on the right track to reducing your footprint.' :
          'Every small change counts. Together we can build a greener future.'}
      </motion.p>

      {/* Pulsing outer ring */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 opacity-20"
        style={{ borderColor: colors.glowColor }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
    </motion.div>
  );
};

export default VisualFeedback;
