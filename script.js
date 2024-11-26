const uploadInput = document.getElementById("upload");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const autoPlaceButton = document.getElementById("autoPlace");

// Desteklenen renk paleti
const palette = [
  "#FFFFFF", "#E4E4E4", "#888888", "#222222", // Gri tonlar
  "#FFA7D1", "#E50000", "#E59500", "#A06A42", // Kırmızı tonlar
  "#E5D900", "#94E044", "#02BE01", "#00D3DD", // Yeşil ve Mavi tonlar
  "#0083C7", "#0000EA", "#CF6EE4", "#820080"  // Mor tonlar
];

// PNG yükleme ve canvas'a çizim
uploadInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const img = new Image();
  img.src = URL.createObjectURL(file);
  img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    URL.revokeObjectURL(img.src);
  };
});

// Renkleri palete uyarlama ve talimat oluşturma
autoPlaceButton.addEventListener("click", () => {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const pixels = imageData.data;
  const commands = [];

  for (let y = 0; y < canvas.height; y++) {
    for (let x = 0; x < canvas.width; x++) {
      const index = (y * canvas.width + x) * 4;
      const r = pixels[index];
      const g = pixels[index + 1];
      const b = pixels[index + 2];

      // Renk paletine en yakın renk
      const color = getClosestColor(r, g, b);
      commands.push({ x, y, color });
    }
  }

  console.log("Talimatlar:", commands);
  alert("Talimatlar oluşturuldu. Konsolu kontrol edin!");
});

// Renk paletine en yakın rengi bulma
function getClosestColor(r, g, b) {
  let closestColor = palette[0];
  let closestDistance = Infinity;

  for (const color of palette) {
    const [cr, cg, cb] = hexToRgb(color);
    const distance = Math.sqrt(
      Math.pow(cr - r, 2) + Math.pow(cg - g, 2) + Math.pow(cb - b, 2)
    );
    if (distance < closestDistance) {
      closestDistance = distance;
      closestColor = color;
    }
  }
  return closestColor;
}

// HEX'i RGB'ye çevirme
function hexToRgb(hex) {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return [r, g, b];
}
