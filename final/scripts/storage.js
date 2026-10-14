// Track last visit and greet returning visitors
document.addEventListener('DOMContentLoaded', () => {
    const welcome = document.getElementById('welcome-message');
    if (!welcome) return;

    const MS_PER_DAY = 24 * 60 * 60 * 1000;
    const lastVisit = localStorage.getItem('lastVisit');
    const now = Date.now();
    let message;

    if (!lastVisit) {
        message = 'Welcome to Lagos Eats! We hope you enjoy