import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ children, className, whileHover = { scale: 1.02 }, ...props }) => {
  return (
    <motion.div
      className={`bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      whileHover={whileHover}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const CardHeader = ({ children, className }) => (
  <div className={`px-8 py-6 border-b border-gray-100 ${className}`}>
    {children}
  </div>
);

export const CardContent = ({ children, className }) => (
  <div className={`p-8 ${className}`}>
    {children}
  </div>
);

export const CardFooter = ({ children, className }) => (
  <div className={`bg-gray-50 px-8 py-4 border-t border-gray-100 ${className}`}>
    {children}
  </div>
);

export default Card;