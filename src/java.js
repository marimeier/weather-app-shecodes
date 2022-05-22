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

function showTemp(response) {
  console.log(response.data);
  document.querySelector("#selectedCity").innerHTML = response.data.name;
  document.querySelector("#nowTemp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#descriptionWeather").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );

  document
    .querySelector("#icon")
    .setAttribute("alt", response.data.weather[0].icon);
}

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#inputCity").value;
  let units = "metric";
  let apiKey = "49aabf562ac60c9e71aefa24a3b6f528";
  let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndPoint}?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemp);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);
