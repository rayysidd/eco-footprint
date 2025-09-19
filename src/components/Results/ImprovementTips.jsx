// src/components/Results/ImprovementTips.jsx
import React from 'react';
import { motion } from 'framer-motion';

// Using an inline SVG for the lightbulb icon to remove external dependencies.
const LightbulbIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-5 h-5 text-white"
  >
    <path d="M12 2a7 7 0 00-7 7c0 2.38 1.19 4.47 3 5.74V17a1 1 0 001 1h6a1 1 0 001-1v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 00-7-7zM9 21a1 1 0 001 1h4a1 1 0 001-1v-1H9v1z" />
  </svg>
);


const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.8,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut'
    }
  },
};

const ImprovementTips = ({ suggestions }) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-2xl mx-auto mt-8"
    >
      <h2 className="text-xl font-semibold text-gray-800 text-center mb-6">
        Personalized Tips for a Greener Tomorrow
      </h2>
      <div className="space-y-4">
        {suggestions.map((tip, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-md border border-gray-100"
          >
            <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-lg flex items-center justify-center">
              <LightbulbIcon />
            </div>
            <p className="text-gray-700 leading-relaxed pt-1.5">
              {tip}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ImprovementTips;

