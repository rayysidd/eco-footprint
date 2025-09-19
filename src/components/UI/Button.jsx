import React from 'react';
import { motion } from 'framer-motion';

const Button = ({
  children,
  onClick,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  icon: Icon,
  iconPosition = 'left',
  className = '',
  fullWidth = false,
  ...props
}) => {
  const baseClasses = `
    relative inline-flex items-center justify-center gap-2
    font-semibold rounded-xl shadow-md
    transition-all duration-300 transform
    focus:outline-none focus:ring-4 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
    overflow-hidden
  `;

  // Size variants
  const sizeClasses = {
    small: 'px-4 py-2 text-sm',
    medium: 'px-6 py-3 text-base',
    large: 'px-8 py-4 text-lg'
  };

  // Color variants with grey, white, green theme
  const variantClasses = {
    primary: `
      bg-gradient-to-r from-green-500 to-green-600 text-white 
      hover:from-green-600 hover:to-green-700 hover:shadow-xl 
      focus:ring-green-300 focus:ring-offset-white
      border border-green-500 hover:border-green-600
    `,
    secondary: `
      bg-white text-gray-700 border-2 border-gray-300
      hover:bg-gray-50 hover:border-gray-400 hover:shadow-lg
      focus:ring-gray-300 focus:ring-offset-white
    `,
    ghost: `
      bg-transparent text-gray-600 border border-transparent
      hover:bg-gray-100 hover:text-gray-800
      focus:ring-gray-200 focus:ring-offset-white
      shadow-none hover:shadow-md
    `,
    success: `
      bg-gradient-to-r from-green-400 to-emerald-500 text-white
      hover:from-green-500 hover:to-emerald-600 hover:shadow-xl
      focus:ring-green-300 focus:ring-offset-white
      border border-green-400 hover:border-green-500
    `,
    danger: `
      bg-gradient-to-r from-gray-500 to-gray-600 text-white
      hover:from-gray-600 hover:to-gray-700 hover:shadow-xl
      focus:ring-gray-300 focus:ring-offset-white
      border border-gray-500 hover:border-gray-600
    `
  };

  const LoadingSpinner = () => (
    <motion.div
      className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  );

  const buttonVariants = {
    initial: { 
      scale: 1,
      boxShadow: "0 4px 14px 0 rgba(0, 0, 0, 0.1)" 
    },
    hover: { 
      scale: disabled || loading ? 1 : 1.02,
      boxShadow: disabled || loading 
        ? "0 4px 14px 0 rgba(0, 0, 0, 0.1)" 
        : "0 8px 25px 0 rgba(34, 197, 94, 0.15)",
      y: disabled || loading ? 0 : -1
    },
    tap: { 
      scale: disabled || loading ? 1 : 0.98,
      y: disabled || loading ? 0 : 0
    }
  };

  const iconVariants = {
    initial: { scale: 1, rotate: 0 },
    hover: { 
      scale: disabled || loading ? 1 : 1.1,
      rotate: disabled || loading ? 0 : 5
    }
  };

  const shimmerVariants = {
    initial: { x: "-100%" },
    hover: { x: "100%" }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <>
          <LoadingSpinner />
          <span>Loading...</span>
        </>
      );
    }

    const iconElement = Icon && (
      <motion.div variants={iconVariants}>
        <Icon className="text-lg" />
      </motion.div>
    );

    const textElement = <span>{children}</span>;

    if (iconPosition === 'right') {
      return (
        <>
          {textElement}
          {iconElement}
        </>
      );
    }

    return (
      <>
        {iconElement}
        {textElement}
      </>
    );
  };

  return (
    <motion.button
      type="button"
      onClick={disabled || loading ? undefined : onClick}
      disabled={disabled || loading}
      className={`
        ${baseClasses} 
        ${sizeClasses[size]} 
        ${variantClasses[variant]} 
        ${fullWidth ? 'w-full' : ''} 
        ${className}
      `}
      variants={buttonVariants}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      {...props}
    >
      {/* Shimmer effect on hover */}
      {!disabled && !loading && variant === 'primary' && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          variants={shimmerVariants}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
      )}

      {/* Ripple effect container */}
      <div className="relative z-10 flex items-center justify-center gap-2">
        {renderContent()}
      </div>

      {/* Background pulse for loading state */}
      {loading && (
        <motion.div
          className="absolute inset-0 bg-white/10 rounded-xl"
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
    </motion.button>
  );
};

export default Button;
