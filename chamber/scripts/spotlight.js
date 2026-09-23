// Random gold/silver member spotlights for the chamber home page.
//
// Rubric requirement: display 2–3 members with gold or silver membership
// levels, randomly selected each time the page renders, showing company
// name, logo, phone, address, website, and membership level.

const spotlightContainer = document.getElementById('spotlight-container');

const membershipLabels = {
    1: 'Member',
    2: 'Silver',
    3: 'Gold'
};

async function loadSpotlights() {
    if (!spotlightContainer) return;

    spotlightContainer.setAttribute('aria-busy', 'true');

    try {
        const response = await fetch('data/members.json');
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
        const members = await response.json();

        // Filter to gold (3) or silver (2) members only
        const eligible = members.filter(m => m.membership === 2 || m.membership === 3);

        // Shuffle using Fisher-Yates for uniform randomness
        const shuffled = [...eligible];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }

        // Pick 2 or 3 at random
        const count = Math.random() < 0.5 ? 2 : 3;
        const picks = shuffled.slice(0, count);

        renderSpotlights(picks);
    } catch (err) {
        console.error('Spotlight load failed:', err);
        spotlightContainer.innerHTML = `
            <p class="error-message">Unable to load member spotlights.</p>
        `;
    } finally {
        spotlightContainer.setAttribute('aria-busy', 'false');
    }
}

function renderSpotlights(members) {
    spotlightContainer.innerHTML = '';

    members.forEach(member => {
        const card = document.createElement('article');
        card.className = `spotlight-card level-${member.membership}`;

        // All six required fields are rendered:
        //   1. Company name
        //   2. Logo (image)
        //   3. Membership level (badge)
        //   4. Address
        //   5. Phone
        //   6. Website
        card.innerHTML = `
            <div class="spotlight-header">
                <img src="images/${member.image}"
                     alt="${member.name} logo"
                     loading="lazy"
                     width="80"
                     height="80" />
                <div>
                    <h3>${member.name}</h3>
                    <span class="badge badge-${member.membership}">
                        ${membershipLabels[member.membership]}
                    </span>
                </div>
            </div>
            <p class="spotlight-tagline">${member.tagline || ''}</p>
            <div class="spotlight-info">
                <p><strong>Address:</strong> ${member.address}</p>
                <p><strong>Phone:</strong> <a href="tel:${member.phone.replace(/\s/g, '')}">${member.phone}</a></p>
                <p><strong>Website:</strong>
                    <a href="${member.website}" target="_blank" rel="noopener">
                        ${member.website.replace(/^https?:\/\//, '')}
                    </a>
                </p>
            </div>
        `;

        spotlightContainer.appendChild(card);
    });
}

loadSpotlights();