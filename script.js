/* ================= TRÁI TIM ================= */
const canvas = document.getElementById("c");
const ctx = canvas.getContext("2d");

let w, h;
function resize(){
  w = canvas.width = canvas.offsetWidth;
  h = canvas.height = canvas.offsetHeight;
}
window.addEventListener("resize", resize);
resize();

const COUNT = 5000;
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
    particles.push({
      x: p.x * k,
      y: p.y * k,
      r: 0.03,
      o: 0.3 + k * 0.5
    });
  }
}
generate();

function draw(t){
  requestAnimationFrame(draw);
  ctx.clearRect(0,0,w,h);

  ctx.save();
  ctx.translate(w/2, h/2);
  const scale = Math.min(w, h) * 0.020;
  ctx.scale(scale, scale);

  for(const p of particles){
    ctx.globalAlpha = p.o;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
    ctx.fillStyle = "rgb(255,105,135)";
    ctx.fill();
  }
  ctx.restore();
}
requestAnimationFrame(draw);

/* ================= ẢNH PHÍA TRÊN ================= */
const images = [
  "anh1.jpg","anh2.jpg","anh3.jpg","anh4.jpg","anh5.jpg","anh6.jpg",
  "anh7.jpg","anh8.jpg","anh9.jpg","anh10.jpg","anh11.jpg","anh12.jpg"
];

const photos = document.getElementById("photos");
let idx = 0;

setInterval(() => {
  const img = document.createElement("img");
  img.src = images[idx];
  img.className = "photo";

  img.style.left = (5 + Math.random()*80) + "%";
  img.style.top = (5 + Math.random()*60) + "%";

  photos.appendChild(img);
  setTimeout(() => img.remove(), 12000);

  idx = (idx + 1) % images.length;
}, 2500);

/* ================= NHẠC ================= */
const music = document.getElementById("music");
document.body.addEventListener("click", () => {
  music.play();
}, { once: true });
