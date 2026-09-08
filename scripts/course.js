// Course data array
const courses = [
    { id: 'WDD 130', name: 'Web Fundamentals', credits: 3, category: 'WDD', completed: true },
    { id: 'WDD 131', name: 'Dynamic Web Fundamentals', credits: 3, category: 'WDD', completed: true },
    { id: 'WDD 231', name: 'Web Frontend Development I', credits: 3, category: 'WDD', completed: false },
    { id: 'CSE 110', name: 'Programming Building Blocks', credits: 3, category: 'CSE', completed: true },
    { id: 'CSE 111', name: 'Programming with Functions', credits: 3, category: 'CSE', completed: true },
    { id: 'CSE 210', name: 'Programming with Classes', credits: 3, category: 'CSE', completed: false },
    { id: 'WDD 132', name: 'Responsive Design', credits: 2, category: 'WDD', completed: false },
    { id: 'CSE 212', name: 'Data Structures', credits: 3, category: 'CSE', completed: false }
];

// Get the container for course cards
const courseContainer = document.getElementById('course-cards');
const totalCreditsDisplay = document.getElementById('total-credits');

// Function to render courses based on filter
function renderCourses(filter = 'all') {
    // Filter courses based on category
    let filteredCourses;
    if (filter === 'all') {
        filteredCourses = courses;
    } else {
        filteredCourses = courses.filter(course => course.category === filter);
    }

    // Clear the container
    courseContainer.innerHTML = '';

    // Create and append course cards
    filteredCourses.forEach(course => {
        const card = document.createElement('div');
        card.className = 'course-card';
        
        // Add 'completed' class if course is completed
        if (course.completed) {
            card.classList.add('completed');
        }

        // Create card content
        card.innerHTML = `
            <h3>${course.id}</h3>
            <p>${course.name}</p>
            <span class="credits">${course.credits} credits</span>
            ${course.completed ? '<span class="completed-badge">✓ Completed</span>' : ''}
        `;

        courseContainer.appendChild(card);
    });

    // Calculate total credits using reduce function
    const totalCredits = filteredCourses.reduce((total, course) => {
        return total + course.credits;
    }, 0);

    // Update total credits display
    totalCreditsDisplay.textContent = `Total credits: ${totalCredits}`;
}

// Set up filter buttons
document.getElementById('filter-all').addEventListener('click', function() {
    // Update active button state
    document.querySelectorAll('.filter-buttons button').forEach(btn => {
        btn.classList.remove('active-filter');
    });
    this.classList.add('active-filter');
    
    renderCourses('all');
});

document.getElementById('filter-wdd').addEventListener('click', function() {
    // Update active button state
    document.querySelectorAll('.filter-buttons button').forEach(btn => {
        btn.classList.remove('active-filter');
    });
    this.classList.add('active-filter');
    
    renderCourses('WDD');
});

document.getElementById('filter-cse').addEventListener('click', function() {
    // Update active button state
    document.querySelectorAll('.filter-buttons button').forEach(btn => {
        btn.classList.remove('active-filter');
    });
    this.classList.add('active-filter');
    
    renderCourses('CSE');
});

// Initial render - show all courses
renderCourses('all');