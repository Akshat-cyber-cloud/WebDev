


// const API_KEY = `acc3dfe69a4146e4aa87da064aa0a71d`;

// function getWeather(city){
//     const url =  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

//     fetch(url)
//     .then(res => res.json())
//     .then(data => {
//         console.log("Temprature: ",data.main.temp);
//         console.log("Humidity: ",data.main.humidity);
//         console.log("Weather: ",data.weather[0].description);
//     })
//     .catch(error => {
//         console.log("Error: ",error);
//     })
// }

// getWeather("Delhi");





// const API_KEY = `acc3dfe69a4146e4aa87da064aa0a71d`;

// async function getWeather(city) {
//     const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

//     try {
//         let response = await fetch(url);

//         let data = await response.json();

//         console.log("Temperature:", data.main.temp);
//         console.log("Humidity:", data.main.humidity);
//         console.log("Weather:", data.weather[0].description);
//     }catch (error){
//         console.log("Error: ", error);
//     }
// }

// getWeather("Delhi");
// getWeather("London");


