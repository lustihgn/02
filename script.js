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

// Điều chỉnh tần suất tạo bóng bay (mỗi 3 giây thay vì 2.6 giây)
setInterval(createBalloon, 3000);

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
