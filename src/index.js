let now = new Date();
let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
let day = days[now.getDay()];
let minutes= now.getMinutes(); 
let hours= now.getHours();

if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

let todayDate = document.querySelector(`#todayDate`);
todayDate.innerHTML= `${day} ${hours}:${minutes}`; 


let searchButton = document.querySelector(`#city-form`);
let currentButton = document.querySelector(`#current-location-button`);

let url1 = `https://api.openweathermap.org/data/2.5/weather?q=tel aviv&appid=a8f5a22819d25df63838b32e0cf4b2f4&units=metric`;
axios.get(url1).then(displayWeather);

searchButton.addEventListener("submit", city);

function city (event) {
event.preventDefault();
  let cityInput = document.querySelector(`#city-input`).value;
     ok(cityInput) ;
  }
  function ok(cityInput){
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=a8f5a22819d25df63838b32e0cf4b2f4
&units=metric`;
    axios.get(url).then(displayWeather);  
  }

  currentButton.addEventListener("click", nav);

function nav (){
navigator.geolocation.getCurrentPosition(retrievePosition);
}
function retrievePosition(position) {
  let apiKey = "a8f5a22819d25df63838b32e0cf4b2f4";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(displayWeather);

}
function displayWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let temp = document.querySelector("#temp")
  temp.innerHTML= `${temperature}°C`;

celsiusTemperature= response.data.main.temp;

let title = document.querySelector (`#city-name`);
title.innerHTML= `Weather in ${response.data.name}`;

   let description = response.data.weather[0].description;
  let todayDate = document.querySelector(`#todayDate`);
todayDate.innerHTML= `${day} ${hours}:${minutes}, ${description}`;
  
  let humidity= document.querySelector(`#humidity`); 
  let hum= response.data.main.humidity; 
  humidity.innerHTML= `Humidity: ${hum}%`;

  let wind= document.querySelector(`#wind`); 
let win= Math.round(response.data.wind.speed)  ;  
  wind.innerHTML= `Wind speed: ${win}km/h`

  let minMax= document.querySelector(`#minMax`); 
   let max= Math.round(response.data.main.temp_max)  ; 
   let min= Math.round(response.data.main.temp_min)  ; 
  minMax.innerHTML= `${min}°C/${max}°C`

   minTemp=response.data.main.temp_min;
 maxTemp=response.data.main.temp_max;

 let iconToday= document.querySelector(`#iconToday`);
     iconToday.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
 
    
    getForecast(response.data.coord);
}

function getForecast(coord){
   let lon=coord.lon;
   let lat = coord.lat;
   let url=`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=a8f5a22819d25df63838b32e0cf4b2f4&units=metric`
  axios.get(url).then(displayForecast);
  
}


function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
let forecast=response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let days = ["Tuesday","Wednesday","Thursday","Friday","Saturday"];
   
  let forecastHTML = `<div class="row rowForecast">`;
  forecast.forEach(function (forecastDay,index) {
    if (index < 5) {
    forecastHTML =
      forecastHTML +
      `
       <div class="col-2 day1">
                <div class="card cardsForecast" style="width:160px ;">
                    <div class="card-body" id="for">
                        <h5> ${formatDay(forecastDay.dt)} </h5>
                        <img id="iconForecast" src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="">
                        <p class="card-text" >  ${Math.round(forecastDay.temp.min)}°C/${Math.round(forecastDay.temp.max)}°C </p>
                    </div>
                </div>
            </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}