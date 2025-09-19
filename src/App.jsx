import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import LandingPage from './pages/LandingPage';
import AssessmentPage from './pages/AssessmentPage';
import ResultsPage from './pages/ResultsPage';
import ActionPlanPage from './pages/ActionPlanPage'; // 1. Import the new page

const App = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow pt-20">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/assessment" element={<AssessmentPage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/action-plan" element={<ActionPlanPage />} /> {/* 2. Add the new route */}
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;

