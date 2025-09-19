import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, animate } from 'framer-motion';
import Card, { CardContent, CardFooter } from '../components/UI/Card';
import Button from '../components/UI/Button';
import { FaRedo, FaSave, FaShareAlt, FaCar, FaUtensils, FaBolt, FaShoppingCart, FaRecycle, FaWater, FaTrash, FaDesktop, FaPlane, FaPowerOff } from 'react-icons/fa';

// --- Consolidated Components ---

// From VisualFeedback.jsx and its internal Counter
const Counter = ({ to }) => {
  const nodeRef = useRef();

  useEffect(() => {
    const node = nodeRef.current;
    const controls = animate(0, to, {
      duration: 2,
      ease: "easeOut",
      onUpdate(value) {
        if (node) {
          node.textContent = Math.round(value);
        }
      }
    });
    return () => controls.stop();
  }, [to]);

  return <span ref={nodeRef}>0</span>;
}

const VisualFeedback = ({ totalScore, resultCategory }) => {
  const maxScore = 50; // Max score from questions
  const scorePercentage = (totalScore / maxScore) * 100;
  const circumference = 2 * Math.PI * 55;

  const colorClass = resultCategory.level === 'low' ? 'text-green-500' : resultCategory.level === 'medium' ? 'text-yellow-500' : 'text-red-500';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4, duration: 0.7, ease: 'easeOut' }}
      className="relative flex items-center justify-center my-8 md:my-0"
    >
      <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r="55" strokeWidth="10" className="text-gray-200" stroke="currentColor" fill="transparent" />
        <motion.circle
          cx="60"
          cy="60"
          r="55"
          strokeWidth="10"
          strokeLinecap="round"
          className={colorClass}
          stroke="currentColor"
          fill="transparent"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - (scorePercentage / 100) * circumference }}
          transition={{ duration: 1.5, delay: 0.6, ease: "circOut" }}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span className={`text-5xl font-bold ${colorClass}`}>
           <Counter to={totalScore} />
        </span>
        <span className="text-gray-500 font-medium">Points</span>
      </div>
    </motion.div>
  );
};


// From ResultSummary.jsx
const ResultSummary = ({ resultCategory }) => {
  const colorClass = resultCategory.level === 'low' ? 'text-green-600' : resultCategory.level === 'medium' ? 'text-yellow-600' : 'text-red-600';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="text-center md:text-left"
    >
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        {resultCategory.level.toUpperCase()} IMPACT
      </h1>
      <p className={`text-lg font-semibold ${colorClass} mb-4`}>
        Your Score Indicates a {resultCategory.level} Environmental Footprint
      </p>
      <p className="text-gray-600 max-w-xl mx-auto md:mx-0">
        {resultCategory.message}
      </p>
    </motion.div>
  );
};


// From ImprovementTips.jsx
const ImprovementTips = ({ suggestions }) => {
    if (!suggestions || suggestions.length === 0) return null;
    return (
        <div>
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Personalized Action Plan</h2>
            <div className="space-y-4">
                {suggestions.map((suggestion, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + index * 0.1 }}
                        className={`p-4 rounded-lg border-l-4 ${suggestion.priority === 'high' ? 'border-red-500 bg-red-50' : suggestion.priority === 'medium' ? 'border-yellow-500 bg-yellow-50' : 'border-green-500 bg-green-50'}`}
                    >
                        <h4 className="font-bold text-lg text-gray-800">{suggestion.title}</h4>
                        <p className="text-gray-700 mt-1">{suggestion.description}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

// From ScoreBreakdown.jsx
const ScoreBreakdown = ({ scores }) => {
    const categoryDetails = {
        transportScore: { label: 'Transportation', icon: FaCar },
        dietScore: { label: 'Diet', icon: FaUtensils },
        energyScore: { label: 'Energy', icon: FaBolt },
        shoppingScore: { label: 'Shopping', icon: FaShoppingCart },
        habitsScore: { label: 'Recycling', icon: FaRecycle },
        waterScore: { label: 'Water Usage', icon: FaWater },
        wasteScore: { label: 'Waste', icon: FaTrash },
        digitalScore: { label: 'Digital', icon: FaDesktop },
        travelScore: { label: 'Air Travel', icon: FaPlane },
        appliancesScore: { label: 'Appliances', icon: FaPowerOff }
    };

    return (
        <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800 text-center">Detailed Score Breakdown</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                {Object.entries(scores).map(([key, score], index) => {
                    const { label, icon: Icon } = categoryDetails[key] || { label: key, icon: null };
                    const percentage = (score / 5) * 100;
                    const getColor = (s) => (s <= 2 ? 'bg-green-500' : s <= 3 ? 'bg-yellow-500' : 'bg-red-500');

                    return (
                        <motion.div key={key} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1, duration: 0.5 }}>
                            <div className="flex justify-between items-center mb-1">
                                <div className="flex items-center gap-2">
                                    {Icon && <Icon className="text-gray-500" />}
                                    <span className="font-medium text-gray-700">{label}</span>
                                </div>
                                <span className="font-bold text-gray-800">{score} / 5</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <motion.div className={`h-2.5 rounded-full ${getColor(score)}`} initial={{ width: 0 }} animate={{ width: `${percentage}%` }} transition={{ duration: 1, delay: index * 0.1, ease: 'easeOut' }} />
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};


// --- Main Results Page Component ---

const ResultsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [results, setResults] = useState(location.state?.results);

  useEffect(() => {
    if (!results) {
      const storedResults = sessionStorage.getItem('ecoCalcResults');
      if (storedResults) {
        setResults(JSON.parse(storedResults));
      }
    }
  }, [results]);

  const handleRestart = () => {
    sessionStorage.removeItem('ecoCalcResults');
    navigate('/assessment');
  };

  if (!results) {
    return (
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold">No results found!</h2>
        <p className="text-gray-600 my-4">Please complete the assessment first to see your results.</p>
        <Button onClick={() => navigate('/assessment')} icon={FaRedo}>
          Take Assessment
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-12 px-4 py-8">
      <Card>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="md:order-2">
              <VisualFeedback totalScore={results.totalScore} resultCategory={results.resultCategory} />
            </div>
            <div className="md:order-1">
              <ResultSummary resultCategory={results.resultCategory} />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <ScoreBreakdown scores={results.scores} />
        </CardFooter>
      </Card>
      
      <ImprovementTips suggestions={results.suggestions} />
      
      <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Finished Reviewing?
          </h3>
          <div className="flex justify-center gap-4 flex-wrap">
              <Button onClick={handleRestart} variant="secondary" icon={FaRedo}>
                  Take Again
              </Button>
              <Button 
  onClick={() => {
    navigate('/action-plan', { state: results });  // 👈 Pass results
  }} 
  variant="primary" 
  className="from-green-500 to-emerald-600 focus:ring-green-300"
>
  View Action Plan
</Button>

              <Button onClick={() => window.print()} variant="primary" icon={FaSave}>
                  Save Results
              </Button>
              <Button 
                onClick={() => {
                  const shareText = `I got a score of ${results.totalScore}/50! Check out your own eco-footprint.`;
                  if (navigator.share) {
                    navigator.share({ title: 'My Eco-Footprint', text: shareText, url: window.location.href });
                  } else {
                    navigator.clipboard.writeText(shareText).then(() => alert('Shareable link copied to clipboard!'));
                  }
                }}
                variant="primary" 
                icon={FaShareAlt}
                className="from-purple-500 to-indigo-500 focus:ring-purple-300"
              >
                  Share
              </Button>
          </div>
      </div>
    </div>
  );
};

export default ResultsPage;