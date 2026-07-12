const colorButtons = document.querySelectorAll('.color-btn');
const colorPicker = document.getElementById('colorPicker');
const hexInput = document.getElementById('hexInput');
const applyCustom = document.getElementById('applyCustom');
const randomBtn = document.getElementById('randomBtn');
const colorDisplay = document.getElementById('colorDisplay');
const colorPreview = document.getElementById('colorPreview');

function changeBackgroundColor(color, name) {
    document.body.style.background = color;
    colorPreview.style.background = color;
    colorDisplay.textContent = name || color;
    colorPicker.value = color;
    hexInput.value = color;
}

colorButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const color = btn.dataset.color;
        const name = btn.dataset.name;
        changeBackgroundColor(color, name);
    });
});

colorPicker.addEventListener('input', (e) => {
    changeBackgroundColor(e.target.value, e.target.value);
});

hexInput.addEventListener('input', (e) => {
    let value = e.target.value;
    if (!value.startsWith('#')) {
        value = '#' + value;
    }
    if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
        changeBackgroundColor(value, value);
    }
});

applyCustom.addEventListener('click', () => {
    let value = hexInput.value;
    if (!value.startsWith('#')) {
        value = '#' + value;
    }
    if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
        changeBackgroundColor(value, value);
    } else {
        alert('Please enter a valid hex color (e.g., #FF5733)');
    }
});

randomBtn.addEventListener('click', () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    changeBackgroundColor(color, 'Random');
});

// Initialize
changeBackgroundColor('#667eea', '#667eea');