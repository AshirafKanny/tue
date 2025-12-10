import { useState, useEffect } from 'react'
import './App.css'
import { getWeatherByCity, getWeatherByCoords } from './weatherService'

interface WeatherData {
  city: string
  temperature: number
  description: string
  humidity: number
  windSpeed: number
  pressure: number
  feelsLike: number
  icon: string
}

function App() {
  const [searchCity, setSearchCity] = useState('')
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [isCelsius, setIsCelsius] = useState(true)
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [isDarkMode, setIsDarkMode] = useState(true)

  // Load default weather on app start (New York)
  useEffect(() => {
    loadWeather('New York')
  }, [])

  const loadWeather = async (city: string) => {
    setLoading(true)
    setError('')
    try {
      const data = await getWeatherByCity(city)
      setWeather(data)
      // Add to recent searches (limit to 5)
      setRecentSearches((prev) => 
        [city, ...prev.filter(c => c !== city)].slice(0, 5)
      )
    } catch (err) {
      setError('Failed to fetch weather. Try another city.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchCity.trim()) {
      loadWeather(searchCity)
      setSearchCity('')
    }
  }

  const handleGetLocation = () => {
    setLoading(true)
    setError('')
    
    if (!navigator.geolocation) {
      setError('Geolocation not supported in your browser')
      setLoading(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        loadWeatherByCoords(latitude, longitude)
      },
      (err) => {
        setError('Unable to get your location. Please enable location permissions.')
        setLoading(false)
        console.error(err)
      }
    )
  }

  const loadWeatherByCoords = async (lat: number, lon: number) => {
    try {
      const data = await getWeatherByCoords(lat, lon)
      setWeather(data)
      setError('')
    } catch (err) {
      setError('Failed to fetch weather for your location.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const convertTemp = (celsius: number): number => {
    return isCelsius ? celsius : Math.round((celsius * 9/5) + 32)
  }

  const getTempUnit = (): string => {
    return isCelsius ? '°C' : '°F'
  }

  return (
    <div className={`min-h-screen transition-all duration-500 ${isDarkMode ? 'bg-slate-900' : 'bg-slate-100'}`}>
      {/* Header */}
      <header className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-200 border-slate-300'} border-b transition-all duration-300`}>
        <div className="max-w-4xl mx-auto px-4 py-6 flex justify-between items-center">
          <div>
            <h1 className={`text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}> My Weather App</h1>
            <p className={`mt-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>BY DEVS @ KICO WEB DESIGN</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setIsCelsius(!isCelsius)}
              className={`btn btn-sm gap-2 transition-all duration-300 ${isDarkMode ? 'bg-slate-700 border-slate-600 text-white hover:bg-slate-600' : 'bg-slate-300 border-slate-400 text-slate-900 hover:bg-slate-400'}`}
            >
              {isCelsius ? '°C' : '°F'} | Switch
            </button>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`btn btn-sm gap-2 transition-all duration-300 ${isDarkMode ? 'bg-slate-700 border-slate-600 text-white hover:bg-slate-600' : 'bg-slate-300 border-slate-400 text-slate-900 hover:bg-slate-400'}`}
            >
              <img 
                src="/dack.png" 
                alt="Theme" 
                className="w-5 h-5 object-contain"
              />
              Theme
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        
        {/* Search Section */}
        <div className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-200 border-slate-300'} rounded-2xl p-6 mb-8 border transition-all duration-300 hover:shadow-xl`}>
          <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Search Weather</h2>
          
          <form onSubmit={handleSearch} className="flex gap-2 mb-4">
            <input
              type="text"
              placeholder="Enter city name..."
              value={searchCity}
              onChange={(e) => setSearchCity(e.target.value)}
              className={`flex-1 px-4 py-3 rounded-lg transition-all duration-300 focus:scale-105 focus:outline-none focus:ring-2 ${isDarkMode ? 'bg-slate-700 text-white placeholder-slate-400 focus:ring-blue-500' : 'bg-white text-slate-900 placeholder-slate-500 focus:ring-blue-500'}`}
            />
            <button
              type="submit"
              disabled={loading}
              className={`btn btn-primary gap-2 disabled:opacity-50 transition-all duration-300 hover:scale-105 active:scale-95`}
            >
               Search
            </button>
          </form>

          <button
            onClick={handleGetLocation}
            disabled={loading}
            className={`px-4 py-3 rounded-lg w-full disabled:opacity-50 transition-all duration-300 hover:scale-105 active:scale-95 font-semibold text-white`}
            style={{
              backgroundColor: '#0F4C4C',
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0A3838'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0F4C4C'}
          >
             Use My Location
          </button>

          {error && (
            <div className={`mt-4 p-4 rounded-lg border animate-pulse ${isDarkMode ? 'bg-red-900 bg-opacity-30 text-red-200 border-red-700' : 'bg-red-200 bg-opacity-50 text-red-900 border-red-400'}`}>
              {error}
            </div>
          )}

          {recentSearches.length > 0 && (
            <div className="mt-4">
              <p className={`text-sm mb-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>Recent Searches:</p>
              <div className="flex gap-2 flex-wrap">
                {recentSearches.map((city) => (
                  <button
                    key={city}
                    onClick={() => loadWeather(city)}
                    className={`px-3 py-1 rounded-full text-sm transition-all duration-300 hover:scale-110 active:scale-95 ${isDarkMode ? 'bg-slate-700 text-white hover:bg-slate-600' : 'bg-slate-300 text-slate-900 hover:bg-slate-400'}`}
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center">
            <div className={`inline-block p-8 rounded-2xl ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-200 border-slate-300'} border`}>
              <div className="flex flex-col items-center gap-4">
                <div className="relative w-20 h-20">
                  <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 border-r-purple-500 animate-spin"></div>
                  <div className="absolute inset-2 rounded-full border-4 border-transparent border-b-pink-500 border-l-blue-500 animate-spin" style={{animationDirection: 'reverse'}}></div>
                </div>
                <p className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Loading weather data...</p>
              </div>
            </div>
          </div>
        )}

        {/* Weather Card */}
        {weather && !loading && (
          <div className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-200 border-slate-300'} rounded-2xl p-8 border transition-all duration-700 hover:shadow-2xl animate-in slide-in-from-bottom-8 fade-in duration-700`}>
            <div className="text-center">
              <h2 className={`text-4xl font-bold mb-4 transition-colors ${isDarkMode ? 'text-white' : 'text-slate-900'}`}> {weather.city}</h2>
              <div className="flex justify-center items-center mb-6 animate-bounce">
                <img 
                  src="/weather.png" 
                  alt={weather.description}
                  className="w-32 h-32 object-contain"
                />
              </div>
              <div className="mb-6">
                <p className={`text-6xl font-bold transition-colors ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{convertTemp(weather.temperature)}{getTempUnit()}</p>
                <p className={`text-xl mt-2 transition-colors ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>{weather.description}</p>
              </div>

              {/* Weather Details Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                <div className={`${isDarkMode ? 'bg-slate-700' : 'bg-slate-300'} rounded-lg p-4 transition-all duration-300 hover:scale-110 hover:shadow-lg cursor-pointer`}>
                  <p className={`text-sm mb-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>Humidity</p>
                  <p className={`text-2xl font-bold transition-colors ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{weather.humidity}%</p>
                </div>
                <div className={`${isDarkMode ? 'bg-slate-700' : 'bg-slate-300'} rounded-lg p-4 transition-all duration-300 hover:scale-110 hover:shadow-lg cursor-pointer`}>
                  <p className={`text-sm mb-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>Wind Speed</p>
                  <p className={`text-2xl font-bold transition-colors ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{weather.windSpeed} mph</p>
                </div>
                <div className={`${isDarkMode ? 'bg-slate-700' : 'bg-slate-300'} rounded-lg p-4 transition-all duration-300 hover:scale-110 hover:shadow-lg cursor-pointer`}>
                  <p className={`text-sm mb-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>Pressure</p>
                  <p className={`text-2xl font-bold transition-colors ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{weather.pressure} mb</p>
                </div>
                <div className={`${isDarkMode ? 'bg-slate-700' : 'bg-slate-300'} rounded-lg p-4 transition-all duration-300 hover:scale-110 hover:shadow-lg cursor-pointer`}>
                  <p className={`text-sm mb-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>Feels Like</p>
                  <p className={`text-2xl font-bold transition-colors ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{convertTemp(weather.feelsLike)}{getTempUnit()}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 5-Day Forecast */}
        {weather && !loading && (
          <div className="mt-8 animate-in slide-in-from-bottom-8 fade-in duration-700" style={{animationDelay: '200ms'}}>
            <h3 className={`text-2xl font-bold mb-4 transition-colors ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>5-Day Forecast</h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, index) => (
                <div 
                  key={day} 
                  className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-200 border-slate-300'} rounded-xl p-4 border text-center transition-all duration-300 hover:scale-110 hover:shadow-xl cursor-pointer animate-in slide-in-from-bottom-6 fade-in duration-700`}
                  style={{animationDelay: `${300 + (index * 100)}ms`}}
                >
                  <p className={`font-bold mb-2 transition-colors ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{day}</p>
                  <p className="text-3xl mb-2">⛅</p>
                  <p className={`text-sm transition-colors ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>High: 75°F</p>
                  <p className={`text-sm transition-colors ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>Low: 62°F</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-12 py-6 text-center text-blue-100">
        <p>Designed by Ashiraf Kenny A Web Dev At Kico Web Design</p>
      </footer>
    </div>
  )
}

export default App
