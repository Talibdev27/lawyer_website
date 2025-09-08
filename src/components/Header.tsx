import React, { useState, useEffect } from 'react';
import { Menu, X, Scale } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSelector from './LanguageSelector';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { currentLanguage, changeLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <Scale className={`h-8 w-8 ${isScrolled ? 'text-blue-900' : 'text-white'}`} />
            <span className={`text-xl font-bold ${isScrolled ? 'text-blue-900' : 'text-white'}`}>
              Universal Protect
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex space-x-8">
              {['about', 'services', 'testimonials', 'booking', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`text-sm font-medium uppercase tracking-wide transition-colors duration-200 hover:text-yellow-500 ${
                    isScrolled ? 'text-gray-700' : 'text-white'
                  }`}
                >
                  {t[item as keyof typeof t]}
                </button>
              ))}
            </nav>
            <LanguageSelector 
              currentLanguage={currentLanguage}
              onLanguageChange={changeLanguage}
              isScrolled={isScrolled}
            />
          </div>

          <div className="md:hidden flex items-center space-x-2">
            <LanguageSelector 
              currentLanguage={currentLanguage}
              onLanguageChange={changeLanguage}
              isScrolled={isScrolled}
            />
              <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
              {isMenuOpen ? (
                <X className={`h-6 w-6 ${isScrolled ? 'text-blue-900' : 'text-white'}`} />
              ) : (
                <Menu className={`h-6 w-6 ${isScrolled ? 'text-blue-900' : 'text-white'}`} />
              )}
              </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <nav className="px-4 py-2 space-y-2">
            {['about', 'services', 'testimonials', 'booking', 'contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="block w-full text-left py-2 text-gray-700 hover:text-yellow-600 transition-colors duration-200 text-sm font-medium uppercase tracking-wide"
              >
                {t[item as keyof typeof t]}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;