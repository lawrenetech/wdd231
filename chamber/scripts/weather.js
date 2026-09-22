// Weather via OpenWeatherMap API
// Get a free API key at: https://home.openweathermap.org/users/sign_up
// Then paste it below.

const API_KEY = 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6';
const LAT = 6.5244;      // Lagos latitude
const LON = 3.3792;      // Lagos longitude
const UNITS = 'metric';  // Celsius

const weatherContainer = document.getElementById('weather-container');

async function getWeather() {
    if (!weatherContainer) return;

    if (!API_KEY || API_KEY === 'YOUR_OPENWEATHERMAP_API_KEY_HERE') {
        weatherContainer.innerHTML = `
            <p class="error-message">
                Add your OpenWeatherMap API key in <code>scripts/weather.js</code> to see live weather.
            </p>
        `;
        weatherContainer.setAttribute('aria-busy', 'false');
        return;
    }

    try {
        // Current weather
        const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&units=${UNITS}&appid=${API_KEY}`;
        const currentResp = await fetch(currentUrl);
        if (!currentResp.ok) throw new Error(`Weather error: ${currentResp.status}`);
        const current = await currentResp.json();

        // 5-day forecast (using /forecast endpoint, 3-hour intervals)
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&units=${UNITS}&appid=${API_KEY}`;
        const forecastResp = await fetch(forecastUrl);
        if (!forecastResp.ok) throw new Error(`Forecast error: ${forecastResp.status}`);
        const forecast = await forecastResp.json();

        renderWeather(current, forecast);
    } catch (err) {
        console.error('Weather fetch failed:', err);
        weatherContainer.innerHTML = `
            <p class="error-message">Unable to load weather right now.</p>
        `;
    } finally {
        weatherContainer.setAttribute('aria-busy', 'false');
    }
}

function renderWeather(current, forecast) {
    const temp = Math.round(current.main.temp);
    const desc = current.weather[0].description;
    const icon = current.weather[0].icon;

    // Build 3-day forecast: pick one entry per day (around noon)
    const days = {};
    forecast.list.forEach(item => {
        const date = item.dt_txt.split(' ')[0];
        const hour = parseInt(item.dt_txt.split(' ')[1].split(':')[0], 10);
        // Prefer entries close to noon
        if (!days[date] || Math.abs(hour - 12) < Math.abs(days[date].hour - 12)) {
            days[date] = { hour, item };
        }
    });

    const nextThreeDays = Object.keys(days)
        .filter(d => d !== new Date().toISOString().split('T')[0])
        .slice(0, 3)
        .map(d => days[d].item);

    const forecastHTML = nextThreeDays.map(item => {
        const date = new Date(item.dt_txt);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const dayTemp = Math.round(item.main.temp);
        const dayDesc = item.weather[0].description;
        return `
            <li class="forecast-day">
                <span class="day-name">${dayName}</span>
                <span class="day-temp">${dayTemp}°C</span>
                <span class="day-desc">${dayDesc}</span>
            </li>
        `;
    }).join('');

    weatherContainer.innerHTML = `
        <div class="weather-current">
            <img src="https://openweathermap.org/img/wn/${icon}@2x.png"
                 alt="${desc}" width="80" height="80" />
            <div>
                <p class="current-temp">${temp}°C</p>
                <p class="current-desc">${desc}</p>
                <p class="current-city">Lagos, Nigeria</p>
            </div>
        </div>
        <h3 class="forecast-title">3-Day Forecast</h3>
        <ul class="forecast-list">
            ${forecastHTML}
        </ul>
    `;
}

getWeather();