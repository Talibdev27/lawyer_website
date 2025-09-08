import React from 'react';
import { Award, Shield, Users, Briefcase } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const About = () => {
  const { t } = useLanguage();
  
  const achievements = [
    {
      icon: <Award className="h-8 w-8 text-yellow-500" />,
      number: "10+",
      label: t.yearsExperience
    },
    {
      icon: <Users className="h-8 w-8 text-yellow-500" />,
      number: "1000+",
      label: t.clientsServed
    },
    {
      icon: <Briefcase className="h-8 w-8 text-yellow-500" />,
      number: "95%",
      label: t.successRate
    },
    {
      icon: <Shield className="h-8 w-8 text-yellow-500" />,
      number: "500+",
      label: t.casesWon
    }
  ];

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="mb-8">
              <span className="text-yellow-600 text-sm font-semibold uppercase tracking-wide mb-2 block">
                {t.aboutTitle}
              </span>
              <h2 className="text-4xl font-bold text-blue-900 mb-6">
                {t.aboutSubtitle}
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                {t.aboutDescription1}
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                {t.aboutDescription2}
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              {achievements.map((achievement, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-3">
                    {achievement.icon}
                  </div>
                  <div className="text-3xl font-bold text-blue-900 mb-1">
                    {achievement.number}
                  </div>
                  <div className="text-sm text-gray-600 uppercase tracking-wide">
                    {achievement.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&dpr=2"
                alt="Professional portrait"
                className="w-full h-96 lg:h-[500px] object-cover rounded-lg shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent rounded-lg"></div>
            </div>
          </div>
        </div>
        
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-blue-900 mb-6 text-center">{t.educationCredentials}</h3>
          
          <div className="mb-8">
            <h4 className="text-lg font-semibold text-blue-900 mb-4">{t.educationLevel}</h4>
            <div className="space-y-3">
              <div className="border-l-4 border-yellow-500 pl-4">
                <p className="text-gray-700 font-medium">{t.education1}</p>
              </div>
              <div className="border-l-4 border-yellow-500 pl-4">
                <p className="text-gray-700 font-medium">{t.education2}</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-blue-900 mb-4">{t.additionalEducation}</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-sm text-gray-600">{t.course1}</p>
                <p className="text-sm text-gray-600">{t.course2}</p>
                <p className="text-sm text-gray-600">{t.course3}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">{t.course4}</p>
                <p className="text-sm text-gray-600">{t.course5}</p>
                <p className="text-sm text-gray-600">{t.course6}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;