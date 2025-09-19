import React from 'react';
import { motion } from 'framer-motion';

// Enhanced SVG icons in grey, white, and green theme
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

const LeafIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-5 h-5 text-white"
  >
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-5 h-5 text-white"
  >
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
  </svg>
);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut'
    }
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut'
    }
  },
};

const ImprovementTips = ({ suggestions }) => {
  // Icon selection function for variety
  const getIcon = (index) => {
    const icons = [LightbulbIcon, LeafIcon, CheckIcon];
    return icons[index % icons.length];
  };

  // Color selection for variety within grey, white, green theme
  const getIconBackground = (index) => {
    const backgrounds = [
      'from-green-500 to-green-600',
      'from-emerald-500 to-emerald-600',
      'from-gray-500 to-gray-600'
    ];
    return backgrounds[index % backgrounds.length];
  };

  if (!suggestions || suggestions.length === 0) {
    return null;
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-4xl mx-auto mt-12"
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
          <LightbulbIcon />
        </motion.div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-gray-700 bg-clip-text text-transparent mb-2">
          Personalized Tips for a Greener Tomorrow
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Based on your assessment, here are tailored recommendations to reduce your environmental impact
        </p>
      </motion.div>

      {/* Tips Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {suggestions.map((tip, index) => {
          const IconComponent = getIcon(index);
          const iconBg = getIconBackground(index);
          
          return (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative p-6 bg-white rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300"
              whileHover={{ 
                y: -5,
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
              }}
            >
              {/* Background gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
              
              <div className="relative z-10 flex items-start gap-4">
                {/* Enhanced Icon */}
                <motion.div
                  className={`flex-shrink-0 w-12 h-12 bg-gradient-to-br ${iconBg} rounded-xl flex items-center justify-center shadow-md`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <IconComponent />
                  
                  {/* Pulsing ring effect */}
                  <motion.div
                    className="absolute inset-0 rounded-xl border-2 border-green-400 opacity-0 group-hover:opacity-100"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0, 0.5]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>

                {/* Tip Content */}
                <div className="flex-1">
                  <motion.p
                    className="text-gray-700 leading-relaxed font-medium"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {tip}
                  </motion.p>
                  
                  {/* Impact indicator */}
                  <motion.div
                    className="mt-3 flex items-center gap-2"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="flex">
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 bg-green-500 rounded-full mr-1"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ 
                            delay: 0.6 + i * 0.1,
                            type: "spring",
                            stiffness: 500
                          }}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 font-medium">
                      High Impact
                    </span>
                  </motion.div>
                </div>
              </div>

              {/* Hover accent line */}
              <motion.div
                className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-b-2xl"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          );
        })}
      </div>

      {/* Call to action */}
      <motion.div
        className="text-center mt-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-green-50 text-green-700 rounded-full border border-green-200">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <LeafIcon />
          </motion.div>
          <span className="font-medium">
            Start with small changes - every action counts! 🌱
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ImprovementTips;
