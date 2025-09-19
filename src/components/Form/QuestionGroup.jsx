import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaHome, 
  FaCar, 
  FaUtensils, 
  FaShoppingCart,
  FaBolt, 
  FaLeaf, 
  FaRecycle,
  FaChevronDown,
  FaTrophy,
  FaStar,
  FaCheckCircle,
  FaClock
} from "react-icons/fa";
import Question from "./Question";

// CSS Animation Floating Dots Component for Group Header
const FloatingGroupDots = ({ completionPercentage, isHovered }) => {
  const dots = useMemo(() => 
    Array.from({ length: 6 }, (_, i) => ({
      id: i,
      angle: (i / 6) * Math.PI * 2,
      distance: 30,
      size: completionPercentage === 100 ? 6 : 4,
      color: completionPercentage === 100 ? '#10b981' : '#d1d5db',
      duration: 2 + i * 0.3,
    })), [completionPercentage]
  );

  const isComplete = completionPercentage === 100;

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {/* Central pulsing dot */}
      <motion.div
        className="absolute w-3 h-3 rounded-full"
        style={{ backgroundColor: isComplete ? '#10b981' : '#9ca3af' }}
        animate={{
          scale: isComplete ? [1, 1.5, 1] : [1, 1.2, 1],
          opacity: [0.6, 1, 0.6]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Orbiting dots */}
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
            rotate: 360,
            scale: isHovered ? [1, 1.3, 1] : [1, 1.1, 1],
          }}
          transition={{
            x: { duration: 0 },
            y: { duration: 0 },
            rotate: {
              duration: dot.duration,
              repeat: Infinity,
              ease: "linear"
            },
            scale: {
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        />
      ))}

      {/* Success ring */}
      {isComplete && (
        <motion.div
          className="absolute w-20 h-20 rounded-full border-2 border-green-400"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.8, 0.3]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
    </div>
  );
};

const groupIcons = {
  "Energy & Home": FaHome,
  "Transport & Travel": FaCar,
  "Food & Habits": FaUtensils,
  "Shopping & Waste": FaShoppingCart,
};

const groupColors = {
  "Energy & Home": "from-green-500 to-green-600",
  "Transport & Travel": "from-gray-500 to-gray-600", 
  "Food & Habits": "from-green-600 to-emerald-600",
  "Shopping & Waste": "from-gray-600 to-green-500",
};

const groupDescriptions = {
  "Energy & Home": "Your household energy consumption and efficiency habits",
  "Transport & Travel": "How you get around and your travel patterns",
  "Food & Habits": "Your diet choices and daily sustainable practices",
  "Shopping & Waste": "Your consumption patterns and waste management",
};

const QuestionGroup = ({ 
  title, 
  questions, 
  answers, 
  onChange, 
  validationErrors = {},
  isCollapsed = false,
  onToggleCollapse 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(!isCollapsed);
  const [showCelebration, setShowCelebration] = useState(false);
  
  const IconComponent = groupIcons[title] || FaLeaf;
  const gradientColor = groupColors[title] || "from-gray-500 to-gray-600";
  const description = groupDescriptions[title] || "Complete these questions to calculate your impact";
  
  const answeredCount = questions.filter(q => answers[q.id] !== undefined).length;
  const totalCount = questions.length;
  const completionPercentage = (answeredCount / totalCount) * 100;
  const isComplete = completionPercentage === 100;
  const hasErrors = questions.some(q => validationErrors[q.id]);

  React.useEffect(() => {
    if (isComplete && answeredCount === totalCount) {
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 2000);
    }
  }, [isComplete, answeredCount, totalCount]);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
    if (onToggleCollapse) {
      onToggleCollapse(title, !isExpanded);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const questionsVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  const questionItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`relative overflow-hidden rounded-3xl border-2 shadow-lg transition-all duration-500 ${
        isComplete 
          ? "border-green-400 bg-gradient-to-br from-green-50 to-white" 
          : hasErrors 
            ? "border-red-300 bg-gradient-to-br from-red-50 to-white"
            : "border-gray-200 bg-white hover:border-gray-300"
      }`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ 
        scale: 1.01, 
        boxShadow: "0 20px 40px rgba(0,0,0,0.1)" 
      }}
    >
      {/* Group Header */}
      <motion.div 
        variants={headerVariants}
        className={`bg-gradient-to-r ${gradientColor} px-8 py-6 relative overflow-hidden cursor-pointer`}
        onClick={toggleExpanded}
        whileHover={{ scale: 1.005 }}
        whileTap={{ scale: 0.995 }}
      >
        {/* CSS Floating Animation Background */}
        <div className="absolute top-0 right-0 w-32 h-32 opacity-40">
          <FloatingGroupDots
            completionPercentage={completionPercentage}
            isHovered={isHovered}
          />
        </div>

        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-6">
            {/* Enhanced Icon Container */}
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
                <IconComponent className="text-white text-2xl" />
              </div>
              
              {/* Status indicator */}
              <motion.div
                className={`absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  isComplete 
                    ? "bg-green-500 text-white" 
                    : hasErrors 
                      ? "bg-red-500 text-white"
                      : answeredCount > 0
                        ? "bg-green-400 text-white"
                        : "bg-gray-400 text-white"
                }`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
              >
                {isComplete ? (
                  <FaCheckCircle className="text-xs" />
                ) : hasErrors ? (
                  "!"
                ) : answeredCount > 0 ? (
                  <FaClock className="text-xs" />
                ) : (
                  answeredCount
                )}
              </motion.div>
              
              {/* Animated rings */}
              <motion.div
                className="absolute inset-0 rounded-2xl border-2 border-white/40"
                animate={isHovered ? { 
                  scale: [1, 1.2, 1], 
                  rotate: [0, 180, 360] 
                } : {}}
                transition={{ duration: 2, repeat: isHovered ? Infinity : 0 }}
              />

              {/* Progress ring */}
              <motion.div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background: `conic-gradient(from 0deg, rgba(255,255,255,0.6) ${completionPercentage * 3.6}deg, transparent ${completionPercentage * 3.6}deg)`
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: isComplete ? 1 : 0.7 }}
              />
            </motion.div>

            {/* Group Info */}
            <div className="flex-1">
              <motion.h2 
                className="text-2xl font-bold text-white mb-2 flex items-center gap-3"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                {title}
                {isComplete && (
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 500 }}
                  >
                    <FaTrophy className="text-green-300 text-xl" />
                  </motion.div>
                )}
              </motion.h2>
              
              <motion.p 
                className="text-white/90 text-sm mb-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {description}
              </motion.p>
              
              <motion.div 
                className="flex items-center gap-4 text-white/80 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <span className="flex items-center gap-2">
                  <FaCheckCircle />
                  {answeredCount} of {totalCount} completed
                </span>
                
                {hasErrors && (
                  <span className="flex items-center gap-2 text-red-200">
                    ⚠️ {questions.filter(q => validationErrors[q.id]).length} errors
                  </span>
                )}
              </motion.div>
            </div>
          </div>
          
          {/* Right Side Controls */}
          <div className="flex items-center gap-4">
            {/* Enhanced Completion Circle */}
            <div className="relative w-16 h-16">
              <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-white/30"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <motion.path
                  className="text-white"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                  strokeDasharray={`${completionPercentage}, 100`}
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  initial={{ strokeDasharray: "0, 100" }}
                  animate={{ strokeDasharray: `${completionPercentage}, 100` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-bold text-white">
                  {Math.round(completionPercentage)}%
                </span>
              </div>
              
              {/* Completion celebration ring */}
              {isComplete && (
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-white"
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </div>

            {/* Expand/Collapse Button */}
            <motion.button
              className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                toggleExpanded();
              }}
            >
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <FaChevronDown className="text-lg" />
              </motion.div>
            </motion.button>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 translate-x-20 blur-xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-16 -translate-x-16 blur-xl" />
        
        {/* Progress Bar */}
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-white/40"
          initial={{ width: 0 }}
          animate={{ width: `${completionPercentage}%` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </motion.div>

      {/* Questions Section */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            variants={questionsVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="overflow-hidden"
          >
            <div className="p-8 space-y-8 bg-white">
              {/* Section Header */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between pb-4 border-b border-gray-200"
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Answer the questions below
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Your responses help us calculate your environmental impact
                  </p>
                </div>
                
                {/* Quick Stats */}
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-600">{answeredCount} Completed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                    <span className="text-gray-600">{totalCount - answeredCount} Remaining</span>
                  </div>
                </div>
              </motion.div>

              {/* Questions List */}
              <div className="space-y-8">
                {questions.map((q, index) => (
                  <motion.div
                    key={q.id}
                    variants={questionItemVariants}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Question
                      question={q}
                      value={answers[q.id]}
                      onChange={onChange}
                      validationError={validationErrors[q.id]}
                      questionIndex={index}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Section Footer */}
              {isComplete && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-gradient-to-r from-green-50 to-white rounded-2xl p-6 border border-green-200"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                      <FaTrophy className="text-white text-xl" />
                    </div>
                    <div>
                      <h4 className="font-bold text-green-800 mb-1">
                        Section Complete! 🎉
                      </h4>
                      <p className="text-green-700 text-sm">
                        Great job! You've answered all questions in this category.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Celebration Effects */}
      <AnimatePresence>
        {showCelebration && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-green-400 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                initial={{ scale: 0, rotate: 0 }}
                animate={{
                  scale: [0, 1, 0],
                  rotate: 360,
                  y: [-20, -80, -20],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.1,
                  ease: "easeOut"
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Floating success badge */}
      {isComplete && (
        <motion.div
          className="absolute top-4 left-4 z-20"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 500 }}
        >
          <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-2 shadow-lg">
            <FaStar />
            Complete
          </div>
        </motion.div>
      )}

      {/* Progress indicator dots */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
        {questions.map((_, index) => (
          <motion.div
            key={index}
            className={`w-1.5 h-1.5 rounded-full ${
              answers[questions[index].id] !== undefined 
                ? 'bg-green-500' 
                : 'bg-gray-300'
            }`}
            animate={{ 
              scale: answers[questions[index].id] !== undefined ? [1, 1.3, 1] : 1,
            }}
            transition={{ 
              duration: 0.3,
              repeat: answers[questions[index].id] !== undefined ? 3 : 0,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default QuestionGroup;
