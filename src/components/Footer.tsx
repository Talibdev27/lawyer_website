import React from 'react';
import { Scale, Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Link } from 'react-router-dom';

const Footer = () => {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-blue-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Scale className="h-8 w-8 text-yellow-500" />
              <span className="text-2xl font-bold">Universal Protect</span>
            </div>
            <p className="text-blue-100 mb-6 max-w-md">
              {t.footerDescription}
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-yellow-500" />
                <span className="text-blue-100">+998 (90) 902-85-00</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-yellow-500" />
                <span className="text-blue-100">esaev2022@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MessageCircle className="h-4 w-4 text-yellow-500" />
                <a 
                  href="https://t.me/protect1010" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-100 hover:text-yellow-400 transition-colors"
                >
                  @protect1010
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-yellow-500" />
                <span className="text-blue-100">{t.tashkentUzbekistan}</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">{t.practiceAreas}</h3>
            <ul className="space-y-2 text-blue-100">
              <li className="hover:text-yellow-400 transition-colors cursor-pointer">{t.corporateLaw}</li>
              <li className="hover:text-yellow-400 transition-colors cursor-pointer">{t.civilLitigation}</li>
              <li className="hover:text-yellow-400 transition-colors cursor-pointer">{t.estatePlanning}</li>
              <li className="hover:text-yellow-400 transition-colors cursor-pointer">{t.criminalDefense}</li>
              <li className="hover:text-yellow-400 transition-colors cursor-pointer">{t.familyLaw}</li>
              <li className="hover:text-yellow-400 transition-colors cursor-pointer">{t.realEstateLaw}</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">{t.quickLinks}</h3>
            <ul className="space-y-2 text-blue-100">
              <li>
                <button 
                  onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                  className="hover:text-yellow-400 transition-colors"
                >
                  {t.about}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                  className="hover:text-yellow-400 transition-colors"
                >
                  {t.services}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' })}
                  className="hover:text-yellow-400 transition-colors"
                >
                  {t.testimonials}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="hover:text-yellow-400 transition-colors"
                >
                  {t.contact}
                </button>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-blue-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-blue-100">
            <p>&copy; 2025 Universal Protect - Firdavs Esaev. {t.allRightsReserved}</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-yellow-400 transition-colors">{t.privacyPolicy}</a>
              <a href="#" className="hover:text-yellow-400 transition-colors">{t.termsOfService}</a>
              <a href="#" className="hover:text-yellow-400 transition-colors">{t.legalDisclaimer}</a>
              {/* Hidden admin link - only visible to those who know it exists */}
              <Link to="/admin" className="hover:text-yellow-400 transition-colors opacity-0 hover:opacity-100" title="Admin Dashboard">
                Admin
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;