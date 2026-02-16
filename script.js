// ===== DANH SÁCH ẢNH =====
const images = [
  "anh1.jpg","anh2.jpg","anh3.jpg","anh4.jpg",
  "anh5.jpg","anh6.jpg","anh7.jpg","anh8.jpg",
  "anh9.jpg","anh10.jpg","anh11.jpg","anh12.jpg"
];

// ===== CHỐNG LẶP NHANH =====
let recent = [];
const MIN_GAP = 8;

function getNextImage() {
  let img;
  do {
    img = images[Math.floor(Math.random() * images.length)];
  } while (recent.includes(img));

  recent.push(img);
  if (recent.length > MIN_GAP) recent.shift();
  return img;
}

// ===== GIỚI HẠN SỐ ẢNH CÙNG LÚC =====
const MAX_IMAGES = 5;   // 👉 giảm / tăng tại đây
const INTERVAL = 4000; // 👉 4 giây mới xuất hiện 1 ảnh

let sideToggle = true;

function createImage() {
  const total = document.querySelectorAll(".flying-img").length;
  if (total >= MAX_IMAGES) return;

  const side = document.querySelector(sideToggle ? ".left" : ".right");
  sideToggle = !sideToggle;

  const img = document.createElement("img");
  img.src = getNextImage();
  img.className = "flying-img";

  // Không sát rìa
  const padding = 30;
  const maxWidth = side.clientWidth - 200;
  img.style.left = padding + Math.random() * maxWidth + "px";

  side.appendChild(img);

  // Chỉ xóa khi animation kết thúc
  img.addEventListener("animationend", () => {
    img.remove();
  });
}

// ===== CHẠY =====
setInterval(createImage, INTERVAL);
