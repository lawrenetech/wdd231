// Discover page: imports places from an ES module, renders cards,
// and displays a visit message from localStorage.

import { places } from '../data/places.mjs';

const grid = document.getElementById('places-grid');
const visitorMessage = document.getElementById('visitor-message');

// ---------- 1. Render cards ----------
function renderCards(items) {
    grid.innerHTML = '';

    items.forEach((place, index) => {
        const card = document.createElement('article');
        // Each card gets a unique grid-area name: card1 through card8
        card.className = `place-card card-${index + 1}`;

        card.innerHTML = `
            <h2>${place.name}</h2>
            <figure>
                <img src="images/${place.image}"
                     alt="${place.name}"
                     loading="lazy"
                     width="300"
                     height="200" />
            </figure>
            <address>${place.address}</address>
            <p>${place.description}</p>
            <button type="button" class="learn-more">Learn More</button>
        `;

        grid.appendChild(card);
    });

    grid.setAttribute('aria-busy', 'false');
}

// ---------- 2. localStorage visit message ----------
function showVisitMessage() {
    const MS_PER_DAY = 24 * 60 * 60 * 1000;
    const lastVisit = localStorage.getItem('lastVisit');
    const now = Date.now();
    let message = '';

    if (!lastVisit) {
        // First visit
        message = 'Welcome! Let us know if you have any questions.';
    } else {
        const daysSince = Math.floor((now - Number(lastVisit)) / MS_PER_DAY);

        if (daysSince < 1) {
            message = 'Back so soon! Awesome!';
        } else if (daysSince === 1) {
            message = 'You last visited 1 day ago.';
        } else {
            message = `You last visited ${daysSince} days ago.`;
        }
    }

    visitorMessage.textContent = message;
    localStorage.setItem('lastVisit', now);
}

// ---------- Initialize ----------
renderCards(places);
showVisitMessage();
