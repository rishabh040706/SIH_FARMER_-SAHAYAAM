const API_BASE_URL = 'http://localhost:3001/api';

class ApiService {
  // Get location data
  static async getLocation() {
    try {
      const response = await fetch(`${API_BASE_URL}/location`);
      if (!response.ok) throw new Error('Failed to fetch location');
      return await response.json();
    } catch (error) {
      console.error('Error fetching location:', error);
      throw error;
    }
  }

  // Get weather data
  static async getWeather(lat, lon) {
    try {
      const query = lat && lon ? `?lat=${lat}&lon=${lon}` : '';
      const response = await fetch(`${API_BASE_URL}/weather${query}`);
      if (!response.ok) throw new Error('Failed to fetch weather');
      return await response.json();
    } catch (error) {
      console.error('Error fetching weather:', error);
      throw error;
    }
  }

  // Get soil data
  static async getSoilData() {
    try {
      const response = await fetch(`${API_BASE_URL}/soil`);
      if (!response.ok) throw new Error('Failed to fetch soil data');
      return await response.json();
    } catch (error) {
      console.error('Error fetching soil data:', error);
      throw error;
    }
  }

  // Get crop recommendation
  static async getCropRecommendation(soilData, weatherData, location) {
    try {
      const response = await fetch(`${API_BASE_URL}/crop-recommendation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ soilData, weatherData, location }),
      });
      if (!response.ok) throw new Error('Failed to get crop recommendation');
      return await response.json();
    } catch (error) {
      console.error('Error getting crop recommendation:', error);
      throw error;
    }
  }

  // Get market prices
  static async getMarketPrices() {
    try {
      const response = await fetch(`${API_BASE_URL}/market-prices`);
      if (!response.ok) throw new Error('Failed to fetch market prices');
      return await response.json();
    } catch (error) {
      console.error('Error fetching market prices:', error);
      throw error;
    }
  }

  // Get market analysis
  static async getMarketAnalysis(crop, location) {
    try {
      const response = await fetch(`${API_BASE_URL}/market-analysis`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ crop, location }),
      });
      if (!response.ok) throw new Error('Failed to get market analysis');
      return await response.json();
    } catch (error) {
      console.error('Error getting market analysis:', error);
      throw error;
    }
  }

  // Detect plant disease
  static async detectDisease(imageFile, plantType) {
    try {
      const formData = new FormData();
      formData.append('image', imageFile);
      formData.append('plantType', plantType || 'unknown');

      const response = await fetch(`${API_BASE_URL}/disease-detection`, {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error('Failed to detect disease');
      return await response.json();
    } catch (error) {
      console.error('Error detecting disease:', error);
      throw error;
    }
  }

  // Send chat message
  static async sendChatMessage(message, context, language = 'en') {
    try {
      const response = await fetch(`${API_BASE_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, context, language }),
      });
      if (!response.ok) throw new Error('Failed to send chat message');
      return await response.json();
    } catch (error) {
      console.error('Error sending chat message:', error);
      throw error;
    }
  }

  // Health check
  static async healthCheck() {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      if (!response.ok) throw new Error('API health check failed');
      return await response.json();
    } catch (error) {
      console.error('API health check failed:', error);
      throw error;
    }
  }
}

export default ApiService;