// Directory page: fetch members.json and render grid/list views

const membersContainer = document.getElementById('members-container');
const gridViewBtn = document.getElementById('grid-view');
const listViewBtn = document.getElementById('list-view');

let membersData = [];
let currentView = 'grid';

// Membership level labels
const membershipLabels = {
    1: 'Member',
    2: 'Silver',
    3: 'Gold'
};

// Fetch members from JSON using async/await
async function getMembers() {
    membersContainer.setAttribute('aria-busy', 'true');
    membersContainer.innerHTML = '<p class="loading">Loading members…</p>';

    try {
        const response = await fetch('data/members.json');
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        membersData = await response.json();
        renderMembers(membersData, currentView);
    } catch (error) {
        console.error('Failed to load members:', error);
        membersContainer.innerHTML = `
            <p class="error-message">
                Unable to load member directory. Please try again later.
            </p>
        `;
    } finally {
        membersContainer.setAttribute('aria-busy', 'false');
    }
}

// Render members into the container based on current view
function renderMembers(members, view) {
    membersContainer.innerHTML = '';

    // Swap container class for grid or list
    membersContainer.classList.toggle('members-grid', view === 'grid');
    membersContainer.classList.toggle('members-list', view === 'list');

    members.forEach(member => {
        const card = document.createElement('article');
        card.className = `member-card level-${member.membership}`;

        card.innerHTML = `
            <div class="card-header">
                <img src="images/${member.image}"
                     alt="${member.name} logo"
                     loading="lazy"
                     width="60"
                     height="60" />
                <div>
                    <h3>${member.name}</h3>
                    <p class="tagline">${member.tagline || ''}</p>
                </div>
            </div>
            <div class="info">
                <span>${member.address}</span>
                <a href="tel:${member.phone.replace(/\s/g, '')}">${member.phone}</a>
                <a href="${member.website}" target="_blank" rel="noopener">
                    ${member.website.replace(/^https?:\/\//, '')}
                </a>
            </div>
            <span class="badge">${membershipLabels[member.membership]}</span>
        `;

        membersContainer.appendChild(card);
    });
}

// Switch view and update button states
function setView(view) {
    currentView = view;

    const isGrid = view === 'grid';
    gridViewBtn.classList.toggle('active-view', isGrid);
    listViewBtn.classList.toggle('active-view', !isGrid);

    gridViewBtn.setAttribute('aria-pressed', String(isGrid));
    listViewBtn.setAttribute('aria-pressed', String(!isGrid));

    renderMembers(membersData, view);
}

// Event listeners
gridViewBtn.addEventListener('click', () => setView('grid'));
listViewBtn.addEventListener('click', () => setView('list'));

// Initialize: fetch and render
getMembers();
<img src="images/${member.image}"
     alt="${member.name} logo"
     loading="lazy"
     width="60"
     height="60" />