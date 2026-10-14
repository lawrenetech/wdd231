import { getDishes } from './data-service.mjs';

const grid = document.getElementById('dishes-grid');
const gridBtn = document.getElementById('grid-view');
const listBtn = document.getElementById('list-view');
const filterButtons = document.querySelectorAll('.filter-btn');

let allDishes = [];
let currentFilter = 'all';
let currentView = 'grid';

async function loadDishes() {
    try {
        allDishes = await getDishes();
        renderDishes();
    } catch (error) {
        console.error('Failed to load dishes:', error);
        grid.innerHTML = '<p class="error-message">Unable to load dishes.</p>';
    } finally {
        grid.setAttribute('aria-busy', 'false');
    }
}

function renderDishes() {
    const filtered = currentFilter === 'all'
        ? allDishes
        : allDishes.filter(d => d.category === currentFilter);

    grid.classList.toggle('dishes-grid', currentView === 'grid');
    grid.classList.toggle('dishes-list', currentView === 'list');

    grid.innerHTML = '';

    if (filtered.length === 0) {
        grid.innerHTML = '<p class="loading">No dishes in this category yet.</p>';
        return;
    }

    filtered.forEach(dish => {
        const card = document.createElement('article');
        card.className = 'dish-card';

        card.innerHTML = `
            <figure>
                <img src="images/${dish.image}" alt="${dish.name}" loading="lazy" width="300" height="200">
            </figure>
            <h2>${dish.name}</h2>
            <p class="dish-meta">${dish.region} · ${dish.category}</p>
            <p class="dish-description">${dish.description}</p>
            <p class="dish-price">₦${dish.price.toLocaleString()}</p>
            <button type="button" class="dish-link" data-dish-id="${dish.id}">View Details</button>
        `;

        grid.appendChild(card);
    });

    // Attach click handlers for dish details modal
    grid.querySelectorAll('.dish-link').forEach(btn => {
        btn.addEventListener('click', () => openDishModal(btn.dataset.dishId));
    });

    // Save filter preference
    localStorage.setItem('lastFilter', currentFilter);
}

function openDishModal(id) {
    const dish = allDishes.find(d => d.id === Number(id));
    if (!dish) return;

    const modal = document.createElement('dialog');
    modal.className = 'dish-modal';
    modal.innerHTML = `
        <h2>${dish.name}</h2>
        <figure>
            <img src="images/${dish.image}" alt="${dish.name}" width="300" height="200">
        </figure>
        <p><strong>Region:</strong> ${dish.region}</p>
        <p><strong>Category:</strong> ${dish.category}</p>
        <p><strong>Price:</strong> ₦${dish.price.toLocaleString()}</p>
        <p>${dish.description}</p>
        <button class="close-modal">Close</button>
    `;

    document.body.appendChild(modal);
    modal.showModal();

    modal.querySelector('.close-modal').addEventListener('click', () => {
        modal.close();
        modal.remove();
    });
}

// View toggle
gridBtn.addEventListener('click', () => {
    currentView = 'grid';
    gridBtn.classList.add('active-view');
    listBtn.classList.remove('active-view');
    gridBtn.setAttribute('aria-pressed', 'true');
    listBtn.setAttribute('aria-pressed', 'false');
    renderDishes();
});

listBtn.addEventListener('click', () => {
    currentView = 'list';
    listBtn.classList.add('active-view');
    gridBtn.classList.remove('active-view');
    listBtn.setAttribute('aria-pressed', 'true');
    gridBtn.setAttribute('aria-pressed', 'false');
    renderDishes();
});

// Filter buttons
filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active-filter'));
        btn.classList.add('active-filter');
        currentFilter = btn.dataset.category;
        renderDishes();
    });
});

// Initialize
loadDishes();