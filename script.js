const balloonImages = [
    "images/pic1.jpg",
    "images/pic2.jpg",
    "images/pic3.jpg"
];

function createBalloon() {
    const balloon = document.createElement("div");
    balloon.className = "balloon";

    const img = document.createElement("img");
    img.src = balloonImages[Math.floor(Math.random() * balloonImages.length)];

    balloon.style.left = Math.random() * 50 + 50 + "vw"; // Bóng bay sẽ chỉ xuất hiện ở phần phải của màn hình
    balloon.style.animationDuration = 6 + Math.random() * 4 + "s";

    balloon.appendChild(img);
    document.getElementById("balloons").appendChild(balloon);

    setTimeout(() => {
        balloon.remove();
    }, 10000);
}

// Tạo bóng bay liên tục
setInterval(createBalloon, 800);
