/* ============================================================
   IRON VOLT ELECTRIC — main.js
   ============================================================ */

// ── Mobile menu toggle ────────────────────────────────────────
function toggleMenu() {
  var menu = document.querySelector('.nav-menu');
  var btn  = document.querySelector('.mobile-menu-toggle');
  if (!menu || !btn) return;
  var isOpen = menu.classList.contains('active');
  if (isOpen) {
    menu.classList.remove('active');
    btn.textContent = '☰';
  } else {
    menu.classList.add('active');
    btn.textContent = '✕';
  }
}

window.addEventListener('DOMContentLoaded', function () {

  // Re-bind toggle in case inline handler didn't fire
  var btn = document.querySelector('.mobile-menu-toggle');
  if (btn) btn.onclick = toggleMenu;

  // Close menu when any nav link clicked
  document.querySelectorAll('.nav-menu a').forEach(function (link) {
    link.addEventListener('click', function () {
      var m = document.querySelector('.nav-menu');
      var b = document.querySelector('.mobile-menu-toggle');
      if (m) m.classList.remove('active');
      if (b) b.textContent = '☰';
    });
  });

  // Close when clicking outside
  document.addEventListener('click', function (e) {
    var m = document.querySelector('.nav-menu');
    var b = document.querySelector('.mobile-menu-toggle');
    if (!m || !b) return;
    if (!m.contains(e.target) && !b.contains(e.target)) {
      m.classList.remove('active');
      b.textContent = '☰';
    }
  });

  // ── Set minimum date on date pickers ──────────────────────
  document.querySelectorAll('input[type="date"]').forEach(function (input) {
    input.min = new Date().toISOString().split('T')[0];
  });

  // ── Math captcha ──────────────────────────────────────────
  var mathA, mathB, mathCorrect;
  function generateMath() {
    mathA = Math.floor(Math.random() * 10) + 1;
    mathB = Math.floor(Math.random() * 10) + 1;
    mathCorrect = mathA + mathB;
    var lbl = document.getElementById('mathQuestion');
    if (lbl) lbl.textContent = 'Quick Check: What is ' + mathA + ' + ' + mathB + '?  *';
  }
  generateMath();

  // ── Booking form submission ───────────────────────────────
  var form = document.getElementById('bookingForm');
  var msg  = document.getElementById('formMessage');

  if (form && msg) {
    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      var answerInput = document.getElementById('mathAnswer');
      var mathError   = document.getElementById('mathError');

      if (parseInt(answerInput.value) !== mathCorrect) {
        mathError.style.display = 'block';
        answerInput.value = '';
        generateMath();
        return;
      }
      mathError.style.display = 'none';

      var submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';

      try {
        var formData = Object.fromEntries(new FormData(form).entries());
        var res = await fetch('https://ironvolt.omnemarchy.online/booking', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        var data = await res.json();
        if (data.success) {
          msg.style.color = '#28a745';
          msg.textContent = "Booking request sent! We'll be in touch within 24 hours.";
          form.reset();
          generateMath();
        } else {
          throw new Error('Server error');
        }
      } catch (err) {
        msg.style.color = '#dc3545';
        msg.textContent = 'Something went wrong. Please call us at (832) 610-8081.';
      }

      submitBtn.disabled = false;
      submitBtn.textContent = 'Submit Booking Request';
    });
  }

  // ── Service card slideshows ───────────────────────────────
  document.querySelectorAll('.card-slideshow').forEach(function (slideshow) {
    var track    = slideshow.querySelector('.slideshow-track');
    var imgs     = slideshow.querySelectorAll('.slide-img');
    var dotsWrap = slideshow.querySelector('.slide-dots');
    var total    = imgs.length;
    var current  = 0;
    var timer;

    if (!track || total === 0) return;

    // Build dots
    imgs.forEach(function (_, i) {
      var d = document.createElement('span');
      d.className = 'slide-dot' + (i === 0 ? ' active' : '');
      d.addEventListener('click', function () { goTo(i); });
      dotsWrap.appendChild(d);
    });

    function goTo(n) {
      current = ((n % total) + total) % total;
      track.style.transform = 'translateX(-' + (current * 100) + '%)';
      slideshow.querySelectorAll('.slide-dot').forEach(function (d, i) {
        d.classList.toggle('active', i === current);
      });
      resetTimer();
    }

    function resetTimer() {
      clearInterval(timer);
      timer = setInterval(function () { goTo(current + 1); }, 4200);
    }

    var prevBtn = slideshow.querySelector('.slide-prev');
    var nextBtn = slideshow.querySelector('.slide-next');
    if (prevBtn) prevBtn.addEventListener('click', function () { goTo(current - 1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { goTo(current + 1); });

    slideshow.addEventListener('mouseenter', function () { clearInterval(timer); });
    slideshow.addEventListener('mouseleave', resetTimer);

    // Touch / swipe support
    var touchStartX = 0;
    slideshow.addEventListener('touchstart', function (e) {
      touchStartX = e.changedTouches[0].clientX;
    }, { passive: true });
    slideshow.addEventListener('touchend', function (e) {
      var diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1);
    }, { passive: true });

    resetTimer();
  });

  // ── Scroll-reveal for cards ───────────────────────────────
  if ('IntersectionObserver' in window) {
    var revealEls = document.querySelectorAll(
      '.service-card, .why-card, .value-card, .process-step, .card'
    );
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(22px)';
      el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
      observer.observe(el);
    });
  }

});