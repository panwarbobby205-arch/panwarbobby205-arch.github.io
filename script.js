const navItems = document.querySelectorAll('.nav-item');
const currentPage = window.location.pathname.split('/').pop();

navItems.forEach(item => {
  item.classList.remove('active');
  const itemHref = item.getAttribute('href');
  if (itemHref === currentPage || (currentPage === '' && itemHref === 'index.html')) {
    item.classList.add('active');
  }
});

// Smooth page transition on nav click
navItems.forEach(item => {
  item.addEventListener('click', (e) => {
    const href = item.getAttribute('href');
    if (href && !item.classList.contains('active')) {
      e.preventDefault();
      document.body.style.transition = 'opacity 0.25s ease';
      document.body.style.opacity = '0';
      setTimeout(() => {
        window.location.href = href;
      }, 250);
    }
  });
});

const navEntry = performance.getEntriesByType("navigation")[0];
if (navEntry && navEntry.type === "reload") {
  document.body.style.transition = "opacity 0.5s ease";
  document.body.style.opacity = "0";
  setTimeout(() => {
    window.location.href = "index.html";
  }, 500);
}

// ---- Custom Cursor (safe version) ----
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
} else {
  console.warn('Cursor elements (.cursor-dot / .cursor-outline) not found on this page.');
}