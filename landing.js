window.addEventListener('load', () => {
  const loader = document.getElementById('pageLoader');
  if (loader) {
    setTimeout(() => {
      loader.style.opacity = '0';
      setTimeout(() => loader.remove(), 400);
    }, 200);
  }
});

const exitBtn = document.getElementById('exitBtn');
if (exitBtn) {
  exitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    document.body.style.transition = 'opacity 0.3s ease';
    document.body.style.opacity = '0';
    setTimeout(() => {
      window.location.href = 'contact.html';
    }, 300);
  });
}

const navEntry = performance.getEntriesByType("navigation")[0];
if (navEntry && navEntry.type === "reload") {
  window.location.href = "index.html";
}

// ---- Custom Cursor ----
const dot = document.querySelector('.cursor-dot');
const outline = document.querySelector('.cursor-outline');

if (dot && outline) {
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

  // hover-grow effect on nav/menu items
  const hoverTargets = document.querySelectorAll('.menu-item, .nav-item');
  hoverTargets.forEach(item => {
    item.addEventListener('mouseenter', () => outline.classList.add('hover'));
    item.addEventListener('mouseleave', () => outline.classList.remove('hover'));
  });
} else {
  console.warn('Cursor elements not found — add .cursor-dot and .cursor-outline divs to this page');
}
