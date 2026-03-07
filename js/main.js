// Mobile menu toggle — dead simple version
function toggleMenu() {
  var menu = document.querySelector('.nav-menu');
  var btn  = document.querySelector('.mobile-menu-toggle');
  if (!menu || !btn) return;
  if (menu.style.display === 'flex') {
    menu.style.display = 'none';
    btn.textContent = '☰';
  } else {
    menu.style.display = 'flex';
    menu.style.flexDirection = 'column';
    menu.style.width = '100%';
    menu.style.padding = '0.75rem 1rem 1.25rem';
    menu.style.background = '#111e33';
    menu.style.order = '3';
    btn.textContent = '✕';
  }
}

window.onload = function() {
  var btn = document.querySelector('.mobile-menu-toggle');
  if (btn) {
    btn.onclick = toggleMenu;
  }

  // Close menu when any nav link clicked
  var links = document.querySelectorAll('.nav-menu a');
  links.forEach(function(link) {
    link.addEventListener('click', function() {
      var menu = document.querySelector('.nav-menu');
      var b    = document.querySelector('.mobile-menu-toggle');
      if (menu) menu.style.display = 'none';
      if (b)    b.textContent = '☰';
    });
  });
};

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
        msg.textContent = "✅ Booking request sent! We'll be in touch within 24 hours.";
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