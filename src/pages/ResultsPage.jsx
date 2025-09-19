// src/pages/ResultsPage.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Card, { CardContent, CardFooter } from '../components/UI/Card';
import Button from '../components/UI/Button';
import ScoreGauge from '../components/Results/ScoreGauge'; // 👈 Import
import ScoreBreakdown from '../components/Results/ScoreBreakdown'; // 👈 Import
import { FaRedo, FaSave, FaShareAlt } from 'react-icons/fa';

const ResultsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { results } = location.state || {};

  if (!results) {
    // ... (no changes to this part)
  }

  const handleRestart = () => navigate('/');

  return (
    <div className="max-w-4xl mx-auto space-y-8 px-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Your Eco-Footprint Assessment
        </h1>
        <p className="text-gray-600">
          Here's the complete analysis of your environmental impact.
        </p>
      </div>

      {/* Score Display Section - UPDATED */}
      <Card>
        <CardContent>
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Your Total Score</h2>
            
            {/* 👇 Replace old score display with the new Gauge component */}
            <ScoreGauge score={results.totalScore} maxScore={50} />

            <div className={`text-xl font-semibold mt-4 mb-2 ${
              results.resultCategory.level === 'low' ? 'text-green-600' :
              results.resultCategory.level === 'medium' ? 'text-yellow-600' : 'text-red-600'
            }`}>
              {results.resultCategory.level.toUpperCase()} IMPACT
            </div>
            <p className="text-gray-600 text-lg max-w-md mx-auto">{results.resultCategory.message}</p>
          </div>
        </CardContent>

        {/* 👇 Replace old breakdown with the new ScoreBreakdown component */}
        <CardFooter>
          <ScoreBreakdown scores={results.scores} />
        </CardFooter>
      </Card>
      
      {/* ... (Suggestions section can stay here) ... */}

      {/* Action Buttons (no changes here) */}
      <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Ready to Make a Change?
          </h3>
          <div className="flex justify-center gap-4 flex-wrap">
              <Button onClick={handleRestart} variant="secondary" icon={FaRedo}>
                  Take Again
              </Button>
              <Button onClick={() => window.print()} variant="primary" icon={FaSave}>
                  Save Results
              </Button>
              <Button 
                onClick={() => navigator.share ? navigator.share({ title: 'My Eco-Footprint', text: `I got a score of ${results.totalScore}/50!`, url: window.location.href }) : alert('Share not supported')}
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