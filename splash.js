const percentEl = document.getElementById('loadingPercent');
let percent = 0;

const percentInterval = setInterval(() => {
  percent++;
  percentEl.textContent = percent;
  if (percent >= 100) {
    clearInterval(percentInterval);
    startSlideUp();
  }
}, 31);

const welcomeWords = [
  "नमस्ते 🙏",
  "Hello",
  "Bienvenue",
  "Bienvenido",
  "ようこそ",
  "환영합니다",
  "Willkommen",
  "आपका स्वागत है"
];

let welcomeIndex = 0;
const welcomeEl = document.getElementById('welcomeText');

function cycleWelcomeText() {
  welcomeEl.style.animation = 'none';
  void welcomeEl.offsetWidth;
  welcomeEl.textContent = welcomeWords[welcomeIndex];
  welcomeEl.style.animation = 'welcomeCycle 1.2s ease forwards';
  welcomeIndex++;

  if (welcomeIndex < welcomeWords.length) {
    setTimeout(cycleWelcomeText, 200);
  }
}

cycleWelcomeText();

function startSlideUp() {
  setTimeout(() => {
    document.querySelector('.splash-screen').classList.add('slide-up');
    setTimeout(() => {
      window.location.href = 'landing.html';
    }, 900);
  }, 400);
}

const dot = document.querySelector('.cursor-dot');
const outline = document.querySelector('.cursor-outline');

let mouseX = 0, mouseY = 0;
let outlineX = 0, outlineY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  dot.style.left = mouseX + 'px';
  dot.style.top = mouseY + 'px';
});

function animateOutline() {
  outlineX += (mouseX - outlineX) * 0.15;
  outlineY += (mouseY - outlineY) * 0.15;
  outline.style.left = outlineX + 'px';
  outline.style.top = outlineY + 'px';
  requestAnimationFrame(animateOutline);
}
animateOutline();