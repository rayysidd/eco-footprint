// src/components/Results/VisualFeedback.jsx
import React, { useEffect, useRef } from 'react';
import { motion, animate } from 'framer-motion';

/**
 * A simple component to animate a number counting up from 0 to a target value.
 * It uses framer-motion's `animate` function to directly manipulate the DOM
 * for performance, avoiding re-renders on each frame.
 */
const Counter = ({ to }) => {
  const nodeRef = useRef();

  useEffect(() => {
    const node = nodeRef.current;

    // Animate from 0 to the target `to` value.
    const controls = animate(0, to, {
      duration: 2,
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
  }, [to]);

  // The span is rendered with an initial value of 0,
  // and the ref allows the animation to control it directly.
  return <span ref={nodeRef}>0</span>;
}


const VisualFeedback = ({ totalScore, resultCategory }) => {
  const maxScore = 100; // Assuming a max score of 100 for percentage calculation
  const scorePercentage = (totalScore / maxScore) * 100;
  const circumference = 2 * Math.PI * 55; // 2 * pi * radius (radius is 55)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4, duration: 0.7, ease: 'easeOut' }}
      className="relative flex items-center justify-center my-8"
    >
      <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 120 120">
        {/* Background Circle */}
        <circle
          cx="60"
          cy="60"
          r="55"
          strokeWidth="10"
          className="text-gray-200"
          stroke="currentColor"
          fill="transparent"
        />
        {/* Progress Circle */}
        <motion.circle
          cx="60"
          cy="60"
          r="55"
          strokeWidth="10"
          strokeLinecap="round"
          className={resultCategory.textColor}
          fill="transparent"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - (scorePercentage / 100) * circumference }}
          transition={{
            duration: 1.5,
            delay: 0.6,
            ease: "circOut",
          }}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span className={`text-5xl font-bold ${resultCategory.textColor}`}>
           {/* Replaced the external dependency with our custom Counter component */}
           <Counter to={totalScore} />
        </span>
        <span className="text-gray-500 font-medium">Eco Points</span>
      </div>
    </motion.div>
  );
};

export default VisualFeedback;

