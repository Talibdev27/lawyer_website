import React from 'react';
import { Building, Gavel, FileText, Shield, Users, TrendingUp } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Services = () => {
  const { t } = useLanguage();
  
  const services = [
    {
      icon: <Building className="h-12 w-12 text-yellow-500" />,
      title: t.corporateLaw,
      description: t.corporateLawDesc,
      features: [t.businessFormation, t.contractNegotiation, t.regulatoryCompliance, t.mergersAcquisitions]
    },
    {
      icon: <Gavel className="h-12 w-12 text-yellow-500" />,
      title: t.civilLitigation,
      description: t.civilLitigationDesc,
      features: [t.commercialDisputes, t.contractLitigation, t.employmentLaw, t.personalInjury]
    },
    {
      icon: <FileText className="h-12 w-12 text-yellow-500" />,
      title: t.estatePlanning,
      description: t.estatePlanningDesc,
      features: [t.willsTrusts, t.estateAdministration, t.taxPlanning, t.assetProtection]
    },
    {
      icon: <Shield className="h-12 w-12 text-yellow-500" />,
      title: t.criminalDefense,
      description: t.criminalDefenseDesc,
      features: [t.whiteCollarCrime, t.duiDefense, t.drugCharges, t.appeals]
    },
    {
      icon: <Users className="h-12 w-12 text-yellow-500" />,
      title: t.familyLaw,
      description: t.familyLawDesc,
      features: [t.divorceProceedings, t.childCustody, t.adoption, t.domesticRelations]
    },
    {
      icon: <TrendingUp className="h-12 w-12 text-yellow-500" />,
      title: t.realEstateLaw,
      description: t.realEstateLawDesc,
      features: [t.propertyTransactions, t.titleIssues, t.zoningMatters, t.landlordTenant]
    }
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-yellow-600 text-sm font-semibold uppercase tracking-wide mb-2 block">
            {t.servicesTitle}
          </span>
          <h2 className="text-4xl font-bold text-blue-900 mb-4">
            {t.servicesSubtitle}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t.servicesDescription}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="group bg-gray-50 hover:bg-white rounded-xl p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-transparent hover:border-yellow-200"
            >
              <div className="flex justify-center mb-6">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-4 text-center">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-6 text-center leading-relaxed">
                {service.description}
              </p>
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3 flex-shrink-0"></div>
                    {feature}
                  </li>
                ))}
              </ul>
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
              {t.freeConsultation}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;