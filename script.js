/* ================= TRÁI TIM – GIỮ NGUYÊN ================= */
const canvas = document.getElementById("c");
const ctx = canvas.getContext("2d");

let w, h;
function resize(){
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

const COUNT = 5200; // giảm nhẹ cho đỡ lag
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
    if(Math.random() > Math.min(1, Math.pow(center / 1.0, 0.85))) continue;

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

let last = 0;
function draw(t){
  requestAnimationFrame(draw);
  if(t - last < 16) return;
  last = t;

  ctx.clearRect(0,0,w,h);

  const beat = 1 + Math.sin(t * 0.0025) * 0.03;
  ctx.save();
  ctx.translate(w/2, h/2);

  /* 👇 GIẢM KÍCH THƯỚC TRÁI TIM */
  const scale = Math.min(w, h) * 0.021;
  ctx.scale(scale * beat, scale * beat);

  for(const p of particles){
    p.phase += p.speed;
    ctx.globalAlpha = p.baseO + (Math.sin(p.phase)+1)*0.12;
    ctx.beginPath();
    ctx.arc(p.nx, p.ny, p.r, 0, Math.PI*2);
    ctx.fillStyle = "rgb(255,105,135)";
    ctx.fill();
  }
  ctx.restore();
}
requestAnimationFrame(draw);

/* ================= ẢNH BAY ================= */
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

  /* 👇 SÁT RÌA */
  img.style.left = Math.random() < 0.5
    ? (1 + Math.random()*8) + "%"
    : (91 + Math.random()*8) + "%";

  img.style.animationDuration = (12 + Math.random()*3) + "s";
  photos.appendChild(img);

  setTimeout(() => img.remove(), 16000);
  i = (i + 1) % images.length;
}, 1800);

/* ================= NHẠC – CHẠM ĐỂ PHÁT ================= */
const music = document.getElementById("music");
let played = false;

document.body.addEventListener("click", () => {
  if (!played) {
    music.play();
    played = true;
  }
}, { once: true });
