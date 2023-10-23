document.getElementById('search-form').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const city = document.getElementById('city-input').value;
    getWeather(city);
  });

async function getWeather(city) {
    const apiKey= 'de0a2f05c02c7557e692c2d99c74b84a'
    const units = 'imperial';

    const requestURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

    try {
        const response = await fetch(requestURL);

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            // You can display the weather data on your webpage here if needed.
        } else {
            console.error(`Failed to fetch weather data. Status code: ${response.status}`);
        }
    } catch (error) {
        console.error('An error occurred while fetching weather data:', error);
    }
}
function displayWeather(data) {
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.innerHTML = '';
}

getWeather('Seattle');


