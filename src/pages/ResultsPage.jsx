import React from 'react';
import { motion } from 'framer-motion';

// --- UI Components ---
// In a real app, these would be in their own files and imported.
const Card = ({ children, className }) => (
  <motion.div
    className={`bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden ${className}`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, ease: 'easeOut' }}
  >
    {children}
  </motion.div>
);

const CardContent = ({ children, className }) => (
  <div className={`p-8 ${className}`}>
    {children}
  </div>
);

const Button = ({ children, onClick, variant = 'primary', icon: Icon, className = '' }) => {
  const variantClasses = {
    primary: 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-xl focus:ring-green-300',
    secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-300',
  };

  return (
    <motion.button
      onClick={onClick}
      className={`relative inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold rounded-xl shadow-md transition-all duration-300 transform focus:outline-none focus:ring-4 ${variantClasses[variant]} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      {Icon && <Icon />}
      <span>{children}</span>
    </motion.button>
  );
};


// --- SVG ICONS ---
const FaIcon = ({ path, className="w-6 h-6" }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className={className} fill="currentColor"><path d={path} /></svg>;
const RedoIcon = () => <FaIcon className="text-lg" path="M463.5 224H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5z" />;
const SaveIcon = () => <FaIcon className="text-lg" path="M433.941 129.941l-83.882-83.882A48 48 0 0 0 316.118 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V163.882a48 48 0 0 0-14.059-33.941zM224 416c-35.346 0-64-28.654-64-64s28.654-64 64-64s64 28.654 64 64s-28.654 64-64 64zm96-304.52V212c0 6.627-5.373 12-12 12H76c-6.627 0-12-5.373-12-12V108c0-6.627 5.373-12 12-12h228.52c3.183 0 6.235 1.264 8.485 3.515l3.48 3.48A12 12 0 0 1 320 111.48z" />;
const ShareIcon = () => <FaIcon className="text-lg" path="M352 320c-22.9 0-43.4 7.6-60.3 20.2L160.2 272.1c.1-.8.2-1.7.2-2.5s-.1-1.7-.2-2.5L291.7 200c16.9 12.6 37.4 20.2 60.3 20.2 53 0 96-43 96-96s-43-96-96-96-96 43-96 96c0 .8.1 1.7.2 2.5L120.3 96.9C103.4 84.3 82.9 76.8 60.2 76.8 26.9 76.8 0 106.8 0 144s26.9 67.2 60.2 67.2c22.7 0 43.2-7.5 60-20.1l131.5 69.1c-.1.8-.2 1.7-.2 2.6s.1 1.8.2 2.6L120.3 415c-16.8-12.6-37.3-20.1-60-20.1-33.3 0-60.2 30-60.2 67.2s26.9 67.2 60.2 67.2 60.2-30 60.2-67.2c0-.9-.1-1.8-.2-2.6l131.5-69.1c16.8 12.6 37.3 20.1 60.3 20.1 53 0 96-43 96-96s-43-96-96-96z" />;


// --- Child Components to be imported ---
// These would be in their own files in a real project structure
// e.g., import ResultSummary from './ResultSummary';

const ResultSummary = ({ resultCategory }) => (
    <div className="text-center md:text-left">
        <h2 className="text-3xl font-bold mb-2">Your Result</h2>
        <div className={`text-2xl font-semibold mb-2 ${resultCategory.textColor}`}>
            {resultCategory.level.toUpperCase()} IMPACT
        </div>
        <p className="text-gray-600 text-lg max-w-md mx-auto md:mx-0">{resultCategory.message}</p>
    </div>
);

const VisualFeedback = ({ score, maxScore }) => {
    const percentage = (score / maxScore) * 100;
    const circumference = 2 * Math.PI * 45;
    const offset = circumference - (percentage / 100) * circumference;
    const color = percentage <= 33 ? '#22c55e' : percentage <= 66 ? '#f59e0b' : '#ef4444';

    return (
        <div className="relative flex items-center justify-center w-48 h-48 mx-auto">
            <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" stroke="#e5e7eb" strokeWidth="10" fill="transparent" />
                <motion.circle
                    cx="50" cy="50" r="45" stroke={color} strokeWidth="10" fill="transparent"
                    strokeLinecap="round" transform="rotate(-90 50 50)" strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: offset }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
                <motion.span className="text-5xl font-bold text-gray-800" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }}>{score}</motion.span>
                <span className="text-lg text-gray-500">/ {maxScore}</span>
            </div>
        </div>
    );
};

const ImprovementTips = ({ suggestions }) => (
    <Card>
        <CardContent>
            <h3 className="text-3xl font-bold text-gray-800 mb-6 text-center">Your Personalized Action Plan</h3>
            <div className="space-y-4">
                {suggestions.map((suggestion, index) => (
                    <motion.div 
                        key={index} 
                        className={`p-4 rounded-lg border-l-4 ${suggestion.priority === 'high' ? 'border-red-500 bg-red-50' : suggestion.priority === 'medium' ? 'border-yellow-500 bg-yellow-50' : 'border-green-500 bg-green-50'}`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + index * 0.1 }}
                    >
                        <h4 className="font-bold text-lg">{suggestion.title}</h4>
                        <p className="text-gray-700 mt-1">{suggestion.description}</p>
                    </motion.div>
                ))}
            </div>
        </CardContent>
    </Card>
);


// --- Main Results Page ---

const ResultsPage = ({ results, onRestart, maxScore }) => {
  if (!results) {
    // Fallback in case results are not passed correctly
    return (
      <div className="text-center p-8">
        <h1 className="text-2xl font-bold text-gray-700">Oops! No results found.</h1>
        <p className="text-gray-500 mt-2">It seems there was an issue calculating your score. Please try again.</p>
        <Button onClick={onRestart} className="mt-6">
          Start Over
        </Button>
      </div>
    );
  }

  return (
    <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        exit={{ opacity: 0, y: -20 }} 
        className="max-w-4xl mx-auto space-y-8 px-4"
    >
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Your Eco-Footprint Assessment
        </h1>
        <p className="text-gray-600">
          Here's the complete analysis of your environmental impact.
        </p>
      </div>

      <Card>
        <CardContent className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0">
                 <VisualFeedback score={results.totalScore} maxScore={maxScore} />
            </div>
            <div className="flex-grow">
                <ResultSummary 
                    resultCategory={results.resultCategory}
                />
            </div>
        </CardContent>
      </Card>
      
      <ImprovementTips suggestions={results.suggestions} />

      <div className="text-center bg-gray-50 p-8 rounded-2xl">
         <h3 className="text-2xl font-bold text-gray-800 mb-4">
           Ready to Make a Change?
         </h3>
        <div className="flex justify-center gap-4 flex-wrap">
          <Button onClick={onRestart} variant="secondary" icon={RedoIcon}>
            Take Again
          </Button>
          <Button onClick={() => window.print()} icon={SaveIcon}>
            Save Results
          </Button>
          <Button 
            onClick={() => {
              const shareText = `I just completed a carbon footprint assessment and got a score of ${results.totalScore}/${maxScore} (${results.resultCategory.level} impact)!`;
              if (navigator.share) {
                navigator.share({ title: 'My Eco-Footprint', text: shareText, url: window.location.href });
              } else {
                navigator.clipboard.writeText(shareText).then(() => alert('Results copied to clipboard!'));
              }
            }}
            icon={ShareIcon}
            className="from-purple-500 to-indigo-500 focus:ring-purple-300"
          >
            Share
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

// You would export this in a real scenario
export default ResultsPage;

