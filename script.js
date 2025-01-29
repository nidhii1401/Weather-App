
const apiKey = "7e53d83cf3824091b98135519252801";
const apiUrl = "https://api.weatherapi.com/v1/current.json?key=" + apiKey +"&q=London&aqi=yes";


const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const weather = document.querySelector(".weather");
const details = document.querySelector(".details");
const error = document.querySelector(".error");

async function checkWeather(city) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`
    ); 

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();

    console.log(data);

    document.querySelector(".city").innerHTML = data.location.name; 
    document.querySelector(".temp").innerHTML =
      Math.round(data.current.temp_c) + "°C"; 
    document.querySelector(".humidity").innerHTML = data.current.humidity + "%"; 
    document.querySelector(".wind").innerHTML = data.current.wind_kph + " km/h"; 

    const conditionCode = data.current.condition.code;
    switch (true) {
      case conditionCode >= 1000 && conditionCode <= 1030: 
        weatherIcon.src = "images/clear.png";
        break;
      case conditionCode >= 1063 && conditionCode <= 1180: 
        weatherIcon.src = "images/rain.png";
        break;
      case conditionCode >= 1183 && conditionCode <= 1207: 
        weatherIcon.src = "images/snow.png";
        break;
      case conditionCode >= 1210 && conditionCode <= 1282: 
        weatherIcon.src = "images/snow.png"; 
        break;
      case conditionCode >= 1150 && conditionCode <= 1153: 
        weatherIcon.src = "images/drizzle.png";
        break;
      case conditionCode >= 1135 && conditionCode <= 1147: 
        weatherIcon.src = "images/mist.png";
        break;
      default:
        weatherIcon.src = "images/clouds.png";
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


