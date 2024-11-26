const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('color-picker');
const timerEl = document.getElementById('timer');

const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#000000', '#FFFFFF'];
let selectedColor = '#FF0000';
let cooldown = 0;

// Başlangıç piksel boyutu
const pixelSize = 10;
const cooldownTime = 5; // Saniye

// Tuvali başlat
function initializeCanvas() {
  for (let y = 0; y < canvas.height; y += pixelSize) {
    for (let x = 0; x < canvas.width; x += pixelSize) {
      ctx.fillStyle = '#FFFFFF'; // Beyaz arka plan
      ctx.fillRect(x, y, pixelSize, pixelSize);
    }
  }
}

// Renk seçici oluştur
function createColorPicker() {
  colors.forEach(color => {
    const colorBox = document.createElement('div');
    colorBox.classList.add('color-box');
    colorBox.style.backgroundColor = color;
    colorBox.addEventListener('click', () => {
      selectedColor = color;
    });
    colorPicker.appendChild(colorBox);
  });
}

// Piksel boyama
canvas.addEventListener('click', (e) => {
  if (cooldown > 0) return;

  const rect = canvas.getBoundingClientRect();
  const x = Math.floor((e.clientX - rect.left) / pixelSize) * pixelSize;
  const y = Math.floor((e.clientY - rect.top) / pixelSize) * pixelSize;

  ctx.fillStyle = selectedColor;
  ctx.fillRect(x, y, pixelSize, pixelSize);

  cooldown = cooldownTime;
  startCooldown();
});

// Cooldown başlatma
function startCooldown() {
  const interval = setInterval(() => {
    if (cooldown > 0) {
      timerEl.textContent = `Cooldown: ${cooldown}s`;
      cooldown--;
    } else {
      timerEl.textContent = 'Cooldown: 0s';
      clearInterval(interval);
    }
  }, 1000);
}

// Başlatma
initializeCanvas();
createColorPicker();