// Display form submission data on the thank-you page
document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const container = document.getElementById('submission-summary');

    if (!container) return;

    const fields = [
        { key: 'firstName', label: 'First Name' },
        { key: 'lastName', label: 'Last Name' },
        { key: 'email', label: 'Email Address' },
        { key: 'phone', label: 'Mobile Phone' },
        { key: 'organization', label: 'Business / Organization' },
        { key: 'timestamp', label: 'Application Timestamp' }
    ];

    let hasData = false;
    fields.forEach(({ key, label }) => {
        const value = params.get(key);
        if (value) {
            hasData = true;
            const dt = document.createElement('dt');
            dt.textContent = label;
            const dd = document.createElement('dd');
            dd.textContent = value;
            container.appendChild(dt);
            container.appendChild(dd);
        }
    });

    if (!hasData) {
        container.innerHTML = '<p>No submission data found.</p>';
    }
});