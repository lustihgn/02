document.addEventListener("DOMContentLoaded", () => {

    // DANH SÁCH ẢNH (cùng cấp index.html)
    const IMAGES = [
        "anh1.jpg",
        "anh2.jpg",
        "anh3.jpg",
        "anh4.jpg",
        "anh5.jpg",
        "anh6.jpg",
        "anh7.jpg",
        "anh8.jpg",
        "anh9.jpg",
        "anh10.jpg",
        "anh11.jpg",
        "anh12.jpg"
    ];

    const zone = document.getElementById("balloonZone");

    const BALLOON_SIZE = 140;
    const MAX_BALLOONS = 6;
    const SPAWN_INTERVAL = 1500; // Giảm tốc độ xuất hiện (ms)

    let active = 0;
    const pool = [];

    // Tạo 1 bóng bay (tái sử dụng)
    function createBalloon() {
        const b = document.createElement("div");
        b.className = "balloon";

        const img = document.createElement("img");
        img.style.display = "none"; // ⬅️ ẨN cho tới khi load xong
        b.appendChild(img);

        b.onclick = () => zoomImage(img.src);
        return b;
    }

    // Hàm spawn bóng bay liên tục với tần suất thấp
    function spawnBalloon() {
        if (active >= MAX_BALLOONS) return;

        const balloon = pool.pop() || createBalloon();
        const img = balloon.querySelector("img");

        img.style.display = "none";

        const src = IMAGES[Math.floor(Math.random() * IMAGES.length)];

        // preload ảnh (FIX ❓ iOS)
        const temp = new Image();

        temp.onload = () => {
            img.src = src;
            img.style.display = "block";

            const maxLeft = Math.max(0, zone.clientWidth - BALLOON_SIZE);
            balloon.style.left = Math.random() * maxLeft + "px";
            balloon.style.animationDuration = (6 + Math.random() * 3) + "s"; // Để mỗi bóng bay bay trong khoảng thời gian ngẫu nhiên

            zone.appendChild(balloon);
            active++;

            setTimeout(() => {
                balloon.remove();
                pool.push(balloon);
                active--;
            }, 9000); // Thời gian sống của bóng bay (9 giây)
        };

        temp.onerror = () => {
            // Ảnh lỗi → bỏ qua (KHÔNG hiện ❓)
            pool.push(balloon);
        };

        temp.src = src;
    }

    // Chạy bóng bay liên tục nhưng với thời gian xuất hiện lâu hơn
    setInterval(spawnBalloon, SPAWN_INTERVAL);

    // Zoom ảnh
    function zoomImage(src) {
        const overlay = document.createElement("div");
        overlay.className = "zoom";

        const img = document.createElement("img");
        img.src = src;

        overlay.appendChild(img);
        document.body.appendChild(overlay);

        overlay.onclick = () => overlay.remove();
    }

});
