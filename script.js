// ================================
// Spark particles (gold & silver)
// ================================
const canvas = document.getElementById('sparkCanvas');
const ctx = canvas.getContext('2d');

  function downloadEXE(filename) {
    const link = document.createElement("a");
    link.href = filename;
    link.download = filename;
    link.click();
  }

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const sparks = [];
const sparkCount = 500;

// Create sparks
for (let i = 0; i < sparkCount; i++) {
  sparks.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 2 + 1,
    color: Math.random() > 0.5 ? "gold" : "silver",
    dx: (Math.random() - 0.5) * 0.7, // slightly faster
    dy: (Math.random() - 0.5) * 0.7,
    alpha: Math.random() * 0.8 + 0.2, // shimmer
    pulse: Math.random() * 0.05 + 0.02
  });
}

function animateSparks() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  sparks.forEach((s) => {
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${s.color === "gold" ? "255,215,0" : "192,192,192"}, ${s.alpha})`;
    ctx.fill();

    // Movement
    s.x += s.dx;
    s.y += s.dy;

    // Bounce on edges
    if (s.x < 0 || s.x > canvas.width) s.dx *= -1;
    if (s.y < 0 || s.y > canvas.height) s.dy *= -1;

    // Twinkle effect
    s.alpha += s.pulse * (Math.random() > 0.5 ? 1 : -1);
    if (s.alpha > 1) s.alpha = 1;
    if (s.alpha < 0.2) s.alpha = 0.2;
  });

  requestAnimationFrame(animateSparks);
}
animateSparks();

// ================================
// Scroll reveal for sections
// ================================
const sections = document.querySelectorAll(".glass-section");

const revealOnScroll = () => {
  const triggerBottom = window.innerHeight * 0.9;

  sections.forEach((section) => {
    const top = section.getBoundingClientRect().top;
    if (top < triggerBottom) {
      section.style.opacity = "1";
      section.style.transform = "translateY(0)";
      section.style.transition = "opacity 0.8s ease-out, transform 0.8s ease-out";
    } else {
      section.style.opacity = "0";
      section.style.transform = "translateY(40px)";
    }
  });
};

// Run on load + scroll
window.addEventListener("scroll", revealOnScroll);
window.addEventListener("touchmove", revealOnScroll);
window.addEventListener("load", revealOnScroll);

// Init
sections.forEach((section) => {
  section.style.opacity = "0";
  section.style.transform = "translateY(40px)";
});
