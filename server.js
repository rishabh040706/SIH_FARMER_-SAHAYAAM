import express from 'express';
import cors from 'cors';
import axios from 'axios';
import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();
import multer from 'multer';
import FormData from 'form-data';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure multer for file uploads
const upload = multer({ storage: multer.memoryStorage() });

// Initialize OpenAI
const openai = process.env.OPENAI_API_KEY ? new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
}) : null;

// Weather API configuration
const WEATHER_API_KEY = process.env.WEATHER_API_KEY || 'your-weather-api-key-here';

// Mock data for demonstration
const mockSoilData = {
  ph: 6.5,
  moisture: 20,
  nitrogen: 45,
  phosphorus: 25,
  potassium: 180
};

const mockMandiPrices = [
  { commodity: "Rice", price: "₹2,500/quintal", market: "Karnal" },
  { commodity: "Wheat", price: "₹2,100/quintal", market: "Patiala" },
  { commodity: "Maize", price: "₹1,800/quintal", market: "Ambala" },
  { commodity: "Cotton", price: "₹6,200/quintal", market: "Hisar" }
];

// Helper function to get location from IP
async function getLocationFromIP() {
  try {
    const response = await axios.get('http://ip-api.com/json/');
    return {
      lat: response.data.lat,
      lon: response.data.lon,
      city: response.data.city,
      region: response.data.regionName,
      country: response.data.country
    };
  } catch (error) {
    // Default to India coordinates if IP geolocation fails
    return {
      lat: 28.6139,
      lon: 77.2090,
      city: "New Delhi",
      region: "Delhi",
      country: "India"
    };
  }
}

// Helper function to get weather data
async function getWeatherData(lat, lon) {
  try {
    const url = `https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${lat},${lon}`;
    const response = await axios.get(url);
    return {
      temperature: response.data.current.temp_c,
      humidity: response.data.current.humidity,
      condition: response.data.current.condition.text,
      wind_kph: response.data.current.wind_kph
    };
  } catch (error) {
    // Return mock weather data if API fails
    return {
      temperature: 32,
      humidity: 65,
      condition: "Partly cloudy",
      wind_kph: 12
    };
  }
}

// AI-powered crop recommendation
async function recommendCropWithAI(soilData, weatherData, location) {
  const prompt = `Based on the following agricultural data, recommend the best crop to grow:
  
Location: ${location.city}, ${location.region}
Soil pH: ${soilData.ph}
Soil Moisture: ${soilData.moisture}%
Temperature: ${weatherData.temperature}°C
Humidity: ${weatherData.humidity}%
Weather Condition: ${weatherData.condition}

Please provide:
1. Best crop recommendation
2. Why this crop is suitable
3. Any specific growing tips
4. Expected yield information`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 300,
      temperature: 0.7
    });

    return completion.choices[0].message.content;
  } catch (error) {
    // Fallback to basic logic if AI fails
    return recommendCropBasic(soilData, weatherData);
  }
}

// Basic crop recommendation logic
function recommendCropBasic(soilData, weatherData) {
  let crop = "Maize";
  
  if (soilData.ph < 6.0) {
    crop = "Rice";
  } else if (soilData.ph > 7.5) {
    crop = "Wheat";
  }

  if (weatherData.temperature > 35) {
    crop += " (Heat-tolerant variety)";
  }
  if (weatherData.humidity > 80) {
    crop += " (Suitable for high humidity)";
  }

  return `Recommended crop: ${crop}\n\nBased on your soil pH of ${soilData.ph} and current weather conditions (${weatherData.temperature}°C, ${weatherData.humidity}% humidity), ${crop.toLowerCase()} would be the most suitable choice for your farm.`;
}

// AI-powered disease detection
async function detectDiseaseWithAI(imageBuffer, plantType) {
  // For now, we'll use AI to analyze based on description
  // In production, you'd use computer vision APIs
  
  const prompt = `Based on common plant diseases, analyze this scenario: A farmer has uploaded an image of their ${plantType || 'crop'} for disease detection. The image appears to show some symptoms. 

Please provide:
1. Most likely disease identification
2. Symptoms to look for
3. Recommended treatment
4. Preventive measures
5. When to consult an expert`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 400,
      temperature: 0.5
    });

    return completion.choices[0].message.content;
  } catch (error) {
    return "Detected disease: Leaf spot. Recommended treatment: Fungicide application. Please consult with a local agricultural expert for confirmation.";
  }
}

// AI-powered market analysis
async function getMarketAnalysisWithAI(crop, location) {
  const prompt = `Provide current market analysis for ${crop} in ${location} region:

Please include:
1. Current market price trends
2. Best time to sell
3. Storage recommendations
4. Market demand analysis
5. Price forecasting for next few weeks`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 350,
      temperature: 0.6
    });

    return completion.choices[0].message.content;
  } catch (error) {
    return `Based on current market conditions, ${crop} prices are stable. Average price range: ₹2,000-2,500 per quintal. Consider selling during peak demand periods.`;
  }
}

// API Routes

// Get location data
app.get('/api/location', async (req, res) => {
  try {
    const location = await getLocationFromIP();
    res.json(location);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get location data' });
  }
});

// Get weather data
app.get('/api/weather', async (req, res) => {
  try {
    const { lat, lon } = req.query;
    const location = lat && lon ? { lat: parseFloat(lat), lon: parseFloat(lon) } : await getLocationFromIP();
    const weatherData = await getWeatherData(location.lat, location.lon);
    res.json(weatherData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get weather data' });
  }
});

// Get soil data
app.get('/api/soil', (req, res) => {
  res.json(mockSoilData);
});

// Get crop recommendation
app.post('/api/crop-recommendation', async (req, res) => {
  try {
    const { soilData, weatherData, location } = req.body;
    
    // Use provided data or fetch defaults
    const finalSoilData = soilData || mockSoilData;
    const finalLocation = location || await getLocationFromIP();
    const finalWeatherData = weatherData || await getWeatherData(finalLocation.lat, finalLocation.lon);
    
    const recommendation = await recommendCropWithAI(finalSoilData, finalWeatherData, finalLocation);
    
    res.json({ recommendation });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get crop recommendation' });
  }
});

// Get market prices
app.get('/api/market-prices', (req, res) => {
  res.json(mockMandiPrices);
});

// Get market analysis
app.post('/api/market-analysis', async (req, res) => {
  try {
    const { crop, location } = req.body;
    const analysis = await getMarketAnalysisWithAI(crop, location || 'India');
    res.json({ analysis });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get market analysis' });
  }
});

// Detect plant disease
app.post('/api/disease-detection', upload.single('image'), async (req, res) => {
  try {
    const { plantType } = req.body;
    const imageFile = req.file;
    
    if (!imageFile) {
      return res.status(400).json({ error: 'No image provided' });
    }
    
    const detection = await detectDiseaseWithAI(imageFile.buffer, plantType);
    res.json({ detection });
  } catch (error) {
    res.status(500).json({ error: 'Failed to detect disease' });
  }
});

// Chatbot endpoint for general queries
app.post('/api/chat', async (req, res) => {
  try {
    const { message, context, language = 'en' } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    let response;

    if (openai) {
      // Use OpenAI if available
      const systemPrompt = `You are a helpful agricultural assistant. Provide accurate, practical advice to farmers. Be concise and clear. Consider the local context and provide actionable recommendations.

Context: ${context || 'General farming query'}
Language preference: ${language}

Respond in the requested language. If the user asks in Malayalam (ml), respond in Malayalam.`;

      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message }
        ],
        max_tokens: 500,
        temperature: 0.7
      });

      response = completion.choices[0].message.content;
    } else {
      // Fallback responses when OpenAI is not available
      const fallbackResponses = {
        'crop-recommendation': 'Based on your query about crop recommendations, I suggest considering factors like soil pH, current weather conditions, and local market demand. For rice, ensure pH 5.5-6.5 and good water availability. For wheat, pH 6.0-7.5 works best. For maize, pH 5.8-7.0 is ideal. Consider current temperature and humidity levels for best results.',
        'market-analysis': 'Market analysis shows stable prices for most crops. Rice: ₹2,400-2,600/quintal, Wheat: ₹2,000-2,200/quintal, Maize: ₹1,700-1,900/quintal. Prices vary by region and season. Monitor local mandi rates and consider storage if prices are low. Sell during peak demand periods for better returns.',
        'disease-detection': 'Common plant diseases include leaf spot, powdery mildew, and root rot. For leaf spot: Apply fungicide, ensure proper drainage. For powdery mildew: Use sulfur-based treatments, improve air circulation. For root rot: Reduce watering, apply appropriate fungicide. Always consult local agricultural experts for accurate diagnosis and treatment.',
        'general': 'I understand your question about farming. For the most accurate advice, please provide specific details about your location, crop type, soil conditions, and any visible symptoms or concerns.'
      };
      
      response = fallbackResponses[context] || fallbackResponses['general'];
    }

    res.json({ 
      response,
      timestamp: new Date().toISOString(),
      aiSource: openai ? 'OpenAI' : 'Fallback'
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to process chat message' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`🌾 Agricultural API Server running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🤖 AI Integration: ${openai ? 'OpenAI GPT-3.5-turbo' : 'Fallback Mode'}`);
  console.log(`🌤️  Weather API: WeatherAPI.com`);
});

export default app;