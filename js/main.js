/* ============================================================
   IRON VOLT ELECTRIC — main.js
   Loaded on every page, deferred. Everything here enhances
   markup that already works without it: links are links, the
   FAQ is native <details>, and the phone number is always in
   the page.

   1. Navigation drawer and services disclosure
   2. Mobile action bar visibility
   3. Lazy third-party embeds (reviews)
   4. Chat widget position

   Deliberately not here: scroll-reveal animation, carousels,
   header effects on scroll.
   ============================================================ */

(() => {
  const desktopNav = window.matchMedia('(min-width: 75em)');
  const phone = window.matchMedia('(max-width: 44.99em)');

  /* ---------------------------------------------------------
     1. NAVIGATION
     Both toggles are disclosure buttons: aria-expanded is the
     state, CSS reads it. Escape closes whatever is open and
     returns focus to the button that opened it.
     --------------------------------------------------------- */
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('site-nav');
  const menuToggle = document.querySelector('.site-nav__toggle');
  const menuItem = menuToggle?.closest('.site-nav__item');

  const setNav = (open) => {
    if (!navToggle || !nav) return;
    nav.classList.toggle('is-open', open);
    navToggle.setAttribute('aria-expanded', String(open));
  };
  const setMenu = (open) => menuToggle?.setAttribute('aria-expanded', String(open));

  navToggle?.addEventListener('click', () => {
    setNav(navToggle.getAttribute('aria-expanded') !== 'true');
  });
  menuToggle?.addEventListener('click', () => {
    setMenu(menuToggle.getAttribute('aria-expanded') !== 'true');
  });

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (menuToggle?.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      menuToggle.focus();
    } else if (navToggle?.getAttribute('aria-expanded') === 'true') {
      setNav(false);
      navToggle.focus();
    }
  });

  // On desktop, the services panel closes when focus or a click
  // lands anywhere outside it.
  document.addEventListener('click', (e) => {
    if (desktopNav.matches && menuItem && !menuItem.contains(e.target)) setMenu(false);
  });
  menuItem?.addEventListener('focusout', (e) => {
    if (desktopNav.matches && !menuItem.contains(e.relatedTarget)) setMenu(false);
  });

  // Crossing the breakpoint resets both, so nothing is left open
  // behind a layout that no longer shows its toggle.
  desktopNav.addEventListener('change', () => { setNav(false); setMenu(false); });

  /* ---------------------------------------------------------
     2. MOBILE ACTION BAR
     Shown once the page header's own call and request buttons
     have scrolled out of view; hidden again while the footer
     (which has the same links) is on screen, and while someone
     is typing in a form, when the keyboard needs the space.
     --------------------------------------------------------- */
  const bar = document.querySelector('[data-mobile-actions]');
  if (bar && 'IntersectionObserver' in window) {
    const firstSection = document.querySelector('main > section');
    const footer = document.querySelector('.site-footer');
    let pastTop = false;
    let atFooter = false;
    let typing = false;

    const update = () => {
      const show = pastTop && !atFooter && !typing;
      bar.classList.toggle('is-visible', show);
      bar.toggleAttribute('inert', !show);
      document.body.style.paddingBottom = show && phone.matches ? `${bar.offsetHeight}px` : '';
    };

    if (firstSection) {
      new IntersectionObserver(([entry]) => { pastTop = !entry.isIntersecting; update(); })
        .observe(firstSection);
    } else {
      pastTop = true;
    }
    if (footer) {
      new IntersectionObserver(([entry]) => { atFooter = entry.isIntersecting; update(); })
        .observe(footer);
    }
    document.addEventListener('focusin', (e) => {
      typing = e.target.matches('input, textarea, select');
      update();
    });
    document.addEventListener('focusout', () => { typing = false; update(); });
    phone.addEventListener('change', update);
    update();
  }

  /* ---------------------------------------------------------
     3. LAZY EMBEDS
     A third-party script is attached only when its container
     comes within a screen of the viewport. The reviews widget
     alone is heavier than the rest of the page.
     --------------------------------------------------------- */
  const embeds = document.querySelectorAll('[data-lazy-embed]');
  const attach = (el) => {
    const s = document.createElement('script');
    s.src = el.dataset.lazyEmbed;
    s.defer = true;
    document.body.appendChild(s);
    // The widget counts as loaded once it has actually drawn
    // something. If it hasn't after a while (blocked, offline, or
    // not serving this domain), the reserved space collapses and
    // the fallback link to Google is all that remains.
    const target = el.firstElementChild;
    if (target && 'ResizeObserver' in window) {
      const ro = new ResizeObserver(() => {
        if (target.offsetHeight > 40) { el.classList.add('is-loaded'); ro.disconnect(); }
      });
      ro.observe(target);
      setTimeout(() => {
        if (!el.classList.contains('is-loaded')) el.classList.add('is-unavailable');
      }, 10000);
    }
  };
  if (embeds.length) {
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          io.unobserve(entry.target);
          attach(entry.target);
        });
      }, { rootMargin: '100% 0px' });
      embeds.forEach((el) => io.observe(el));
    } else {
      embeds.forEach(attach);
    }
  }

  /* ---------------------------------------------------------
     4. CHAT WIDGET POSITION
     The Rosie widget fixes itself to the bottom-right, where it
     covers the mobile action bar. The element that carries the
     fixed position lives inside the widget's open shadow root,
     so styling the <rosie-widget> host does nothing; we reach in
     and pin the real container above the bar on phones.
     --------------------------------------------------------- */
  const watched = new WeakSet();

  function pin(container) {
    if (phone.matches) container.style.setProperty('bottom', '84px', 'important');
    else container.style.removeProperty('bottom');
  }

  function watch(host) {
    if (watched.has(host) || !host.shadowRoot) return;
    watched.add(host);
    const root = host.shadowRoot;
    const apply = () => {
      const container = root.querySelector('.widget-container');
      if (container) pin(container);
    };
    apply();
    new MutationObserver(apply).observe(root, {
      childList: true, subtree: true, attributes: true, attributeFilter: ['class', 'style'],
    });
  }

  const scan = () => document.querySelectorAll('rosie-widget, rosie-widget-minimized').forEach(watch);
  new MutationObserver(scan).observe(document.documentElement, { childList: true, subtree: true });
  phone.addEventListener('change', () => {
    document.querySelectorAll('rosie-widget, rosie-widget-minimized').forEach((host) => {
      host.shadowRoot?.querySelector('.widget-container') && pin(host.shadowRoot.querySelector('.widget-container'));
    });
  });
  scan();
})();
