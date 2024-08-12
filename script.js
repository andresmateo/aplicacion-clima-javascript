const urlBase = `https://api.openweathermap.org/data/2.5/weather`
const restoUrl = '?q={city name}&appid={API key}'
let API_KEY = 'API-KEY'
const diffKelvin = 273.15 // Diferencia entre grados centigrados y kelvin

document.getElementById('searchButton').addEventListener('click', () => {
    const city = document.getElementById('cityInput').value;
    if (city) {
        //llamar a la API para que nos de la informacion del clima
        fetchWeather(city);
    } else {
        alert('Ingrese una ciudad válida.');
    }
});

function fetchWeather(city) {
    fetch(`${urlBase}?q=${city}&appid=${API_KEY}&lang=es`)
        .then(data => data.json())
        .then(data => showWeatherData(data))
}

function showWeatherData(data){
    const divResponseData = document.getElementById('responseData');
    divResponseData.innerHTML=''

    const cityName = data.name;
    const countryName = data.sys.country
    const temp = data.main.temp
    const humidity = data.main.humidity
    const description = data.weather[0].description
    const icon = data.weather[0].icon

    const cityInfo = document.createElement('h2');
    cityInfo.textContent = `${cityName}, ${countryName}`;

    const tempInfo = document.createElement('p');
    tempInfo.textContent = `La temperatura es: ${Math.floor(temp - diffKelvin)}ºC`

    const humidityInfo = document.createElement('p');
    humidityInfo.textContent = `La humedad es del ${humidity}%`

    const iconInfo = document.createElement('img');
    iconInfo.src = `https://openweathermap.org/img/wn/${icon}@2x.png`

    const descriptionInfo = document.createElement('p');
    descriptionInfo.textContent = `La descripción meteorológica es ${description}`;

    divResponseData.appendChild(cityInfo);
    divResponseData.appendChild(tempInfo);
    divResponseData.appendChild(humidityInfo);
    divResponseData.appendChild(iconInfo);
    divResponseData.appendChild(descriptionInfo);
}