import { getDishes } from './data-service.mjs';

const container = document.getElementById('featured-grid');

async function renderFeatured() {
    if (!container) return;

    try {
        const dishes = await getDishes();
        const featured = dishes.filter(d => d.featured).slice(0, 3);

        container.innerHTML = '';

        featured.forEach(dish => {
            const card = document.createElement('article');
            card.className = 'dish-card';

            card.innerHTML = `
                <figure>
                    <img src="images/${dish.image}" alt="${dish.name}" loading="lazy" width="300" height="200">
                </figure>
                <h3>${dish.name}</h3>
                <p class="dish-meta">${dish.region} · ${dish.category}</p>
                <p class="dish-price">₦${dish.price.toLocaleString()}</p>
                <a href="dishes.html" class="dish-link">View All Dishes →</a>
            `;

            container.appendChild(card);
        });
    } catch (error) {
        console.error('Failed to load featured dishes:', error);
        container.innerHTML = '<p class="error-message">Unable to load featured dishes.</p>';
    } finally {
        container.setAttribute('aria-busy', 'false');
    }
}

renderFeatured();