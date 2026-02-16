const images = [
  "anh1.jpg","anh2.jpg","anh3.jpg","anh4.jpg",
  "anh5.jpg","anh6.jpg","anh7.jpg","anh8.jpg",
  "anh9.jpg","anh10.jpg","anh11.jpg","anh12.jpg"
];

let queue = [...images];
let used = [];

function getNextImage() {
  if (queue.length === 0) {
    queue = [...used];
    used = [];
  }
  const img = queue.splice(Math.floor(Math.random() * queue.length), 1)[0];
  used.push(img);
  return img;
}

function createImage(side) {
  const img = document.createElement("img");
  img.src = getNextImage();
  img.className = "flying-img";

  img.style.left = Math.random() * 60 + "%";

  side.appendChild(img);

  img.addEventListener("animationend", () => {
    img.remove();
  });
}

setInterval(() => {
  createImage(document.querySelector(".left"));
  createImage(document.querySelector(".right"));
}, 2000);
