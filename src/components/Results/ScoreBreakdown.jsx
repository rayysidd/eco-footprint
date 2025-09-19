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
  // Color scheme based on grey, white, green theme
  const getScoreColors = (score) => {
    if (score <= 2) {
      return {
        barColor: 'bg-green-500',
        bgColor: 'bg-green-50',
        textColor: 'text-green-700',
        iconColor: 'text-green-600',
        borderColor: 'border-green-200'
      };
    } else if (score <= 3) {
      return {
        barColor: 'bg-green-400',
        bgColor: 'bg-green-50',
        textColor: 'text-green-600',
        iconColor: 'text-green-500',
        borderColor: 'border-green-200'
      };
    } else {
      return {
        barColor: 'bg-gray-500',
        bgColor: 'bg-gray-50',
        textColor: 'text-gray-700',
        iconColor: 'text-gray-600',
        borderColor: 'border-gray-200'
      };
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30, scale: 0.95 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  if (!scores || Object.keys(scores).length === 0) {
    return null;
  }

  return (
    <motion.div 
      className="w-full max-w-4xl mx-auto mt-12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Enhanced Header */}
      <motion.div
        variants={headerVariants}
        className="text-center mb-8"
      >
        <motion.div
          className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full shadow-xl mb-4"
          whileHover={{ scale: 1.1, rotate: 360 }}
          transition={{ duration: 0.6 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-8 h-8 text-white"
          >
            <path d="M3 17h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H3c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2zm0-10h18v8H3V7zm2 6h2v-4H5v4zm4 0h2v-2H9v2zm0-4h2v-2H9v2zm4 4h2v-4h-2v4zm4-2h2v-2h-2v2z" />
          </svg>
        </motion.div>
        
        <h3 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-gray-700 bg-clip-text text-transparent mb-2">
          Detailed Score Breakdown
        </h3>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore your environmental impact across different categories
        </p>
      </motion.div>

      {/* Enhanced Score Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(scores).map(([key, score], index) => {
          const { label, icon: Icon } = categoryDetails[key] || { label: key, icon: null };
          const percentage = (score / 5) * 100;
          const colors = getScoreColors(score);

          return (
            <motion.div 
              key={key}
              variants={itemVariants}
              className={`group p-6 rounded-2xl shadow-lg border ${colors.borderColor} ${colors.bgColor} hover:shadow-xl transition-all duration-300`}
              whileHover={{ 
                y: -3,
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
              }}
            >
              {/* Category Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  {Icon && (
                    <motion.div
                      className={`w-10 h-10 rounded-lg ${colors.bgColor} flex items-center justify-center shadow-md`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <Icon className={`text-lg ${colors.iconColor}`} />
                    </motion.div>
                  )}
                  <div>
                    <h4 className={`font-bold ${colors.textColor} text-lg`}>
                      {label}
                    </h4>
                    <p className="text-xs text-gray-500">
                      Environmental Impact
                    </p>
                  </div>
                </div>
                
                {/* Score Display */}
                <motion.div
                  className={`px-3 py-1 rounded-full ${colors.bgColor} border ${colors.borderColor}`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
                >
                  <span className={`font-bold ${colors.textColor}`}>
                    {score}/5
                  </span>
                </motion.div>
              </div>

              {/* Enhanced Progress Bar */}
              <div className="relative">
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
                  <motion.div
                    className={`h-3 rounded-full ${colors.barColor} relative overflow-hidden`}
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ 
                      duration: 1.2, 
                      delay: 0.3 + index * 0.1, 
                      ease: 'easeOut' 
                    }}
                  >
                    {/* Shimmer effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                      animate={{
                        x: ["-100%", "100%"]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                        delay: 1 + index * 0.1
                      }}
                    />
                  </motion.div>
                </div>

                {/* Progress percentage */}
                <motion.div
                  className="absolute right-0 -top-6 text-xs font-medium text-gray-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 + index * 0.1 }}
                >
                  {Math.round(percentage)}%
                </motion.div>
              </div>

              {/* Impact Level Indicator */}
              <motion.div
                className="flex items-center gap-2 mt-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
              >
                <div className="flex">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className={`w-2 h-2 rounded-full mr-1 ${
                        i < Math.ceil(score / 2) ? colors.barColor : 'bg-gray-300'
                      }`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ 
                        delay: 1 + index * 0.1 + i * 0.1,
                        type: "spring",
                        stiffness: 500
                      }}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-500 font-medium">
                  {score <= 2 ? 'Low Impact' : score <= 3 ? 'Moderate Impact' : 'High Impact'}
                </span>
              </motion.div>

              {/* Hover effect line */}
              <motion.div
                className={`absolute bottom-0 left-0 h-1 ${colors.barColor} rounded-b-2xl`}
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          );
        })}
      </div>

      {/* Summary Stats */}
      <motion.div
        className="mt-8 text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-200"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <div className="flex justify-center items-center gap-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {Object.values(scores).filter(score => score <= 2).length}
            </div>
            <div className="text-sm text-gray-600">Low Impact</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-500">
              {Object.values(scores).filter(score => score > 2 && score <= 3).length}
            </div>
            <div className="text-sm text-gray-600">Moderate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-600">
              {Object.values(scores).filter(score => score > 3).length}
            </div>
            <div className="text-sm text-gray-600">High Impact</div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ScoreBreakdown;
