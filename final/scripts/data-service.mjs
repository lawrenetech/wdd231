// Shared data service — imports are cached by the browser

export async function getDishes() {
    const response = await fetch('data/dishes.json');
    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
    }
    return response.json();
}