
const apiKey = "ab0bdc91ab805a806df04d3eeaa0f83f"
const apiUrl =  "https://api.openweathermap.org/data/2.5/weather?q=delhi&units=metric";

async function checkWeather() {
    const response = await fetch(apiUrl + `&appid = ${apiKey}`);
    var data =  await response.json();
    

    console.log(data)

    document.querySelector(".city").innerHTML = data.name;
}

checkWeather()
