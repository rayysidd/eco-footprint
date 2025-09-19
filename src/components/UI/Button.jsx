import React from 'react';
import { motion } from 'framer-motion';

const Button = ({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  icon: Icon,
  className = '',
  ...props
}) => {
  const baseClasses = `
    relative inline-flex items-center justify-center gap-2 px-6 py-3
    font-semibold rounded-xl shadow-md
    transition-all duration-300 transform
    focus:outline-none focus:ring-4
    disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none
  `;

  const variantClasses = {
    primary: 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-xl focus:ring-green-300',
    secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-300',
    danger: 'bg-gradient-to-r from-red-500 to-rose-600 text-white hover:shadow-xl focus:ring-red-300',
    ghost: 'bg-transparent text-gray-600 hover:bg-gray-100 focus:ring-gray-200 shadow-none',
  };

  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      {...props}
    >
      {Icon && <Icon className="text-lg" />}
      <span>{children}</span>
    </motion.button>
  );
};

export default Button;