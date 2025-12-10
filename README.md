# 🌤️ My Weather App

A beautiful, fully functional weather application built with **React**, **TypeScript**, **Tailwind CSS**, and **DaisyUI**.

## ✨ Features

- 🔍 **City Search** - Search weather for any city worldwide
- 📍 **Geolocation** - Get weather for your current location
- 🌡️ **Temperature Toggle** - Switch between Celsius and Fahrenheit
- 🎨 **Beautiful UI** - Modern gradient design with glassmorphism effects
- 📱 **Responsive Design** - Works perfectly on mobile, tablet, and desktop
- 💾 **Recent Searches** - Quick access to your last 5 searched cities
- 🚀 **Real-time Data** - Powered by OpenWeatherMap API

## 🛠️ Tech Stack

- **Frontend:** React 19 + TypeScript
- **Build Tool:** Vite (lightning-fast)
- **Styling:** Tailwind CSS 3 + DaisyUI
- **Weather API:** OpenWeatherMap
- **Deployment:** Vercel

## 📦 Project Structure

```
src/
├── App.tsx              # Main app component with search & display logic
├── App.css              # Global styles
├── index.css            # Tailwind directives
├── weatherService.ts    # API client functions
└── main.tsx             # React entry point
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/my-weather-app.git
cd my-weather-app
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file with your API key:
```env
VITE_OPENWEATHER_API_KEY=your_api_key_here
```

Get your free API key from [OpenWeatherMap](https://openweathermap.org/api)

4. Start the dev server:
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📚 How to Use

1. **Search Cities:** Type a city name and click "Search"
2. **Quick Access:** Click recent searches to instantly load weather
3. **Current Location:** Click "Use My Location" button (requires location permission)
4. **Temperature Units:** Click the "°C | Switch" button to toggle Celsius/Fahrenheit

## 🎓 Learning Outcomes

This project teaches:
- ✅ React hooks (useState, useEffect)
- ✅ TypeScript interfaces & types
- ✅ Async/await & API integration
- ✅ Component composition
- ✅ Tailwind CSS utilities
- ✅ State management
- ✅ Error handling
- ✅ Responsive design

## 🔑 Environment Variables

```env
VITE_OPENWEATHER_API_KEY=your_api_key_here
```

Note: The `VITE_` prefix makes this variable available in the browser (public).

## 📦 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 🌐 API Integration

The app uses the **OpenWeatherMap Current Weather API**:
- Endpoint: `https://api.openweathermap.org/data/2.5/weather`
- Search by city name
- Search by latitude/longitude
- Returns: Temperature, humidity, wind speed, pressure, description

## 🎨 Tailwind CSS Features Used

- Gradient backgrounds (`bg-gradient-to-br`)
- Glassmorphism effects (`backdrop-blur-lg`, `bg-opacity-20`)
- Responsive grid (`grid grid-cols-1 md:grid-cols-4`)
- Smooth transitions (`transition`, `hover:`)
- Custom animations (`animate-spin`)

## 🚀 Deployment

This project is ready to deploy on:
- **Vercel** (recommended - zero-config)
- **Netlify** (drag & drop)
- **GitHub Pages**
- **Firebase Hosting**

### Deploy to Vercel (Easiest)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Select your repository
5. Add environment variable `VITE_OPENWEATHER_API_KEY`
6. Click "Deploy"

## 📝 Learning Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Vite Guide](https://vitejs.dev/guide/)
- [OpenWeatherMap API](https://openweathermap.org/api)

## 🐛 Troubleshooting

**App doesn't load weather:**
- Check your API key is correct in `.env`
- Ensure you're not in a private network blocking APIs
- Check browser console for errors (F12)

**Geolocation not working:**
- Browser must ask for permission (reload page)
- Only works on HTTPS (not on localhost during dev, but works in production)
- Make sure location is enabled in browser settings

**Tailwind styles not showing:**
- Restart dev server after installing packages
- Check `tailwind.config.js` has correct content paths

## 📄 License

MIT - Free to use and modify!

## 👨‍💻 Author

Built as a learning project to master React, TypeScript, and modern web development.

## 🤝 Contributing

Feel free to fork and submit pull requests!

---

**Happy weather checking!** 🌦️
