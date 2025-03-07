const express = require('express');
const path = require('path');
require('dotenv').config();
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

async function getWeather(lat, lon) {
    const API_KEY = '59bcee9d0069388e1c9162f833333aa3'; // Replace with your OpenWeatherMap API key
    const BASE_URL = 'http://api.openweathermap.org/data/2.5/weather';
    try {
        const response = await fetch(`${BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
    }
}

async function getAQI(lat, lon) {
    const API_KEY = '59bcee9d0069388e1c9162f833333aa3'; // Replace with your OpenWeatherMap API key
    const BASE_URL = 'http://api.openweathermap.org/data/2.5/air_pollution';
    try {
        const response = await fetch(`${BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching AQI data:', error);
        throw error;
    }
}

async function displayWeatherAndAQI(lat, lon) {
    try {
        const weatherData = await getWeather(lat, lon);
        const aqiData = await getAQI(lat, lon);

        console.log('Weather Data:', weatherData);
        console.log('AQI Data:', aqiData);

        document.getElementById('weather').innerText = `Weather: ${JSON.stringify(weatherData)}`;
        document.getElementById('aqi').innerText = `AQI: ${JSON.stringify(aqiData)}`;
    } catch (error) {
        console.error('Error displaying weather and AQI data:', error);
    }
}

// Example usage
const lat = 37.7749; // Replace with desired latitude
const lon = -122.4194; // Replace with desired longitude
displayWeatherAndAQI(lat, lon);