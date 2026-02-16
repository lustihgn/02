const images = [
  "anh1.jpg","anh2.jpg","anh3.jpg","anh4.jpg",
  "anh5.jpg","anh6.jpg","anh7.jpg","anh8.jpg",
  "anh9.jpg","anh10.jpg","anh11.jpg","anh12.jpg"
];

/* ===== CHỐNG LẶP ẢNH NHANH ===== */
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

/* ===== GIẢM RỐI ===== */
const MAX_IMAGES = 4;     // số ảnh tối đa cùng lúc
const INTERVAL = 4500;   // 4.5 giây mới xuất hiện ảnh mới

let sideToggle = true;

function createImage() {
  if (document.querySelectorAll(".flying-img").length >= MAX_IMAGES) return;

  const side = document.querySelector(sideToggle ? ".left" : ".right");
  sideToggle = !sideToggle;

  const img = document.createElement("img");
  img.src = getNextImage();
  img.className = "flying-img";

  const padding = 30;
  const maxX = side.clientWidth - 200;
  img.style.left = padding + Math.random() * maxX + "px";

  side.appendChild(img);

  img.addEventListener("animationend", () => img.remove());
}

setInterval(createImage, INTERVAL);
