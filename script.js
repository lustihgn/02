/* ===================== CANVAS ===================== */
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

/* ===================== STATE ===================== */
let started = false;

/* ===================== BUTTON ===================== */
const startBtn = document.createElement("button");
startBtn.innerText = "Bắt đầu";
Object.assign(startBtn.style, {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  padding: "14px 32px",
  fontSize: "18px",
  borderRadius: "30px",
  border: "none",
  background: "#ff5f7e",
  color: "#fff",
  cursor: "pointer",
  zIndex: 10,
});
document.body.appendChild(startBtn);

startBtn.onclick = () => {
  started = true;
  startBtn.remove();
  startPhotoFlow();
};

/* ===================== HEART (CỐ ĐỊNH) ===================== */
function drawHeart() {
  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.scale(8, 8);

  ctx.beginPath();
  for (let t = 0; t < Math.PI * 2; t += 0.02) {
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y =
      -(13 * Math.cos(t) -
        5 * Math.cos(2 * t) -
        2 * Math.cos(3 * t) -
        Math.cos(4 * t));
    ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fillStyle = "pink";
  ctx.fill();
  ctx.restore();
}

/* ===================== PHOTOS ===================== */
const photos = [];
const images = [];

for (let i = 1; i <= 12; i++) {
  const img = new Image();
  img.src = `anh${i}.jpg`;
  images.push(img);
}

function spawnPhoto() {
  const img = images[Math.floor(Math.random() * images.length)];
  photos.push({
    img,
    x: canvas.width / 2,
    y: canvas.height / 2,
    vx: (Math.random() - 0.5) * 4,
    vy: (Math.random() - 0.5) * 4,
    size: 60 + Math.random() * 40,
    life: 0,
    maxLife: 260,
  });
}

function startPhotoFlow() {
  setInterval(() => {
    if (photos.length < 18) spawnPhoto();
  }, 600);
}

function drawPhotos() {
  for (let i = photos.length - 1; i >= 0; i--) {
    const p = photos[i];
    p.x += p.vx;
    p.y += p.vy;
    p.life++;

    ctx.globalAlpha = 1 - p.life / p.maxLife;
    ctx.drawImage(p.img, p.x, p.y, p.size, p.size);

    if (
      p.life > p.maxLife ||
      p.x < -200 ||
      p.y < -200 ||
      p.x > canvas.width + 200 ||
      p.y > canvas.height + 200
    ) {
      photos.splice(i, 1);
    }
  }
  ctx.globalAlpha = 1;
}

/* ===================== LOOP ===================== */
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (started) {
    drawHeart();   // ❤️ tim vẽ trước
    drawPhotos();  // 🖼 ảnh bay xung quanh
  }

  requestAnimationFrame(animate);
}

animate();
