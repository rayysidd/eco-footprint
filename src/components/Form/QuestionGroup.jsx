// src/components/Form/QuestionGroup.js
import React from "react";
import { motion } from "framer-motion";
import { 
  FaHome, FaCar, FaUtensils, FaShoppingCart,
  FaBolt, FaRoute, FaLeaf, FaRecycle 
} from "react-icons/fa";
import Question from "./Question";

const groupIcons = {
  "Energy & Home": FaHome,
  "Transport & Travel": FaCar,
  "Food & Habits": FaUtensils,
  "Shopping & Waste": FaShoppingCart,
};

const groupColors = {
  "Energy & Home": "from-blue-500 to-cyan-500",
  "Transport & Travel": "from-purple-500 to-pink-500", 
  "Food & Habits": "from-orange-500 to-red-500",
  "Shopping & Waste": "from-green-500 to-emerald-500",
};

const QuestionGroup = ({ title, questions, answers, onChange }) => {
  const IconComponent = groupIcons[title] || FaLeaf;
  const gradientColor = groupColors[title] || "from-gray-500 to-gray-600";
  
  const answeredCount = questions.filter(q => answers[q.id] !== undefined).length;
  const totalCount = questions.length;
  const completionPercentage = (answeredCount / totalCount) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all duration-300"
    >
      {/* Group Header */}
      <div className={`bg-gradient-to-r ${gradientColor} px-6 py-4 relative overflow-hidden`}>
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <IconComponent className="text-white text-lg" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{title}</h2>
              <p className="text-white/80 text-sm">
                {answeredCount} of {totalCount} questions completed
              </p>
            </div>
          </div>
          
          {/* Completion Badge */}
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 relative">
              <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-white/20"
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
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-bold text-white">
                  {Math.round(completionPercentage)}%
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12" />
      </div>

      {/* Questions */}
      <div className="p-6 space-y-6">
        {questions.map((q, index) => (
          <motion.div
            key={q.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
          >
            <Question
              question={q}
              value={answers[q.id]}
              onChange={onChange}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default QuestionGroup;
