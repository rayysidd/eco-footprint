import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  FaLeaf, 
  FaGithub, 
  FaTwitter, 
  FaLinkedin, 
  FaInstagram,
  FaHeart,
  FaGlobe,
  FaRecycle,
  FaSeedling,
  FaTree,
  FaBolt,
  FaArrowUp,
  FaEnvelope,
  FaMapMarkerAlt
} from 'react-icons/fa';

// Configuration Constants
const FOOTER_CONFIG = {
  socialLinks: [
    { 
      icon: FaGithub, 
      label: 'GitHub', 
      href: 'https://github.com/ecocalc', 
      color: 'text-gray-500 hover:text-green-600' 
    },
    { 
      icon: FaTwitter, 
      label: 'Twitter', 
      href: 'https://twitter.com/ecocalc', 
      color: 'text-gray-500 hover:text-green-600' 
    },
    { 
      icon: FaLinkedin, 
      label: 'LinkedIn', 
      href: 'https://linkedin.com/company/ecocalc', 
      color: 'text-gray-500 hover:text-green-600' 
    },
    { 
      icon: FaInstagram, 
      label: 'Instagram', 
      href: 'https://instagram.com/ecocalc', 
      color: 'text-gray-500 hover:text-green-600' 
    }
  ],
  
  quickStats: [
    { icon: FaGlobe, value: '50K+', label: 'Users Worldwide' },
    { icon: FaRecycle, value: '2.3M', label: 'Tons CO₂ Tracked' },
    { icon: FaTree, value: '85%', label: 'Improvement Rate' },
    { icon: FaSeedling, value: '120+', label: 'Countries' }
  ],
  
  navigationLinks: [
    { label: 'Home', href: '/' },
    { label: 'Calculator', href: '/calculator' },
    { label: 'About', href: '/about' },
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
    { label: 'Contact', href: '/contact' }
  ],
  
  contact: {
    email: 'hello@ecocalc.app',
    location: 'Global Remote Team',
    website: 'Available Worldwide'
  }
};

// CSS Animation Particles Component
const FloatingParticles = ({ count = 15 }) => {
  const particles = useMemo(() => 
    Array.from({ length: count }, (_, i) => ({
      id: i,
      size: Math.random() * 4 + 2,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 10,
    })), [count]
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-green-500"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            opacity: 0.15
          }}
          animate={{
            y: [-20, -100, -20],
            x: [-10, 10, -10],
            opacity: [0.1, 0.2, 0.1],
            scale: [0.5, 1, 0.5]
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
const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Green gradient orb */}
      <motion.div
        className="absolute w-96 h-96 rounded-full blur-3xl opacity-8 bg-gradient-to-r from-green-400 to-green-300"
        style={{ top: '-20%', right: '-10%' }}
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
      
      {/* Grey gradient orb */}
      <motion.div
        className="absolute w-80 h-80 rounded-full blur-3xl opacity-6 bg-gradient-to-r from-gray-300 to-gray-200"
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

      {/* Small green accent orb */}
      <motion.div
        className="absolute w-64 h-64 rounded-full blur-2xl opacity-4 bg-gradient-to-r from-green-300 to-emerald-300"
        style={{ top: '30%', left: '20%' }}
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

const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [showNewsletter, setShowNewsletter] = useState(false);
  
  // Intersection Observer for animations
  const { ref: footerRef, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Parallax scroll effect
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  // Optimized scroll handler
  const scrollHandler = useMemo(
    () => {
      let ticking = false;
      return () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            setShowScrollTop(window.scrollY > 300);
            ticking = false;
          });
          ticking = true;
        }
      };
    },
    []
  );

  React.useEffect(() => {
    window.addEventListener('scroll', scrollHandler, { passive: true });
    return () => window.removeEventListener('scroll', scrollHandler);
  }, [scrollHandler]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for subscribing! 🌱');
    setNewsletterEmail('');
    setShowNewsletter(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <footer 
      ref={footerRef}
      className="relative overflow-hidden bg-white text-gray-900 border-t border-gray-200"
    >
      {/* Animated Background */}
      <AnimatedBackground />
      
      {/* Floating Particles */}
      {inView && <FloatingParticles count={12} />}

      {/* CSS Wave Separator */}
      <div className="absolute top-0 left-0 w-full overflow-hidden">
        <div 
          className="relative h-12 bg-gray-50"
          style={{
            clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 100%)',
          }}
        />
        <motion.div
          className="absolute top-0 w-full h-2 bg-gradient-to-r from-green-500 to-emerald-500"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
      </div>

      <motion.div
        className="relative z-10 container mx-auto px-6 py-16 mt-8"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        style={{ y }}
      >
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <motion.div 
              className="flex items-center gap-4 mb-6"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              {/* Animated Logo */}
              <motion.div
                className="relative w-16 h-16"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <div className="w-full h-full bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-xl">
                  <FaLeaf className="text-white text-2xl" />
                </div>
                
                {/* Pulsing ring */}
                <motion.div
                  className="absolute inset-0 rounded-full border-3 border-green-400"
                  animate={{ 
                    scale: [1, 1.3, 1], 
                    opacity: [1, 0, 1] 
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    ease: "easeInOut" 
                  }}
                />
                
                {/* Orbiting dots */}
                {[0, 90, 180, 270].map((rotation, index) => (
                  <motion.div
                    key={rotation}
                    className="absolute w-2 h-2 bg-green-400 rounded-full"
                    style={{
                      top: '50%',
                      left: '50%',
                      transformOrigin: '0 0',
                    }}
                    animate={{
                      rotate: rotation + 360,
                      x: 30,
                      y: -1,
                    }}
                    transition={{
                      rotate: {
                        duration: 8,
                        repeat: Infinity,
                        ease: "linear",
                        delay: index * 0.5
                      },
                      x: { duration: 0 },
                      y: { duration: 0 }
                    }}
                  />
                ))}
              </motion.div>

              <div>
                <motion.h3 
                  className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  EcoCalc
                </motion.h3>
                <motion.p 
                  className="text-sm text-gray-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  Carbon Calculator
                </motion.p>
              </div>
            </motion.div>
            
            <motion.p 
              className="mb-6 leading-relaxed text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              Empowering individuals to understand and reduce their environmental impact through 
              data-driven insights and personalized recommendations.
            </motion.p>

            {/* Enhanced Social Links */}
            <nav aria-label="Social media links">
              <div className="flex gap-3">
                {FOOTER_CONFIG.socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`relative w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 bg-white hover:bg-gray-50 border border-gray-200 ${social.color}`}
                    whileHover={{ 
                      scale: 1.15, 
                      y: -3,
                      boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      delay: 1 + index * 0.1, 
                      type: "spring",
                      stiffness: 500 
                    }}
                    aria-label={`Visit our ${social.label} profile`}
                  >
                    <social.icon className="text-xl" />
                    
                    {/* Hover effect ring */}
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-green-400 opacity-0"
                      whileHover={{ 
                        opacity: 1,
                        scale: 1.2
                      }}
                      transition={{ duration: 0.2 }}
                    />
                  </motion.a>
                ))}
              </div>
            </nav>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <motion.h4 
              className="text-xl font-bold mb-6 flex items-center gap-3 text-gray-800"
              whileHover={{ x: 5 }}
            >
              <FaBolt className="text-green-500 text-lg" />
              Quick Links
            </motion.h4>
            <nav aria-label="Footer navigation">
              <ul className="space-y-4">
                {FOOTER_CONFIG.navigationLinks.map((link, index) => (
                  <motion.li key={link.label}>
                    <motion.a
                      href={link.href}
                      className="relative block transition-all duration-300 text-gray-600 hover:text-green-600"
                      whileHover={{ x: 10 }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.2 + index * 0.1 }}
                    >
                      <span className="relative">
                        {link.label}
                        <motion.div
                          className="absolute bottom-0 left-0 h-0.5 bg-green-500"
                          initial={{ width: 0 }}
                          whileHover={{ width: "100%" }}
                          transition={{ duration: 0.3 }}
                        />
                      </span>
                    </motion.a>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </motion.div>

          {/* Impact Stats */}
          <motion.div variants={itemVariants}>
            <motion.h4 
              className="text-xl font-bold mb-6 flex items-center gap-3 text-gray-800"
              whileHover={{ x: 5 }}
            >
              <FaGlobe className="text-green-500 text-lg" />
              Our Impact
            </motion.h4>
            <div className="space-y-4">
              {FOOTER_CONFIG.quickStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="flex items-center gap-4 p-4 rounded-2xl shadow-lg transition-all duration-300 bg-white hover:bg-gray-50 border border-gray-100"
                  whileHover={{ 
                    scale: 1.03,
                    boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5 + index * 0.1 }}
                >
                  <motion.div 
                    className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-md"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <stat.icon className="text-white text-lg" />
                  </motion.div>
                  <div>
                    <motion.div 
                      className="text-2xl font-bold text-gray-800"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ 
                        delay: 1.7 + index * 0.1,
                        type: "spring",
                        stiffness: 500
                      }}
                    >
                      {stat.value}
                    </motion.div>
                    <div className="text-sm text-gray-600">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Newsletter & Contact */}
          <motion.div variants={itemVariants}>
            <motion.h4 
              className="text-xl font-bold mb-6 flex items-center gap-3 text-gray-800"
              whileHover={{ x: 5 }}
            >
              <FaEnvelope className="text-green-500 text-lg" />
              Stay Updated
            </motion.h4>
            
            {/* Newsletter Form */}
            <motion.div
              className="mb-6 p-6 rounded-2xl shadow-lg border bg-white border-gray-100"
              whileHover={{ 
                boxShadow: "0 15px 35px rgba(0,0,0,0.1)",
                y: -2
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.8 }}
            >
              <p className="text-sm mb-4 text-gray-600">
                Get eco-tips and updates delivered to your inbox
              </p>
              
              <AnimatePresence mode="wait">
                {!showNewsletter ? (
                  <motion.button
                    key="newsletter-button"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    onClick={() => setShowNewsletter(true)}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-md hover:shadow-lg"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    aria-label="Subscribe to newsletter"
                  >
                    🌱 Subscribe to Newsletter
                  </motion.button>
                ) : (
                  <motion.form
                    key="newsletter-form"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    onSubmit={handleNewsletterSubmit}
                    className="space-y-3"
                  >
                    <label htmlFor="newsletter-email" className="sr-only">
                      Email address
                    </label>
                    <motion.input
                      initial={{ scale: 0.95 }}
                      animate={{ scale: 1 }}
                      id="newsletter-email"
                      type="email"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 rounded-lg text-sm focus:outline-none focus:ring-3 focus:ring-green-500 transition-all duration-300 bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500"
                      required
                      autoComplete="email"
                    />
                    <div className="flex gap-2">
                      <motion.button
                        type="submit"
                        className="flex-1 bg-green-500 text-white py-3 px-4 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors shadow-md"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        aria-label="Submit newsletter subscription"
                      >
                        Subscribe
                      </motion.button>
                      <motion.button
                        type="button"
                        onClick={() => setShowNewsletter(false)}
                        className="px-4 py-3 rounded-lg text-sm font-medium transition-colors text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        aria-label="Cancel newsletter subscription"
                      >
                        Cancel
                      </motion.button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Contact Info */}
            <address className="space-y-4 text-sm not-italic text-gray-600">
              {[
                { icon: FaMapMarkerAlt, text: FOOTER_CONFIG.contact.location, color: 'text-green-500' },
                { icon: FaEnvelope, text: FOOTER_CONFIG.contact.email, color: 'text-green-500', isEmail: true },
                { icon: FaGlobe, text: FOOTER_CONFIG.contact.website, color: 'text-green-500' }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 2 + index * 0.1 }}
                  whileHover={{ x: 5 }}
                >
                  <item.icon className={`${item.color} text-lg`} />
                  {item.isEmail ? (
                    <a 
                      href={`mailto:${item.text}`}
                      className="hover:underline hover:text-green-600 transition-colors"
                    >
                      {item.text}
                    </a>
                  ) : (
                    <span>{item.text}</span>
                  )}
                </motion.div>
              ))}
            </address>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          className="border-t pt-8 mt-12 border-gray-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <motion.div 
              className="flex items-center gap-2 text-gray-600"
              whileHover={{ scale: 1.02 }}
            >
              <span>&copy; {new Date().getFullYear()} EcoCalc. All Rights Reserved.</span>
            </motion.div>
            
            <motion.div 
              className="flex items-center gap-2 text-gray-600"
              whileHover={{ scale: 1.02 }}
            >
              <span>Made with</span>
              <motion.div
                animate={{ 
                  scale: [1, 1.3, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <FaHeart className="text-green-500 text-lg" />
              </motion.div>
              <span>for the planet 🌍</span>
            </motion.div>
          </div>

          {/* Environmental Message */}
          <motion.div
            className="text-center mt-8 p-6 rounded-2xl border bg-green-50 border-green-200"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 3 }}
            whileHover={{ scale: 1.02 }}
          >
            <motion.p 
              className="font-semibold text-green-700"
              animate={{ 
                textShadow: [
                  "0 0 0px rgba(34, 197, 94, 0)",
                  "0 0 10px rgba(34, 197, 94, 0.3)",
                  "0 0 0px rgba(34, 197, 94, 0)"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              🌱 This website is carbon neutral - powered by renewable energy
            </motion.p>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Enhanced Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0, rotate: 180 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-full shadow-xl flex items-center justify-center z-50 hover:from-green-600 hover:to-green-700 transition-all duration-300"
            whileHover={{ 
              scale: 1.1,
              boxShadow: "0 20px 40px rgba(34, 197, 94, 0.3)"
            }}
            whileTap={{ scale: 0.9 }}
            aria-label="Scroll to top of page"
          >
            <motion.div
              animate={{ y: [-2, 2, -2] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <FaArrowUp className="text-xl" />
            </motion.div>
            
            {/* Pulsing ring */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-white"
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.5, 0, 0.5]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default Footer;
