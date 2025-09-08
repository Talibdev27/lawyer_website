import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, Phone, Mail, MessageSquare, CheckCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
  bookedBy?: string;
}

interface BookingData {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  service: string;
  message: string;
  timestamp: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

const Booking = () => {
  const { t } = useLanguage();
  const [selectedDate, setSelectedDate] = useState('');
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Default time slots (can be managed by admin)
  const defaultTimeSlots = [
    { id: '1', time: '09:00', available: true },
    { id: '2', time: '10:00', available: true },
    { id: '3', time: '11:00', available: true },
    { id: '4', time: '14:00', available: true },
    { id: '5', time: '15:00', available: true },
    { id: '6', time: '16:00', available: true },
    { id: '7', time: '17:00', available: true }
  ];

  // Load available slots for selected date
  useEffect(() => {
    if (selectedDate) {
      // Check for existing bookings for this date
      const existingBookings = localStorage.getItem('bookings');
      const bookings = existingBookings ? JSON.parse(existingBookings) : [];
      
      // Get admin availability settings
      const availabilitySettings = localStorage.getItem('availabilitySettings');
      const settings = availabilitySettings ? JSON.parse(availabilitySettings) : { timeSlots: defaultTimeSlots };
      
      // Filter out booked slots for this date
      const bookedSlots = bookings
        .filter((booking: BookingData) => booking.date === selectedDate && booking.status !== 'cancelled')
        .map((booking: BookingData) => booking.time);
      
      const slots = settings.timeSlots.map((slot: TimeSlot) => ({
        ...slot,
        available: !bookedSlots.includes(slot.time)
      }));
      
      setAvailableSlots(slots);
    }
  }, [selectedDate]);

  // Get next 30 days for date selection
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 30);

    for (let d = new Date(today); d <= maxDate; d.setDate(d.getDate() + 1)) {
      // Skip weekends (Saturday = 6, Sunday = 0)
      if (d.getDay() !== 0 && d.getDay() !== 6) {
        dates.push(d.toISOString().split('T')[0]);
      }
    }
    return dates;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedSlot) {
      alert('Please select a date and time slot');
      return;
    }

    const booking: BookingData = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      date: selectedDate,
      time: selectedSlot,
      service: formData.service,
      message: formData.message,
      timestamp: new Date().toISOString(),
      status: 'pending'
    };

    // Save booking
    const existingBookings = localStorage.getItem('bookings');
    const bookings = existingBookings ? JSON.parse(existingBookings) : [];
    bookings.push(booking);
    localStorage.setItem('bookings', JSON.stringify(bookings));

    setIsSubmitted(true);
    
    // Reset form
    setTimeout(() => {
      setFormData({ name: '', email: '', phone: '', service: '', message: '' });
      setSelectedDate('');
      setSelectedSlot('');
      setIsSubmitted(false);
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (isSubmitted) {
    return (
      <section id="booking" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-blue-900 mb-4">Booking Confirmed!</h2>
            <p className="text-lg text-gray-600 mb-6">
              Thank you for booking an appointment. We will contact you shortly to confirm the details.
            </p>
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-blue-800">
                <strong>Date:</strong> {new Date(selectedDate).toLocaleDateString()}<br/>
                <strong>Time:</strong> {selectedSlot}<br/>
                <strong>Service:</strong> {formData.service}
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="booking" className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-yellow-600 text-sm font-semibold uppercase tracking-wide mb-2 block">
            Book Appointment
          </span>
          <h2 className="text-4xl font-bold text-blue-900 mb-4">
            Schedule Your Consultation
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Book a convenient time for your legal consultation. We'll confirm your appointment within 24 hours.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Date Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                <Calendar className="h-5 w-5 inline mr-2" />
                Select Date *
              </label>
              <select
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                required
              >
                <option value="">Choose a date</option>
                {getAvailableDates().map((date) => (
                  <option key={date} value={date}>
                    {new Date(date).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </option>
                ))}
              </select>
            </div>

            {/* Time Slot Selection */}
            {selectedDate && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  <Clock className="h-5 w-5 inline mr-2" />
                  Select Time *
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {availableSlots.map((slot) => (
                    <button
                      key={slot.id}
                      type="button"
                      onClick={() => setSelectedSlot(slot.time)}
                      disabled={!slot.available}
                      className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                        selectedSlot === slot.time
                          ? 'border-yellow-500 bg-yellow-50 text-yellow-700'
                          : slot.available
                          ? 'border-gray-300 hover:border-yellow-400 hover:bg-yellow-50'
                          : 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
                {availableSlots.filter(slot => slot.available).length === 0 && (
                  <p className="text-red-600 text-sm mt-2">No available slots for this date. Please choose another date.</p>
                )}
              </div>
            )}

            {/* Personal Information */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="h-4 w-4 inline mr-2" />
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  placeholder="Your full name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Phone className="h-4 w-4 inline mr-2" />
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  placeholder="+998 (90) 123-45-67"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Mail className="h-4 w-4 inline mr-2" />
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="your.email@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Legal Service *
              </label>
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                required
              >
                <option value="">Select a service</option>
                <option value="corporate">{t.corporateLaw}</option>
                <option value="litigation">{t.civilLitigation}</option>
                <option value="estate">{t.estatePlanning}</option>
                <option value="criminal">{t.criminalDefense}</option>
                <option value="family">{t.familyLaw}</option>
                <option value="real-estate">{t.realEstateLaw}</option>
                <option value="consultation">General Consultation</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MessageSquare className="h-4 w-4 inline mr-2" />
                Additional Information
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent resize-none"
                placeholder="Please provide any additional details about your legal matter..."
              />
            </div>

            <button
              type="submit"
              disabled={!selectedDate || !selectedSlot}
              className="w-full bg-blue-900 hover:bg-blue-800 disabled:bg-gray-400 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed"
            >
              Book Appointment
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Booking;
