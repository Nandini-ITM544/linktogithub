let apiKey = "fb1865d0d87f6d1b02d912ac727945ca";
let units = "metric";
let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";

let searchQuery = document.querySelector("#search-city");
let searchButton = document.querySelector("#search-button");
console.log(searchButton);
let currentLocation = document.querySelector("#current-location");
let defaultTemperatureCelsius = document.querySelector("#mainTemperature")
  .innerHTML;
let defaultTemperature = document.querySelector("#temp").innerHTML;
console.log(defaultTemperature);
let farenheitButton = document.querySelector("#farenheit");
let celsiusButton = document.querySelector("#celsius");

currentLocation.addEventListener("click", getCurrentLocation);

function getCurrentLocation(event) {
  navigator.geolocation.getCurrentPosition(getPosition);
}
function getPosition(position) {
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  axios
    .get(`${apiUrl}lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`)
    .then(getCurrentLocationTemperature);
}

function getCurrentLocationTemperature(response) {
  console.log(response);

  let currentCity = response.data.name;
  let currentCityTemperature = Math.round(response.data.main.temp);
  document.querySelector(".cityorzip").innerHTML = currentCity;
  document.querySelector("#temp").innerHTML = currentCityTemperature;
  defaultTemperature = currentCityTemperature;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  apiUrlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${currentCity}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrlForecast).then(displayForecast);
}

function displayCity(event) {
  event.preventDefault();

  let selectedCity = document.querySelector("#cityname").value;
  console.log(selectedCity);
  document.querySelector(".cityorzip").innerHTML = selectedCity;

  axios
    .get(`${apiUrl}q=${selectedCity}&appid=${apiKey}&units=${units}`)
    .then(getSelectedCityTemperature);

  apiUrlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${selectedCity}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrlForecast).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);
  console.log(response.data.list[0].weather[0].icon);

  let forecast = document.querySelector("#forecast");
  forecast.innerHTML = Math.round(response.data.list[0].main.temp);
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.list[0].weather[0].icon}@2x.png`
  );
}

function getSelectedCityTemperature(response) {
  let city = response.data.name;
  let cityTemperature = Math.round(response.data.main.temp);
  document.querySelector(".cityorzip").innerHTML = city;
  document.querySelector("#temp").innerHTML = cityTemperature;
  defaultTemperature = cityTemperature;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

searchQuery.addEventListener("submit", displayCity);
//searchButton.addEventListener("submit", displayCity);

function displayFormattedDate() {
  let currentTime = document.querySelector("#currenttime");
  // let countryDates = document.querySelectorAll("#currentDate");
  //console.log(countryDates);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
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
    "December",
  ];

  let now = new Date();
  let month = now.getMonth();
  let currentMonth = months[month];
  let dayNumber = now.getDay();
  let dayOfWeek = days[dayNumber];
  let date = now.getDate();
  let hour = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  let timeZone = now.getTimezoneOffset();
  console.log(timeZone);
  let formattedTime = `${hour}:${minutes}:${seconds}`;
  currentTime.innerHTML = `${date} ${currentMonth}, ${dayOfWeek} ${formattedTime}`;

  let countryDates = document.querySelectorAll("#currentDate");
  for (i = 0; i < countryDates.length; i++) {
    countryDates[
      i
    ].innerHTML = `${date} ${currentMonth}, ${dayOfWeek} ${formattedTime}`;
  }
  countryDates.innerHTML = `${date} ${currentMonth}, ${dayOfWeek} ${formattedTime}`;
}

displayFormattedDate();

function convertToFarenheit() {
  let temperatureFarenheit = (defaultTemperature * 9) / 5 + 32;
  let finalTemp = Math.round(temperatureFarenheit);
  return finalTemp;
}

function displayTemperatureInFarenheit() {
  celsiusButton.classList.remove("active");
  farenheitButton.classList.add("active");
  let temp_f = convertToFarenheit();
  let displayTempInF = document.querySelector("#temp");
  let degreSymbol = document.querySelector(".symbol");
  displayTempInF.innerHTML = `${temp_f}`;
  degreSymbol.innerHTML = `°F`;
}

function changeTemp(event) {
  event.preventDefault();
  displayTemperatureInFarenheit();
}

farenheitButton.addEventListener("click", changeTemp);

function displayDefaultTemp() {
  farenheitButton.classList.remove("active");
  celsiusButton.classList.add("active");
  let displayTempInC = document.querySelector("#temp");

  displayTempInC.innerHTML = `${defaultTemperature}`;
  let degreSymbol = document.querySelector(".symbol");
  degreSymbol.innerHTML = `°C`;
}

celsiusButton.addEventListener("click", displayDefaultTemp);

// celsiusButton.addEventListener("click", changeTempBacktoCelsius);

// function displayCelsiusTemperature(response) {
//   let newtemp = Math.round(response.data.main.temp);
//   console.log(newtemp);

//   let displayTempInC = document.querySelector("#temp");

//   displayTempInC.innerHTML = `${newtemp}`;
//   let degreSymbol = document.querySelector(".symbol");
//   degreSymbol.innerHTML = `°C`;
// }

// function displayTemperatureInCelsius(response) {
//   let selectedCity = document.querySelector("#cityname").value;

//   axios
//     .get(`${apiUrl}q=${selectedCity}&appid=${apiKey}&units=${units}`)
//     .then(displayCelsiusTemperature);
// }

// function changeTempBacktoCelsius(event) {
//   event.preventDefault();
//   displayTemperatureInCelsius();
// }

// function displayTemperatureInCelsius(response) {
//   let selectedCity = document.querySelector("#cityname").value;

//   axios
//     .get(`${apiUrl}q=${selectedCity}&appid=${apiKey}&units=${units}`)
//     .then(displayCelsiusTemperature);
// }

// function displayCelsiusTemperature(response) {
//   let newtemp = Math.round(response.data.main.temp);
//   console.log(newtemp);

//   let displayTempInC = document.querySelector("#temp");

//   displayTempInC.innerHTML = `${newtemp}`;
//   let degreSymbol = document.querySelector(".symbol");
//   degreSymbol.innerHTML = `°C`;
// }
