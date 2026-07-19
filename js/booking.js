/* ============================================================
   IRON VOLT ELECTRIC — booking.js
   reCAPTCHA v3 + Form submission
   ============================================================ */

const RECAPTCHA_SITE_KEY = '6LePfFstAAAAAN2BhRaic_0Oei5qy1sNxbY-3X1B';

function getRecaptchaToken() {
  return new Promise((resolve) => {
    if (RECAPTCHA_SITE_KEY === 'YOUR_RECAPTCHA_V3_SITE_KEY' || typeof grecaptcha === 'undefined') {
      resolve(''); // reCAPTCHA not configured yet — server treats this as dev mode
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
  // Set min date to today
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('preferredDate').min = today;
  document.getElementById('altDate').min = today;

  const form = document.getElementById('bookingForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    const origText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';

    try {
      const recaptchaToken = await getRecaptchaToken();

      const formData = new URLSearchParams(new FormData(form));
      formData.set('recaptchaToken', recaptchaToken);

      const response = await fetch(form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData
      });
      if (!response.ok) {
        const err = await response.json();
        console.log('Server error:', err);
        alert(err.error);
        submitBtn.disabled = false;
        submitBtn.textContent = origText;
        return;
      }

      form.style.display = 'none';
      document.getElementById('formSuccess').style.display = 'block';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      alert('Connection error. Please call us at (832) 610-8081 to book directly.');
      submitBtn.disabled = false;
      submitBtn.textContent = origText;
    }
  });
});
