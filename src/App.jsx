import { useState } from 'react';
import './App.css'
import FormContainer from './components/Form/FormContainer';

const App = () => {
  const [results, setResults] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const handleFormComplete = (calculationResults) => {
    console.log('Form completed with results:', calculationResults);
    setResults(calculationResults);
    setShowResults(true);
  };

  const handleRestart = () => {
    setResults(null);
    setShowResults(false);
  };

  // Helper function to get category names for scores
  const getCategoryName = (key) => {
    const categoryMap = {
      transportScore: 'Transportation',
      dietScore: 'Diet',  
      energyScore: 'Energy',
      shoppingScore: 'Shopping',
      habitsScore: 'Recycling/Reuse',
      waterScore: 'Water Usage',
      wasteScore: 'Waste Management',
      digitalScore: 'Digital Usage',
      travelScore: 'Air Travel', 
      appliancesScore: 'Appliances'
    };
    return categoryMap[key] || key;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {showResults && results ? (
        <div className="max-w-4xl mx-auto px-4">
          {/* Inline Results Display */}
          <div className="space-y-8">
            {/* Header */}
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-800 mb-2">
                Your Carbon Footprint Assessment
              </h1>
              <p className="text-gray-600">
                Complete analysis of your environmental impact and personalized action plan
              </p>
            </div>

            {/* Score Display Section */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="text-center mb-8">
                <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 ${
                  results.resultCategory.level === 'low' ? 'bg-green-100' :
                  results.resultCategory.level === 'medium' ? 'bg-yellow-100' : 'bg-red-100'
                }`}>
                  <div className="text-3xl">
                    {results.resultCategory.level === 'low' ? '🌿' :
                     results.resultCategory.level === 'medium' ? '⚡' : '⚠️'}
                  </div>
                </div>
                
                <h2 className="text-3xl font-bold mb-4">Your Results</h2>
                
                <div className="text-6xl font-bold text-gray-800 mb-2">
                  {results.totalScore}
                  <span className="text-2xl text-gray-500 ml-2">/ 50</span>
                </div>
                
                <div className={`text-xl font-semibold mb-2 ${
                  results.resultCategory.level === 'low' ? 'text-green-600' :
                  results.resultCategory.level === 'medium' ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {results.resultCategory.level.toUpperCase()} IMPACT
                </div>
                
                <p className="text-gray-600 text-lg">{results.resultCategory.message}</p>
              </div>
              
              {/* Score Breakdown */}
              <div className="border-t pt-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                  Detailed Score Breakdown
                </h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {Object.entries(results.scores).map(([key, score]) => (
                    <div key={key} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-700 font-medium">{getCategoryName(key)}:</span>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-lg">{score}</span>
                        <div className="flex">
                          {[1,2,3,4,5].map((dot) => (
                            <div 
                              key={dot} 
                              className={`w-2 h-2 rounded-full mx-0.5 ${
                                dot <= score ? 
                                  (score <= 2 ? 'bg-green-500' : 
                                   score <= 3 ? 'bg-yellow-500' : 'bg-red-500') 
                                  : 'bg-gray-200'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Suggestions Section */}
            {results.suggestions && results.suggestions.length > 0 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-3xl font-bold text-gray-800 mb-2">
                    Your Personalized Action Plan
                  </h3>
                  <p className="text-gray-600">
                    Based on your responses, here are the most impactful changes you can make
                  </p>
                </div>
                
                {results.suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className={`
                      bg-white rounded-xl p-6 shadow-md border-l-4 transition-all hover:shadow-lg
                      ${suggestion.priority === 'high' ? 'border-red-500' : 
                        suggestion.priority === 'medium' ? 'border-yellow-500' : 'border-green-500'}
                    `}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`
                        w-12 h-12 rounded-lg flex items-center justify-center text-2xl flex-shrink-0
                        ${suggestion.priority === 'high' ? 'bg-red-100' : 
                          suggestion.priority === 'medium' ? 'bg-yellow-100' : 'bg-green-100'}
                      `}>
                        {suggestion.category.includes('Transportation') ? '🚗' :
                         suggestion.category.includes('Diet') ? '🍽️' :
                         suggestion.category.includes('Energy') ? '⚡' :
                         suggestion.category.includes('Shopping') ? '🛒' :
                         suggestion.category.includes('Waste') ? '🗑️' :
                         suggestion.category.includes('Water') ? '💧' :
                         suggestion.category.includes('Travel') ? '✈️' :
                         suggestion.category.includes('Getting Started') ? '🚀' :
                         suggestion.category.includes('Leadership') ? '👑' : '🌱'}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <h4 className="text-xl font-semibold text-gray-800">
                            {suggestion.title}
                          </h4>
                          <span className={`
                            px-2 py-1 text-xs font-medium rounded-full
                            ${suggestion.priority === 'high' ? 'bg-red-100 text-red-700' : 
                              suggestion.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' : 
                              'bg-green-100 text-green-700'}
                          `}>
                            {suggestion.priority.toUpperCase()} PRIORITY
                          </span>
                        </div>
                        
                        <p className="text-gray-600 mb-4">{suggestion.description}</p>
                        
                        <div className="space-y-2 mb-4">
                          <h5 className="font-medium text-gray-800">Recommended Actions:</h5>
                          <div className="grid gap-2">
                            {suggestion.tips.slice(0, 4).map((tip, tipIndex) => (
                              <div key={tipIndex} className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                                <span className="text-gray-700 text-sm">{tip}</span>
                              </div>
                            ))}
                            {suggestion.tips.length > 4 && (
                              <p className="text-gray-500 text-sm italic ml-3.5">
                                +{suggestion.tips.length - 4} more recommendations available...
                              </p>
                            )}
                          </div>
                        </div>
                        
                        <div className="text-sm font-medium text-green-600 bg-green-50 px-3 py-2 rounded-lg inline-block">
                          💡 {suggestion.impact}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Summary and Action Buttons */}
            <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Ready to Make a Change? 
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Your assessment is complete! Remember, every small action counts toward creating a more sustainable future. 
                Start with one or two high-priority suggestions and build momentum from there.
              </p>
              
              <div className="flex justify-center gap-4 flex-wrap">
                <button 
                  onClick={handleRestart}
                  className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-lg"
                >
                  Take Assessment Again
                </button>
                <button 
                  onClick={() => window.print()}
                  className="px-8 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors shadow-lg"
                >
                  Save Your Results
                </button>
                <button 
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: 'My Carbon Footprint Assessment',
                        text: `I just completed a carbon footprint assessment and got a score of ${results.totalScore}/50 (${results.resultCategory.level} impact). Check it out!`,
                        url: window.location.href
                      });
                    } else {
                      // Fallback for browsers that don't support Web Share API
                      const shareText = `I just completed a carbon footprint assessment and got a score of ${results.totalScore}/50 (${results.resultCategory.level} impact)!`;
                      navigator.clipboard.writeText(shareText);
                      alert('Results copied to clipboard!');
                    }
                  }}
                  className="px-8 py-3 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition-colors shadow-lg"
                >
                  Share Results
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <FormContainer onComplete={handleFormComplete} />
      )}
    </div>
  );
};

export default App;