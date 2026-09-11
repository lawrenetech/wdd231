// Dynamic footer dates
document.addEventListener('DOMContentLoaded', () => {
    const yearSpan = document.getElementById('currentyear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    const lastModified = document.getElementById('lastModified');
    if (lastModified) {
        lastModified.textContent = 'Last Modified: ' + document.lastModified;
    }
});