/* ============================================================
   IRON VOLT ELECTRIC — main.js  v3.0
   ============================================================ */

(function () {
  'use strict';

  /* ── Mobile Menu ──────────────────────────────────────── */
  const toggleBtn = document.querySelector('.mobile-menu-toggle');
  const navMenu   = document.querySelector('.nav-menu');

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', function () {
      const isOpen = navMenu.classList.contains('active');
      navMenu.classList.toggle('active');
      toggleBtn.setAttribute('aria-expanded', String(!isOpen));
      toggleBtn.innerHTML = isOpen ? '&#9776;' : '&#10005;';
    });

    // Close on nav link click
    navMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navMenu.classList.remove('active');
        toggleBtn.setAttribute('aria-expanded', 'false');
        toggleBtn.innerHTML = '&#9776;';
      });
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!navMenu.contains(e.target) && !toggleBtn.contains(e.target)) {
        navMenu.classList.remove('active');
        toggleBtn.setAttribute('aria-expanded', 'false');
        toggleBtn.innerHTML = '&#9776;';
      }
    });
  }

  /* ── FAQ Accordion ────────────────────────────────────── */
  document.querySelectorAll('.faq-q').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const item   = btn.closest('.faq-item');
      const answer = item.querySelector('.faq-a');
      const isOpen = btn.classList.contains('active');

      // Close all
      document.querySelectorAll('.faq-q.active').forEach(function (b) {
        b.classList.remove('active');
        b.setAttribute('aria-expanded', 'false');
        const a = b.closest('.faq-item').querySelector('.faq-a');
        if (a) a.classList.remove('open');
      });

      // Open clicked if it was closed
      if (!isOpen) {
        btn.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
        if (answer) answer.classList.add('open');
      }
    });
  });

  /* ── Card Slideshows ─────────────────────────────────── */
  document.querySelectorAll('.card-slideshow').forEach(function (slideshow) {
    const track  = slideshow.querySelector('.slideshow-track');
    const imgs   = slideshow.querySelectorAll('.slide-img');
    const dotsEl = slideshow.querySelector('.slide-dots');
    const prevBtn = slideshow.querySelector('.slide-prev');
    const nextBtn = slideshow.querySelector('.slide-next');

    if (!track || imgs.length < 2) return;

    let current = 0;
    let timer   = null;

    // Build dots
    if (dotsEl) {
      imgs.forEach(function (_, i) {
        const dot = document.createElement('button');
        dot.className = 'slide-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', 'Slide ' + (i + 1));
        dot.addEventListener('click', function () { goTo(i); resetTimer(); });
        dotsEl.appendChild(dot);
      });
    }

    function goTo(idx) {
      current = (idx + imgs.length) % imgs.length;
      track.style.transform = 'translateX(-' + (current * 100) + '%)';
      if (dotsEl) {
        dotsEl.querySelectorAll('.slide-dot').forEach(function (d, i) {
          d.classList.toggle('active', i === current);
        });
      }
    }

    function resetTimer() {
      clearInterval(timer);
      timer = setInterval(function () { goTo(current + 1); }, 4200);
    }

    if (prevBtn) prevBtn.addEventListener('click', function () { goTo(current - 1); resetTimer(); });
    if (nextBtn) nextBtn.addEventListener('click', function () { goTo(current + 1); resetTimer(); });

    slideshow.addEventListener('mouseenter', function () { clearInterval(timer); });
    slideshow.addEventListener('mouseleave', resetTimer);

    resetTimer();
  });

  /* ── Stat Counters ───────────────────────────────────── */
  const statsSection = document.querySelector('.hero-stats');
  if (statsSection) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          statsSection.querySelectorAll('.stat-num[data-count]').forEach(function (el) {
            const target   = parseFloat(el.dataset.count);
            const suffix   = el.dataset.suffix || '';
            const duration = 1600;
            const start    = performance.now();
            function step(now) {
              const p = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - p, 3);
              const val = target < 10 ? (target * eased).toFixed(1) : Math.round(target * eased);
              el.textContent = val + suffix;
              if (p < 1) requestAnimationFrame(step);
            }
            requestAnimationFrame(step);
          });
          observer.disconnect();
        }
      });
    }, { threshold: 0.4 });
    observer.observe(statsSection);
  }

  /* ── Scroll Reveal ───────────────────────────────────── */
  if ('IntersectionObserver' in window) {
    const revealEls = document.querySelectorAll('.card, .service-card, .why-card, .value-card, .service-detail-card');
    const revealObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          revealObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(18px)';
      el.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
      revealObs.observe(el);
    });
  }

  /* ── Date Inputs: min = today ─────────────────────────── */
  const today = new Date().toISOString().split('T')[0];
  document.querySelectorAll('input[type="date"]').forEach(function (input) {
    input.min = today;
  });

  /* ── Math Captcha ────────────────────────────────────── */
  var captchaA = 0, captchaB = 0;

  function refreshCaptcha() {
    captchaA = Math.floor(Math.random() * 10) + 1;
    captchaB = Math.floor(Math.random() * 10) + 1;
    const q = document.getElementById('captchaQuestion');
    if (q) q.textContent = captchaA + ' + ' + captchaB;
    const inp = document.getElementById('captchaAnswer');
    if (inp) inp.value = '';
  }
  window.refreshCaptcha = refreshCaptcha;
  if (document.getElementById('captchaQuestion')) refreshCaptcha();

  /* ── Booking Form Submit ─────────────────────────────── */
  const bookingForm    = document.getElementById('bookingForm');
  const formSuccess    = document.getElementById('formSuccess');
  const captchaError   = document.getElementById('captchaError');

  if (bookingForm) {
    bookingForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      // Validate captcha
      const answerInput = document.getElementById('captchaAnswer');
      const userAnswer  = parseInt((answerInput ? answerInput.value : ''), 10);
      if (isNaN(userAnswer) || userAnswer !== captchaA + captchaB) {
        if (captchaError) captchaError.style.display = 'block';
        refreshCaptcha();
        if (answerInput) answerInput.focus();
        return;
      }
      if (captchaError) captchaError.style.display = 'none';

      const submitBtn = bookingForm.querySelector('[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting…';
      }

      try {
        const formData = new FormData(bookingForm);
        const payload  = Object.fromEntries(formData.entries());

        const response = await fetch('https://ironvolt.omnemarchy.online/booking', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          bookingForm.style.display = 'none';
          if (formSuccess) formSuccess.style.display = 'block';
        } else {
          throw new Error('Server returned ' + response.status);
        }
      } catch (err) {
        console.error('Booking error:', err);
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Submit Booking Request';
        }
        alert('There was an error submitting your request. Please call us at (832) 610-8081 or try again.');
      }
    });
  }

})();