// Hamburger menu functionality
const hamburger = document.getElementById('hamburger');
const primaryNav = document.getElementById('primary-nav');

hamburger.addEventListener('click', function() {
    // Toggle the 'open' class on the navigation
    primaryNav.classList.toggle('open');
    
    // Change hamburger icon appearance
    this.classList.toggle('active');
});

// Close menu when a link is clicked (optional but improves UX)
document.querySelectorAll('#primary-nav a').forEach(link => {
    link.addEventListener('click', () => {
        primaryNav.classList.remove('open');
        hamburger.classList.remove('active');
    });
});