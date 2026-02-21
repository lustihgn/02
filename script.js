/* ============ CANVAS ============ */
const canvas = document.getElementById("c");
const ctx = canvas.getContext("2d");

let w, h;
function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

/* ============ HEART ============ */
const COUNT = 5500;
const particles = [];

function heart(t) {
  return {
    x: 16 * Math.sin(t) ** 3,
    y: -(13 * Math.cos(t)
      - 5 * Math.cos(2*t)
      - 2 * Math.cos(3*t)
      - Math.cos(4*t))
  };
}

function createHeart() {
  particles.length = 0;
  while (particles.length < COUNT) {
    const a = Math.random() * Math.PI * 2;
    const k = Math.pow(Math.random(), 0.4);
    const p = heart(a);

    particles.push({
      x: p.x * k,
      y: p.y * k,
      r: 0.03 + k * 0.08,
      o: 0.3 + k * 0.6,
      phase: Math.random() * Math.PI * 2,
      speed: 0.01 + Math.random() * 0.01
    });
  }
}
createHeart();

/* ============ BUILD ============ */
let build = 0;

/* ============ IMAGES ============ */
const images = [];
for (let i = 1; i <= 12; i++) {
  const img = new Image();
  img.src = `img/${i}.jpg`;
  images.push(img);
}

const photos = [];

function spawnPhoto() {
  const img = images[Math.floor(Math.random() * images.length)];
  photos.push({
    img,
    x: (Math.random() - 0.5) * 2,
    y: (Math.random() - 0.5) * 2,
    z: -3,
    vz: 0.04 + Math.random() * 0.02,
    r: Math.random() * Math.PI
  });
}

/* ============ LOOP ============ */
function draw(t) {
  requestAnimationFrame(draw);
  ctx.clearRect(0, 0, w, h);

  build = Math.min(1, build + 0.005);

  const beat = 1 + Math.sin(t * 0.002) * 0.04;

  /* HEART */
  ctx.save();
  ctx.translate(w / 2, h / 2);
  ctx.scale(12 * beat, 12 * beat);

  for (const p of particles) {
    p.phase += p.speed;
    ctx.globalAlpha = p.o * build;
    ctx.beginPath();
    ctx.arc(
      p.x * build,
      p.y * build,
      p.r,
      0,
      Math.PI * 2
    );
    ctx.fillStyle = "rgb(255,105,135)";
    ctx.fill();
  }
  ctx.restore();

  /* PHOTOS */
  if (photos.length < 6 && Math.random() < 0.03) {
    spawnPhoto();
  }

  ctx.save();
  ctx.translate(w / 2, h / 2);
  for (let i = photos.length - 1; i >= 0; i--) {
    const p = photos[i];
    p.z += p.vz;
    p.r += 0.01;

    const s = 1 / (p.z * 0.2);
    if (s > 4) {
      photos.splice(i, 1);
      continue;
    }

    ctx.globalAlpha = Math.min(1, s);
    ctx.save();
    ctx.translate(p.x * w * s * 0.25, p.y * h * s * 0.25);
    ctx.rotate(p.r);
    ctx.drawImage(
      p.img,
      -p.img.width * s * 0.15,
      -p.img.height * s * 0.15,
      p.img.width * s * 0.3,
      p.img.height * s * 0.3
    );
    ctx.restore();
  }
  ctx.restore();
}
requestAnimationFrame(draw);

/* ============ AUTO START ============ */
const wish = document.getElementById("wish");
setTimeout(() => wish.style.opacity = 1, 800);

/* ============ iOS AUDIO FIX ============ */
const audio = document.getElementById("bgm");
document.addEventListener("touchstart", () => {
  audio.volume = 0.6;
  audio.play().catch(()=>{});
}, { once: true });
