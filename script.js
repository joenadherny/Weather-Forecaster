
const apiKey = 'de0a2f05c02c7557e692c2d99c74b84a';
const currentWeatherURL = 'https://api.openweathermap.org/data/2.5/weather?units=imperial&q=';
const forecastURL = 'https://api.openweathermap.org/data/2.5/forecast?units=imperial&q=';

const searchBox = document.getElementById('text-input');
const resultsContainer = document.getElementById('results-container');
const weatherIcon = document.querySelector('.weather-icon');
const searchHistory = document.getElementById('search-history');

function checkWeather() {
  const city = searchBox.value;
  const currentWeatherPromise = fetch(`${currentWeatherURL}${city}&appid=${apiKey}`);
  const forecastPromise = fetch(`${forecastURL}${city}&appid=${apiKey}`);

  Promise.all([currentWeatherPromise, forecastPromise])
    .then((responses) => Promise.all(responses.map((res) => res.json())))
    .then(([currentWeatherData, forecastData]) => {
      displayCurrentWeather(currentWeatherData);
      displayForecast(forecastData);
      addToSearchHistory(city);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
      displayError();
    });
}
function displayCurrentWeather(data) {
    const currentConditions = resultsContainer.querySelector('.current-conditions');
    currentConditions.querySelector('.city').textContent = data.name;
    currentConditions.querySelector('.temp').textContent = Math.round(data.main.temp) + '°F';
    currentConditions.querySelector('.humidity').textContent = 'Humidity: ' + data.main.humidity + '%';
    currentConditions.querySelector('.wind').textContent = 'Wind Speed: ' + data.wind.speed + ' mph';
    currentConditions.querySelector('.date').textContent = new Date(data.dt * 1000).toLocaleDateString();
    setWeatherIcon(data.weather[0].main);
    currentConditions.style.display = 'block';
  }
  
  function displayForecast(data) {
    const forecastContainer = resultsContainer.querySelector('.forecast');
    forecastContainer.innerHTML = ''; // Clear previous forecast data
  
    for (let i = 0; i < data.list.length; i += 8) {
      const forecastItem = data.list[i];
      const forecastDate = new Date(forecastItem.dt * 1000).toLocaleDateString();
      const forecastIcon = forecastItem.weather[0].main;
      const forecastTemperature = Math.round(forecastItem.main.temp) + '°F';
      const forecastWindSpeed = forecastItem.wind.speed + ' mph';
      const forecastHumidity = forecastItem.main.humidity + '%';
  
      const forecastElement = document.createElement('div');
      forecastElement.classList.add('forecast-item');
      forecastElement.innerHTML = `
        <div>${forecastDate}</div>
        <img src="images/${forecastIcon.toLowerCase()}.png" alt="${forecastIcon}">
        <div>Temperature: ${forecastTemperature}</div>
        <div>Wind Speed: ${forecastWindSpeed}</div>
        <div>Humidity: ${forecastHumidity}</div>
      `;
  
      forecastContainer.appendChild(forecastElement);
    }
  }
  
  function setWeatherIcon(weatherCondition) {
    if (weatherCondition == 'Clouds') {
      weatherIcon.src = 'images/clouds.png';
    } else if (weatherCondition == 'Clear') {
      weatherIcon.src = 'images/clear.png';
    } else if (weatherCondition == 'Rain') {
      weatherIcon.src = 'images/rain.png';
    } else if (weatherCondition == 'Drizzle') {
      weatherIcon.src = 'images/drizzle.png';
    } else if (weatherCondition == 'Mist') {
      weatherIcon.src = 'images/mist.png';
    }
  }
  
  function addToSearchHistory(city) {
    const listItem = document.createElement('div');
    listItem.textContent = city;
    listItem.classList.add('search-history-item');
    listItem.addEventListener('click', () => checkWeather(city));
    searchHistory.appendChild(listItem);
  }
  
  function displayError() {
    const errorDiv = resultsContainer.querySelector('.error');
    errorDiv.style.display = 'block';
    resultsContainer.querySelector('.current-conditions').style.display = 'none';
    resultsContainer.querySelector('.forecast').innerHTML = '';
  }
  
  // Initial weather check (you may want to use the user's location or a default city)
  checkWeather();
  
