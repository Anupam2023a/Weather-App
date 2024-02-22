const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const searchInput = document.querySelector('.search-box input');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

// Function to handle the search
const handleSearch = () => {
  const APIKey = 'a001cb6ae246f536def411325c00f5ad';
  const city = searchInput.value;

  if (city === '') return;

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`)
    .then(response => response.json())
    .then(json => {
      if (json.cod === '404') {
        container.style.height = '400px';
        weatherBox.style.display = 'none';
        weatherDetails.style.display = 'none';
        error404.style.display = 'block';
        error404.classList.add('fadeIn');
        return;
      }

      error404.style.display = 'none';
      error404.classList.remove('fadeIn');

      const image = document.querySelector('.weather-box img');
      const temperature = document.querySelector('.weather-box .temprature');
      const description = document.querySelector('.weather-box .description');
      const humidity = document.querySelector('.weather-details .humidity span');
      const wind = document.querySelector('.weather-details .wind span');

      // Update image source based on weather conditions
      switch (json.weather[0].main) {
        case 'Clear':
          image.src = 'images/clear.png';
          break;
        case 'Rain':
          image.src = 'images/rain.png';
          break;
        case 'Snow':
          image.src = 'images/snow.png';
          break;
        case 'Clouds':
          image.src = 'images/cloud.png';
          break;
        case 'Haze':
          image.src = 'images/mist.png';
          break;

        default:
          image.src = '';
      }

      // Update other weather information
      temperature.innerHTML = `${Math.round(json.main.temp - 273.15)}<span>°C</span>`;
      description.innerHTML = `${json.weather[0].description}`;
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${json.wind.speed.toFixed(2)} Km/h`;
      

      weatherBox.style.display = 'block';
      weatherDetails.style.display = 'flex';
      weatherBox.classList.add('fadeIn');
      weatherDetails.classList.add('fadeIn');
      container.style.height = '590px';
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
      // Handle error, show an error message, etc.
    });
 };

 // Event listener for the search button
 search.addEventListener('click', handleSearch);

 // Event listener for the 'Enter' key
 searchInput.addEventListener('keyup', event => {
  if (event.key === 'Enter') {
    handleSearch();
  }
});
