'use strict'

const btnSearch = document.querySelector('#searchBtn');
const inputBox = document.querySelector('.input_box');
let labelDescrip =  document.querySelector('.description');
let labelCity =  document.querySelector('.city');
let labelDegree =  document.querySelector('.degreeC');

let labelMin =  document.getElementById('minim');
let labelMax =  document.getElementById('maxim');
let imgWeather = document.querySelector('.weather_img');
let locationNotFound = document.querySelector('.location_not_found');
const weather_body = document.querySelector('.weather_body');
let lon;
let lat;

//de modif
const btnFavorites =  document.getElementById('Favorites');

// Functions


async function checkWeather(city) {
    
    const api_key = "22c6314a47f7d4fb0a044727cf2fa8b1";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    const weather_data = await fetch(`${url}`)
    .then(response => response.json()).catch(err => {
  console.error(err);
});

    if(weather_data.cod === `404`){
        locationNotFound.style.display = "flex";
        weather_body.style.display = "none";
        console.log("error");
        return;
    }

    console.log("run");
    locationNotFound.style.display = "none";
    weather_body.style.display = "flex";
    
    console.log("Weather data", weather_data);

    labelCity.textContent = `${weather_data.name}`;
    if(inputBox.value){
      labelDescrip.textContent = `${weather_data.weather[0].description}`;
      labelCity.textContent = `${weather_data.name}`;
      labelDegree.textContent = `${Math.round(weather_data.main.temp - 273.15)}°C`;
      labelMax.textContent = `${Math.round(weather_data.main.temp_max - 273.15)}°C`;
      labelMin.textContent = `${Math.round(weather_data.main.temp_min - 273.15)}°C`;
    }
    
    switch(weather_data.weather[0].main){
        case 'Clouds':
            imgWeather.src = "/assets/cloud.jpg";
            break;
        case 'Clear':
            imgWeather.src = "/assets/sun.png";
            break;
        case 'Rain': 
        imgWeather.src = "/assets/rain.jpg";
        break;
        case 'Mist':
            imgWeather.src = "/assets/mist.png";
            break;
        case 'Snow' :
            imgWeather.src = "/assets/snowflake.png";
            break;
    }
}

window.addEventListener("load", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      lon = position.coords.longitude;
      lat = position.coords.latitude;
  
      var base = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&` 
      +`lon=${lon}&appid=22c6314a47f7d4fb0a044727cf2fa8b1`;

      currentWeather(base);
    });
  }
});

async function currentWeather(base){ 
    const current_data = await fetch(`${base}`)
    .then(response => response.json()).catch(err => {
  console.error(err);
});

if(current_data.cod === `404`){
  locationNotFound.style.display = "flex";
  weather_body.style.display = "none";
  console.log("error");
  return;
}

locationNotFound.style.display = "none";
weather_body.style.display = "flex";

labelCity.textContent = `${current_data.name}`;
labelDescrip.textContent = `${current_data.weather[0].description}`;
labelDegree.textContent = `${Math.round(current_data.main.temp - 273.15)}°C`;
labelMax.textContent = `${Math.round(current_data.main.temp_max - 273.15)}°C`;
labelMin.textContent = `${Math.round(current_data.main.temp_min - 273.15)}°C`;

switch(current_data.weather[0].main){
  case 'Clouds':
      imgWeather.src = "/assets/cloud.jpg";
      break;
  case 'Clear':
      imgWeather.src = "/assets/sun.png";
      break;
  case 'Rain': 
  imgWeather.src = "/assets/rain.jpg";
  break;
  case 'Mist':
      imgWeather.src = "/assets/mist.png";
      break;
  case 'Snow' :
      imgWeather.src = "/assets/snowflake.png";
      break;
}
}

btnSearch.addEventListener('click', (e)=>{
    e.preventDefault();
    if(inputBox.value){
    checkWeather(inputBox.value);
    }
});