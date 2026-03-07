// Mobile menu toggle
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.mobile-menu-toggle');
  const menu   = document.querySelector('.nav-menu');

  if (toggle && menu) {
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      menu.classList.toggle('active');
      toggle.textContent = menu.classList.contains('active') ? '✕' : '☰';
    });

    // Close when a nav link is clicked
    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('active');
        toggle.textContent = '☰';
      });
    });

    // Close when clicking outside the nav
    document.addEventListener('click', (e) => {
      if (!menu.contains(e.target) && !toggle.contains(e.target)) {
        menu.classList.remove('active');
        toggle.textContent = '☰';
      }
    });
  }
});

// Booking form feedback
const form = document.getElementById('bookingForm');
const msg  = document.getElementById('formMessage');

if (form && msg) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Sending…';

    try {
      const res  = await fetch(form.action, { method: 'POST', body: new FormData(form) });
      const data = await res.json();
      if (data.success) {
        msg.style.color = '#28a745';
        msg.textContent = '✅ Booking request sent! We'll be in touch within 24 hours.';
        form.reset();
      } else {
        throw new Error('Submission failed');
      }
    } catch {
      msg.style.color = '#dc3545';
      msg.textContent = '❌ Something went wrong. Please call us at (832) 610-8081.';
    }

    btn.disabled = false;
    btn.textContent = 'Submit Booking Request ⚡';
  });
}

// Set minimum date on date pickers to today
document.querySelectorAll('input[type="date"]').forEach(input => {
  input.min = new Date().toISOString().split('T')[0];
});