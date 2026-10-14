document.addEventListener('DOMContentLoaded', () => {
    // Populate timestamp on form load
    const timestamp = document.getElementById('timestamp');
    if (timestamp) {
        timestamp.value = new Date().toISOString();
    }

    // Modal open buttons
    document.querySelectorAll('.modal-link').forEach(btn => {
        btn.addEventListener('click', () => {
            const modalId = btn.dataset.modal;
            const modal = document.getElementById(modalId);
            if (modal && typeof modal.showModal === 'function') {
                modal.showModal();
            }
        });
    });

    // Modal close buttons
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('dialog');
            if (modal) modal.close();
        });
    });

    // Close on backdrop click
    document.querySelectorAll('dialog.info-modal').forEach(dialog => {
        dialog.addEventListener('click', event => {
            const rect = dialog.getBoundingClientRect();
            const outside =
                event.clientX < rect.left ||
                event.clientX > rect.right ||
                event.clientY < rect.top ||
                event.clientY > rect.bottom;
            if (outside) dialog.close();
        });
    });
});