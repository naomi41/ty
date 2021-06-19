let now = new Date();
let days = [
  "יום ראשון",
  "יום שני",
  "יום שלישי",
  "יום רביעי",
  "יום חמישי",
  "יום שישי",
  "יום שבת"
];


let day = days[now.getDay()];
let minutes= now.getMinutes(); 
let hours= now.getHours();

let time = document.querySelector(`#currentTime`);

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

let url1 = `https://api.openweathermap.org/data/2.5/weather?q=tel aviv&appid=a8f5a22819d25df63838b32e0cf4b2f4
&units=metric&lang=he`;
axios.get(url1).then(displayTelAviv);

function displayTelAviv (response) {
  let temperature = Math.round(response.data.main.temp);
  let temp = document.querySelector(`#temp`)
  temp.innerHTML= `${temperature}°C`

  let title = document.querySelector (`#city-name`);
  title.innerHTML = `מזג אוויר ב${response.data.name}`;

   celsiusTemperature=response.data.main.temp;

  let description = response.data.weather[0].description;
  let todayDate = document.querySelector(`#todayDate`);
todayDate.innerHTML= `${day} ${hours}:${minutes},${description}`; 


  let humidity= document.querySelector(`#humidity`); 
  let hum= response.data.main.humidity; 
  humidity.innerHTML= `לחות: ${hum}%`;

  let wind= document.querySelector(`#wind`); 
 let win= Math.round(response.data.wind.speed)  ; 
  wind.innerHTML= `מהירות הרוח: ${win}קמ״ש`

   let minMax= document.querySelector(`#minMax`); 
   let max= Math.round(response.data.main.temp_max)  ; 
   let min= Math.round(response.data.main.temp_min)  ; 
  minMax.innerHTML= `${min}°C/${max}°C`

   minTemp=response.data.main.temp_min;
 maxTemp=response.data.main.temp_max;
}



searchButton.addEventListener("submit", city);

function city (event) {
event.preventDefault();
  let cityInput = document.querySelector(`#city-input`).value;
     ok(cityInput) ;
  }
  function ok(cityInput){
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=a8f5a22819d25df63838b32e0cf4b2f4&units=metric&lang=he`;
    axios.get(url).then(displayWeather);  
  }

function displayWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let temp = document.querySelector("#temp")
  temp.innerHTML= `${temperature}°C`;

celsiusTemperature= response.data.main.temp;

let title = document.querySelector (`#city-name`);
title.innerHTML= `מזג אוויר ב${response.data.name}`;

  let description = response.data.weather[0].description;
  let todayDate = document.querySelector(`#todayDate`);
todayDate.innerHTML= `${day} ${hours}:${minutes},${description}`; 

  
  let humidity= document.querySelector(`#humidity`); 
  let hum= response.data.main.humidity; 
  humidity.innerHTML= `לחות: ${hum}%`;

  let wind= document.querySelector(`#wind`); 
let win= Math.round(response.data.wind.speed)  ;  
  wind.innerHTML= `מהירות הרוח: ${win}קמ״ש`;

  let minMax= document.querySelector(`#minMax`); 
   let max= Math.round(response.data.main.temp_max)  ; 
   let min= Math.round(response.data.main.temp_min)  ; 
  minMax.innerHTML= `${min}°C/${max}°C`

   minTemp=response.data.main.temp_min;
 maxTemp=response.data.main.temp_max;
}


currentButton.addEventListener("click", nav);

function nav (){
navigator.geolocation.getCurrentPosition(retrievePosition);
}
function retrievePosition(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}&lang=he`;
  axios.get(url).then(showWeather);
  console.log(lon);
  console.log(lat);
}

function showWeather(response) {
  let title = document.querySelector(`#city-name`);
title.innerHTML= `מזג אוויר ב${response.data.name}`;

  let temperature = Math.round(response.data.main.temp);
  let temp = document.querySelector("#temp");
    temp.innerHTML= `${temperature}°C`;

celsiusTemperature= response.data.main.temp;

  let description = response.data.weather[0].description;
  let todayDate = document.querySelector(`#todayDate`);
todayDate.innerHTML= `${day} ${hours}:${minutes},${description}`; 

  let humidity= document.querySelector(`#humidity`); 
  let hum= response.data.main.humidity; 
  humidity.innerHTML= `לחות: ${hum}%`;

  let wind= document.querySelector(`#wind`); 
  let win= Math.round(response.data.wind.speed)  ; 
  wind.innerHTML= `Wind speed: ${win}km/h`
  let minMax= document.querySelector(`#minMax`); 
   let max= Math.round(response.data.main.temp_max)  ; 
   let min= Math.round(response.data.main.temp_min)  ; 
  minMax.innerHTML= `${min}°C/${max}°C`

 minTemp=response.data.main.temp_min;
 maxTemp=response.data.main.temp_max;
}
let celsiusTemperature= null;
let minTemp=  null;
let maxTemp=  null;


function convertToF(event){
event.preventDefault();

let tempElment= document.querySelector(`#temp`);
let tempF= (`${Math.round(celsiusTemperature*1.8+32)}°F`); 
tempElment.innerHTML=tempF

let minMax= document.querySelector(`#minMax`);

   let max= Math.round(maxTemp*1.8+32)  ; 
   let min= Math.round(minTemp*1.8+32)  ;
  minMax.innerHTML= `${min}°F/${max}°F`
}

let fDegree= document.querySelector(`#degreeF`);
fDegree.addEventListener("click", convertToF); 

let cDegree= document.querySelector(`#degreeC`);
cDegree.addEventListener("click", convertToC); 

function convertToC(event){
event.preventDefault();
let tempElment= document.querySelector(`#temp`);
let tempC= (`${Math.round(celsiusTemperature)}°C`); 
tempElment.innerHTML=tempC

let minMax= document.querySelector(`#minMax`);

   let max= Math.round(maxTemp)  ; 
   let min= Math.round(minTemp)  ;
  minMax.innerHTML= `${min}°C/${max}°C`;
}