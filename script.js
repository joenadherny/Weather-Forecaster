const apiKey= 'de0a2f05c02c7557e692c2d99c74b84a';
const apiURL= 'https://api.openweathermap.org/data/2.5/weather?units=imperial&q=';

const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search.button')

async function checkWeather (city){
    const response = await fetch(apiURL + city + 'appid=${apiKey}');
    let data = await response.json();
    console.log(data);
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + '°F';
    document.querySelector('.humidity').innerHTML = data.main.humidity + '%';
    document.querySelector('.wind').innerHTML = data.wind.speed + 'mp/h';
    document.querySelector('.date').innerHTML =data.dt_txt;

    }

    searchBtn.addEventListener('click', ()=>{
        checkWeather(searchBox.value);
    })
checkWeather();



  
