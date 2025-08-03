<template>
  <div class="container mt-4">
    <div class="card">
      <div class="card-header">
        <h1>WEATHER APP</h1>
      </div>
      <div class="card-body">
        <!-- Search Bar -->
        <div class="search-bar mb-4">
          <input
            type="text"
            v-model="city"
            placeholder="Enter city name (e.g., Clayton, AU)"
            class="search-input form-control"
          />
          <button @click="searchByCity" class="search-button btn btn-primary mt-2">
            Search
          </button>
        </div>

        <!-- Weather Display -->
        <div v-if="weatherData" class="weather-display">
          <h2>{{ weatherData.name }}, {{ weatherData.sys.country }}</h2>
          <div class="weather-info">
            <img v-if="iconUrl" :src="iconUrl" alt="Weather icon" class="weather-icon" />
            <p class="temperature">{{ temperature }} °C</p>
            <p class="description">{{ weatherData.weather[0].description }}</p>
          </div>
        </div>

        <div v-else class="loading">
          <p>Please implement "Search Weather by City".</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

// 请将此处替换为你的 OpenWeatherMap API key
const apikey = "b4e29e382a0e5dbcdf4b8d8233c179bd"; // 按照 10.1.2 获取你的 API key

export default {
  name: "WeatherView",
  data() {
    return {
      city: "",
      weatherData: null,
      hourlyForecast: [],
      dailyForecast: [],
    };
  },
  computed: {
    // 现在 API 返回摄氏度温度（因为使用了 units=metric）
    temperature() {
      return this.weatherData
        ? Math.round(this.weatherData.main.temp)
        : null;
    },
    // 获取当前天气图标的 URL
    iconUrl() {
      return this.weatherData
        ? `https://openweathermap.org/img/w/${this.weatherData.weather[0].icon}.png`
        : null;
    },
  },

  mounted() {
    this.fetchCurrentLocationWeather();
  },
  methods: {
    async fetchCurrentLocationWeather() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;
          const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}&units=metric`;
          await this.fetchWeatherData(url);
        }, (error) => {
          console.error("Geolocation error:", error);
          this.city = "Melbourne, AU";
          this.searchByCity();
        });
      } else {
        this.city = "Melbourne, AU";
        this.searchByCity();
      }
    },
    

    async searchByCity() {
      if (this.city.trim() === "") {
        alert("Please enter a city name");
        return;
      }
      
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${apikey}&units=metric`;
      await this.fetchWeatherData(url);
    },
    

    async fetchWeatherData(url) {
      try {
        console.log("Fetching weather from:", url);
        const response = await axios.get(url);
        this.weatherData = response.data;
        console.log("Weather data:", this.weatherData);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        if (error.response) {

          console.error("API Error:", error.response.data);
          alert(`API Error: ${error.response.data.message || 'Unknown error'}`);
        } else if (error.request) {

          console.error("Network Error:", error.request);
          alert("Network error. Please check your internet connection.");
        } else {

          alert("Error fetching weather data. Please try again.");
        }
      }
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
}

.card {
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.card-header {
  background-color: #007bff;
  color: white;
  text-align: center;
  border-radius: 15px 15px 0 0;
}

.search-bar {
  text-align: center;
}

.search-input {
  max-width: 300px;
  margin: 0 auto;
}

.weather-display {
  text-align: center;
}

.weather-info {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.weather-icon {
  width: 100px;
  height: 100px;
}

.temperature {
  font-size: 2.5rem;
  font-weight: bold;
  color: #007bff;
  margin: 10px 0;
}

.description {
  font-size: 1.2rem;
  text-transform: capitalize;
  color: #666;
}

.loading {
  text-align: center;
  color: #666;
}
</style>
