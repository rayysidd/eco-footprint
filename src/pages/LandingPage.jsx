import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowRight, FaChartLine, FaLightbulb, FaQuestionCircle } from 'react-icons/fa';
import Button from '../components/UI/Button';
import { useInView } from 'react-intersection-observer';
import FloatingEarthCanvas from '../canvas/FloatingEarthCanvas';

const featureVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.3,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
  hover: {
    scale: 1.05,
    boxShadow: '0 8px 20px rgba(72, 187, 120, 0.3)',
    transition: { duration: 0.3 },
  },
};

const LandingPage = () => {
  // Intersection observer to trigger animations on scroll
  const { ref: featuresRef, inView: featuresInView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative text-center py-28 bg-gradient-to-b from-green-50 to-white overflow-hidden">
        {/* Background animated circles */}
        <motion.div
          className="absolute top-10 left-1/4 w-40 h-40 bg-green-200 rounded-full opacity-30 filter blur-3xl animate-blob"
          style={{ animationDelay: '0s' }}
          aria-hidden="true"
        />
        <motion.div
          className="absolute top-20 right-1/4 w-56 h-56 bg-green-300 rounded-full opacity-20 filter blur-2xl animate-blob animation-delay-2000"
          style={{ animationDelay: '2s' }}
          aria-hidden="true"
        />
        <motion.div
          className="absolute bottom-10 left-1/3 w-48 h-48 bg-green-100 rounded-full opacity-25 filter blur-3xl animate-blob animation-delay-4000"
          style={{ animationDelay: '4s' }}
          aria-hidden="true"
        />

        <div className="container mx-auto px-6 relative z-10">
          <motion.h1
            className="text-5xl md:text-6xl font-extrabold text-gray-800 mb-6"
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            Understand Your <span className="text-green-600">Carbon Footprint</span>
          </motion.h1>
          <motion.p
            className="text-lg text-gray-600 max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          >
            Our simple calculator helps you measure your environmental impact and provides personalized tips to live more sustainably.
          </motion.p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Link to="/assessment" aria-label="Start your carbon footprint assessment">
              <Button
                icon={FaArrowRight}
                className="px-10 py-4 text-lg bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white shadow-lg rounded-lg transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-green-300"
              >
                Start Your Assessment
              </Button>
            </Link>
          </motion.div>
        </div>
        {/* Add the floating cube below the hero content */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md h-72 pointer-events-none select-none opacity-70">
          <FloatingEarthCanvas />
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-2">How It Works</h2>
            <p className="text-gray-600 text-lg">Just three simple steps to a better planet.</p>
          </div>

          <div ref={featuresRef} className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            <AnimatePresence>
              {featuresInView &&
                [0, 1, 2].map((i) => {
                  const icons = [FaQuestionCircle, FaChartLine, FaLightbulb];
                  const titles = [
                    '1. Answer Questions',
                    '2. Get Your Score',
                    '3. Receive Tips',
                  ];
                  const descriptions = [
                    'Quickly answer a few questions about your lifestyle in key areas like travel, diet, and energy use.',
                    'Receive an instant, detailed breakdown of your carbon footprint, highlighting your biggest impact areas.',
                    'Get a personalized action plan with practical, high-impact tips to help you reduce your footprint.',
                  ];
                  const Icon = icons[i];

                  return (
                    <motion.div
                      key={i}
                      className="text-center bg-green-50 rounded-xl p-8 cursor-pointer select-none"
                      custom={i}
                      variants={featureVariants}
                      initial="hidden"
                      animate="visible"
                      whileHover="hover"
                      tabIndex={0}
                      role="button"
                      aria-label={titles[i]}
                    >
                      <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 shadow-md">
                        <Icon className="text-5xl text-green-600" />
                      </div>
                      <h3 className="text-2xl font-semibold mb-3 text-gray-800">{titles[i]}</h3>
                      <p className="text-gray-700 text-base leading-relaxed">{descriptions[i]}</p>
                    </motion.div>
                  );
                })}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Add some CSS for blob animation */}
      <style>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -20px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 30px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s !important;
        }
        .animation-delay-4000 {
          animation-delay: 4s !important;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;