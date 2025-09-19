import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ 
  children, 
  className = '', 
  variant = 'default',
  size = 'medium',
  whileHover = { scale: 1.02, y: -2 },
  clickable = false,
  loading = false,
  ...props 
}) => {
  // Size variants
  const sizeClasses = {
    small: 'rounded-xl shadow-md',
    medium: 'rounded-2xl shadow-lg',
    large: 'rounded-3xl shadow-xl'
  };

  // Card variants with grey, white, green theme
  const variantClasses = {
    default: 'bg-white border border-gray-100',
    elevated: 'bg-white border border-gray-200 shadow-xl',
    success: 'bg-green-50 border border-green-200',
    info: 'bg-gray-50 border border-gray-200',
    outline: 'bg-transparent border-2 border-gray-300',
    gradient: 'bg-gradient-to-br from-white to-gray-50 border border-gray-100'
  };

  // Enhanced hover effects based on variant
  const getHoverEffect = () => {
    if (!clickable) return whileHover;
    
    const baseHover = { scale: 1.03, y: -4 };
    
    switch (variant) {
      case 'success':
        return { 
          ...baseHover, 
          boxShadow: "0 20px 40px rgba(34, 197, 94, 0.15)" 
        };
      case 'elevated':
        return { 
          ...baseHover, 
          boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)" 
        };
      default:
        return { 
          ...baseHover, 
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)" 
        };
    }
  };

  const cardVariants = {
    initial: { 
      opacity: 0, 
      y: 20, 
      scale: 0.95 
    },
    animate: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    hover: getHoverEffect(),
    tap: clickable ? { scale: 0.98 } : {}
  };

  return (
    <motion.div
      className={`
        ${sizeClasses[size]} 
        ${variantClasses[variant]} 
        overflow-hidden relative
        ${clickable ? 'cursor-pointer select-none' : ''}
        ${className}
      `}
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      whileTap="tap"
      {...props}
    >
      {/* Loading overlay */}
      {loading && (
        <motion.div
          className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="w-8 h-8 border-3 border-green-500 border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      )}

      {/* Hover shimmer effect for clickable cards */}
      {clickable && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-green-100/20 to-transparent opacity-0"
          whileHover={{ 
            opacity: 1,
            x: ["-100%", "100%"]
          }}
          transition={{ 
            x: { duration: 0.8, ease: "easeInOut" },
            opacity: { duration: 0.3 }
          }}
        />
      )}

      {/* Card content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

export const CardHeader = ({ 
  children, 
  className = '',
  variant = 'default'
}) => {
  const variantClasses = {
    default: 'border-b border-gray-100',
    success: 'border-b border-green-200 bg-green-25',
    gradient: 'border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white'
  };

  return (
    <motion.div 
      className={`px-6 py-4 ${variantClasses[variant]} ${className}`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      {children}
    </motion.div>
  );
};

export const CardContent = ({ 
  children, 
  className = '',
  spacing = 'medium'
}) => {
  const spacingClasses = {
    none: 'p-0',
    small: 'p-4',
    medium: 'p-6',
    large: 'p-8'
  };

  return (
    <motion.div 
      className={`${spacingClasses[spacing]} ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {children}
    </motion.div>
  );
};

export const CardFooter = ({ 
  children, 
  className = '',
  variant = 'default'
}) => {
  const variantClasses = {
    default: 'bg-gray-50 border-t border-gray-100',
    success: 'bg-green-50 border-t border-green-200',
    clean: 'bg-white border-t border-gray-100'
  };

  return (
    <motion.div 
      className={`px-6 py-4 ${variantClasses[variant]} ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

// Additional specialized card components
export const StatCard = ({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  className = '' 
}) => {
  return (
    <Card 
      variant="gradient" 
      size="medium" 
      clickable={true}
      className={className}
    >
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <motion.p 
              className="text-sm text-gray-600 mb-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {title}
            </motion.p>
            <motion.p 
              className="text-3xl font-bold text-gray-800"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 500 }}
            >
              {value}
            </motion.p>
            {trend && (
              <motion.p 
                className={`text-sm mt-1 ${
                  trend > 0 ? 'text-green-600' : 'text-gray-500'
                }`}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {trend > 0 ? '↗' : '→'} {Math.abs(trend)}%
              </motion.p>
            )}
          </div>
          {Icon && (
            <motion.div
              className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Icon className="text-green-600 text-xl" />
            </motion.div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export const FeatureCard = ({ 
  title, 
  description, 
  icon: Icon, 
  className = '' 
}) => {
  return (
    <Card 
      variant="default" 
      size="medium" 
      clickable={true}
      className={className}
    >
      <CardContent>
        <div className="text-center">
          {Icon && (
            <motion.div
              className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <Icon className="text-white text-2xl" />
            </motion.div>
          )}
          <motion.h3 
            className="text-xl font-bold text-gray-800 mb-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {title}
          </motion.h3>
          <motion.p 
            className="text-gray-600 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {description}
          </motion.p>
        </div>
      </CardContent>
    </Card>
  );
};

export default Card;
