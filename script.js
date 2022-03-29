'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const countryName = document.querySelector('.country__name');
const cityName = document.querySelector('.country__city');

//Get location
const getLocation = function () {
  if (!navigator.geolocation) {
    console.log('Geolocation is not supported by your browser');
  } else {
    // console.log('Locating…');
    navigator.geolocation.getCurrentPosition(success, error);
  }
};

function success(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  // console.log(position);
  // console.log(latitude, longitude);
  const city = displayLocation(latitude, longitude);
}

function error() {
  console.log('Unable to retrieve your location');
}

//with async await
const displayLocation = async function (latitude, longitude) {
  const lat = latitude;
  const lng = longitude;
  const key = 'pk.cdbb7c660bc20474bf83e3d48e199554	';

  //get location
  const data = await fetch(
    ` https://us1.locationiq.com/v1/reverse.php?key=${key}&lat=${lat}&lon=${lng}&format=json`
  );
  const dataGeo = await data.json();
  //   console.log(dataGeo);
  // cityName.textContent = dataGeo.address.city;
  // countryName.textContent = dataGeo.address.country;
  const city = dataGeo.address.city;

  const weatherKey = '5132a25b23614724917134416222001';
  // prettier-ignore
  const response = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=${weatherKey}&q=${city}`);
  const weatherData = await response.json();
  // console.log(weatherData);
  const html = `
      <main class="container">
      <div class="countries">
        <article class="country">
        <img class="country__img" src="${weatherData.current.condition.text}.jpg" />
          <div class="country__data">
            <h3 class="country__city">${city}</h3>
            <h4 class="country__name">${dataGeo.address.country}</h4>
            <p class="country__row"><span>Temperature:</span>${weatherData.current.feelslike_c} °C</p>
            <p class="country__row"><span>Condition:</span>${weatherData.current.condition.text}</p>
            <p class="country__row"><span>Humidity:</span>${weatherData.current.humidity} %</p>
            <p class="country__row"><span>Precipitation:</span>${weatherData.current.precip_mm} mm</p>
            <p class="country__row"><span>Wind speed:</span>${weatherData.current.wind_kph} Km/hr</p>
          </div>
        </article>
          `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
};
getLocation();
