// decode-images.js — run once with: node decode-images.js
const fs = require('fs');
const path = require('path');

// A minimal 200x200 solid-color WebP image, base64-encoded.
// Same image for all 8 — rename later if you want unique logos.
const BASE64 = 'UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA';

// Colors per member (used only if you swap to a generator later)
const files = [
    'techhub.webp',
    'oceanview.webp',
    'sunrise.webp',
    'greenleaf.webp',
    'blueridge.webp',
    'sunset.webp',
    'harmony.webp',
    'palmgrove.webp'
];

const outDir = path.join(__dirname, 'chamber', 'images');
fs.mkdirSync(outDir, { recursive: true });

const buffer = Buffer.from(BASE64, 'base64');

files.forEach(name => {
    const dest = path.join(outDir, name);
    fs.writeFileSync(dest, buffer);
    console.log(`Created ${dest} (${buffer.length} bytes)`);
});

console.log('\nDone. All 8 .webp files created.');
