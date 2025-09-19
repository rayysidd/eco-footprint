// src/components/Form/FormContainer.js
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaLeaf, FaCalculator } from "react-icons/fa";
import questions from "../../utils/questions";
import { calculateFootprint, getResultCategory } from "../../utils/calculations";
import { generateSuggestions } from "../../utils/suggestions";
import QuestionGroup from "./QuestionGroup";

const groupedQuestions = {
  "Energy & Home": ["energy", "appliances"],
  "Transport & Travel": ["transport", "travel"], 
  "Food & Habits": ["diet", "habits", "water"],
  "Shopping & Waste": ["shopping", "waste", "digital"],
};

const FormContainer = ({ onComplete }) => {
  const [answers, setAnswers] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: Number(value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (Object.keys(answers).length !== questions.length) {
      alert("Please answer all questions 🙂");
      setIsSubmitting(false);
      return;
    }

    // Simulate processing time for smooth UX
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Calculate the footprint using your utility function
    const { totalScore, scores } = calculateFootprint(answers);
    
    // Get the result category based on total score
    const resultCategory = getResultCategory(totalScore);
    
    // Generate suggestions based on answers and score
    const suggestions = generateSuggestions(answers, totalScore);
    
    // Pass all results to parent component
    onComplete({
      totalScore,
      scores,
      resultCategory,
      suggestions,
      answers
    });
    
    setIsSubmitting(false);
  };

  const progress = (Object.keys(answers).length / questions.length) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-w-4xl mx-auto"
    >
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full mb-4 shadow-lg">
          <FaLeaf className="text-white text-2xl" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Carbon Footprint Calculator</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover your environmental impact and learn how to make a positive difference for our planet
        </p>
      </motion.div>

      {/* Progress Bar */}
      <motion.div 
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="mb-8"
      >
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Progress</span>
          <span className="text-sm font-medium text-green-600">{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
          <motion.div 
            className="h-2.5 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          />
        </div>
      </motion.div>

      {/* Form */}
      <motion.form
        onSubmit={handleSubmit}
        className="space-y-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-8 py-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <FaLeaf className="text-green-600 text-sm" />
              </div>
              Environmental Impact Assessment
            </h2>
            <p className="text-gray-600 mt-2">Please answer all questions to calculate your carbon footprint</p>
          </div>

          <div className="p-8 space-y-8">
            {Object.entries(groupedQuestions).map(([groupTitle, ids], index) => (
              <motion.div
                key={groupTitle}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
              >
                <QuestionGroup
                  title={groupTitle}
                  questions={questions.filter((q) => ids.includes(q.id))}
                  answers={answers}
                  onChange={handleChange}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex justify-center"
        >
          <motion.button
            type="submit"
            disabled={isSubmitting}
            className={`
              relative inline-flex items-center justify-center gap-3 px-8 py-4 
              bg-gradient-to-r from-green-600 to-emerald-600 
              text-white font-semibold rounded-xl shadow-lg 
              transition-all duration-300 transform hover:scale-105 
              hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-green-300
              disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none
              min-w-[200px]
            `}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isSubmitting ? (
              <>
                <motion.div
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <span>Calculating...</span>
              </>
            ) : (
              <>
                <FaCalculator className="text-lg" />
                <span>Calculate My Footprint</span>
              </>
            )}
          </motion.button>
        </motion.div>
      </motion.form>
    </motion.div>
  );
};

export default FormContainer;
