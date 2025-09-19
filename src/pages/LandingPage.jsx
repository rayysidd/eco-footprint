import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight, FaChartLine, FaLightbulb, FaQuestionCircle } from 'react-icons/fa';
import Button from '../components/UI/Button';

const LandingPage = () => {
  const featureVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
      },
    }),
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="text-center py-24 bg-gradient-to-b from-green-50 to-white">
        <div className="container mx-auto px-6">
          
          <motion.h1 
            className="text-5xl md:text-6xl font-extrabold text-gray-800 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Understand Your <span className="text-green-600">Carbon Footprint</span>
          </motion.h1>
          <motion.p 
            className="text-lg text-gray-600 max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Our simple calculator helps you measure your environmental impact and provides personalized tips to live more sustainably.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link to="/assessment">
              <Button icon={FaArrowRight} className="px-8 py-4 text-lg">
                Start Your Assessment
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800">How It Works</h2>
            <p className="text-gray-600 mt-2">Just three simple steps to a better planet.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {/* Step 1 */}
            <motion.div className="text-center" custom={0} variants={featureVariants} initial="hidden" animate="visible">
              <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <FaQuestionCircle className="text-4xl text-green-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-2">1. Answer Questions</h3>
              <p className="text-gray-600">Quickly answer a few questions about your lifestyle in key areas like travel, diet, and energy use.</p>
            </motion.div>
            {/* Step 2 */}
            <motion.div className="text-center" custom={1} variants={featureVariants} initial="hidden" animate="visible">
              <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <FaChartLine className="text-4xl text-green-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-2">2. Get Your Score</h3>
              <p className="text-gray-600">Receive an instant, detailed breakdown of your carbon footprint, highlighting your biggest impact areas.</p>
            </motion.div>
            {/* Step 3 */}
            <motion.div className="text-center" custom={2} variants={featureVariants} initial="hidden" animate="visible">
              <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <FaLightbulb className="text-4xl text-green-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-2">3. Receive Tips</h3>
              <p className="text-gray-600">Get a personalized action plan with practical, high-impact tips to help you reduce your footprint.</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;

