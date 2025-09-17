import { getCurrentWeatherData } from "./weather.js";

const userLocation = document.querySelector("#user-location");
const weatherIcon = document.querySelector("#weather-icon");
const temp = document.querySelector(".temp");
const maxTemp = document.querySelector(".max-temp");
const minTemp = document.querySelector(".min-temp");
const weatherDescription = document.querySelector("#weather-description");
const searchBarForm = document.querySelector("#search-bar-form");
const searchBar = document.querySelector("#search-bar");

async function renderPage(city = "") {
  let weatherResponse = await getCurrentWeatherData(city);
  if (!city) {
    userLocation.textContent = `Lat: ${weatherResponse.latitude}\nLon: ${weatherResponse.longitude}`;
  } else {
    userLocation.textContent = weatherResponse.resolvedAddress;
  }
  weatherIcon.src = `./pictures/${weatherResponse.currentConditions.icon}.svg`;
  weatherDescription.textContent = weatherResponse.description;
  temp.textContent = weatherResponse.currentConditions.temp;
  maxTemp.textContent = weatherResponse.days[0].tempmax;
  minTemp.textContent = weatherResponse.days[0].tempmin;
}
searchBarForm.addEventListener("submit", (event) => {
  event.preventDefault()
  renderPage(searchBar.value);
});

renderPage();
