// Dynamically set current year and last modified date
document.addEventListener('DOMContentLoaded', () => {
    // Current year
    const yearSpan = document.getElementById('currentyear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Last modified date
    const lastModified = document.getElementById('lastModified');
    if (lastModified) {
        lastModified.textContent = 'Last Modification: ' + document.lastModified;
    }
});