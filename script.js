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
    const SPAWN_INTERVAL = 1500; // Giảm tốc độ xuất hiện bóng bay (ms)

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
        const maxLeft =
