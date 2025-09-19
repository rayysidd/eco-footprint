import React from 'react';
import { useNavigate } from 'react-router-dom';
import FormContainer from '../components/Form/FormContainer';

const AssessmentPage = () => {
  const navigate = useNavigate();

  const handleFormComplete = (calculationResults) => {
    // 1. Save results to sessionStorage
    // JSON.stringify is used to convert the JavaScript object into a string for storage.
    sessionStorage.setItem('ecoCalcResults', JSON.stringify(calculationResults));

    // 2. Navigate to the results page. We can still pass state for the initial load.
    navigate('/results', { state: { results: calculationResults } });
  };

  return (
    <div className="container mx-auto py-12">
        <FormContainer onComplete={handleFormComplete} />
    </div>
  );
};

export default AssessmentPage;
