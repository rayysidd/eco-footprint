// src/components/Form/FormContainer.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaLeaf, FaCalculator } from "react-icons/fa";
import questions from "../../utils/questions";
import { calculateFootprint, getResultCategory } from "../../utils/calculations";
import { generateSuggestions } from "../../utils/suggestions";
import QuestionGroup from "./QuestionGroup";
import Card, { CardHeader, CardContent } from "../UI/Card"; // Assuming UI folder is at src/components/UI
import Button from "../UI/Button";
import { ProgressDisplay } from "../UI/ProgressBar";


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

    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const { totalScore, scores } = calculateFootprint(answers);
    const resultCategory = getResultCategory(totalScore);
    const suggestions = generateSuggestions(answers, totalScore);
    
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
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full mb-4 shadow-lg">
          <FaLeaf className="text-white text-2xl" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Carbon Footprint Calculator</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover your environmental impact and learn how to make a positive difference for our planet
        </p>
      </div>

      {/* Progress Bar - UPDATED */}
      <div className="mb-8">
        <ProgressDisplay progress={progress} />
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        <Card>
            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                 <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <FaLeaf className="text-green-600 text-sm" />
                    </div>
                    Environmental Impact Assessment
                </h2>
                <p className="text-gray-600 mt-2">Please answer all questions to calculate your carbon footprint</p>
            </CardHeader>
            <CardContent>
                <div className="space-y-8">
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
            </CardContent>
        </Card>

        {/* Submit Button - UPDATED */}
        <div className="flex justify-center">
            <Button
                type="submit"
                disabled={isSubmitting}
                icon={isSubmitting ? null : FaCalculator}
                className="min-w-[240px]"
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
                "Calculate My Footprint"
                )}
            </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default FormContainer;