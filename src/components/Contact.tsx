import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Contact = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create message object
    const message = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      subject: formData.subject,
      message: formData.message,
      timestamp: new Date().toISOString(),
      read: false
    };

    // Get existing messages from localStorage
    const existingMessages = localStorage.getItem('contactMessages');
    const messages = existingMessages ? JSON.parse(existingMessages) : [];
    
    // Add new message
    messages.push(message);
    
    // Save back to localStorage
    localStorage.setItem('contactMessages', JSON.stringify(messages));
    
    // Show success message
    alert('Thank you for your message. I will get back to you within 24 hours.');
    
    // Reset form
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-yellow-600 text-sm font-semibold uppercase tracking-wide mb-2 block">
            {t.contactTitle}
          </span>
          <h2 className="text-4xl font-bold text-blue-900 mb-4">
            {t.contactSubtitle}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t.contactDescription}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold text-blue-900 mb-8">{t.contactTitle}</h3>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <Phone className="h-6 w-6 text-yellow-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-blue-900 mb-1">{t.phone}</h4>
                  <p className="text-gray-600">+998 (90) 902-85-00</p>
                  <p className="text-sm text-gray-500">{t.available247}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <Mail className="h-6 w-6 text-yellow-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-blue-900 mb-1">{t.email}</h4>
                  <p className="text-gray-600">esaev2022@gmail.com</p>
                  <p className="text-sm text-gray-500">{t.responseWithin4Hours}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <MessageCircle className="h-6 w-6 text-yellow-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-blue-900 mb-1">{t.telegram}</h4>
                  <a 
                    href="https://t.me/protect1010" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    @protect1010
                  </a>
                  <p className="text-sm text-gray-500">{t.quickMessagingAvailable}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <MapPin className="h-6 w-6 text-yellow-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-blue-900 mb-1">{t.office}</h4>
                  <p className="text-gray-600">{t.tashkentUzbekistan}</p>
                  <p className="text-gray-600">{t.universalProtectLegalServices}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <Clock className="h-6 w-6 text-yellow-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-blue-900 mb-1">{t.officeHours}</h4>
                  <p className="text-gray-600">{t.mondayFriday}</p>
                  <p className="text-gray-600">{t.saturday}</p>
                  <p className="text-sm text-gray-500">{t.sundayByAppointment}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-yellow-50 rounded-lg border border-yellow-200">
              <h4 className="font-semibold text-blue-900 mb-2">{t.freeConsultation}</h4>
              <p className="text-gray-700 text-sm">
                {t.complimentaryConsultation}
              </p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-blue-900 mb-6">{t.sendMessage}</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    {t.fullName} *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    {t.phoneNumber}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
                    placeholder="+998 (90) 902-85-00"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  {t.emailAddress} *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
                  placeholder="esaev2022@gmail.com"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  {t.legalMatterType} *
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="">{t.selectPracticeArea}</option>
                  <option value="corporate">{t.corporateLaw}</option>
                  <option value="litigation">{t.civilLitigation}</option>
                  <option value="estate">{t.estatePlanning}</option>
                  <option value="criminal">{t.criminalDefense}</option>
                  <option value="family">{t.familyLaw}</option>
                  <option value="real-estate">{t.realEstateLaw}</option>
                  <option value="other">{t.other}</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  {t.message} *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 resize-none"
                  placeholder={t.describeLegalMatter}
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-blue-900 hover:bg-blue-800 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <Send className="h-5 w-5" />
                <span>{t.sendMessage}</span>
              </button>
            </form>
            
            <p className="text-xs text-gray-500 mt-4 text-center">
              {t.allCommunicationsConfidential}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;