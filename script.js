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
const BALLOON_SIZE = 220;
let balloonCount = 0; // Biến theo dõi số lượng bóng bay

// Giới hạn tối đa bóng bay hiển thị cùng lúc
const MAX_BALLOONS = 10;
let lastBalloonTime = 0; // Thời gian tạo bóng bay cuối cùng (giới hạn tần suất tạo bóng bay)

const MIN_INTERVAL = 2000; // Thời gian tạo bóng bay tối thiểu (2 giây)

// Tạo bóng bay mới
function createBalloon() {
    // Kiểm tra số lượng bóng bay hiện tại
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
        balloon.style.animationDuration = (9 + Math.random() * 3) + "s";

        balloon.appendChild(img);
        zone.appendChild(balloon);

        // Tăng số lượng bóng bay đã tạo
        balloonCount++;

        // Click vào bóng bay để phóng to ảnh
        balloon.onclick = () => zoomImage(src);

        // Sau 13 giây, xóa bóng bay khỏi zone và giảm số lượng bóng bay
        setTimeout(() => {
            balloon.remove();
            balloonCount--;
        }, 13000);
    };
}

// Hàm kiểm tra thời gian tạo bóng bay và quyết định tạo bóng bay mới
function checkAndCreateBalloon() {
    const now = Date.now();
    if (now - lastBalloonTime >= MIN_INTERVAL) {
        createBalloon();
        lastBalloonTime = now;
    }
}

// Sử dụng requestAnimationFrame để gọi hàm kiểm tra và tạo bóng bay
function animateBalloon() {
    checkAndCreateBalloon();
    requestAnimationFrame(animateBalloon); // Tiếp tục gọi hàm này mỗi khung hình
}

// Bắt đầu tạo bóng bay khi trang load
animateBalloon();

// Phóng to ảnh khi click vào bóng bay
function zoomImage(src) {
    const overlay = document.createElement("div");
    overlay.className = "zoom";

    const img = document.createElement("img");
    img.src = src;

    overlay.appendChild(img);
    document.body.appendChild(overlay);

    overlay.onclick = () => overlay.remove();
}
