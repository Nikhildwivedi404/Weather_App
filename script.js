/* script.js */

const apiKey = '8369dcb55bd3e2cf29b0bd7fd3b2287f'; // 🔑 Replace with your actual API key! (Now replaced)
const searchButton = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');
const weatherResultDiv = document.querySelector('.weather-result');
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

searchButton.addEventListener('click', () => {
    const city = cityInput.value;
    if (city) {
        weatherResultDiv.classList.add('hidden'); // Hide previous result with transition
        setTimeout(() => { // Wait for the fade-out transition to complete
            fetchWeatherData(city);
        }, 300); // 300ms delay (adjust to match CSS transition duration)
    } else {
        alert('Please enter a city name.');
    }
});

async function fetchWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            if (response.status === 404) {
                weatherResultDiv.innerHTML = `<p class="error-message">City not found. Please check the spelling.</p>`;
            } else {
                weatherResultDiv.innerHTML = `<p class="error-message">Error fetching weather data. Please try again later.</p>`;
                console.error('OpenWeatherMap API Error:', response.status, response.statusText);
            }
            weatherResultDiv.classList.remove('hidden'); // Show error message
            return;
        }
        const data = await response.json();
        displayWeatherData(data);

    } catch (error) {
        weatherResultDiv.innerHTML = `<p class="error-message">An unexpected error occurred. Please check your internet connection and try again.</p>`;
        console.error('Fetch Error:', error);
        weatherResultDiv.classList.remove('hidden'); // Show error message
    }
}

function displayWeatherData(data) {
    if (data.cod === 200) {
        const cityName = data.name;
        const temperature = Math.round(data.main.temp);
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;

        weatherResultDiv.innerHTML = `
            <h2>${cityName}</h2>
            <div class="weather-icon">
                <img src="${iconUrl}" alt="${description}">
            </div>
            <p class="temperature">${temperature}°C</p>
            <p class="description">${description}</p>
            <p class="details">Humidity: ${humidity}%</p>
            <p class="details">Wind Speed: ${windSpeed} m/s</p>
        `;
    } else {
        weatherResultDiv.innerHTML = `<p class="error-message">Error displaying weather data.</p>`;
        console.error('API Response Error:', data);
    }
    weatherResultDiv.classList.remove('hidden'); // Show weather result
}

// Theme Toggle Logic
themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    if (body.classList.contains('dark-theme')) {
        themeToggle.textContent = '🌙 Dark Mode';
        localStorage.setItem('theme', 'dark');
    } else {
        themeToggle.textContent = '☀️ Light Mode';
        localStorage.setItem('theme', 'light');
    }
});

// Remember user's theme preference on page load
document.addEventListener('DOMContentLoaded', () => {
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        body.classList.add('dark-theme');
        themeToggle.textContent = '🌙 Dark Mode';
    }
});