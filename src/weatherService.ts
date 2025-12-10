/**
 * weatherService.ts
 * Handles all API calls to OpenWeatherMap
 * 
 * What is this file doing?
 * - Making HTTP requests to fetch weather data
 * - Converting raw data into usable format
 * - Handling errors gracefully
 */

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

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather'

/**
 * Fetch weather by city name
 * @param city - City name (e.g., "London", "New York")
 * @returns Promise with weather data
 */
export async function getWeatherByCity(city: string): Promise<WeatherData> {
  try {
    const response = await fetch(
      `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`
    )

    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`)
    }

    const data = await response.json()
    
    // Transform API response into our format
    return {
      city: data.name,
      temperature: Math.round(data.main.temp),
      description: data.weather[0].main,
      humidity: data.main.humidity,
      windSpeed: Math.round(data.wind.speed * 2.237), // Convert m/s to mph
      pressure: data.main.pressure,
      feelsLike: Math.round(data.main.feels_like),
      icon: data.weather[0].icon,
    }
  } catch (error) {
    console.error('Error fetching weather:', error)
    throw error
  }
}

/**
 * Fetch weather by coordinates (latitude, longitude)
 * @param lat - Latitude
 * @param lon - Longitude
 * @returns Promise with weather data
 */
export async function getWeatherByCoords(
  lat: number,
  lon: number
): Promise<WeatherData> {
  try {
    const response = await fetch(
      `${BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    )

    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`)
    }

    const data = await response.json()

    return {
      city: data.name,
      temperature: Math.round(data.main.temp),
      description: data.weather[0].main,
      humidity: data.main.humidity,
      windSpeed: Math.round(data.wind.speed * 2.237),
      pressure: data.main.pressure,
      feelsLike: Math.round(data.main.feels_like),
      icon: data.weather[0].icon,
    }
  } catch (error) {
    console.error('Error fetching weather:', error)
    throw error
  }
}
