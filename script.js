const container = document.getElementById("objects");

const images = [
    "https://picsum.photos/300?1",
    "https://picsum.photos/300?2",
    "https://picsum.photos/300?3",
    "https://picsum.photos/300?4"
];

const texts = [
    "I Love You ❤️",
    "Forever",
    "My Heart",
    "Only You",
    "With All My Love"
];

function createFlyObject() {
    const fly = document.createElement("div");
    fly.className = "fly";

    const img = document.createElement("img");
    img.src = images[Math.floor(Math.random() * images.length)];

    const text = document.createElement("span");
    text.textContent = texts[Math.floor(Math.random() * texts.length)];

    // lệch hướng để KHÔNG đè tim
    const x = (Math.random() < 0.5 ? -1 : 1) * (200 + Math.random() * 300);
    const y = (Math.random() - 0.5) * 300;

    fly.style.setProperty("--x", `${x}px`);
    fly.style.setProperty("--y", `${y}px`);

    fly.appendChild(img);
    fly.appendChild(text);
    container.appendChild(fly);

    setTimeout(() => fly.remove(), 6500);
}

// tạo liên tục – cùng nhịp tunnel
setInterval(createFlyObject, 700);
