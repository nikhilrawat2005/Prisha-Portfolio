// ============================================
// Scroll reveal — IntersectionObserver, fires once
// ============================================
const revealEls = document.querySelectorAll('[data-reveal]');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });
revealEls.forEach(el => revealObserver.observe(el));

// ============================================
// Rail nav — active dot follows section in view,
// click scrolls to section
// ============================================
const railButtons = document.querySelectorAll('.rail button');
const sections = Array.from(railButtons).map(b => document.getElementById(b.dataset.target));

railButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    document.getElementById(btn.dataset.target).scrollIntoView({ behavior: 'smooth' });
  });
});

function updateActiveRail() {
  const scrollPos = window.scrollY + window.innerHeight * 0.42;
  let currentId = 'hero';

  for (let i = 0; i < sections.length; i++) {
    const s = sections[i];
    if (!s) continue;
    const top = s.offsetTop;
    const height = s.offsetHeight;
    if (scrollPos >= top && scrollPos < top + height) {
      currentId = s.id;
      break;
    } else if (scrollPos >= top) {
      currentId = s.id;
    }
  }

  // If reached near bottom of page, activate last section (contact)
  if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 60) {
    currentId = 'contact';
  }

  railButtons.forEach(b => b.classList.toggle('active', b.dataset.target === currentId));
}

window.addEventListener('scroll', updateActiveRail, { passive: true });
window.addEventListener('resize', updateActiveRail, { passive: true });
updateActiveRail();

// ============================================
// Lightbox — cards open a focused view of the
// project; video / image / pair all supported
// ============================================
const lightbox = document.getElementById('lightbox');
const lightboxMedia = document.getElementById('lightboxMedia');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxDesc = document.getElementById('lightboxDesc');
const lightboxClose = document.getElementById('lightboxClose');

function openLightbox(card){
  const type = card.dataset.type;
  lightboxMedia.innerHTML = '';
  lightboxMedia.classList.toggle('is-pair', type === 'pair');

  if (type === 'video') {
    const video = document.createElement('video');
    video.src = card.dataset.src;
    video.poster = card.dataset.poster || '';
    video.controls = true;
    video.autoplay = true;
    video.playsInline = true;
    lightboxMedia.appendChild(video);
  } else if (type === 'pair') {
    const img1 = document.createElement('img');
    img1.src = card.dataset.src;
    img1.alt = card.dataset.title + ' variant 1';
    const img2 = document.createElement('img');
    img2.src = card.dataset.src2;
    img2.alt = card.dataset.title + ' variant 2';
    lightboxMedia.appendChild(img1);
    lightboxMedia.appendChild(img2);
  } else {
    const img = document.createElement('img');
    img.src = card.dataset.src;
    img.alt = card.dataset.title;
    lightboxMedia.appendChild(img);
  }

  lightboxTitle.textContent = card.dataset.title;
  lightboxDesc.textContent = card.dataset.desc;

  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeLightbox(){
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  const video = lightboxMedia.querySelector('video');
  if (video) video.pause();
  setTimeout(() => { lightboxMedia.innerHTML = ''; }, 400);
}

document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', () => openLightbox(card));
});
lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });
