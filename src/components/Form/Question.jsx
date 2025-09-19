// src/components/Form/Question.js
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheck, FaQuestion } from "react-icons/fa";

const Question = ({ question, value, onChange }) => {
  return (
    <motion.div 
      className="space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Question Header */}
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
          <FaQuestion className="text-gray-600 text-sm" />
        </div>
        <h3 className="font-semibold text-gray-800 text-lg leading-relaxed">
          {question.text}
        </h3>
      </div>

      {/* Options */}
      <div className="ml-11 space-y-3">
        <AnimatePresence>
          {question.options.map((opt, index) => {
            const isSelected = value === opt.value;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                <label
                  className={`
                    relative flex items-center p-4 rounded-xl cursor-pointer 
                    border-2 transition-all duration-300 group
                    ${isSelected
                      ? "bg-gradient-to-r from-green-50 to-emerald-50 border-green-400 shadow-md"
                      : "bg-gray-50 border-gray-200 hover:border-green-300 hover:bg-green-50/50"
                    }
                  `}
                >
                  {/* Custom Radio Button */}
                  <div className="relative flex-shrink-0">
                    <input
                      type={question.type}
                      name={question.id}
                      value={opt.value}
                      checked={isSelected}
                      onChange={(e) => onChange(question.id, e.target.value)}
                      className="sr-only"
                    />
                    <div className={`
                      w-5 h-5 rounded-full border-2 transition-all duration-200
                      ${isSelected 
                        ? "border-green-500 bg-green-500" 
                        : "border-gray-300 group-hover:border-green-400"
                      }
                    `}>
                      <AnimatePresence>
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="w-full h-full flex items-center justify-center"
                          >
                            <FaCheck className="text-white text-xs" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Option Text */}
                  <span className={`
                    ml-4 text-gray-700 font-medium transition-colors duration-200
                    ${isSelected ? "text-gray-800" : "group-hover:text-gray-800"}
                  `}>
                    {opt.label}
                  </span>

                  {/* Selection Indicator */}
                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        className="ml-auto"
                      >
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <FaCheck className="text-white text-xs" />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Hover Effect */}
                  <div className={`
                    absolute inset-0 rounded-xl transition-opacity duration-300
                    ${isSelected 
                      ? "bg-gradient-to-r from-green-400/10 to-emerald-400/10" 
                      : "bg-green-400/0 group-hover:bg-green-400/5"
                    }
                  `} />
                </label>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Question;
