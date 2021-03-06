let now = new Date();

let updatedDate = document.querySelector("#updatedDate");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "",
];
let day = days[now.getDay()];

let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

updatedDate.innerHTML = `${day} ${hour}:${minutes}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function getDailyForecast(coordinates) {
  console.log(coordinates);

  let apiEndPoint = "https://api.openweathermap.org/data/2.5/onecall";
  let units = "metric";
  let apiKey = "49aabf562ac60c9e71aefa24a3b6f528";
  let apiUrl = `${apiEndPoint}?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude={part}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayDailyForecast);
}

function displayDailyForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="d-flex dailyCards" >`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 7) {
      forecastHTML =
        forecastHTML +
        `<div class="card each-weekday" style="flex: 1">
              <div class="weekday-name">${formatDay(forecastDay.dt)} </div>
              <div class="icon-weekday">
                <img src="https://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png" alt="" width="42" />
              </div>
              <div class="weekday-temp">
                <span class="weekday-max-temp" id="wdMaxTemp"
                  ><strong>${Math.round(forecastDay.temp.max)}°</strong></span
                >
                <span class="weekday-min-temp" id="wdMinTemp">${Math.round(
                  forecastDay.temp.min
                )}°</span>
              </div>
            </div>
    `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function showTemp(response) {
  let currentIconElement = document.querySelector("#currentIcon");

  document.querySelector("#selectedCity").innerHTML = response.data.name;
  document.querySelector("#realfeel").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#nowTemp").innerHTML = Math.round(
    response.data.main.temp
  );
  celciusTemp = response.data.main.temp;
  document.querySelector("#descriptionWeather").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
  currentIconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  document
    .querySelector("#currentIcon")
    .setAttribute("alt", response.data.weather[0].icon);

  getDailyForecast(response.data.coord);
}

function search(city) {
  let units = "metric";
  let apiKey = "49aabf562ac60c9e71aefa24a3b6f528";
  let apiEndPointSearch = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrlSearch = `${apiEndPointSearch}?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrlSearch).then(showTemp);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#inputCity");
  search(cityInputElement.value);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);
search("Galway");

//function displayFahrenheitTemp(event) {
//  event.preventDefault();
//  document.querySelector("#nowTemp").innerHTML = Math.round(
//    celciusTemp * 1.8 + 32
//  );
//  FahrenheitTemp = (celciusTemp * 9) / 5 + 32;
//}
//document
//  .querySelector("#fahrenheit")
//  .addEventListener("click", displayFahrenheitTemp);

//function displayCelciusTemp(event) {
//  event.preventDefault();
//  document.querySelector("#nowTemp").innerHTML = Math.round(
//    (FahrenheitTemp - 32) / 1.8
//  );
//}
//document
//  .querySelector("#celcius")
//  .addEventListener("click", displayCelciusTemp);
