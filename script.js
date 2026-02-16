<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8" />
<title>Particle Heart Clean</title>
<style>
  html, body {
    margin: 0;
    padding: 0;
    background: black;
    overflow: hidden;
  }
  canvas { display: block; }
</style>
</head>
<body>

<canvas id="c"></canvas>

<script>
const canvas = document.getElementById("c");
const ctx = canvas.getContext("2d");

let w, h;
function resize(){
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

const COUNT = 6000;
const particles = [];

/* ===== GIỮ NGUYÊN HÌNH DẠNG TIM ===== */
function heart(t){
  return {
    x: 16 * Math.sin(t)**3,
    y: -(13*Math.cos(t)
        - 5*Math.cos(2*t)
        - 2*Math.cos(3*t)
        - Math.cos(4*t))
  };
}

/* ===== GIỮ NGUYÊN PHÂN BỐ HẠT ===== */
function generate(){
  particles.length = 0;

  while(particles.length < COUNT){
    const a = Math.random() * Math.PI * 2;
    const k = Math.pow(Math.random(), 0.35);
    const p = heart(a);

    const center = Math.abs(p.x * k);
    if(Math.random() > Math.min(1, Math.pow(center / 1.0, 0.85))) continue;

    const baseO = 0.25 + k * 0.55;

    particles.push({
      x: p.x * k,
      y: p.y * k,
      nx: p.x * k, // lưu vị trí gốc (quan trọng)
      ny: p.y * k,
      r: 0.028 + k * 0.085,
      baseO,
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
  ctx.scale(13 * beat, 13 * beat);

  for(const p of particles){
    p.phase += p.speed;

    // ✨ lấp lánh nhẹ
    const sparkle = (Math.sin(p.phase) + 1) * 0.12;

    // 💓 chuyển động RẤT NHẸ theo nhịp tim (không phá hình)
    const pulse = (beat - 1) * 0.6;
    const dx = p.nx * pulse;
    const dy = p.ny * pulse;

    ctx.globalAlpha = p.baseO + sparkle;
    ctx.beginPath();
    ctx.arc(
      p.nx + dx,
      p.ny + dy,
      p.r,
      0,
      Math.PI * 2
    );
    ctx.fillStyle = "rgb(255,105,135)";
    ctx.fill();
  }

  ctx.restore();
  ctx.globalAlpha = 1;
}

requestAnimationFrame(draw);
</script>

</body>
</html>
const images = [
  "anh1.jpg","anh2.jpg","anh3.jpg","anh4.jpg","anh5.jpg",
  "anh6.jpg","anh7.jpg","anh8.jpg","anh9.jpg","anh10.jpg"
];

let index = 0;
const photos = document.getElementById("photos");

/* GIẢM TẦN SUẤT → ĐỠ RỐI */
setInterval(() => {
  const img = document.createElement("img");
  img.src = images[index];
  img.className = "photo";

  img.style.left = Math.random() * 80 + "%";
  img.style.animationDuration = (18 + Math.random() * 6) + "s";

  photos.appendChild(img);

  setTimeout(() => img.remove(), 25000);

  index = (index + 1) % images.length;
}, 3500); // 👈 ảnh xuất hiện chậm, không rối
