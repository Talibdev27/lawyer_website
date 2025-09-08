import React from 'react';
import { Globe } from 'lucide-react';
import { Language } from '../types/language';

interface LanguageSelectorProps {
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
  isScrolled: boolean;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ 
  currentLanguage, 
  onLanguageChange, 
  isScrolled 
}) => {
  const languages = [
    { code: 'en' as Language, name: 'EN', fullName: 'English' },
    { code: 'uz' as Language, name: 'UZ', fullName: 'O\'zbek' },
    { code: 'ru' as Language, name: 'RU', fullName: 'Русский' }
  ];

  return (
    <div className="relative group">
      <button className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors duration-200 ${
        isScrolled ? 'text-gray-700 hover:text-yellow-600' : 'text-white hover:text-yellow-400'
      }`}>
        <Globe className="h-4 w-4" />
        <span className="text-sm font-medium">
          {languages.find(lang => lang.code === currentLanguage)?.name}
        </span>
      </button>
      
      <div className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 min-w-[120px]">
        {languages.map((language) => (
          <button
            key={language.code}
            onClick={() => onLanguageChange(language.code)}
            className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors duration-200 ${
              currentLanguage === language.code ? 'text-yellow-600 font-medium' : 'text-gray-700'
            }`}
          >
            {language.fullName}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelector;