// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import ResultsPage from './pages/ResultsPage';

const App = () => {
  return (
    // The outer div can be moved to individual pages if you want different page layouts
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/results" element={<ResultsPage />} />
      </Routes>
    </div>
  );
};

export default App;