// Đường dẫn đến hình ảnh duy nhất cho tất cả các quả bóng bay
const balloonImage = "images/anh1.jpg";  // Thay "image1.jpg" thành "anh1.jpg"

function createBalloon() {
    const balloon = document.createElement("div");
    balloon.className = "balloon";

    const img = document.createElement("img");
    img.src = balloonImage;  // Sử dụng hình ảnh duy nhất cho tất cả bóng bay

    // Tạo vị trí ngẫu nhiên cho bóng bay trong phạm vi của nửa phải màn hình (50vw)
    balloon.style.left = Math.random() * 45 + 50 + "vw"; // Giới hạn trái phải từ 50% đến 95% của màn hình

    balloon.style.animationDuration = 6 + Math.random() * 4 + "s"; // Đặt thời gian animation ngẫu nhiên

    balloon.appendChild(img);
    document.getElementById("balloons").appendChild(balloon);

    // Xóa bóng bay sau 10 giây
    setTimeout(() => {
        balloon.remove();
    }, 10000); // Thời gian tồn tại của bóng bay
}

// Tạo bóng bay liên tục mỗi 800ms
setInterval(createBalloon, 800); 
