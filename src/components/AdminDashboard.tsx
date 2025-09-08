import React, { useState, useEffect } from 'react';
import { Eye, Trash2, Mail, Phone, Calendar, User, MessageSquare, Clock, Settings, CheckCircle, XCircle } from 'lucide-react';

interface Message {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  timestamp: string;
  read: boolean;
}

interface Booking {
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

interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

const AdminDashboard = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'messages' | 'bookings' | 'settings'>('messages');
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([
    { id: '1', time: '09:00', available: true },
    { id: '2', time: '10:00', available: true },
    { id: '3', time: '11:00', available: true },
    { id: '4', time: '14:00', available: true },
    { id: '5', time: '15:00', available: true },
    { id: '6', time: '16:00', available: true },
    { id: '7', time: '17:00', available: true }
  ]);

  // Secure password authentication using environment variable
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const adminPassword = process.env.REACT_APP_ADMIN_PASSWORD || 'Firdavs2005'; // Fallback for development
    if (password === adminPassword) {
      setIsAuthenticated(true);
      setPassword('');
    } else {
      alert('Incorrect password');
    }
  };

  // Load data from localStorage
  useEffect(() => {
    if (isAuthenticated) {
      // Load messages
      const storedMessages = localStorage.getItem('contactMessages');
      if (storedMessages) {
        setMessages(JSON.parse(storedMessages));
      }
      
      // Load bookings
      const storedBookings = localStorage.getItem('bookings');
      if (storedBookings) {
        setBookings(JSON.parse(storedBookings));
      }
      
      // Load availability settings
      const storedSettings = localStorage.getItem('availabilitySettings');
      if (storedSettings) {
        const settings = JSON.parse(storedSettings);
        setTimeSlots(settings.timeSlots || timeSlots);
      }
    }
  }, [isAuthenticated]);

  // Mark message as read
  const markAsRead = (messageId: string) => {
    const updatedMessages = messages.map(msg => 
      msg.id === messageId ? { ...msg, read: true } : msg
    );
    setMessages(updatedMessages);
    localStorage.setItem('contactMessages', JSON.stringify(updatedMessages));
  };

  // Delete message
  const deleteMessage = (messageId: string) => {
    const updatedMessages = messages.filter(msg => msg.id !== messageId);
    setMessages(updatedMessages);
    localStorage.setItem('contactMessages', JSON.stringify(updatedMessages));
    if (selectedMessage?.id === messageId) {
      setSelectedMessage(null);
    }
  };

  // Booking management functions
  const updateBookingStatus = (bookingId: string, status: 'pending' | 'confirmed' | 'cancelled') => {
    const updatedBookings = bookings.map(booking => 
      booking.id === bookingId ? { ...booking, status } : booking
    );
    setBookings(updatedBookings);
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
  };

  const deleteBooking = (bookingId: string) => {
    const updatedBookings = bookings.filter(booking => booking.id !== bookingId);
    setBookings(updatedBookings);
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
    if (selectedBooking?.id === bookingId) {
      setSelectedBooking(null);
    }
  };

  // Availability management
  const updateTimeSlots = (newTimeSlots: TimeSlot[]) => {
    setTimeSlots(newTimeSlots);
    localStorage.setItem('availabilitySettings', JSON.stringify({ timeSlots: newTimeSlots }));
  };

  const addTimeSlot = () => {
    const newSlot: TimeSlot = {
      id: Date.now().toString(),
      time: '12:00',
      available: true
    };
    updateTimeSlots([...timeSlots, newSlot]);
  };

  const removeTimeSlot = (slotId: string) => {
    updateTimeSlots(timeSlots.filter(slot => slot.id !== slotId));
  };

  const updateTimeSlot = (slotId: string, field: 'time' | 'available', value: string | boolean) => {
    const updatedSlots = timeSlots.map(slot => 
      slot.id === slotId ? { ...slot, [field]: value } : slot
    );
    updateTimeSlots(updatedSlots);
  };

  // Logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    setSelectedMessage(null);
    setSelectedBooking(null);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">Admin Login</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Admin Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter admin password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-900 hover:bg-blue-800 text-white px-4 py-3 rounded-lg font-semibold transition-colors"
            >
              Login
            </button>
          </form>
          <p className="text-xs text-gray-500 mt-4 text-center">
            Secure admin access
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-blue-900">Admin Dashboard</h1>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>
          
          {/* Tabs */}
          <div className="flex space-x-8 border-b">
            <button
              onClick={() => setActiveTab('messages')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'messages'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Messages ({messages.length})
            </button>
            <button
              onClick={() => setActiveTab('bookings')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'bookings'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Bookings ({bookings.length})
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'settings'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Settings className="h-4 w-4 inline mr-2" />
              Availability
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'messages' && (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Messages List */}
            <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-4 border-b">
                <h2 className="text-lg font-semibold text-gray-900">
                  Messages ({messages.length})
                </h2>
                <p className="text-sm text-gray-500">
                  {messages.filter(m => !m.read).length} unread
                </p>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {messages.length === 0 ? (
                  <div className="p-4 text-center text-gray-500">
                    No messages yet
                  </div>
                ) : (
                  messages
                    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                    .map((message) => (
                      <div
                        key={message.id}
                        className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                          !message.read ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                        } ${selectedMessage?.id === message.id ? 'bg-yellow-50' : ''}`}
                        onClick={() => {
                          setSelectedMessage(message);
                          if (!message.read) {
                            markAsRead(message.id);
                          }
                        }}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-900">{message.name}</h3>
                            <p className="text-sm text-gray-600">{message.email}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              {new Date(message.timestamp).toLocaleString()}
                            </p>
                          </div>
                          {!message.read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                        </div>
                        <p className="text-sm text-gray-700 mt-2 line-clamp-2">
                          {message.message.substring(0, 100)}...
                        </p>
                      </div>
                    ))
                )}
              </div>
            </div>
          </div>

          {/* Message Detail */}
          <div className="lg:col-span-2">
            {selectedMessage ? (
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-6 border-b">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">
                        {selectedMessage.name}
                      </h2>
                      <p className="text-gray-600">{selectedMessage.email}</p>
                    </div>
                    <button
                      onClick={() => deleteMessage(selectedMessage.id)}
                      className="text-red-600 hover:text-red-800 p-2"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                
                <div className="p-6 space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Phone</p>
                        <p className="text-gray-600">{selectedMessage.phone || 'Not provided'}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Email</p>
                        <p className="text-gray-600">{selectedMessage.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MessageSquare className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Subject</p>
                        <p className="text-gray-600">{selectedMessage.subject}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Date</p>
                        <p className="text-gray-600">
                          {new Date(selectedMessage.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Message</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-700 whitespace-pre-wrap">
                        {selectedMessage.message}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
                <Eye className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Select a message to view details
                </h3>
                <p className="text-gray-500">
                  Click on any message from the list to read the full content
                </p>
              </div>
            )}
          </div>
        </div>
        )}

        {activeTab === 'bookings' && (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Bookings List */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-4 border-b">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Bookings ({bookings.length})
                  </h2>
                  <p className="text-sm text-gray-500">
                    {bookings.filter(b => b.status === 'pending').length} pending
                  </p>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {bookings.length === 0 ? (
                    <div className="p-4 text-center text-gray-500">
                      No bookings yet
                    </div>
                  ) : (
                    bookings
                      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                      .map((booking) => (
                        <div
                          key={booking.id}
                          className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                            booking.status === 'pending' ? 'bg-yellow-50 border-l-4 border-l-yellow-500' : ''
                          } ${selectedBooking?.id === booking.id ? 'bg-blue-50' : ''}`}
                          onClick={() => setSelectedBooking(booking)}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="font-medium text-gray-900">{booking.name}</h3>
                              <p className="text-sm text-gray-600">{booking.email}</p>
                              <p className="text-xs text-gray-500 mt-1">
                                {new Date(booking.date).toLocaleDateString()} at {booking.time}
                              </p>
                            </div>
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {booking.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700 mt-2 line-clamp-2">
                            {booking.service}
                          </p>
                        </div>
                      ))
                  )}
                </div>
              </div>
            </div>

            {/* Booking Detail */}
            <div className="lg:col-span-2">
              {selectedBooking ? (
                <div className="bg-white rounded-lg shadow-sm border">
                  <div className="p-6 border-b">
                    <div className="flex items-start justify-between">
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900">
                          {selectedBooking.name}
                        </h2>
                        <p className="text-gray-600">{selectedBooking.email}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => updateBookingStatus(selectedBooking.id, 'confirmed')}
                          className="text-green-600 hover:text-green-800 p-2"
                          title="Confirm"
                        >
                          <CheckCircle className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => updateBookingStatus(selectedBooking.id, 'cancelled')}
                          className="text-red-600 hover:text-red-800 p-2"
                          title="Cancel"
                        >
                          <XCircle className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => deleteBooking(selectedBooking.id)}
                          className="text-red-600 hover:text-red-800 p-2"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-3">
                        <Phone className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">Phone</p>
                          <p className="text-gray-600">{selectedBooking.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Calendar className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">Date & Time</p>
                          <p className="text-gray-600">
                            {new Date(selectedBooking.date).toLocaleDateString()} at {selectedBooking.time}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Clock className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">Service</p>
                          <p className="text-gray-600">{selectedBooking.service}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <MessageSquare className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">Status</p>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            selectedBooking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            selectedBooking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {selectedBooking.status}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {selectedBooking.message && (
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Additional Information</h3>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-gray-700 whitespace-pre-wrap">
                            {selectedBooking.message}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Select a booking to view details
                  </h3>
                  <p className="text-gray-500">
                    Click on any booking from the list to manage it
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm border p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Availability Settings</h2>
              <p className="text-gray-600 mb-8">
                Manage your available time slots for client bookings. Clients can only book during these times.
              </p>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Time Slots</h3>
                {timeSlots.map((slot) => (
                  <div key={slot.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                    <input
                      type="time"
                      value={slot.time}
                      onChange={(e) => updateTimeSlot(slot.id, 'time', e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={slot.available}
                        onChange={(e) => updateTimeSlot(slot.id, 'available', e.target.checked)}
                        className="mr-2"
                      />
                      Available
                    </label>
                    <button
                      onClick={() => removeTimeSlot(slot.id)}
                      className="text-red-600 hover:text-red-800 p-2"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                
                <button
                  onClick={addTimeSlot}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-colors"
                >
                  Add Time Slot
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
