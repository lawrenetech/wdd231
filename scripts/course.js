// Course data array
const courses = [
    { code: 'WDD 130', name: 'Web Fundamentals', credits: 3, completed: true },
    { code: 'WDD 131', name: 'Dynamic Web Fundamentals', credits: 3, completed: true },
    { code: 'WDD 231', name: 'Web Frontend Development I', credits: 3, completed: false },
    { code: 'CSE 110', name: 'Programming with Functions', credits: 3, completed: true },
    { code: 'CSE 111', name: 'Programming with Functions', credits: 3, completed: false },
    { code: 'CSE 210', name: 'Programming with Classes', credits: 3, completed: false },
];

// DOM elements
const courseCardsContainer = document.getElementById('course-cards');
const totalCreditsElement = document.getElementById('total-credits');

// Filter buttons
const filterAll = document.getElementById('filter-all');
const filterWdd = document.getElementById('filter-wdd');
const filterCse = document.getElementById('filter-cse');

// Current filter state
let currentFilter = 'all';

// Function to render courses based on filter
function renderCourses(filter) {
    let filteredCourses = [];

    if (filter === 'all') {
        filteredCourses = courses;
    } else if (filter === 'wdd') {
        filteredCourses = courses.filter(course => course.code.startsWith('WDD'));
    } else if (filter === 'cse') {
        filteredCourses = courses.filter(course => course.code.startsWith('CSE'));
    }

    // Clear container
    courseCardsContainer.innerHTML = '';

    // Build course cards
    filteredCourses.forEach(course => {
        const card = document.createElement('div');
        card.className = 'course-card';
        if (course.completed) {
            card.classList.add('completed');
        }
        card.innerHTML = `
            ${course.code}
            <span class="credits">${course.credits} credits</span>
        `;
        courseCardsContainer.appendChild(card);
    });

    // Calculate total credits using reduce
    const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    totalCreditsElement.textContent = `Total credits: ${totalCredits}`;
}

// Event listeners for filter buttons
filterAll.addEventListener('click', () => {
    currentFilter = 'all';
    updateActiveButton(filterAll);
    renderCourses('all');
});

filterWdd.addEventListener('click', () => {
    currentFilter = 'wdd';
    updateActiveButton(filterWdd);
    renderCourses('wdd');
});

filterCse.addEventListener('click', () => {
    currentFilter = 'cse';
    updateActiveButton(filterCse);
    renderCourses('cse');
});

// Helper function to update active button styling
function updateActiveButton(activeButton) {
    const buttons = [filterAll, filterWdd, filterCse];
    buttons.forEach(btn => btn.classList.remove('active-filter'));
    activeButton.classList.add('active-filter');
}

// Initialize with 'all' filter
document.addEventListener('DOMContentLoaded', () => {
    renderCourses('all');
});