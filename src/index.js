let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

let day = days[now.getDay()];
let month = months[now.getMonth()];
let year = now.getFullYear();
let date = now.getDate();
let minutes= now.getMinutes(); 
let hours= now.getHours();

let time = document.querySelector(`#currentTime`);

let todayDate = document.querySelector(`#todayDate`);
todayDate.innerHTML= `${day} ${date} ${month} ${year}`; 

if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
time.innerHTML= `${hours}:${minutes}`



let searchButton = document.querySelector(`#city-form`);
let currentButton = document.querySelector(`#current-location-button`);

let url1 = `https://api.openweathermap.org/data/2.5/weather?q=tel aviv&appid=a8f5a22819d25df63838b32e0cf4b2f4
&units=metric`;
axios.get(url1).then(displayTelAviv);

function displayTelAviv (response) {
  let temperature = Math.round(response.data.main.temp);
  let temp = document.querySelector(`#temp`)
  temp.innerHTML= `${temperature}°C`

  let title = document.querySelector (`#city-name`);
  title.innerHTML = `Weather in ${response.data.name}`;

  let description = response.data.weather[0].description;
  let desc= document.querySelector(`#description`); 
  desc.innerHTML= description; 

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
}



searchButton.addEventListener("submit", city);

function city (event) {
event.preventDefault();
  let cityInput = document.querySelector(`#city-input`).value;
     ok(cityInput) ;
  }
  function ok(cityInput){
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=a8f5a22819d25df63838b32e0cf4b2f4&units=metric`;
    axios.get(url).then(displayWeather);  
  }

function displayWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let temp = document.querySelector("#temp")
  temp.innerHTML= `${temperature}°C`;

let title = document.querySelector (`#city-name`);
title.innerHTML= `Weather in ${response.data.name}`;

  let desc= document.querySelector(`#description`); 
  let description = response.data.weather[0].description;
  desc.innerHTML= description;
  
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
}


currentButton.addEventListener("click", nav);

function nav (){
navigator.geolocation.getCurrentPosition(retrievePosition);
}
function retrievePosition(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

function showWeather(response) {
  let title = document.querySelector(`#city-name`);
   title.innerHTML= `Weather in ${response.data.name}`;

  let temperature = Math.round(response.data.main.temp);
  let temp = document.querySelector("#temp");
    temp.innerHTML= `${temperature}°C`;

  let description = response.data.weather[0].description;
  let desc= document.querySelector(`#description`); 
  desc.innerHTML= description; 

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
}