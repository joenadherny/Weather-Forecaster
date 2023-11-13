
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

  
