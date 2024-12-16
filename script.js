const apiKey = 'rOtCi6GCCkML0y9fMnQ6Tj6r2ucIkUt1'; // actual API key
const apiUrl = 'https://api.tomorrow.io/v4/timelines'; // Tomorrow.io API endpoint

const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
const humidityElement = document.getElementById('humidity');
const precipitationElement = document.getElementById('precipitation');
const dateTimeElement = document.getElementById('dateTime');
const refreshButton = document.getElementById('refreshButton');
const municipalitySelect = document.getElementById('municipality'); // Reference to the dropdown

// Fixed coordinates of municipalities
const municipalities = {
    mamburao: { lat: 13.1575004, lon: 120.6860802 },
    sanjose: { lat: 12.3486004, lon: 121.0670702 },
    santa_cruz: { lat: 13.1667, lon: 120.9333 },
    sablayan: { lat: 12.8426204, lon: 120.7996601 },
    lubang: { lat: 13.8600004, lon: 120.1509202 },
    looc: { lat: 13.8736004, lon: 121.2259202 },
    rizal: { lat: 12.533333, lon: 120.966667 },
    calintaan: { lat: 12.65, lon: 120.916667 },
    abra_de_ilog: { lat: 13.4419, lon: 120.7344 },
    paluan: { lat: 13.3667, lon: 120.5333 },
    magsaysay: { lat: 12.316667, lon: 121.166667 },
};



// Fetch weather data for the selected municipality
function updateWeather() {
    const selectedMunicipality = municipalitySelect.value; // Get selected municipality
    const { lat, lon } = municipalities[selectedMunicipality]; // Get its coordinates

    // Debug: Log selected municipality and coordinates
    console.log(`Selected Municipality: ${selectedMunicipality}, Lat: ${lat}, Lon: ${lon}`);

    fetchWeather(lat, lon); // Fetch weather for selected coordinates
}

// Fetch weather data from the API
function fetchWeather(lat, lon) {
    const url = `${apiUrl}?location=${lat},${lon}&fields=temperature,weatherCode,humidity,precipitationIntensity&timesteps=current&units=metric&apikey=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data && data.data && data.data.timelines && data.data.timelines.length > 0) {
                const currentWeather = data.data.timelines[0].intervals[0].values;
                const temperature = currentWeather.temperature;
                const weatherCode = currentWeather.weatherCode;
                const humidity = currentWeather.humidity;
                const precipitation = currentWeather.precipitationIntensity;

                // Map weather code to description
                const weatherDescription = weatherCodeDescriptions[weatherCode] || "Unknown";

                // Update the UI with the fetched data
                locationElement.textContent = `Lat: ${lat}, Lon: ${lon}`;
                temperatureElement.textContent = `Temperature: ${temperature}°C`;
                descriptionElement.textContent = `Weather: ${weatherDescription}`;
                humidityElement.textContent = `Humidity: ${humidity}%`;
                precipitationElement.textContent = `Precipitation: ${precipitation} mm/h`;

                // Update date and time
                const now = new Date();
                dateTimeElement.textContent = `Date & Time: ${now.toLocaleString()}`;
            } else {
                console.error("Invalid data format received:", data);
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}

// Refresh weather data when the button is clicked
refreshButton.addEventListener('click', updateWeather);

// Fetch weather data for the default selected municipality on page load
document.addEventListener('DOMContentLoaded', updateWeather);
 