/* ================== CANVAS ================== */
const canvas = document.getElementById("c");
const ctx = canvas.getContext("2d");

let w, h;
function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

/* ================== HEART ================== */
const HEART_COUNT = 5000;
const heartParticles = [];

function heartShape(t) {
  return {
    x: 16 * Math.sin(t) ** 3,
    y: -(13 * Math.cos(t)
      - 5 * Math.cos(2 * t)
      - 2 * Math.cos(3 * t)
      - Math.cos(4 * t))
  };
}

// tạo hạt tim 1 lần
for (let i = 0; i < HEART_COUNT; i++) {
  const a = Math.random() * Math.PI * 2;
  const k = Math.pow(Math.random(), 0.4);
  const p = heartShape(a);

  heartParticles.push({
    x: p.x * k,
    y: p.y * k,
    r: 0.03 + k * 0.07,
    o: 0.4 + k * 0.6
  });
}

/* ================== LOAD IMAGES ================== */
/* anh1.jpg → anh12.jpg (cùng cấp script.js) */
const images = [];
const TOTAL_IMAGES = 12;

for (let i = 1; i <= TOTAL_IMAGES; i++) {
  const img = new Image();
  img.src = `anh${i}.jpg`;
  images.push(img);
}

/* ================== PHOTO SYSTEM ================== */
const photos = [];
let photoIndex = 0;

function spawnPhoto() {
  const img = images[photoIndex % images.length];
  photoIndex++;

  const angle = Math.random() * Math.PI * 2;
  const dist = 1.8;

  photos.push({
    img,
    x: Math.cos(angle) * dist,
    y: Math.sin(angle) * dist,
    vx: -Math.cos(angle) * 0.012,
    vy: -Math.sin(angle) * 0.012,
    z: -3,
    vz: 0.05,
    life: 0
  });
}

/* ================== MAIN LOOP ================== */
let lastSpawn = 0;

function draw(time) {
  requestAnimationFrame(draw);
  ctx.clearRect(0, 0, w, h);

  /* ---------- HEART (CỐ ĐỊNH) ---------- */
  const beat = 1 + Math.sin(time * 0.002) * 0.04;

  ctx.save();
  ctx.translate(w / 2, h / 2);
  ctx.scale(12 * beat, 12 * beat);

  for (const p of heartParticles) {
    ctx.globalAlpha = p.o;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = "rgb(255,105,135)";
    ctx.fill();
  }
  ctx.restore();

  /* ---------- SPAWN PHOTO (MỖI 1.5 GIÂY) ---------- */
  if (time - lastSpawn > 1500 && photos.length < 3) {
    spawnPhoto();
    lastSpawn = time;
  }

  /* ---------- DRAW PHOTOS ---------- */
  ctx.save();
  ctx.translate(w / 2, h / 2);

  for (let i = photos.length - 1; i >= 0; i--) {
    const p = photos[i];

    p.x += p.vx;
    p.y += p.vy;
    p.z += p.vz;
    p.life++;

    const scale = 1 / (p.z * 0.2);

    // khi ảnh đủ lớn hoặc sống quá lâu thì xóa
    if (scale > 3 || p.life > 420) {
      photos.splice(i, 1);
      continue;
    }

    ctx.globalAlpha = Math.min(1, scale);
    ctx.drawImage(
      p.img,
      p.x * w * scale * 0.25 - p.img.width * scale * 0.15,
      p.y * h * scale * 0.25 - p.img.height * scale * 0.15,
      p.img.width * scale * 0.3,
      p.img.height * scale * 0.3
    );
  }

  ctx.restore();
}

requestAnimationFrame(draw);

/* ================== TEXT & AUDIO ================== */
const wish = document.getElementById("wish");
setTimeout(() => {
  if (wish) wish.style.opacity = 1;
}, 800);

// iOS: chỉ phát nhạc khi có chạm
const audio = document.getElementById("bgm");
document.addEventListener(
  "touchstart",
  () => {
    if (!audio) return;
    audio.volume = 0.6;
    audio.play().catch(() => {});
  },
  { once: true }
);
