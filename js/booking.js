/* ============================================================
   IRON VOLT ELECTRIC — booking.js

   Validation and submission for the booking request form.

   The form carries `novalidate` so we can show our own messages
   next to each field instead of the browser's tooltips. That
   previously meant no validation ran at all: `required` was
   switched off and nothing replaced it, so an empty form would
   post straight to the server. Real validation now runs here.

   Submit feedback is inline: a disabled button with a spinner
   while the request is in flight, and an aria-live error region
   if it fails. The old version used window.alert() for every
   server and network error.
   ============================================================ */

const RECAPTCHA_SITE_KEY = '6LePfFstAAAAAN2BhRaic_0Oei5qy1sNxbY-3X1B';

function getRecaptchaToken() {
  return new Promise((resolve) => {
    if (typeof grecaptcha === 'undefined') {
      resolve(''); // Not loaded (offline, blocked): server treats this as dev mode.
      return;
    }
    grecaptcha.ready(() => {
      grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: 'submit_booking' })
        .then(resolve)
        .catch(() => resolve(''));
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('bookingForm');
  if (!form) return;

  const submitBtn = form.querySelector('button[type="submit"]');
  const btnLabel  = submitBtn.querySelector('.btn-label');
  const alertBox  = document.getElementById('formAlert');
  const alertText = document.getElementById('formAlertText');
  const success   = document.getElementById('formSuccess');

  /* ---------------------------------------------------------
     Date fields cannot be in the past.
     --------------------------------------------------------- */
  const today = new Date().toISOString().split('T')[0];
  form.querySelectorAll('input[type="date"]').forEach((input) => { input.min = today; });

  /* ---------------------------------------------------------
     VALIDATION
     Each rule returns an error string, or '' when the value is
     acceptable. Messages say what to do, not what went wrong.
     --------------------------------------------------------- */
  const rules = {
    firstName:   (v) => v.trim() ? '' : 'Enter your first name.',
    lastName:    (v) => v.trim() ? '' : 'Enter your last name.',
    phone:       (v) => {
      const digits = v.replace(/\D/g, '');
      if (!digits) return 'Enter a phone number we can reach you on.';
      // 10 digits, or 11 starting with a US country code.
      if (digits.length === 10 || (digits.length === 11 && digits[0] === '1')) return '';
      return 'Enter a 10-digit phone number, for example (832) 610-8081.';
    },
    email:       (v) => (!v.trim() || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()))
                          ? '' : 'Check this email address, it looks incomplete.',
    address:     (v) => v.trim().length >= 6 ? '' : 'Enter the street address where the work is needed.',
    serviceType: (v) => v ? '' : 'Choose the service you need. Pick "Other" if none of these fit.',
    description: (v) => v.trim().length >= 10
                          ? '' : 'Tell us briefly what is happening, at least a few words.',
    terms:       (v, field) => field.checked ? '' : 'Tick this box so we can contact you about the appointment.'
  };

  function fieldError(field) {
    const rule = rules[field.name];
    return rule ? rule(field.value, field) : '';
  }

  function showError(field, message) {
    const box = document.getElementById(`${field.id}-error`);
    if (message) {
      field.setAttribute('aria-invalid', 'true');
      if (box) { box.textContent = message; box.classList.add('show'); }
    } else {
      field.removeAttribute('aria-invalid');
      if (box) { box.classList.remove('show'); }
    }
  }

  // Validate on blur, but only re-validate while typing once a
  // field is already showing an error. Flagging a field the
  // moment someone starts typing in it is hostile.
  Object.keys(rules).forEach((name) => {
    const field = form.elements[name];
    if (!field) return;

    field.addEventListener('blur', () => showError(field, fieldError(field)));
    field.addEventListener('input', () => {
      if (field.getAttribute('aria-invalid') === 'true') showError(field, fieldError(field));
    });
    if (field.type === 'checkbox') {
      field.addEventListener('change', () => showError(field, fieldError(field)));
    }
  });

  function validateAll() {
    let firstInvalid = null;
    Object.keys(rules).forEach((name) => {
      const field = form.elements[name];
      if (!field) return;
      const message = fieldError(field);
      showError(field, message);
      if (message && !firstInvalid) firstInvalid = field;
    });
    return firstInvalid;
  }

  /* ---------------------------------------------------------
     SUBMIT STATE
     --------------------------------------------------------- */
  function setBusy(busy) {
    submitBtn.disabled = busy;
    submitBtn.setAttribute('aria-busy', String(busy));
    btnLabel.textContent = busy ? 'Sending request' : 'Request my appointment';
    submitBtn.querySelector('.spinner')?.toggleAttribute('hidden', !busy);
  }

  function showAlert(message) {
    alertText.textContent = message;
    alertBox.classList.add('show');
    alertBox.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }

  function clearAlert() {
    alertBox.classList.remove('show');
  }

  /* ---------------------------------------------------------
     SUBMIT
     --------------------------------------------------------- */
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearAlert();

    const invalid = validateAll();
    if (invalid) {
      showAlert('Some details are missing. Check the highlighted fields below.');
      invalid.focus();
      return;
    }

    setBusy(true);

    try {
      const body = new URLSearchParams(new FormData(form));
      body.set('recaptchaToken', await getRecaptchaToken());

      const response = await fetch(form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        showAlert(data.error || 'We could not send that request. Please call (832) 610-8081 and we will book you in.');
        setBusy(false);
        return;
      }

      // Swap the form for the confirmation and move focus to it,
      // so the outcome is announced rather than silently replacing
      // the page content.
      form.hidden = true;
      success.classList.add('show');
      success.setAttribute('tabindex', '-1');
      success.focus();
      success.scrollIntoView({ block: 'start', behavior: 'smooth' });

    } catch (err) {
      showAlert('We could not reach the server. Check your connection, or call (832) 610-8081 to book directly.');
      setBusy(false);
    }
  });
});
