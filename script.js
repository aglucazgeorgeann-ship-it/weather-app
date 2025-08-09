// Ilagay dito ang API key mo mula sa OpenWeatherMap
const apiKey = "f11a203311d9d489c8eadb0e4b9b0d93";

// Kukunin ang mga HTML elements
const searchBox = document.getElementById("search-box");
const searchBtn = document.getElementById("search-btn");
const cityName = document.querySelector(".city-name");
const dateEl = document.querySelector(".date");
const temperature = document.querySelector(".temperature");
const weatherCondition = document.querySelector(".weather-condition");

// Function para makuha ang weather data
async function getWeatherByCity(city) {
    // API URL para makuha ang weather data. Gumagamit tayo ng template literals (`) para mas madali.
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    
    try {
        // Fetch data mula sa API
        const response = await fetch(apiUrl);
        
        // I-check kung successful ang request
        if (!response.ok) {
            alert("City not found. Please enter a valid city name.");
            return;
        }
        
        // I-parse ang JSON data
        const data = await response.json();
        
        // Ipakita ang data sa screen
        displayWeather(data);
    } catch (error) {
        console.error("Error fetching weather data:", error);
        alert("An error occurred. Please try again later.");
    }
}

// Function para ipakita ang weather data sa HTML
function displayWeather(data) {
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    
    cityName.textContent = data.name;
    dateEl.textContent = formattedDate;
    temperature.textContent = Math.round(data.main.temp);
    weatherCondition.textContent = data.weather[0].description;
}

// Event listener para sa search button
searchBtn.addEventListener("click", () => {
    const city = searchBox.value.trim();
    if (city) {
        getWeatherByCity(city);
    } else {
        alert("Please enter a city name.");
    }
});