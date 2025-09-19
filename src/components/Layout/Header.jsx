import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaLeaf } from 'react-icons/fa';

const Header = () => {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  return (
    <header className="bg-white/80 backdrop-blur-lg fixed top-0 left-0 right-0 z-50 shadow-sm">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <FaLeaf className="text-2xl text-green-600" />
          <span className="text-xl font-bold text-gray-800">EcoCalc</span>
        </Link>
        <div>
          {isLandingPage ? (
            <Link
              to="/assessment"
              className="px-5 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors shadow-md"
            >
              Take the Assessment
            </Link>
          ) : (
             <Link
              to="/"
              className="text-gray-600 font-medium hover:text-green-600 transition-colors"
            >
              Home
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
