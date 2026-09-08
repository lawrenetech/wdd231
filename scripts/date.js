// Get the current year
const currentYear = new Date().getFullYear();

// Update the copyright year in the footer
document.getElementById('currentyear').textContent = currentYear;

// Get and display the document's last modified date
const lastModified = document.lastModified;
document.getElementById('lastModified').textContent = `Last Modification: ${lastModified}`;