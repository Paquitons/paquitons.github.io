/* ============================================================
   IRON VOLT ELECTRIC — booking.js
   Captcha + Form submission
   ============================================================ */

let captchaA, captchaB;

function refreshCaptcha() {
  captchaA = Math.floor(Math.random() * 9) + 1;
  captchaB = Math.floor(Math.random() * 9) + 1;
  const q = document.getElementById('captchaQuestion');
  if (q) q.textContent = captchaA + ' + ' + captchaB;
  const ans = document.getElementById('captchaAnswer');
  if (ans) ans.value = '';
  const err = document.getElementById('captchaError');
  if (err) err.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
  refreshCaptcha();

  const form = document.getElementById('bookingForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Captcha check
    const answer = parseInt(document.getElementById('captchaAnswer').value, 10);
    if (answer !== captchaA + captchaB) {
      document.getElementById('captchaError').style.display = 'block';
      refreshCaptcha();
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const origText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';

    try {
      const formData = new URLSearchParams(new FormData(form));
      const response = await fetch(form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData
      });
      if (!response.ok) {
        const err = await response.json();
        console.log('Server error:', err);
        alert(err.error);
        return;
      }

      if (response.ok) {
        form.style.display = 'none';
        document.getElementById('formSuccess').style.display = 'block';
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        alert('Something went wrong. Please call us at (832) 610-8081 to book directly.');
        submitBtn.disabled = false;
        submitBtn.textContent = origText;
      }
    } catch (err) {
      alert('Connection error. Please call us at (832) 610-8081 to book directly.');
      submitBtn.disabled = false;
      submitBtn.textContent = origText;
    }
  });
});