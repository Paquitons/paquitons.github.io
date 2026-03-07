// Mobile menu toggle — animated dropdown
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

window.onload = function() {
  var btn = document.querySelector('.mobile-menu-toggle');
  if (btn) btn.onclick = toggleMenu;

  // Close menu when any nav link is clicked
  document.querySelectorAll('.nav-menu a').forEach(function(link) {
    link.addEventListener('click', function() {
      var menu = document.querySelector('.nav-menu');
      var b    = document.querySelector('.mobile-menu-toggle');
      if (menu) menu.classList.remove('active');
      if (b)    b.textContent = '☰';
    });
  });

  // Close when clicking outside
  document.addEventListener('click', function(e) {
    var menu = document.querySelector('.nav-menu');
    var btn  = document.querySelector('.mobile-menu-toggle');
    if (!menu || !btn) return;
    if (!menu.contains(e.target) && !btn.contains(e.target)) {
      menu.classList.remove('active');
      btn.textContent = '☰';
    }
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
      const formData = Object.fromEntries(new FormData(form).entries());
      const res  = await fetch('https://ironvolt.omnemarchy.online/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
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