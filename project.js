function playVideo(src) {
  const modal = document.getElementById('videoModal');
  const video = document.getElementById('modalVideo');
  if (!modal || !video) {
    console.error('videoModal ya modalVideo HTML mein nahi mila');
    return;
  }
  video.src = src;
  modal.style.display = 'flex';

  // thoda delay taki transition trigger ho
  setTimeout(() => {
    modal.classList.add('active');
  }, 10);

  video.play().catch(err => console.log('Play error:', err));
}

function closeVideo() {
  const modal = document.getElementById('videoModal');
  const video = document.getElementById('modalVideo');
  if (!modal || !video) return;

  modal.classList.remove('active');

  // transition khatam hone ke baad hi hide kar aur video band kar
  setTimeout(() => {
    video.pause();
    video.removeAttribute('src');
    video.load();
    modal.style.display = 'none';
  }, 350); // CSS transition duration jitna hi time
}

// Esc dabane pe bhi video band ho, aur bahar (dark area) click pe bhi
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeVideo();
});
document.getElementById('videoModal')?.addEventListener('click', (e) => {
  if (e.target.id === 'videoModal') closeVideo();
});

const navItems = document.querySelectorAll('.nav-item');
const currentPage = window.location.pathname.split('/').pop();

navItems.forEach(item => {
  item.classList.remove('active');
  const itemHref = item.getAttribute('href');
  if (itemHref === currentPage || (currentPage === '' && itemHref === 'index.html')) {
    item.classList.add('active');
  }
});

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

// Back button pe blank page na aaye
window.addEventListener('pageshow', (e) => {
  if (e.persisted) document.body.style.opacity = '1';
});

// ---- Custom Cursor ----
const dot = document.querySelector('.cursor-dot');
const outline = document.querySelector('.cursor-outline');

if (dot && outline) {
  let mouseX = 0, mouseY = 0;
  let outlineX = 0, outlineY = 0;
  let started = false;

  dot.style.opacity = 0;
  outline.style.opacity = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (!started) {
      started = true;
      outlineX = mouseX;
      outlineY = mouseY;
      dot.style.opacity = 1;
      outline.style.opacity = 1;
    }

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

  const hoverTargets = document.querySelectorAll('.nav-item, .project-card, .close-btn');
  hoverTargets.forEach(item => {
    item.addEventListener('mouseenter', () => outline.classList.add('hover'));
    item.addEventListener('mouseleave', () => outline.classList.remove('hover'));
  });
}