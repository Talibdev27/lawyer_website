import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import Booking from './components/Booking';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/" element={
            <div className="min-h-screen bg-white">
              <Header />
              <Hero />
              <About />
              <Services />
              <Testimonials />
              <Booking />
              <Contact />
              <Footer />
            </div>
          } />
        </Routes>
      </Router>
    </LanguageProvider>
  );
}

export default App;