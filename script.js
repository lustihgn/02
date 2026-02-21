/* ================= CANVAS ================= */
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

/* ================= STATE ================= */
let started = false;

/* ================= BUTTON ================= */
const startBtn = document.getElementById("startBtn");
startBtn.onclick = () => {
  started = true;
  startBtn.style.display = "none";
  startPhotoFlow();
};

/* ================= HEART (GIỮ CỐ ĐỊNH) ================= */
function drawHeart() {
  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.scale(7, 7);

  ctx.beginPath();
  for (let t = 0; t <= Math.PI * 2; t += 0.02) {
    const x = 16 * Math.sin(t) ** 3;
    const y =
      -(13 * Math.cos(t)
        - 5 * Math.cos(2 * t)
        - 2 * Math.cos(3 * t)
        - Math.cos(4 * t));
    ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fillStyle = "rgb(255,105,135)";
  ctx.fill();
  ctx.restore();
}

/* ================= LOAD IMAGES ================= */
const images = [];
for (let i = 1; i <= 12; i++) {
  const img = new Image();
  img.src = `anh${i}.jpg`;
  images.push(img);
}

/* ================= PHOTOS ================= */
const photos = [];

function spawnPhoto() {
  const img = images[Math.floor(Math.random() * images.length)];
  const angle = Math.random() * Math.PI * 2;
  const dist = Math.max(canvas.width, canvas.height);

  photos.push({
    img,
    x: canvas.width / 2 + Math.cos(angle) * dist,
    y: canvas.height / 2 + Math.sin(angle) * dist,
    vx: -Math.cos(angle) * (0.6 + Math.random()),
    vy: -Math.sin(angle) * (0.6 + Math.random()),
    z: 0.2,
    vz: 0.015 + Math.random() * 0.01,
    life: 0,
    maxLife: 280
  });
}

function startPhotoFlow() {
  setInterval(() => {
    if (photos.length < 20) spawnPhoto();
  }, 500);
}

function drawPhotos() {
  for (let i = photos.length - 1; i >= 0; i--) {
    const p = photos[i];
    p.x += p.vx;
    p.y += p.vy;
    p.z += p.vz;
    p.life++;

    const size = 40 + p.z * 140;
    ctx.globalAlpha = Math.min(1, p.z);

    ctx.drawImage(
      p.img,
      p.x - size / 2,
      p.y - size / 2,
      size,
      size
    );

    if (p.life > p.maxLife) photos.splice(i, 1);
  }
  ctx.globalAlpha = 1;
}

/* ================= LOOP ================= */
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (started) {
    drawHeart();   // tim luôn cố định
    drawPhotos();  // ảnh bay từ xa tới
  }

  requestAnimationFrame(animate);
}
animate();
