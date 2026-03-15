/* ============================================================
   IRON VOLT ELECTRIC — main.js v6.0
   Scroll Reveals, FAQ, Mobile Menu, Slideshows
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Scroll Reveal via IntersectionObserver ---- */
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => observer.observe(el));
  }

  /* ---- Mobile Menu Toggle ---- */
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const isOpen = navMenu.classList.contains('active');
      menuToggle.setAttribute('aria-expanded', isOpen);
      menuToggle.innerHTML = isOpen ? '&#10005;' : '&#9776;';
    });
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.innerHTML = '&#9776;';
      });
    });
  }

  /* ---- FAQ Accordion ---- */
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const answer = item.querySelector('.faq-a');
      const isOpen = btn.classList.contains('active');

      // Close all others
      document.querySelectorAll('.faq-q.active').forEach(other => {
        if (other !== btn) {
          other.classList.remove('active');
          other.setAttribute('aria-expanded', 'false');
          other.closest('.faq-item').querySelector('.faq-a').classList.remove('open');
        }
      });

      // Toggle current
      btn.classList.toggle('active', !isOpen);
      btn.setAttribute('aria-expanded', !isOpen);
      answer.classList.toggle('open', !isOpen);
    });
  });

  /* ---- Slideshows ---- */
  document.querySelectorAll('.card-slideshow').forEach(ss => {
    const track = ss.querySelector('.slideshow-track');
    const slides = ss.querySelectorAll('.slide-img');
    const dotsWrap = ss.querySelector('.slide-dots');
    const prevBtn = ss.querySelector('.slide-prev');
    const nextBtn = ss.querySelector('.slide-next');
    let current = 0;
    const total = slides.length;

    if (!total) return;

    // Build dots
    if (dotsWrap) {
      for (let i = 0; i < total; i++) {
        const dot = document.createElement('span');
        dot.className = 'slide-dot' + (i === 0 ? ' active' : '');
        dot.addEventListener('click', () => goTo(i));
        dotsWrap.appendChild(dot);
      }
    }

    function goTo(idx) {
      current = ((idx % total) + total) % total;
      track.style.transform = `translateX(-${current * 100}%)`;
      if (dotsWrap) {
        dotsWrap.querySelectorAll('.slide-dot').forEach((d, i) => {
          d.classList.toggle('active', i === current);
        });
      }
    }

    if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));

    // Auto-advance every 4s
    let autoTimer = setInterval(() => goTo(current + 1), 4000);
    ss.addEventListener('mouseenter', () => clearInterval(autoTimer));
    ss.addEventListener('mouseleave', () => {
      autoTimer = setInterval(() => goTo(current + 1), 4000);
    });
  });

  /* ---- Navbar shrink on scroll ---- */
  const header = document.querySelector('header');
  if (header) {
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const st = window.scrollY;
      if (st > 80) {
        header.style.boxShadow = '0 4px 40px rgba(0,0,0,0.35)';
      } else {
        header.style.boxShadow = '0 4px 30px rgba(0,0,0,0.3)';
      }
      lastScroll = st;
    }, { passive: true });
  }

});