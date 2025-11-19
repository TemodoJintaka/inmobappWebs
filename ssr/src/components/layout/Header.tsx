// ============================================
// HEADER COMPONENT
// ============================================

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { primaryClasses } from '../../theme/colors';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src="/Inmobapplogo.png" 
              alt="InmobApp" 
              className="h-12 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className={`text-gray-700 ${primaryClasses.textHover} font-medium transition-colors`}
            >
              Inicio
            </Link>
            <Link 
              to="/propiedades" 
              className={`text-gray-700 ${primaryClasses.textHover} font-medium transition-colors`}
            >
              Propiedades
            </Link>
            <Link 
              to="/propiedades?type_negotiation=1" 
              className={`text-gray-700 ${primaryClasses.textHover} font-medium transition-colors`}
            >
              Venta
            </Link>
            <Link 
              to="/propiedades?type_negotiation=2" 
              className={`text-gray-700 ${primaryClasses.textHover} font-medium transition-colors`}
            >
              Alquiler
            </Link>
            <a 
              href="https://inmob.app/login"
              className={`text-gray-700 ${primaryClasses.textHover} font-medium transition-colors`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Soy Asesor
            </a>
            <Link 
              to="/favoritos" 
              className="text-gray-700 hover:text-[#ec7734] font-medium transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              Favoritos
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMenu}
            className={`md:hidden text-gray-700 ${primaryClasses.textHover} transition-colors`}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t pt-4">
            <div className="flex flex-col space-y-3">
              <Link 
                to="/" 
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-700 hover:text-[#ec7734] font-medium transition-colors py-2"
              >
                Inicio
              </Link>
              <Link 
                to="/propiedades" 
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-700 hover:text-[#ec7734] font-medium transition-colors py-2"
              >
                Propiedades
              </Link>
              <Link 
                to="/propiedades?type_negotiation=1" 
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-700 hover:text-[#ec7734] font-medium transition-colors py-2"
              >
                Venta
              </Link>
              <Link 
                to="/propiedades?type_negotiation=2" 
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-700 hover:text-[#ec7734] font-medium transition-colors py-2"
              >
                Alquiler
              </Link>
              <a 
                href="https://inmob.app/login"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-700 hover:text-[#ec7734] font-medium transition-colors py-2"
              >
                Soy Asesor
              </a>
              <Link 
                to="/favoritos" 
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-700 hover:text-[#ec7734] font-medium transition-colors py-2 flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                Favoritos
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

