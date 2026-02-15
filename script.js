document.addEventListener("DOMContentLoaded", () => {

    // Danh sách ảnh bóng bay
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
    const SPAWN_INTERVAL = 1500; // Tốc độ xuất hiện bóng bay (ms)

    const MAX_BALLOONS = 6; // Số lượng bóng bay tối đa hiển thị cùng lúc
    let activeBalloons = 0;
    const pool = [];
    const balloonPositions = []; // Mảng lưu vị trí đã sử dụng

    // Tạo một bóng bay (tái sử dụng)
    function createBalloon() {
        const balloon = document.createElement("div");
        balloon.className = "balloon";

        const img = document.createElement("img");
        img.style.display = "none"; // Ẩn cho đến khi ảnh tải xong
        balloon.appendChild(img);

        balloon.onclick = () => zoomImage(img.src);
        return balloon;
    }

    // Hàm xác định vị trí trống trên màn hình
    function getAvailablePosition() {
        const maxLeft = Math.max(0, zone.clientWidth - BALLOON_SIZE);
        let pos;
        
        // Lặp lại cho đến khi tìm được vị trí chưa được sử dụng
        do {
            pos = Math.random() * maxLeft;
        } while (balloonPositions.includes(pos));

        balloonPositions.push(pos); // Thêm vị trí vào mảng
        if (balloonPositions.length > MAX_BALLOONS) {
            balloonPositions.shift(); // Xóa vị trí cũ nếu đã vượt quá giới hạn
        }

        return pos;
    }

    function spawnBalloon() {
        if (activeBalloons >= MAX_BALLOONS) return; // Hạn chế số lượng bóng bay xuất hiện đồng thời

        const balloon = pool.pop() || createBalloon();
        const img = balloon.querySelector("img");

        img.style.display = "none";

        const src = IMAGES[Math.floor(Math.random() * IMAGES.length)];

        // Preload ảnh
        const tempImg = new Image();
        tempImg.onload = () => {
            img.src = src;
            img.style.display = "block";

            // Xác định vị trí mới cho bóng bay
            const leftPos = getAvailablePosition();
            balloon.style.left = leftPos + "px";
            balloon.style.animationDuration = (6 + Math.random() * 3) + "s"; // Bóng bay bay lâu hơn

            zone.appendChild(balloon);
            activeBalloons++;

            // Sau khi bóng bay bay lên, xóa nó đi
            setTimeout(() => {
                balloon.remove();
                pool.push(balloon);
                activeBalloons--;
            }, 9000); // Thời gian bóng bay tồn tại
        };

        tempImg.onerror = () => {
            pool.push(balloon);
        };

        tempImg.src = src;
    }

    // Lặp liên tục để tạo bóng bay mới
    setInterval(spawnBalloon, SPAWN_INTERVAL); // Giảm tốc độ xuất hiện của bóng bay

    // Zoom ảnh khi nhấn vào bóng bay
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
