// ============================================
// HEADER COMPONENT
// ============================================

import React from 'react';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">M</span>
            </div>
            <span className="text-2xl font-bold text-gray-800">
              MLS <span className="text-blue-600">Properties</span>
            </span>
          </Link>

          {/* Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Inicio
            </Link>
            <Link 
              to="/propiedades" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Propiedades
            </Link>
            <Link 
              to="/propiedades?type_negotiation=1" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Venta
            </Link>
            <Link 
              to="/propiedades?type_negotiation=2" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Alquiler
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-700 hover:text-blue-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
};

