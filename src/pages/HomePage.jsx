// src/pages/HomePage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import FormContainer from '../components/Form/FormContainer';

const HomePage = () => {
  const navigate = useNavigate();

  const handleFormComplete = (calculationResults) => {
    // Navigate to the results page and pass the results data
    navigate('/results', { state: { results: calculationResults } });
  };

  return <FormContainer onComplete={handleFormComplete} />;
};

export default HomePage;