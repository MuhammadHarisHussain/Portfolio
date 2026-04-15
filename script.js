/* =============================================
   CUSTOM CURSOR
   ============================================= */
const cursor = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');

let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
});

function animateCursorRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top  = ringY + 'px';
  requestAnimationFrame(animateCursorRing);
}
animateCursorRing();

/* =============================================
   NAVBAR SCROLL BEHAVIOR
   ============================================= */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

/* =============================================
   MOBILE NAV TOGGLE
   ============================================= */
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  mobileNav.classList.toggle('open');
  document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
});

document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    mobileNav.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* =============================================
   TYPEWRITER EFFECT
   ============================================= */
const phrases = [
  'Building smart systems with AI.',
  'Computer Vision & Deep Learning.',
  'NLP, LLMs, and beyond.',
  'AI Student @ SZABIST.',
  'Turning data into intelligence.',
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typewriterEl = document.getElementById('typewriter');

function typeWriter() {
  const current = phrases[phraseIndex];
  const speed = isDeleting ? 40 : 75;

  if (!isDeleting) {
    typewriterEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      isDeleting = true;
      setTimeout(typeWriter, 2200);
      return;
    }
  } else {
    typewriterEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }
  setTimeout(typeWriter, speed);
}
setTimeout(typeWriter, 1000);

/* =============================================
   SCROLL REVEAL
   ============================================= */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* =============================================
   ACTIVE NAV LINK HIGHLIGHT
   ============================================= */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === `#${id}`
          ? 'var(--text)'
          : '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(section => sectionObserver.observe(section));

/* =============================================
   CONTACT FORM
   ============================================= */
function handleFormSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('submitBtn');
  const status = document.getElementById('formStatus');

  btn.textContent = 'Sending...';
  btn.disabled = true;

  // Simulate sending (replace with actual email service like EmailJS or Formspree)
  setTimeout(() => {
    btn.textContent = 'Send Message';
    btn.disabled = false;
    status.textContent = '✓ Message sent! I\'ll get back to you soon.';
    status.className = 'form-status success';
    document.getElementById('contactForm').reset();
    setTimeout(() => { status.textContent = ''; status.className = 'form-status'; }, 5000);
  }, 1500);
}

/* =============================================
   SKILL TAG HOVER STAGGER
   ============================================= */
document.querySelectorAll('.skill-group').forEach(group => {
  const tags = group.querySelectorAll('.skill-tags span');
  group.addEventListener('mouseenter', () => {
    tags.forEach((tag, i) => {
      tag.style.transitionDelay = `${i * 30}ms`;
    });
  });
  group.addEventListener('mouseleave', () => {
    tags.forEach(tag => { tag.style.transitionDelay = '0ms'; });
  });
});

/* =============================================
   PROJECT CARD TILT EFFECT
   ============================================= */
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * -5;
    const rotY = ((x - cx) / cx) * 5;
    card.style.transform = `translateY(-6px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    card.style.transition = 'box-shadow 0.1s, border-color 0.3s';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.4s cubic-bezier(0.4,0,0.2,1), box-shadow 0.3s, border-color 0.3s';
  });
});

/* =============================================
   SMOOTH SCROLL
   ============================================= */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* =============================================
   PARALLAX ORB MOVEMENT
   ============================================= */
document.addEventListener('mousemove', (e) => {
  const orbs = document.querySelectorAll('.orb');
  const moveX = (e.clientX / window.innerWidth - 0.5) * 20;
  const moveY = (e.clientY / window.innerHeight - 0.5) * 20;
  orbs.forEach((orb, i) => {
    const factor = (i + 1) * 0.5;
    orb.style.transform = `translate(${moveX * factor}px, ${moveY * factor}px)`;
  });
});
