import React from 'react';
import { ArrowRight, Phone, MessageCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Hero = () => {
  const { t } = useLanguage();
  
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/5668882/pexels-photo-5668882.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)'
        }}
      />
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          {t.heroTitle}
          <span className="block text-3xl sm:text-4xl lg:text-5xl text-yellow-400 font-light mt-2">
            {t.heroSubtitle}
          </span>
        </h1>
        
        <p className="text-xl sm:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed text-blue-100">
          {t.heroDescription}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <button 
            onClick={scrollToContact}
            className="group bg-yellow-500 hover:bg-yellow-400 text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center space-x-2"
          >
            <span>{t.scheduleConsultation}</span>
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <a 
            href="tel:+998909028500" 
            className="group bg-transparent border-2 border-white hover:bg-white hover:text-blue-900 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center space-x-2"
          >
            <Phone className="h-5 w-5" />
            <span>+998 (90) 902-85-00</span>
          </a>
        </div>
        
        <div className="flex justify-center">
          <a 
            href="https://t.me/protect1010" 
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2"
          >
            <MessageCircle className="h-5 w-5" />
            <span>Telegram: @protect1010</span>
          </a>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;