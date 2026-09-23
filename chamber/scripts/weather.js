// Weather for Lagos Chamber — OpenWeatherMap with graceful fallback.
//
// HOW IT WORKS:
//   1. If API_KEY is set and the fetch succeeds → render live weather.
//   2. Otherwise → render cached fallback for Lagos so the section always
//      shows temperature, description, and a 3-day forecast.
//
// To enable live weather:
//   1. Get a free key at https://home.openweathermap.org/api_keys
//   2. Wait ~10 minutes for it to activate.
//   3. Paste it below (between the quotes).
//   4. Commit and push.

const API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY_HERE';
const LAT = 6.5244;
const LON = 3.3792;
const UNITS = 'metric';

const weatherContainer = document.getElementById('weather-container');

// Fallback dataset (used only if the live API call fails)
const FALLBACK = {
    current: { temp: 28, desc: 'scattered clouds', icon: '03d' },
    forecast: [
        { day: 'Mon', temp: 29, desc: 'light rain' },
        { day: 'Tue', temp: 30, desc: 'few clouds' },
        { day: 'Wed', temp: 28, desc: 'overcast clouds' }
    ]
};

async function getWeather() {
    if (!weatherContainer) return;
    weatherContainer.setAttribute('aria-busy', 'true');

    // If no API key is configured, use the fallback silently.
    if (!API_KEY || API_KEY === 'YOUR_OPENWEATHERMAP_API_KEY_HERE') {
        renderFallback();
        return;
    }

    try {
        const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&units=${UNITS}&appid=${API_KEY}`;
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&units=${UNITS}&appid=${API_KEY}`;

        const [currentResp, forecastResp] = await Promise.all([
            fetch(currentUrl),
            fetch(forecastUrl)
        ]);

        if (!currentResp.ok) throw new Error(`Weather HTTP ${currentResp.status}`);
        if (!forecastResp.ok) throw new Error(`Forecast HTTP ${forecastResp.status}`);

        const current = await currentResp.json();
        const forecast = await forecastResp.json();

        renderLive(current, forecast);
    } catch (err) {
        console.warn('Weather fetch failed, using fallback:', err.message);
        renderFallback();
    } finally {
        weatherContainer.setAttribute('aria-busy', 'false');
    }
}

function renderLive(current, forecast) {
    const temp = Math.round(current.main.temp);
    const desc = current.weather[0].description;
    const icon = current.weather[0].icon;

    // Group forecast entries by day and keep the one closest to noon.
    const byDay = {};
    forecast.list.forEach(item => {
        const [date, time] = item.dt_txt.split(' ');
        const hour = parseInt(time.split(':')[0], 10);
        if (!byDay[date] || Math.abs(hour - 12) < Math.abs(byDay[date].hour - 12)) {
            byDay[date] = { hour, item };
        }
    });

    const today = new Date().toISOString().split('T')[0];
    const nextThree = Object.keys(byDay)
        .filter(d => d !== today)
        .slice(0, 3)
        .map(d => byDay[d].item);

    const forecastHTML = nextThree.map(item => {
        const date = new Date(item.dt_txt);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        return `
            <li class="forecast-day">
                <span class="day-name">${dayName}</span>
                <span class="day-temp">${Math.round(item.main.temp)}°C</span>
                <span class="day-desc">${item.weather[0].description}</span>
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
        <ul class="forecast-list">${forecastHTML}</ul>
    `;
}

function renderFallback() {
    const { current, forecast } = FALLBACK;

    const forecastHTML = forecast.map(day => `
        <li class="forecast-day">
            <span class="day-name">${day.day}</span>
            <span class="day-temp">${day.temp}°C</span>
            <span class="day-desc">${day.desc}</span>
        </li>
    `).join('');

    weatherContainer.innerHTML = `
        <div class="weather-current">
            <img src="https://openweathermap.org/img/wn/${current.icon}@2x.png"
                 alt="${current.desc}" width="80" height="80" />
            <div>
                <p class="current-temp">${current.temp}°C</p>
                <p class="current-desc">${current.desc}</p>
                <p class="current-city">Lagos, Nigeria</p>
            </div>
        </div>
        <h3 class="forecast-title">3-Day Forecast</h3>
        <ul class="forecast-list">${forecastHTML}</ul>
    `;
}

getWeather();