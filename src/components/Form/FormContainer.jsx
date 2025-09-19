import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaLeaf, FaCalculator, FaChevronRight, FaChevronLeft, FaCheckCircle, FaRocket } from "react-icons/fa";
import questions from "../../utils/questions";
import { calculateFootprint, getResultCategory } from "../../utils/calculations";
import { generateSuggestions } from "../../utils/suggestions";
import QuestionGroup from "./QuestionGroup";
import Card, { CardHeader, CardContent } from "../UI/Card";
import Button from "../UI/Button";
import { ProgressDisplay } from "../UI/ProgressBar";

// CSS Animation Particles Component
const FloatingParticles = ({ count = 15, progress = 0 }) => {
  const particles = useMemo(() => 
    Array.from({ length: count }, (_, i) => ({
      id: i,
      size: Math.random() * 6 + 3,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 10,
      color: progress > 50 ? '#10b981' : '#6b7280', // Green when progress > 50%, grey otherwise
    })), [count, progress]
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full opacity-20"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            backgroundColor: particle.color,
          }}
          animate={{
            y: [-20, -100, -20],
            x: [-15, 15, -15],
            opacity: [0.1, 0.4, 0.1],
            scale: [0.5, 1.2, 0.5]
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

// Animated Background Gradient
const AnimatedBackground = ({ progress }) => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Main gradient orb */}
      <motion.div
        className="absolute w-96 h-96 rounded-full blur-3xl opacity-10"
        style={{ 
          top: '-20%', 
          right: '-10%',
          background: progress > 75 
            ? 'linear-gradient(45deg, #10b981, #059669)' 
            : 'linear-gradient(45deg, #6b7280, #4b5563)'
        }}
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      {/* Secondary gradient orb */}
      <motion.div
        className="absolute w-80 h-80 rounded-full blur-3xl opacity-8 bg-gradient-to-r from-gray-300 to-gray-200"
        style={{ bottom: '-10%', left: '-5%' }}
        animate={{
          scale: [1, 1.1, 1],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Progress-based accent orb */}
      <motion.div
        className="absolute w-64 h-64 rounded-full blur-2xl opacity-6"
        style={{ 
          top: '30%', 
          left: '20%',
          background: progress > 25 
            ? 'linear-gradient(45deg, #10b981, #34d399)' 
            : 'linear-gradient(45deg, #9ca3af, #6b7280)'
        }}
        animate={{
          scale: [0.8, 1.2, 0.8],
          x: [-20, 20, -20],
          y: [-10, 10, -10],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
};

const groupedQuestions = {
  "Energy & Home": ["energy", "appliances"],
  "Transport & Travel": ["transport", "travel"],
  "Food & Habits": ["diet", "habits", "water"],
  "Shopping & Waste": ["shopping", "waste", "digital"],
};

const FormContainer = ({ onComplete }) => {
  const [answers, setAnswers] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [isStepMode, setIsStepMode] = useState(false);

  const groupEntries = Object.entries(groupedQuestions);
  const currentGroup = groupEntries[currentGroupIndex];
  const totalQuestions = questions.length;
  const answeredQuestions = Object.keys(answers).length;
  const progress = (answeredQuestions / totalQuestions) * 100;

  // Sound effect simulation
  const playSound = (type) => {
    console.log(`Playing ${type} sound`);
  };

  const handleChange = (questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: Number(value),
    }));
    
    // Clear validation error for this question
    if (validationErrors[questionId]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[questionId];
        return newErrors;
      });
    }
    
    playSound('click');
  };

  const validateCurrentGroup = () => {
    if (!currentGroup) return true;
    
    const [, questionIds] = currentGroup;
    const groupQuestions = questions.filter(q => questionIds.includes(q.id));
    const errors = {};
    
    groupQuestions.forEach(question => {
      if (answers[question.id] === undefined) {
        errors[question.id] = "This question is required";
      }
    });
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const nextGroup = () => {
    if (validateCurrentGroup() && currentGroupIndex < groupEntries.length - 1) {
      setCurrentGroupIndex(prev => prev + 1);
      playSound('success');
    }
  };

  const prevGroup = () => {
    if (currentGroupIndex > 0) {
      setCurrentGroupIndex(prev => prev - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (Object.keys(answers).length !== questions.length) {
      const missing = {};
      questions.forEach(q => {
        if (answers[q.id] === undefined) {
          missing[q.id] = "Please answer this question";
        }
      });
      setValidationErrors(missing);
      return;
    }

    setIsSubmitting(true);
    playSound('calculating');

    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const { totalScore, scores } = calculateFootprint(answers);
    const resultCategory = getResultCategory(totalScore);
    const suggestions = generateSuggestions(answers, totalScore);
    
    setShowSuccess(true);
    playSound('success');
    
    setTimeout(() => {
      onComplete({
        totalScore,
        scores,
        resultCategory,
        suggestions,
        answers
      });
    }, 1500);
    
    setIsSubmitting(false);
  };

  // Auto-save answers to localStorage
  useEffect(() => {
    localStorage.setItem('ecoFootprintAnswers', JSON.stringify(answers));
  }, [answers]);

  // Load saved answers on mount
  useEffect(() => {
    const saved = localStorage.getItem('ecoFootprintAnswers');
    if (saved) {
      try {
        setAnswers(JSON.parse(saved));
      } catch (e) {
        console.log('Error loading saved answers');
      }
    }
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Animated Background */}
      <AnimatedBackground progress={progress} />
      
      {/* Floating Particles */}
      <FloatingParticles count={12} progress={progress} />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-6xl mx-auto px-4 py-8"
      >
        {/* Enhanced Header */}
        <motion.div 
          variants={itemVariants}
          className="text-center mb-12"
        >
          <motion.div 
            className="relative inline-flex items-center justify-center w-24 h-24 mb-6"
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ duration: 0.8 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-green-500 via-green-600 to-emerald-600 rounded-full shadow-2xl"></div>
            <div className="absolute inset-2 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full"></div>
            <FaLeaf className="relative text-white text-3xl z-10" />
            
            {/* Animated rings */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-green-400"
              animate={{ rotate: 360, scale: [1, 1.2, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            
            {/* Progress-based outer ring */}
            <motion.div
              className="absolute -inset-2 rounded-full border-2 border-gray-300"
              animate={{ 
                borderColor: progress > 50 ? '#10b981' : '#d1d5db',
                rotate: progress * 3.6 // 360 degrees when 100%
              }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>
          
          <motion.h1 
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-gray-700 bg-clip-text text-transparent mb-4"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
          >
            Carbon Footprint Calculator
          </motion.h1>
          
          <motion.p 
            className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Discover your environmental impact through our interactive assessment and receive 
            personalized recommendations to create a more sustainable lifestyle
          </motion.p>
        </motion.div>

        {/* Enhanced Progress Section */}
        <motion.div variants={itemVariants} className="mb-8">
          <Card className="bg-white border border-gray-200 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <motion.div 
                    className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg"
                    animate={{ 
                      backgroundColor: progress === 100 ? '#10b981' : '#6b7280'
                    }}
                  >
                    <FaCheckCircle className="text-white text-xl" />
                  </motion.div>
                  <div>
                    <h3 className="font-bold text-gray-800">Assessment Progress</h3>
                    <p className="text-sm text-gray-600">
                      {answeredQuestions} of {totalQuestions} questions completed
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <motion.div 
                    className="text-3xl font-bold"
                    animate={{ 
                      color: progress === 100 ? '#10b981' : '#059669'
                    }}
                  >
                    {Math.round(progress)}%
                  </motion.div>
                  <div className="text-sm text-gray-500">Complete</div>
                </div>
              </div>
              
              <ProgressDisplay progress={progress} className="mb-4" />
              
              {/* Step Mode Toggle */}
              <div className="flex items-center justify-between">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsStepMode(!isStepMode)}
                  className="text-sm text-gray-600 hover:text-green-600 font-medium transition-colors duration-300"
                >
                  {isStepMode ? '📝 Show All Questions' : '📋 Step-by-Step Mode'}
                </motion.button>
                
                {progress > 0 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-2 text-green-600"
                  >
                    <FaCheckCircle />
                    <span className="text-sm font-medium">Auto-saved</span>
                  </motion.div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="space-y-8">
          <AnimatePresence mode="wait">
            {isStepMode ? (
              // Step-by-step mode
              <motion.div
                key={currentGroupIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="overflow-hidden shadow-2xl border border-gray-200">
                  <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-2xl font-bold flex items-center gap-3">
                          <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold">{currentGroupIndex + 1}</span>
                          </div>
                          {currentGroup?.[0]}
                        </h2>
                        <p className="text-green-100 mt-2">
                          Step {currentGroupIndex + 1} of {groupEntries.length}
                        </p>
                      </div>

                      <div className="text-right">
                        <div className="text-sm opacity-75">Progress</div>
                        <div className="text-2xl font-bold">
                          {Math.round(((currentGroupIndex + 1) / groupEntries.length) * 100)}%
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="p-8 bg-white">
                    {currentGroup && (
                      <QuestionGroup
                        title={currentGroup[0]}
                        questions={questions.filter((q) => currentGroup[1].includes(q.id))}
                        answers={answers}
                        onChange={handleChange}
                        validationErrors={validationErrors}
                      />
                    )}

                    {/* Step Navigation */}
                    <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                      <Button
                        type="button"
                        onClick={prevGroup}
                        disabled={currentGroupIndex === 0}
                        variant="secondary"
                        icon={FaChevronLeft}
                      >
                        Previous
                      </Button>

                      {currentGroupIndex < groupEntries.length - 1 ? (
                        <Button
                          type="button"
                          onClick={nextGroup}
                          icon={FaChevronRight}
                          className="ml-auto"
                        >
                          Next Section
                        </Button>
                      ) : (
                        <Button
                          type="submit"
                          disabled={isSubmitting || progress < 100}
                          icon={isSubmitting ? null : FaCalculator}
                          className="ml-auto min-w-[200px]"
                        >
                          {isSubmitting ? (
                            <div className="flex items-center gap-3">
                              <motion.div
                                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              />
                              <span>Calculating...</span>
                            </div>
                          ) : (
                            "Calculate Footprint"
                          )}
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              // All questions mode
              <motion.div variants={itemVariants} className="space-y-8">
                <Card className="overflow-hidden shadow-2xl border border-gray-200">
                  <CardHeader className="bg-gray-50 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                        <FaLeaf className="text-white text-lg" />
                      </div>
                      Environmental Impact Assessment
                    </h2>
                    <p className="text-gray-600 mt-2">
                      Complete all sections to get your personalized carbon footprint analysis
                    </p>
                  </CardHeader>

                  <CardContent className="p-8 bg-white">
                    <div className="space-y-12">
                      {Object.entries(groupedQuestions).map(([groupTitle, ids], index) => (
                        <motion.div
                          key={groupTitle}
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 * index, duration: 0.5 }}
                        >
                          <QuestionGroup
                            title={groupTitle}
                            questions={questions.filter((q) => ids.includes(q.id))}
                            answers={answers}
                            onChange={handleChange}
                            validationErrors={validationErrors}
                          />
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Submit Button */}
                <motion.div
                  className="flex justify-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <Button
                    type="submit"
                    disabled={isSubmitting || progress < 100}
                    icon={isSubmitting ? null : FaRocket}
                    className="min-w-[300px] text-lg py-4 shadow-2xl"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-3">
                        <motion.div
                          className="w-6 h-6 border-3 border-white border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        <span>Analyzing Your Impact...</span>
                      </div>
                    ) : progress < 100 ? (
                      `Complete ${totalQuestions - answeredQuestions} more questions`
                    ) : (
                      "🌍 Calculate My Carbon Footprint"
                    )}
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>

        {/* Success Animation */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            >
              <motion.div
                className="bg-white rounded-3xl p-8 text-center shadow-2xl max-w-md mx-4 border border-gray-200"
                initial={{ y: 50 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <motion.div
                  className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4"
                  animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                >
                  <FaCheckCircle className="text-white text-3xl" />
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Calculation Complete!</h3>
                <p className="text-gray-600">Preparing your personalized results...</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default FormContainer;
