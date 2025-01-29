const apiKey = "7e53d83cf3824091b98135519252801"; // Corrected API key variable name
const apiUrl =
  "https://api.weatherapi.com/v1/current.json?key=" +
  apiKey +
  "&q=London&aqi=yes"; // Use https and template literals or concatenation

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const weather = document.querySelector(".weather");
const details = document.querySelector(".details");
const error = document.querySelector(".error");

async function checkWeather(city) {
  try {
    // Add a try-catch block for error handling
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`
    ); // Template literals are cleaner

    if (!response.ok) {
      // Check for HTTP errors (like 404)
      throw new Error("City not found"); // Throw an error to be caught
    }

    const data = await response.json();

    console.log(data);

    document.querySelector(".city").innerHTML = data.location.name; // Access location.name
    document.querySelector(".temp").innerHTML =
      Math.round(data.current.temp_c) + "°C"; // Access current.temp_c
    document.querySelector(".humidity").innerHTML = data.current.humidity + "%"; // Access current.humidity
    document.querySelector(".wind").innerHTML = data.current.wind_kph + " km/h"; // Access current.wind_kph

    // Update weather icon based on weather condition code:
    const conditionCode = data.current.condition.code;
    switch (true) {
      case conditionCode >= 1000 && conditionCode <= 1030: // Clear or partly cloudy
        weatherIcon.src = "images/clear.png";
        break;
      case conditionCode >= 1063 && conditionCode <= 1180: // Rain
        weatherIcon.src = "images/rain.png";
        break;
      case conditionCode >= 1183 && conditionCode <= 1207: // Snow
        weatherIcon.src = "images/snow.png";
        break;
      case conditionCode >= 1210 && conditionCode <= 1282: // Snow or sleet
        weatherIcon.src = "images/snow.png"; // Or a more specific snow image
        break;
      case conditionCode >= 1150 && conditionCode <= 1153: // Drizzle
        weatherIcon.src = "images/drizzle.png";
        break;
      case conditionCode >= 1135 && conditionCode <= 1147: // Fog/Mist
        weatherIcon.src = "images/mist.png";
        break;
      default:
        weatherIcon.src = "images/clouds.png"; // Default to clouds
    }

    weather.style.display = "block";
    details.style.display = "flex";
    error.style.display = "none";
  } catch (error) {
    console.error("Error fetching weather data:", error);
    error.style.display = "block";
    weather.style.display = "none";
    details.style.display = "none";
  }
}

searchBtn.addEventListener("click", () => {
  const city = searchBox.value;
  if (city) {
    checkWeather(city);
  } else {
    error.textContent = "Please enter a city name.";
    error.style.display = "block";
    weather.style.display = "none";
    details.style.display = "none";
  }
});


