import React from 'react';
import { FaLeaf } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-200">
      <div className="container mx-auto px-6 py-8 text-center text-gray-600">
        <div className="flex justify-center items-center gap-2 mb-4">
           <FaLeaf className="text-xl text-green-500" />
           <span className="text-lg font-bold text-gray-700">EcoCalc</span>
        </div>
        <p>Helping you understand and reduce your environmental impact.</p>
        <p className="mt-4 text-sm text-gray-500">
          &copy; {new Date().getFullYear()} EcoCalc. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
