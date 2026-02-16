const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = canvas.clientWidth * dpr;
  canvas.height = canvas.clientHeight * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(resizeCanvas, 200);
});

resizeCanvas();

/* ===== GIỚI HẠN FPS GIẢM LAG (KHÔNG ĐỤNG LOGIC TIM) ===== */
let lastTime = 0;
function limitFPS(time) {
  requestAnimationFrame(limitFPS);
  if (time - lastTime < 24) return; // ~40fps
  lastTime = time;
}
requestAnimationFrame(limitFPS);
