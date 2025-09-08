# Firdavs Esaev - Lawyer Website

A professional, multi-language law firm website for Firdavs Esaev with an integrated booking system and admin dashboard.

## 🌟 Features

### 🌍 Multi-Language Support
- **Uzbek** (Default language)
- **Russian** 
- **English**
- Easy language switching with persistent preferences

### 📱 Professional Design
- Modern, responsive design that works on all devices
- Clean and professional UI suitable for a law firm
- Beautiful gradient backgrounds and smooth animations
- Emoji-based testimonials for a modern touch

### 📅 Flexible Booking System
- **Client-side booking form** with date and time selection
- **Smart availability** - only shows available time slots
- **Service selection** - clients can choose their legal service type
- **Real-time updates** - changes apply immediately
- **Booking confirmation** with detailed information

### 🎛️ Admin Dashboard
- **Message Management** - View and manage contact form submissions
- **Booking Management** - Confirm, cancel, or delete appointments
- **Availability Settings** - Add/remove time slots, enable/disable times
- **Status Tracking** - Color-coded status indicators
- **Secure Access** - Password-protected admin area

### 📋 Content Management
- **Realistic Testimonials** with authentic Uzbek client names
- **Updated Education Section** with Firdavs's actual credentials
- **Professional Services** descriptions in all languages
- **Contact Information** with multiple communication channels

## 🚀 Quick Start

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Talibdev27/lawyer_website.git
   cd lawyer_website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in terminal)

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment.

## 🎯 Usage

### For Clients
1. Visit the website
2. Navigate to "Book Appointment" section
3. Select available date and time
4. Fill in contact details and service needed
5. Submit booking request
6. Receive confirmation

### For Admin (Firdavs)
1. Go to `/admin` route
2. Login with password: `admin123`
3. **Messages Tab**: View contact form submissions
4. **Bookings Tab**: Manage appointments (confirm/cancel/delete)
5. **Availability Tab**: Change time slots and availability

## 🛠️ Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Language**: TypeScript for type safety

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── About.tsx       # About section with education
│   ├── AdminDashboard.tsx # Admin panel
│   ├── Booking.tsx     # Booking form
│   ├── Contact.tsx     # Contact form
│   ├── Footer.tsx      # Footer with links
│   ├── Header.tsx      # Navigation header
│   ├── Hero.tsx        # Hero section
│   ├── LanguageSelector.tsx # Language switcher
│   ├── Services.tsx    # Services section
│   └── Testimonials.tsx # Client testimonials
├── contexts/           # React contexts
│   └── LanguageContext.tsx # Language management
├── translations/       # Multi-language content
│   └── index.ts       # All translations
├── types/             # TypeScript type definitions
│   └── language.ts    # Language types
├── App.tsx            # Main app component
├── main.tsx           # App entry point
└── index.css          # Global styles
```

## 🌐 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Deploy automatically on every push
3. Get a live URL instantly

### Netlify
1. Connect your GitHub repository to Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`

### GitHub Pages
1. Enable GitHub Pages in repository settings
2. Use GitHub Actions for automatic deployment

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory with the following variables:

```bash
# Admin Dashboard Password
REACT_APP_ADMIN_PASSWORD=Firdavs2005
```

**Important**: 
- Copy `.env.example` to `.env` and set your actual password
- Never commit `.env` to version control
- For production deployment, set environment variables in your hosting platform

**Security Note**: Never commit the `.env` file to version control. The `.env.example` file shows the required variables without exposing the actual password.

### Adding New Languages
1. Add language code to `src/types/language.ts`
2. Add translations to `src/translations/index.ts`
3. Update language selector in `src/components/LanguageSelector.tsx`

### Customizing Time Slots
Default time slots are defined in `src/components/Booking.tsx` and can be managed through the admin dashboard.

## 📞 Contact Information

- **Phone**: +998 (90) 902-85-00
- **Email**: esaev2022@gmail.com
- **Telegram**: @protect1010
- **Location**: Tashkent, Uzbekistan

## 🏢 Services Offered

- **Corporate Law** - Business formation, contracts, compliance
- **Civil Litigation** - Dispute resolution, court representation
- **Estate Planning** - Wills, trusts, inheritance matters
- **Criminal Defense** - Legal representation in criminal cases
- **Family Law** - Divorce, custody, adoption
- **Real Estate Law** - Property transactions, zoning issues

## 📝 License

This project is private and proprietary to Firdavs Esaev's law practice.

## 🤝 Contributing

This is a private project for Firdavs Esaev's law practice. For any issues or suggestions, please contact the repository owner.

## 📈 Future Enhancements

- [ ] Email notifications for bookings
- [ ] Calendar integration
- [ ] Payment processing for consultations
- [ ] Client portal for case management
- [ ] Document upload functionality
- [ ] Video consultation booking

---

**Built with ❤️ for Firdavs Esaev's legal practice**
