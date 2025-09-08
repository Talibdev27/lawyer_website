import React from 'react';
import { Star, Quote } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Testimonials = () => {
  const { t } = useLanguage();
  
  const testimonials = [
    {
      name: t.client1Name,
      role: t.client1Role,
      content: t.testimonial1,
      rating: 5,
      emoji: "👨‍💼",
      initials: "AY"
    },
    {
      name: t.client2Name,
      role: t.client2Role,
      content: t.testimonial2,
      rating: 5,
      emoji: "👩‍🔧",
      initials: "DI"
    },
    {
      name: t.client3Name,
      role: t.client3Role,
      content: t.testimonial3,
      rating: 5,
      emoji: "👨‍👩‍👧‍👦",
      initials: "OK"
    },
    {
      name: t.client4Name,
      role: t.client4Role,
      content: t.testimonial4,
      rating: 5,
      emoji: "👩‍💼",
      initials: "MT"
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-yellow-600 text-sm font-semibold uppercase tracking-wide mb-2 block">
            {t.testimonials}
          </span>
          <h2 className="text-4xl font-bold text-blue-900 mb-4">
            {t.whatClientsSay}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t.testimonialsDescription}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 relative"
            >
              <Quote className="h-8 w-8 text-yellow-500 mb-4" />
              
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-500 fill-current" />
                ))}
              </div>
              
              <p className="text-gray-700 mb-6 leading-relaxed italic">
                "{testimonial.content}"
              </p>
              
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center mr-4 text-white text-xl font-bold">
                  {testimonial.emoji}
                </div>
                <div>
                  <h4 className="font-semibold text-blue-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-blue-900 rounded-xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">{t.needLegalAssistance}</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              {t.contactDescription}
            </p>
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-yellow-500 hover:bg-yellow-400 text-blue-900 px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              {t.getStarted}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;