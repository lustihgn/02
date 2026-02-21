/* ================= BASIC ================= */
const canvas = document.getElementById("c");
const ctx = canvas.getContext("2d");

let w, h;
function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

/* ================= HEART ================= */
const COUNT = 6000;
const particles = [];

function heart(t) {
  return {
    x: 16 * Math.sin(t) ** 3,
    y: -(13 * Math.cos(t)
      - 5 * Math.cos(2 * t)
      - 2 * Math.cos(3 * t)
      - Math.cos(4 * t))
  };
}

function generate() {
  particles.length = 0;
  while (particles.length < COUNT) {
    const a = Math.random() * Math.PI * 2;
    const k = Math.pow(Math.random(), 0.35);
    const p = heart(a);
    const center = Math.abs(p.x * k);
    if (Math.random() > Math.min(1, Math.pow(center, 0.85))) continue;

    particles.push({
      nx: p.x * k,
      ny: p.y * k,
      r: 0.03 + k * 0.08,
      baseO: 0.3 + k * 0.6,
      phase: Math.random() * Math.PI * 2,
      speed: 0.006 + Math.random() * 0.01
    });
  }
}
generate();

/* ================= BUILD ================= */
let build = 0;
let building = false;
function ease(t) { return t * t * (3 - 2 * t); }

/* ================= PHOTOS ================= */
const images = [];
for (let i = 1; i <= 12; i++) {
  const img = new Image();
  img.src = `img/${i}.jpg`;
  images.push(img);
}

const photoParticles = [];

function spawnPhoto() {
  const img = images[Math.floor(Math.random() * images.length)];
  photoParticles.push({
    img,
    x: (Math.random() < 0.5 ? -1 : 1) * (1.5 + Math.random()),
    y: (Math.random() - 0.5) * 1.5,
    z: -4,
    vz: 0.04 + Math.random() * 0.02,
    rot: Math.random() * Math.PI
  });
}

/* ================= LOOP ================= */
let last = 0;
function draw(now) {
  requestAnimationFrame(draw);
  if (now - last < 16) return;
  last = now;

  ctx.clearRect(0, 0, w, h);

  if (building) {
    build += 0.004;
    if (build >= 1) {
      build = 1;
      building = false;
    }
  }

  const a = ease(build);
  const t = now * 0.0025;
  const beat = 1 + Math.sin(t) * 0.03 + Math.sin(t * 2) * 0.015;

  /* HEART */
  ctx.save();
  ctx.translate(w / 2, h / 2);
  ctx.scale(13 * beat, 13 * beat);

  for (const p of particles) {
    p.phase += p.speed;
    const sparkle = (Math.sin(p.phase) + 1) * 0.12;
    const pulse = (beat - 1) * 0.6;

    ctx.globalAlpha = (p.baseO + sparkle) * a;
    ctx.beginPath();
    ctx.arc(
      p.nx * a + p.nx * pulse,
      p.ny * a + p.ny * pulse,
      p.r,
      0, Math.PI * 2
    );
    ctx.fillStyle = "rgb(255,105,135)";
    ctx.fill();
  }
  ctx.restore();

  /* PHOTOS */
  if (!building && photoParticles.length < 8 && Math.random() < 0.03) {
    spawnPhoto();
  }

  ctx.save();
  ctx.translate(w / 2, h / 2);
  for (let i = photoParticles.length - 1; i >= 0; i--) {
    const p = photoParticles[i];
    p.z += p.vz;
    p.rot += 0.01;

    const s = 1 / (p.z * 0.18);
    if (s > 4) {
      photoParticles.splice(i, 1);
      continue;
    }

    ctx.globalAlpha = Math.min(1, s);
    ctx.save();
    ctx.translate(p.x * w * s * 0.25, p.y * h * s * 0.25);
    ctx.rotate(p.rot);
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

/* ================= OPEN ================= */
const openBtn = document.getElementById("openBtn");
const wish = document.getElementById("wish");
const audio = document.getElementById("bgm");

openBtn.onclick = () => {
  openBtn.style.display = "none";
  wish.style.opacity = 1;

  building = true;
  build = 0;

  audio.volume = 0;
  audio.play().catch(() => {});
  let v = 0;
  const fade = setInterval(() => {
    v += 0.02;
    audio.volume = Math.min(0.6, v);
    if (v >= 0.6) clearInterval(fade);
  }, 100);
};
