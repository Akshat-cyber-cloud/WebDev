const API_KEY = `acc3dfe69a4146e4aa87da064aa0a71d`;

async function loadWeather(cityName) {
  try {
    const geoRes = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`
    );
    const geoData = await geoRes.json();

    if (!geoData.length) {
      alert("City not found");
      return;
    }

    const { lat, lon, name, country } = geoData[0];

    const weatherRes = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );
    const weather = await weatherRes.json();

    document.getElementById("city").innerText = `${name}, ${country}`;
    document.getElementById("temp").innerText = Math.round(weather.main.temp);
    document.getElementById("condition").innerText =
      weather.weather[0].description;
    document.getElementById("humidity").innerText =
      weather.main.humidity;
    document.getElementById("wind").innerText =
      weather.wind.speed;

  } catch (error) {
    console.error(error);
  }
}

loadWeather("Agra");
