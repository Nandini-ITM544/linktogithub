let apiKey = "fb1865d0d87f6d1b02d912ac727945ca";
let units = "metric";
let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";

let searchQuery = document.querySelector("#search-city");
let searchButton = document.querySelector("#search-button");

let currentLocation = document.querySelector("#current-location");
let defaultTemperatureCelsius = document.querySelector("#mainTemperature")
  .innerHTML;
let defaultTemperature = document.querySelector("#temp").innerHTML;
let defaultFeelsLike = document.querySelector("#real-feel").innerHTML;
let defaultMaxtemp = document.querySelector("#high-temp").innerHTML;
let defaultMinTemp = document.querySelector("#low-temp").innerHTML;

let farenheitButton = document.querySelector("#farenheit");
let celsiusButton = document.querySelector("#celsius");
let temp0 = document.querySelector(".card-text0").innerHTML;
let temp1 = document.querySelector(".card-text1").innerHTML;
let temp2 = document.querySelector(".card-text2").innerHTML;
let temp3 = document.querySelector(".card-text3").innerHTML;
let temp4 = document.querySelector(".card-text4").innerHTML;
let temp5 = document.querySelector(".card-text5").innerHTML;
let temp6 = document.querySelector(".card-text6").innerHTML;
let temp7 = document.querySelector(".card-text7").innerHTML;

currentLocation.addEventListener("click", getCurrentLocation);

function getCurrentLocation(event) {
  navigator.geolocation.getCurrentPosition(getPosition);
}
function getPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  axios
    .get(`${apiUrl}lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`)
    .then(getCurrentLocationTemperature);
}

function getCurrentLocationTemperature(response) {
  console.log(response);
  document.querySelector(".symbol").innerHTML = null;
  let currentCity = response.data.name;
  let currentCityTemperature = Math.round(response.data.main.temp);
  document.querySelector(".cityorzip").innerHTML = currentCity;
  document.querySelector("#temp").innerHTML = `${currentCityTemperature}°C`;
  defaultTemperature = currentCityTemperature;

  document.querySelector("#high-temp").innerHTML = `${Math.round(
    response.data.main.temp_max
  )}°C`;
  defaultMaxtemp = document.querySelector("#high-temp").innerHTML;
  document.querySelector("#low-temp").innerHTML = `${Math.round(
    response.data.main.temp_min
  )}°C`;
  defaultMinTemp = document.querySelector("#low-temp").innerHTML;
  document.querySelector("#real-feel").innerHTML = `${Math.round(
    response.data.main.feels_like
  )}°C`;

  defaultFeelsLike = document.querySelector("#real-feel").innerHTML;
  document.querySelector("#wind").innerHTML = `${response.data.wind.speed}`;
  console.log(response.data.wind.speed);
  document.querySelector("#humid").innerHTML = `${response.data.main.humidity}`;

  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  apiUrlw = `https://api.openweathermap.org/data/2.5/forecast?q=${currentCity}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrlw).then(displayForecast);
}

function displayCity(event) {
  event.preventDefault();

  let selectedCity = document.querySelector("#cityname").value;
  //console.log(selectedCity);
  document.querySelector(".cityorzip").innerHTML = selectedCity;

  axios
    .get(`${apiUrl}q=${selectedCity}&appid=${apiKey}&units=${units}`)
    .then(getSelectedCityTemperature);

  apiUrlx = `https://api.openweathermap.org/data/2.5/forecast?q=${selectedCity}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrlx).then(displayForecast);
}

function displayForecast(response) {
  let forecast = null;

  let forecastElement = document.querySelector(".forecast-element");
  forecastElement.innerHTML = null;
  for (let index = 0; index < 8; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `<div class="card-group">
  <div class="card" style="border: 0px">
    <div class="card-body">
    <p class="card-title time">${forecast.dt_txt.slice(10, 16)}</p>
      <h5 class="card-title"><img id="icon" src="http://openweathermap.org/img/wn/${
        forecast.weather[0].icon
      }@2x.png" /></h5>
      <p class="card-text${index}" id="forecast">${Math.round(
      forecast.main.temp_max
    )}°</p>
    </div>
    </div>`;
  }
  temp0 = document.querySelector(".card-text0").innerHTML;
  temp1 = document.querySelector(".card-text1").innerHTML;
  temp2 = document.querySelector(".card-text2").innerHTML;

  temp3 = document.querySelector(".card-text3").innerHTML;
  temp4 = document.querySelector(".card-text4").innerHTML;
  temp5 = document.querySelector(".card-text5").innerHTML;
  temp6 = document.querySelector(".card-text6").innerHTML;
  temp7 = document.querySelector(".card-text7").innerHTML;
}

function getSelectedCityTemperature(response) {
  console.log(response);
  document.querySelector(".symbol").innerHTML = null;
  let city = response.data.name;
  let cityTemperature = Math.round(response.data.main.temp);
  document.querySelector(".cityorzip").innerHTML = city;
  document.querySelector("#temp").innerHTML = `${cityTemperature}°C`;
  document.querySelector("#high-temp").innerHTML = `${Math.round(
    response.data.main.temp_max
  )}°C`;
  defaultMaxtemp = document.querySelector("#high-temp").innerHTML;
  document.querySelector("#low-temp").innerHTML = `${Math.round(
    response.data.main.temp_min
  )}°C`;
  defaultMinTemp = document.querySelector("#low-temp").innerHTML;
  document.querySelector("#real-feel").innerHTML = `${Math.round(
    response.data.main.feels_like
  )}°C`;
  defaultFeelsLike = document.querySelector("#real-feel").innerHTML;
  document.querySelector("#wind").innerHTML = `${response.data.wind.speed}`;
  document.querySelector("#humid").innerHTML = `${response.data.main.humidity}`;
  defaultTemperature = cityTemperature;

  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function handleSubmit(event) {
  event.preventDefault();
  let city_selected = document.querySelector("#cityname").value;

  search(city_selected);
}
function search(city) {
  let apiKey = "fb1865d0d87f6d1b02d912ac727945ca";
  let units = "metric";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";

  axios
    .get(`${apiUrl}q=${city}&appid=${apiKey}&units=${units}`)
    .then(getSelectedCityTemperature);

  apiUrlx = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrlx).then(displayForecast);
}

search("New York");

searchQuery.addEventListener("submit", handleSubmit);

function displayFormattedDate() {
  let currentTime = document.querySelector("#currenttime");

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
  document.querySelector(".symbol").innerHTML = null;
  celsiusButton.classList.remove("active");
  farenheitButton.classList.add("active");

  let temp_f = convertToFarenheit();
  let displayTempInF = document.querySelector("#temp");
  let degreSymbol = document.querySelector(".symbol");
  displayTempInF.innerHTML = `${temp_f}`;
  degreSymbol.innerHTML = `°F`;

  let feelsLikeTempValue = getTempValue(defaultFeelsLike).replace("C", "");
  console.log(feelsLikeTempValue);
  let finalFeelsLike = convertForecasttoF(feelsLikeTempValue);
  document.querySelector("#real-feel").innerHTML = `${finalFeelsLike}°F`;

  let highTempValue = getTempValue(defaultMaxtemp).replace("C", "");
  console.log(highTempValue);
  let finalHighTemp = convertForecasttoF(highTempValue);
  document.querySelector("#high-temp").innerHTML = `${finalHighTemp}°F`;

  let minTempValue = getTempValue(defaultMinTemp).replace("C", "");
  console.log(minTempValue);
  let finalMinTemp = convertForecasttoF(minTempValue);
  document.querySelector("#low-temp").innerHTML = `${finalMinTemp}°F`;
}

function changeTemp(event) {
  event.preventDefault();
  displayTemperatureInFarenheit();
}

farenheitButton.addEventListener("click", changeTemp);
farenheitButton.addEventListener("click", forcastTemperatures);

function displayDefaultTemp() {
  farenheitButton.classList.remove("active");
  celsiusButton.classList.add("active");

  document.querySelector(".symbol").innerHTML = null;
  let displayTempInC = document.querySelector("#temp");

  displayTempInC.innerHTML = `${defaultTemperature}`;
  let degreSymbol = document.querySelector(".symbol");
  degreSymbol.innerHTML = `°C`;

  let displayRealFeel = document.querySelector("#real-feel");
  displayRealFeel.innerHTML = `${defaultFeelsLike}`;

  let displayMaxTemp = document.querySelector("#high-temp");
  displayMaxTemp.innerHTML = `${defaultMaxtemp}`;

  let displayMinTemp = document.querySelector("#low-temp");
  displayMinTemp.innerHTML = `${defaultMinTemp}`;
}

celsiusButton.addEventListener("click", displayDefaultTemp);

celsiusButton.addEventListener("click", converForecastBacktoc);

function forcastTemperatures() {
  let temp_value0 = getTempValue(
    document.querySelector(".card-text0").innerHTML
  );

  let finaltemp0 = `${convertForecasttoF(temp_value0)}°`;

  document.querySelector(".card-text0").innerHTML = finaltemp0;

  let temp_value1 = getTempValue(
    document.querySelector(".card-text1").innerHTML
  );

  let finaltemp1 = `${convertForecasttoF(temp_value1)}°`;

  document.querySelector(".card-text1").innerHTML = finaltemp1;

  let temp_value2 = getTempValue(
    document.querySelector(".card-text2").innerHTML
  );

  let finaltemp2 = `${convertForecasttoF(temp_value2)}°`;

  document.querySelector(".card-text2").innerHTML = finaltemp2;

  let temp_value3 = getTempValue(
    document.querySelector(".card-text3").innerHTML
  );

  let finaltemp3 = `${convertForecasttoF(temp_value3)}°`;

  document.querySelector(".card-text3").innerHTML = finaltemp3;

  let temp_value4 = getTempValue(
    document.querySelector(".card-text4").innerHTML
  );

  let finaltemp4 = `${convertForecasttoF(temp_value4)}°`;

  document.querySelector(".card-text4").innerHTML = finaltemp4;

  let temp_value5 = getTempValue(
    document.querySelector(".card-text5").innerHTML
  );

  let finaltemp5 = `${convertForecasttoF(temp_value5)}°`;

  document.querySelector(".card-text5").innerHTML = finaltemp5;

  let temp_value6 = getTempValue(
    document.querySelector(".card-text6").innerHTML
  );

  let finaltemp6 = `${convertForecasttoF(temp_value6)}°`;

  document.querySelector(".card-text6").innerHTML = finaltemp6;

  let temp_value7 = getTempValue(
    document.querySelector(".card-text7").innerHTML
  );

  let finaltemp7 = `${convertForecasttoF(temp_value7)}°`;

  document.querySelector(".card-text7").innerHTML = finaltemp7;
}

function convertForecasttoF(temperature) {
  let temperatureFarenheit = Math.round((temperature * 9) / 5 + 32);

  return temperatureFarenheit;
}

function converForecastBacktoc() {
  document.querySelector(".card-text0").innerHTML = temp0;
  document.querySelector(".card-text1").innerHTML = temp1;
  document.querySelector(".card-text2").innerHTML = temp2;
  document.querySelector(".card-text3").innerHTML = temp3;
  document.querySelector(".card-text4").innerHTML = temp4;
  document.querySelector(".card-text5").innerHTML = temp5;
  document.querySelector(".card-text6").innerHTML = temp6;
  document.querySelector(".card-text7").innerHTML = temp7;
}

function getTempValue(temperature) {
  let numericValue = temperature.replace("°", "");
  return numericValue;
}
