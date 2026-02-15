const images = [
    "images/anh1.jpg",
    "images/anh2.jpg",
    "images/anh3.jpg",
    "images/anh4.jpg",
    "images/anh5.jpg",
    "images/anh6.jpg",
    "images/anh7.jpg",
    "images/anh8.jpg",
    "images/anh9.jpg",
    "images/anh10.jpg",
    "images/anh11.jpg",
    "images/anh12.jpg"
];

const zone = document.getElementById("balloonZone");
const BALLOON_SIZE = 150;

const MAX_BALLOONS = 6;
const MIN_INTERVAL = 2000;

let balloonCount = 0;
let lastBalloonTime = 0;

// Create balloon
function createBalloon() {
    if (balloonCount >= MAX_BALLOONS) return;

    const balloon = document.createElement("div");
    balloon.className = "balloon";

    const img = document.createElement("img");
    const src = images[Math.floor(Math.random() * images.length)];
    img.src = src;

    img.onload = () => {
        const zoneWidth = zone.clientWidth;
        const padding = 20;
        const maxLeft = zoneWidth - BALLOON_SIZE - padding;

        balloon.style.left = Math.random() * maxLeft + "px";
        balloon.style.animationDuration = (7 + Math.random() * 4) + "s";

        balloon.appendChild(img);
        zone.appendChild(balloon);
        balloonCount++;

        balloon.onclick = () => zoomImage(src);

        setTimeout(() => {
            balloon.remove();
            balloonCount--;
        }, 12000);
    };
}

// Animation loop
function animate() {
    const now = Date.now();
    if (now - lastBalloonTime > MIN_INTERVAL) {
        createBalloon();
        lastBalloonTime = now;
    }
    requestAnimationFrame(animate);
}

animate();

// Zoom image
function zoomImage(src) {
    const overlay = document.createElement("div");
    overlay.className = "zoom";

    const img = document.createElement("img");
    img.src = src;

    overlay.appendChild(img);
    document.body.appendChild(overlay);

    overlay.onclick = () => overlay.remove();
}
