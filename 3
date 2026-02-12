const tetItems = ["🎆", "✨", "🎇", "🌟"];

const cards = [
  {
    img: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=600&q=80",
    text: "Chúc bạn năm mới 2026 phát tài phát lộc!"
  },
  {
    img: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=600&q=80",
    text: "Xuân an khang – Gia đình hạnh phúc!"
  },
  {
    img: "https://images.unsplash.com/photo-1483721310020-03333e577078?auto=format&fit=crop&w=600&q=80",
    text: "Tết rộn ràng – Niềm vui ngập tràn!"
  }
];

let lastIndex = -1;

const popup = document.getElementById("popup");
const popupImg = document.getElementById("popup-img");
const popupText = document.getElementById("popup-text");
const popupContent = document.querySelector(".popup-content");

function createTetItem() {
  const item = document.createElement("div");
  item.className = "flower";
  item.innerText = tetItems[Math.floor(Math.random() * tetItems.length)];

  item.style.left = Math.random() * window.innerWidth + "px";
  item.style.animationDuration = 8 + Math.random() * 3 + "s";

  item.onclick = () => {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * cards.length);
    } while (randomIndex === lastIndex);

    lastIndex = randomIndex;

    popupImg.classList.remove("show");
    popupImg.src = cards[randomIndex].img;
    popupText.innerHTML = cards[randomIndex].text;

    popup.style.display = "flex";

    setTimeout(() => {
      popupImg.classList.add("show");
    }, 50);
  };

  document.body.appendChild(item);
  setTimeout(() => item.remove(), 13000);
}

setInterval(createTetItem, 1000);

popup.onclick = () => popup.style.display = "none";
popupContent.onclick = (e) => e.stopPropagation();


// ===== PHÁO HOA =====
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

class Firework {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height * 0.6;
    this.particles = [];
    this.color = `hsla(${Math.random() * 360}, 80%, 65%, 0.7)`;

    for (let i = 0; i < 20; i++) {
      this.particles.push({
        x: this.x,
        y: this.y,
        angle: Math.random() * 2 * Math.PI,
        speed: Math.random() * 1.5 + 0.5,
        life: 60
      });
    }
  }

  update() {
    this.particles.forEach(p => {
      p.x += Math.cos(p.angle) * p.speed;
      p.y += Math.sin(p.angle) * p.speed;
      p.life--;
    });

    this.particles = this.particles.filter(p => p.life > 0);
  }

  draw() {
    this.particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    });
  }
}

let fireworks = [];

function animate() {
  ctx.fillStyle = "rgba(0,0,20,0.2)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (Math.random() < 0.02) {
    fireworks.push(new Firework());
  }

  fireworks.forEach((fw, index) => {
    fw.update();
    fw.draw();
    if (fw.particles.length === 0) {
      fireworks.splice(index, 1);
    }
  });

  requestAnimationFrame(animate);
}

animate();


// ===== PHÁT NHẠC =====
document.addEventListener("click", function () {
  const bgm = document.getElementById("bgm");
  if (bgm && bgm.paused) {
    bgm.volume = 0.5;
    bgm.play();
  }
}, { once: true });
