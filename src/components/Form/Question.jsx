import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaCheck, 
  FaQuestion, 
  FaLeaf, 
  FaCar, 
  FaHome, 
  FaUtensils, 
  FaShoppingCart,
  FaRecycle,
  FaBolt,
  FaWater,
  FaPlane,
  FaDesktop,
  FaStar,
  FaHeart
} from "react-icons/fa";

// CSS Animation Floating Dots Component
const FloatingDots = ({ isSelected, optionsCount }) => {
  const dots = useMemo(() => 
    Array.from({ length: Math.min(optionsCount, 6) }, (_, i) => ({
      id: i,
      angle: (i / optionsCount) * Math.PI * 2,
      distance: 40,
      size: isSelected === i ? 8 : 4,
      color: isSelected === i ? '#10b981' : '#d1d5db',
      duration: 3 + i * 0.5,
    })), [isSelected, optionsCount]
  );

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {dots.map((dot) => (
        <motion.div
          key={dot.id}
          className="absolute rounded-full"
          style={{
            width: dot.size,
            height: dot.size,
            backgroundColor: dot.color,
          }}
          animate={{
            x: Math.cos(dot.angle) * dot.distance,
            y: Math.sin(dot.angle) * dot.distance,
            scale: isSelected === dot.id ? [1, 1.5, 1] : [1, 1.2, 1],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: dot.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// Icon mapping for different question types
const getQuestionIcon = (questionId) => {
  const iconMap = {
    energy: FaBolt,
    appliances: FaHome,
    transport: FaCar,
    travel: FaPlane,
    diet: FaUtensils,
    habits: FaRecycle,
    water: FaWater,
    shopping: FaShoppingCart,
    waste: FaRecycle,
    digital: FaDesktop,
    default: FaLeaf
  };
  
  return iconMap[questionId] || iconMap.default;
};

// Enhanced Question Component
const Question = ({ question, value, onChange, validationError, questionIndex = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [showConfetti, setShowConfetti] = useState(false);

  const IconComponent = getQuestionIcon(question?.id || 'default');

  // Error boundary check
  if (!question || !question.options) {
    console.error('Question component: Invalid question prop');
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-600">Error: Invalid question data</p>
      </div>
    );
  }

  useEffect(() => {
    const index = question.options.findIndex(opt => opt.value === value);
    if (index !== selectedIndex) {
      setSelectedIndex(index);
      
      // Show confetti when selection changes (only if it's a valid selection)
      if (index !== -1 && selectedIndex !== -1) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 1000);
      }
    }
  }, [value, selectedIndex, question.options]);

  // Advanced animations
  const questionVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        staggerChildren: 0.1,
        delayChildren: questionIndex * 0.1
      }
    }
  };

  const optionVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
    hover: { 
      scale: 1.02, 
      x: 6,
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.98 }
  };

  const handleOptionChange = (optionValue, index) => {
    onChange(question.id, optionValue);
    
    // Haptic feedback simulation
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  };

  return (
    <motion.div 
      className="relative space-y-6 p-6 rounded-2xl bg-white shadow-lg border border-gray-200"
      variants={questionVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ 
        boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
        borderColor: "#d1d5db"
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* CSS Floating Animation Background */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-30 pointer-events-none">
        <FloatingDots 
          isSelected={selectedIndex} 
          optionsCount={question.options.length} 
        />
      </div>

      {/* Question Header with Enhanced Styling */}
      <motion.div 
        className="flex items-start gap-4 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <motion.div 
          className="relative flex-shrink-0"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
            <IconComponent className="text-white text-lg" />
          </div>
          
          {/* Animated ring around icon */}
          <motion.div
            className="absolute inset-0 rounded-xl border-2 border-green-300"
            animate={isHovered ? { 
              scale: [1, 1.2, 1], 
              rotate: [0, 180, 360],
              borderColor: ['#86efac', '#10b981', '#86efac']
            } : {}}
            transition={{ duration: 2, repeat: isHovered ? Infinity : 0 }}
          />

          {/* Pulsing dot */}
          <motion.div
            className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>

        <div className="flex-1">
          <motion.h3 
            className="font-bold text-xl text-gray-800 leading-relaxed mb-2"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            {question.text}
          </motion.h3>
          
          {question.description && (
            <motion.p
              className="text-gray-600 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {question.description}
            </motion.p>
          )}
        </div>

        {/* Progress indicator */}
        {value !== undefined && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            className="flex items-center justify-center w-8 h-8 bg-green-500 rounded-full shadow-lg"
            whileHover={{ scale: 1.1 }}
          >
            <FaCheck className="text-white text-sm" />
          </motion.div>
        )}
      </motion.div>

      {/* Validation Error */}
      <AnimatePresence>
        {validationError && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2"
          >
            <span className="text-red-500">⚠️</span>
            <span className="text-red-700 text-sm font-medium">{validationError}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Options */}
      <div className="space-y-3 relative z-10">
        <AnimatePresence>
          {question.options.map((opt, index) => {
            const isSelected = value === opt.value;
            
            return (
              <motion.div
                key={`${question.id}-${index}`}
                variants={optionVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                whileTap="tap"
                transition={{ delay: index * 0.05 }}
              >
                <label
                  className={`
                    relative flex items-center p-5 rounded-xl cursor-pointer 
                    border-2 transition-all duration-300 group overflow-hidden
                    ${isSelected
                      ? "bg-gradient-to-r from-green-50 to-emerald-50 border-green-400 shadow-lg"
                      : "bg-white border-gray-200 hover:border-green-300 hover:bg-gray-50 hover:shadow-md"
                    }
                  `}
                >
                  {/* Animated Background Effects */}
                  <motion.div
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100"
                    style={{
                      background: isSelected 
                        ? 'linear-gradient(45deg, rgba(16, 185, 129, 0.05), rgba(34, 197, 94, 0.05))' 
                        : 'linear-gradient(45deg, rgba(156, 163, 175, 0.05), rgba(209, 213, 219, 0.05))'
                    }}
                    animate={isSelected ? {
                      background: [
                        "linear-gradient(45deg, rgba(16, 185, 129, 0.05), rgba(34, 197, 94, 0.05))",
                        "linear-gradient(135deg, rgba(34, 197, 94, 0.08), rgba(16, 185, 129, 0.08))",
                        "linear-gradient(225deg, rgba(16, 185, 129, 0.05), rgba(34, 197, 94, 0.05))"
                      ]
                    } : {}}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  />

                  {/* Enhanced Custom Radio Button */}
                  <div className="relative flex-shrink-0 z-10">
                    <input
                      type={question.type || "radio"}
                      name={question.id}
                      value={opt.value}
                      checked={isSelected}
                      onChange={(e) => handleOptionChange(e.target.value, index)}
                      className="sr-only"
                    />
                    
                    <motion.div 
                      className={`
                        w-6 h-6 rounded-full border-3 transition-all duration-300 flex items-center justify-center relative
                        ${isSelected 
                          ? "border-green-500 bg-green-500 shadow-lg" 
                          : "border-gray-300 group-hover:border-green-400 group-hover:shadow-sm"
                        }
                      `}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <AnimatePresence>
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0, opacity: 0, rotate: -180 }}
                            animate={{ scale: 1, opacity: 1, rotate: 0 }}
                            exit={{ scale: 0, opacity: 0, rotate: 180 }}
                            transition={{ duration: 0.3, type: "spring" }}
                          >
                            <FaCheck className="text-white text-sm" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                      
                      {/* Ripple effect */}
                      {isSelected && (
                        <motion.div
                          className="absolute inset-0 rounded-full border-2 border-green-400"
                          animate={{ 
                            scale: [1, 2.5, 1], 
                            opacity: [0.8, 0, 0] 
                          }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                      )}
                    </motion.div>
                  </div>

                  {/* Option Content */}
                  <div className="ml-4 flex-1 z-10">
                    <motion.span 
                      className={`
                        text-lg font-semibold transition-all duration-300
                        ${isSelected 
                          ? "text-gray-800" 
                          : "text-gray-700 group-hover:text-gray-800"
                        }
                      `}
                    >
                      {opt.label}
                    </motion.span>
                    
                    {opt.description && (
                      <motion.p
                        className={`text-sm mt-1 transition-colors duration-300 ${
                          isSelected ? "text-gray-600" : "text-gray-500"
                        }`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                      >
                        {opt.description}
                      </motion.p>
                    )}

                    {/* Impact indicator */}
                    {opt.impact && (
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <motion.div
                              key={i}
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.2 + i * 0.1 }}
                            >
                              <FaStar
                                className={`w-3 h-3 ${
                                  i < opt.impact 
                                    ? "text-green-500" 
                                    : "text-gray-300"
                                }`}
                              />
                            </motion.div>
                          ))}
                        </div>
                        <span className="text-xs text-gray-500">
                          Environmental Impact
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Selection Indicator with Animation */}
                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0, rotate: -90 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0, scale: 0, rotate: 90 }}
                        transition={{ type: "spring", stiffness: 500 }}
                        className="ml-auto z-10"
                      >
                        <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                          <FaCheck className="text-white text-sm" />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Confetti Animation */}
                  <AnimatePresence>
                    {showConfetti && isSelected && (
                      <div className="absolute inset-0 pointer-events-none">
                        {[...Array(12)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-2 h-2 bg-green-400 rounded"
                            initial={{ 
                              x: "50%", 
                              y: "50%", 
                              scale: 0,
                              rotate: 0 
                            }}
                            animate={{
                              x: `${50 + (Math.random() - 0.5) * 200}%`,
                              y: `${50 + (Math.random() - 0.5) * 200}%`,
                              scale: [0, 1, 0],
                              rotate: 360
                            }}
                            transition={{
                              duration: 1,
                              ease: "easeOut",
                              delay: i * 0.05
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </AnimatePresence>

                  {/* Hover shine effect */}
                  <motion.div
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: "linear-gradient(45deg, transparent, rgba(255,255,255,0.4), transparent)"
                    }}
                    animate={{
                      x: ["-100%", "100%"]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: isSelected ? Infinity : 0,
                      ease: "easeInOut"
                    }}
                  />
                </label>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Question completion celebration */}
      <AnimatePresence>
        {value !== undefined && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 text-green-600 font-medium pt-2"
          >
            <motion.div
              animate={{ 
                rotate: 360,
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                rotate: { duration: 1 },
                scale: { duration: 2, repeat: Infinity }
              }}
            >
              <FaHeart className="text-green-500" />
            </motion.div>
            <motion.span 
              className="text-sm"
              animate={{ 
                color: ['#059669', '#10b981', '#059669']
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Great choice! Moving to a greener future 🌱
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating particles effect */}
      {selectedIndex >= 0 && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-green-400 rounded-full"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
              }}
              animate={{
                y: [-20, -60, -20],
                x: [-10, 10, -10],
                opacity: [0, 0.8, 0],
                scale: [0, 1.5, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.4,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      )}

      {/* Progress indicator line at bottom */}
      {value !== undefined && (
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-b-2xl"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      )}
    </motion.div>
  );
};

export default Question;
