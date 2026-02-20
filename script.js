const btn = document.getElementById("startBtn");
const heart = document.querySelector(".heart");
const scene = document.getElementById("scene");

const wishes = [
    "Anh yêu em ❤️",
    "Mãi bên nhau nhé 💕",
    "Em là cả thế giới 🌍",
    "Forever 💖",
    "My Love 💘",
    "Cảm ơn vì đã đến 💝",
    "Yêu em nhiều lắm 😘",
    "Always With You 💞"
];

const images = [
    "https://picsum.photos/500?1",
    "https://picsum.photos/500?2",
    "https://picsum.photos/500?3",
    "https://picsum.photos/500?4"
];

btn.onclick = () => {
    btn.style.display = "none";
    heart.classList.add("show");

    const interval = setInterval(spawnItem, 520);
    setTimeout(() => clearInterval(interval), 16000);
};

function spawnItem() {
    const isImage = Math.random() < 0.45;
    const el = document.createElement(isImage ? "img" : "div");

    if (isImage) {
        el.src = images[Math.floor(Math.random() * images.length)];
        el.className = "fly-img";
    } else {
        el.innerText = wishes[Math.floor(Math.random() * wishes.length)];
        el.className = "wish";
    }

    const angle = Math.random() * Math.PI * 2;

    const startRadius = 160; // tránh trái tim
    const endRadius = Math.max(innerWidth, innerHeight) * 1.3;

    const sx = innerWidth / 2 + Math.cos(angle) * startRadius;
    const sy = innerHeight / 2 + Math.sin(angle) * startRadius;
    const ex = innerWidth / 2 + Math.cos(angle) * endRadius;
    const ey = innerHeight / 2 + Math.sin(angle) * endRadius;

    el.style.setProperty("--sx", `${sx}px`);
    el.style.setProperty("--sy", `${sy}px`);
    el.style.setProperty("--ex", `${ex}px`);
    el.style.setProperty("--ey", `${ey}px`);

    scene.appendChild(el);
    setTimeout(() => el.remove(), 9000);
}
