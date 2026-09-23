/* ============================================================
   IRON VOLT ELECTRIC — form.js
   Validation and submission for the service request form, used
   on /booking and /contact. Replaces booking.js; the rules,
   messages, endpoint and field names are unchanged, so the
   server receives exactly what it always has.

   The form carries `novalidate` so messages appear next to each
   field instead of in browser tooltips. That makes this script
   the only validation there is. Don't remove it.

   reCAPTCHA v3 is loaded the first time someone interacts with
   a form, not on page load: most visitors never touch it, and
   the script is large.
   ============================================================ */

(() => {
  const SITE_KEY = '6LePfFstAAAAAN2BhRaic_0Oei5qy1sNxbY-3X1B';
  const PHONE = '(832) 610-8081';

  /* ---------------------------------------------------------
     reCAPTCHA, on demand
     --------------------------------------------------------- */
  let recaptcha = null;
  function loadRecaptcha() {
    if (recaptcha) return recaptcha;
    recaptcha = new Promise((resolve) => {
      const s = document.createElement('script');
      s.src = `https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`;
      s.async = true;
      s.onload = () => resolve(true);
      s.onerror = () => resolve(false);
      document.head.appendChild(s);
    });
    return recaptcha;
  }

  // Resolves to a token, or '' if reCAPTCHA is blocked or slow;
  // the server treats a missing token the way it always has.
  async function getToken() {
    const loaded = await Promise.race([loadRecaptcha(), new Promise((r) => setTimeout(() => r(false), 5000))]);
    if (!loaded || typeof grecaptcha === 'undefined') return '';
    return new Promise((resolve) => {
      grecaptcha.ready(() => {
        grecaptcha.execute(SITE_KEY, { action: 'submit_booking' }).then(resolve).catch(() => resolve(''));
      });
    });
  }

  /* ---------------------------------------------------------
     Rules. Each returns an error message, or '' when valid.
     Messages say what to do, not what went wrong.
     --------------------------------------------------------- */
  const rules = {
    firstName: (v) => (v.trim() ? '' : 'Enter your first name.'),
    lastName: (v) => (v.trim() ? '' : 'Enter your last name.'),
    phone: (v) => {
      const digits = v.replace(/\D/g, '');
      if (!digits) return 'Enter a phone number we can reach you on.';
      if (digits.length === 10 || (digits.length === 11 && digits[0] === '1')) return '';
      return `Enter a 10-digit phone number, for example ${PHONE}.`;
    },
    email: (v) => (!v.trim() || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())
      ? '' : 'Check this email address; it looks incomplete.'),
    address: (v) => (v.trim().length >= 6 ? '' : 'Enter the street address where the work is needed.'),
    serviceType: (v) => (v ? '' : 'Choose the service you need. Pick “Something else” if none of these fit.'),
    description: (v) => (v.trim().length >= 10 ? '' : 'Tell us briefly what’s happening, at least a few words.'),
    terms: (v, field) => (field.checked ? '' : 'Tick this box so we can contact you about the request.'),
  };

  document.querySelectorAll('[data-request]').forEach((wrapper) => {
    const form = wrapper.querySelector('[data-request-form]');
    const success = wrapper.querySelector('[data-form-success]');
    const alertBox = form.querySelector('[data-form-alert]');
    const alertText = form.querySelector('[data-form-alert-text]');
    const submit = form.querySelector('button[type="submit"]');
    const label = submit.querySelector('[data-button-label]');
    const idleLabel = label.textContent;

    // Dates can't be in the past.
    const today = new Date();
    const iso = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
    form.querySelectorAll('input[type="date"]').forEach((input) => { input.min = iso; });

    form.addEventListener('focusin', loadRecaptcha, { once: true });

    const errorFor = (field) => {
      const rule = rules[field.name];
      return rule ? rule(field.value, field) : '';
    };

    function show(field, message) {
      const box = document.getElementById(`${field.id}-error`);
      if (message) {
        field.setAttribute('aria-invalid', 'true');
        if (box) { box.textContent = message; box.classList.add('is-visible'); }
      } else {
        field.removeAttribute('aria-invalid');
        if (box) { box.textContent = ''; box.classList.remove('is-visible'); }
      }
    }

    // Validate on blur, then live while a field is showing an
    // error. Flagging a field the moment someone starts typing in
    // it is hostile.
    Object.keys(rules).forEach((name) => {
      const field = form.elements[name];
      if (!field) return;
      if (field.type !== 'checkbox') {
        field.addEventListener('blur', () => {
          if (field.value.trim() || field.getAttribute('aria-invalid')) show(field, errorFor(field));
        });
      }
      field.addEventListener('input', () => {
        if (field.getAttribute('aria-invalid') === 'true') show(field, errorFor(field));
      });
      if (field.type === 'checkbox' || field.tagName === 'SELECT') {
        field.addEventListener('change', () => show(field, errorFor(field)));
      }
    });

    function validateAll() {
      let first = null;
      Object.keys(rules).forEach((name) => {
        const field = form.elements[name];
        if (!field) return;
        const message = errorFor(field);
        show(field, message);
        if (message && !first) first = field;
      });
      return first;
    }

    function setBusy(busy) {
      submit.disabled = busy;
      submit.setAttribute('aria-busy', String(busy));
      label.textContent = busy ? 'Sending…' : idleLabel;
      submit.querySelector('.spinner')?.toggleAttribute('hidden', !busy);
    }

    function showAlert(message) {
      alertText.textContent = message;
      alertBox.classList.add('is-visible');
    }

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      alertBox.classList.remove('is-visible');

      const invalid = validateAll();
      if (invalid) {
        showAlert('A few details are missing. Check the highlighted fields.');
        invalid.focus();
        return;
      }

      setBusy(true);
      try {
        const body = new URLSearchParams(new FormData(form));
        body.set('recaptchaToken', await getToken());

        const response = await fetch(form.action, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body,
        });

        if (!response.ok) {
          const data = await response.json().catch(() => ({}));
          showAlert(data.error || `We couldn’t send that request. Please call ${PHONE} and we’ll book you in.`);
          alertBox.scrollIntoView({ block: 'center' });
          setBusy(false);
          return;
        }

        // Swap the form for the confirmation and move focus to it,
        // so the outcome is announced rather than silently changing
        // the page.
        form.hidden = true;
        success.hidden = false;
        success.focus();
        success.scrollIntoView({ block: 'start' });
      } catch {
        showAlert(`We couldn’t reach the server. Check your connection, or call ${PHONE} to book directly.`);
        alertBox.scrollIntoView({ block: 'center' });
        setBusy(false);
      }
    });
  });
})();
