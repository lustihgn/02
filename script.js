// ===== DANH SÁCH ẢNH CỦA BẠN =====
const images = [
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

function randomImage() {
  return images[Math.floor(Math.random() * images.length)];
}

function createBalloon(side) {
  const img = document.createElement("img");
  img.src = randomImage();
  img.className = "balloon";

  // Không sát rìa
  const padding = 40;
  const maxWidth = side.clientWidth - 160;
  img.style.left = padding + Math.random() * maxWidth + "px";

  // Bay chậm – mượt
  const duration = 12 + Math.random() * 4;
  img.style.animationDuration = duration + "s";

  side.appendChild(img);

  // CHỈ XÓA KHI ANIMATION KẾT THÚC
  img.addEventListener("animationend", () => {
    img.remove();
  });
}

const leftSide = document.querySelector(".left");
const rightSide = document.querySelector(".right");

// TẦN SUẤT THẤP – ỔN ĐỊNH
setInterval(() => {
  createBalloon(leftSide);
  createBalloon(rightSide);
}, 3500);
