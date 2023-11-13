const apiKey= 'de0a2f05c02c7557e692c2d99c74b84a';
const apiURL= 'https://api.openweathermap.org/data/2.5/weather?units=imperial&q=';

const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search.button');
const weatherIcon = document.querySelector('.weather-icon')

async function checkWeather (city){
    const response = await fetch(apiURL + city + 'appid=${apiKey}');

    if(response.status == 404){
        document.querySelector('.error').style.display = 'block';
        document.querySelector('.weather').style.display = 'none';

    }else{let data = await response.json();
    
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + '°F';
        document.querySelector('.humidity').innerHTML = data.main.humidity + '%';
        document.querySelector('.wind').innerHTML = data.wind.speed + 'mp/h';
        document.querySelector('.date').innerHTML =data.dt_txt;
    
        if(data.weather[0].main == 'Clouds'){
            weatherIcon.src= 'images/clouds.png';
    
        }else if(data.weather[0]. main== 'Clear'){
            weatherIcon.src ='images/clear.png';
        }
        else if(data.weather[0]. main== 'Rain'){
            weatherIcon.src ='images/rain.png';
    
        }else if(data.weather[0]. main== 'Drizzle'){
            weatherIcon.src ='images/drizzle.png';
    
        }else if(data.weather[0]. main== 'Mist'){
            weatherIcon.src ='images/mist.png';
        }
        document.querySelector('.weather').lastElementChild.display = 'block';
        document.querySelector('.error').style.display = 'none';
    }
   
    searchBtn.addEventListener('click', ()=>{
        checkWeather(searchBox.value);
    })
checkWeather();


}
  
