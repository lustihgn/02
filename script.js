const canvas = document.getElementById("c");
const ctx = canvas.getContext("2d");

let w, h;
function resize(){
  // ⚠️ ĐẢO WIDTH / HEIGHT VÌ ĐÃ XOAY
  w = canvas.width = window.innerHeight;
  h = canvas.height = window.innerWidth;
}
window.addEventListener("resize", resize);
resize();

/* ===== TRÁI TIM – GIỮ NGUYÊN ===== */
const COUNT = 6000;
const particles = [];

function heart(t){
  return {
    x: 16 * Math.sin(t)**3,
    y: -(13*Math.cos(t)
        - 5*Math.cos(2*t)
        - 2*Math.cos(3*t)
        - Math.cos(4*t))
  };
}

function generate(){
  particles.length = 0;
  while(particles.length < COUNT){
    const a = Math.random() * Math.PI * 2;
    const k = Math.pow(Math.random(), 0.35);
    const p = heart(a);

    const center = Math.abs(p.x * k);
    if(Math.random() > Math.min(1, Math.pow(center, 0.85))) continue;

    particles.push({
      nx: p.x * k,
      ny: p.y * k,
      r: 0.028 + k * 0.085,
      baseO: 0.25 + k * 0.55,
      phase: Math.random() * Math.PI * 2,
      speed: 0.006 + Math.random() * 0.01
    });
  }
}
generate();

let lastTime = 0;
function draw(now){
  requestAnimationFrame(draw);
  if(now - lastTime < 16) return;
  lastTime = now;

  ctx.clearRect(0,0,w,h);

  const t = now * 0.0025;
  const beat = 1 + Math.sin(t) * 0.03 + Math.sin(t*2) * 0.012;

  ctx.save();
  ctx.translate(w/2, h/2);

  // ✅ SCALE THEO KHUNG XOAY
  const scale = Math.min(w, h) * 0.032;
  ctx.scale(scale * beat, scale * beat);

  for(const p of particles){
    p.phase += p.speed;
    const sparkle = (Math.sin(p.phase) + 1) * 0.12;
    const pulse = (beat - 1) * 0.6;

    ctx.globalAlpha = p.baseO + sparkle;
    ctx.beginPath();
    ctx.arc(
      p.nx + p.nx * pulse,
      p.ny + p.ny * pulse,
      p.r,
      0,
      Math.PI * 2
    );
    ctx.fillStyle = "rgb(255,105,135)";
    ctx.fill();
  }
  ctx.restore();
}
requestAnimationFrame(draw);

/* ===== ẢNH BAY – 12 ẢNH ===== */
const images = [
  "anh1.jpg","anh2.jpg","anh3.jpg","anh4.jpg","anh5.jpg","anh6.jpg",
  "anh7.jpg","anh8.jpg","anh9.jpg","anh10.jpg","anh11.jpg","anh12.jpg"
];

let i = 0;
const photos = document.getElementById("photos");

setInterval(() => {
  const img = document.createElement("img");
  img.src = images[i];
  img.className = "photo";
  img.style.left = (10 + Math.random()*70) + "%";
  img.style.animationDuration = (18 + Math.random()*6) + "s";

  photos.appendChild(img);
  setTimeout(() => img.remove(), 26000);
  i = (i + 1) % images.length;
}, 4000);
