const canvas = document.getElementById("c");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(resizeCanvas, 200);
});

resizeCanvas();

/* ===== GIỚI HẠN FPS NHẸ NHÀNG (KHÔNG ĐỤNG LOGIC TIM) ===== */
let last = 0;
function limiter(t) {
  requestAnimationFrame(limiter);
  if (t - last < 24) return; // ~40fps
  last = t;
}
requestAnimationFrame(limiter);
