// src/components/Results/ResultSummary.jsx
import React from 'react';
import { motion } from 'framer-motion';

// Using an inline SVG for the globe icon to remove external dependencies.
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


const ResultSummary = ({ totalScore, resultCategory }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="text-center"
    >
      <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${resultCategory.gradient} rounded-full mb-4 shadow-lg`}>
        <GlobeIcon />
      </div>
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Your Eco Footprint Score</h1>
      <p className="text-gray-600 max-w-2xl mx-auto text-lg">
        {resultCategory.message}
      </p>
    </motion.div>
  );
};

export default ResultSummary;

