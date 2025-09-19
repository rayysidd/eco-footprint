import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaLeaf, 
  FaCalculator,
  FaBars,
  FaTimes
} from 'react-icons/fa';

const Header = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isLandingPage = location.pathname === '/';

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const headerVariants = {
    scrolled: {
      backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(12px)',
      boxShadow: isScrolled 
        ? '0 4px 20px rgba(0,0,0,0.1)' 
        : '0 2px 10px rgba(0,0,0,0.05)',
      transition: { duration: 0.3 }
    }
  };

  const logoVariants = {
    hover: {
      scale: 1.05,
      rotate: 5,
      transition: { type: "spring", stiffness: 400 }
    },
    tap: { scale: 0.95 }
  };

  const leafVariants = {
    idle: {
      rotate: [0, 10, -10, 0],
      transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
    },
    hover: {
      rotate: 360,
      scale: 1.1,
      transition: { duration: 0.6 }
    }
  };

  return (
    <>
      <motion.header 
        className="fixed top-0 left-0 right-0 z-50 text-gray-800"
        variants={headerVariants}
        animate="scrolled"
      >
        <nav className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Enhanced Logo */}
            <motion.div
              variants={logoVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Link to="/" className="flex items-center gap-3 group">
                <motion.div
                  className="relative"
                  variants={leafVariants}
                  animate="idle"
                  whileHover="hover"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-xl">
                    <FaLeaf className="text-white text-2xl" />
                  </div>
                  
                  {/* Multi-layer pulsing rings */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl border-2 border-green-400"
                    animate={{
                      scale: [1, 1.15, 1],
                      opacity: [0.8, 0, 0.8]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  
                  <motion.div
                    className="absolute inset-0 rounded-2xl border border-green-300"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.6, 0, 0.6]
                    }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                  />

                  {/* Corner accent dots */}
                  <motion.div
                    className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"
                    animate={{ 
                      scale: [1, 1.3, 1],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                </motion.div>
                
                <div>
                  <motion.span 
                    className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent"
                    whileHover={{ scale: 1.02 }}
                  >
                    EcoCalc
                  </motion.span>
                  <div className="text-xs text-gray-500 -mt-1">
                    Carbon Calculator
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Desktop CTA Button */}
            <div className="hidden md:block">
              {isLandingPage && (
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/calculator"
                    className="px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-3"
                  >
                    <FaCalculator className="text-lg" />
                    <span>Start Assessment</span>
                  </Link>
                </motion.div>
              )}
            </div>

            {/* Mobile Menu Button (only show on landing page for mobile CTA) */}
            {isLandingPage && (
              <motion.button
                onClick={toggleMobileMenu}
                className="md:hidden p-3 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-green-600 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {isMobileMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
                </motion.div>
              </motion.button>
            )}
          </div>
        </nav>

        {/* Mobile CTA Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && isLandingPage && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm"
                onClick={() => setIsMobileMenuOpen(false)}
              />
              
              {/* CTA Panel */}
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="md:hidden absolute top-full left-4 right-4 mt-2 bg-white/95 backdrop-blur-lg rounded-2xl border border-gray-200 shadow-2xl overflow-hidden"
              >
                <div className="p-6">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    <Link
                      to="/calculator"
                      className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <FaCalculator className="text-xl" />
                      <span>Start Assessment</span>
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Spacer */}
      <div className="h-20" />
    </>
  );
};

export default Header;
