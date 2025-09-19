// src/components/Results/ScoreBreakdown.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaCar, FaUtensils, FaBolt, FaShoppingCart, FaRecycle, 
  FaWater, FaTrash, FaDesktop, FaPlane, FaPowerOff 
} from 'react-icons/fa';

const categoryDetails = {
  transportScore: { label: 'Transportation', icon: FaCar },
  dietScore: { label: 'Diet', icon: FaUtensils },
  energyScore: { label: 'Energy', icon: FaBolt },
  shoppingScore: { label: 'Shopping', icon: FaShoppingCart },
  habitsScore: { label: 'Recycling', icon: FaRecycle },
  waterScore: { label: 'Water Usage', icon: FaWater },
  wasteScore: { label: 'Waste', icon: FaTrash },
  digitalScore: { label: 'Digital', icon: FaDesktop },
  travelScore: { label: 'Air Travel', icon: FaPlane },
  appliancesScore: { label: 'Appliances', icon: FaPowerOff }
};

const ScoreBreakdown = ({ scores }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-800 text-center">
        Detailed Score Breakdown
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
        {Object.entries(scores).map(([key, score], index) => {
          const { label, icon: Icon } = categoryDetails[key] || { label: key, icon: null };
          const percentage = (score / 5) * 100;
          const getColor = (s) => {
            if (s <= 2) return 'bg-green-500';
            if (s <= 3) return 'bg-yellow-500';
            return 'bg-red-500';
          };

          return (
            <motion.div 
              key={key}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center gap-2">
                  {Icon && <Icon className="text-gray-500" />}
                  <span className="font-medium text-gray-700">{label}</span>
                </div>
                <span className="font-bold text-gray-800">{score} / 5</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <motion.div
                  className={`h-2.5 rounded-full ${getColor(score)}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 1, delay: index * 0.1, ease: 'easeOut' }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ScoreBreakdown;