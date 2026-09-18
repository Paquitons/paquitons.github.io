/* ============================================================
   IRON VOLT ELECTRIC — main.js

   Mobile navigation, FAQ accordion, service-card slideshows.

   Deliberately not here any more:
   - Scroll-reveal observer. Every section header, grid and card
     carried a .reveal class, so the whole site faded up as you
     scrolled and content that was already on screen at load
     started invisible.
   - Header shadow-on-scroll. It ran on every scroll event to
     move a shadow's alpha from 0.30 to 0.35, which nobody can
     see. The header now uses one static border.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------------------------------------------------
     MOBILE NAVIGATION
     --------------------------------------------------------- */
  const toggle = document.querySelector('.menu-toggle');
  const menu   = document.querySelector('.nav-menu');

  if (toggle && menu) {
    const setMenu = (open) => {
      menu.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };

    toggle.addEventListener('click', () => {
      setMenu(!menu.classList.contains('open'));
    });

    menu.addEventListener('click', (e) => {
      if (e.target.closest('a')) setMenu(false);
    });

    // Escape closes the menu and returns focus to the button.
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menu.classList.contains('open')) {
        setMenu(false);
        toggle.focus();
      }
    });

    // Reset when resizing up to the full nav, so the menu can't stay
    // stuck open behind a layout that no longer shows a toggle.
    // Must match the breakpoint that reveals .menu-toggle in the CSS.
    window.matchMedia('(min-width: 861px)').addEventListener('change', (e) => {
      if (e.matches) setMenu(false);
    });
  }

  /* ---------------------------------------------------------
     FAQ ACCORDION
     The button owns aria-expanded; CSS keys the open state off
     that attribute, so markup and presentation cannot drift.
     --------------------------------------------------------- */
  const questions = document.querySelectorAll('.faq-q');

  questions.forEach((btn) => {
    btn.addEventListener('click', () => {
      const isOpen = btn.getAttribute('aria-expanded') === 'true';

      // One answer open at a time, within this FAQ list only.
      const list = btn.closest('.faq');
      if (list) {
        list.querySelectorAll('.faq-q[aria-expanded="true"]').forEach((other) => {
          if (other !== btn) other.setAttribute('aria-expanded', 'false');
        });
      }

      btn.setAttribute('aria-expanded', String(!isOpen));
    });
  });

  /* ---------------------------------------------------------
     SLIDESHOWS
     Dots are rendered as real buttons with aria-current so they
     are reachable by keyboard and meaningful to assistive tech.
     Auto-advance pauses on hover and on focus, and never starts
     for visitors who have asked for reduced motion.
     --------------------------------------------------------- */
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  document.querySelectorAll('.slideshow').forEach((show) => {
    const track  = show.querySelector('.slideshow-track');
    const slides = show.querySelectorAll('img');
    const dots   = show.querySelector('.slide-dots');
    const total  = slides.length;
    if (!track || total < 2) return;

    let index = 0;
    let timer = null;

    // Build one dot per slide.
    const buttons = [];
    if (dots) {
      for (let i = 0; i < total; i++) {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.setAttribute('aria-label', `Show image ${i + 1} of ${total}`);
        dot.setAttribute('aria-current', i === 0 ? 'true' : 'false');
        dot.addEventListener('click', () => { goTo(i); stop(); });
        dots.appendChild(dot);
        buttons.push(dot);
      }
    }

    function goTo(next) {
      index = ((next % total) + total) % total;
      track.style.transform = `translateX(-${index * 100}%)`;
      buttons.forEach((dot, i) => {
        dot.setAttribute('aria-current', i === index ? 'true' : 'false');
      });
    }

    function start() {
      if (reduceMotion.matches || timer) return;
      timer = setInterval(() => goTo(index + 1), 5000);
    }
    function stop() {
      clearInterval(timer);
      timer = null;
    }

    show.querySelector('.slide-prev')?.addEventListener('click', () => { goTo(index - 1); stop(); });
    show.querySelector('.slide-next')?.addEventListener('click', () => { goTo(index + 1); stop(); });

    show.addEventListener('mouseenter', stop);
    show.addEventListener('mouseleave', start);
    show.addEventListener('focusin', stop);

    // Stop cycling entirely once the card scrolls out of view.
    new IntersectionObserver((entries) => {
      entries[0].isIntersecting ? start() : stop();
    }, { threshold: 0.4 }).observe(show);
  });

  /* ---------------------------------------------------------
     CHAT WIDGET POSITION
     The Rosie widget fixes itself to the bottom-right, where it
     covers the sticky mobile CTA. The element that actually
     carries the fixed position lives inside the widget's open
     shadow root, so styling the <rosie-widget> host does
     nothing; we have to reach in and pin the real container.
     --------------------------------------------------------- */
  const isPhone = window.matchMedia('(max-width: 768px)');
  const watched = new WeakSet();

  function pin(container) {
    if (isPhone.matches) container.style.setProperty('bottom', '84px', 'important');
    else container.style.removeProperty('bottom');
  }

  function watch(host) {
    if (watched.has(host) || !host.shadowRoot) return;
    watched.add(host);
    const root  = host.shadowRoot;
    const apply = () => {
      const container = root.querySelector('.widget-container');
      if (container) pin(container);
    };
    apply();
    new MutationObserver(apply).observe(root, {
      childList: true, subtree: true, attributes: true, attributeFilter: ['class', 'style']
    });
  }

  function scan() {
    document.querySelectorAll('rosie-widget, rosie-widget-minimized').forEach(watch);
  }

  new MutationObserver(scan).observe(document.documentElement, { childList: true, subtree: true });
  isPhone.addEventListener('change', scan);
  scan();

});
