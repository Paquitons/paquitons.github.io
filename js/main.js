// main.js

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
            }
        });
    });
    
    // Highlight active nav link based on current page
    const currentPage = window.location.pathname.split('/').pop();

navLinks.forEach(link => {
  const linkPage = link.getAttribute('href').replace('.html', '');
  if (linkPage === currentPage) {
    link.classList.add('active');
  }
});

    // Initialize booking form if exists
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            // Validate required fields
            let isValid = true;
            const inputs = bookingForm.querySelectorAll('.form-control[required]');
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = 'red';
                } else {
                    input.style.borderColor = '';
                }
            });

            if (!isValid) {
                alert('Please fill in all required fields.');
                return;
            }

            // Gather form data
            const formData = new FormData(bookingForm);

            const firstName = formData.get('firstName');
            const lastName = formData.get('lastName');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const propertyType = formData.get('propertyType');
            const address = formData.get('address');
            const city = formData.get('city');
            const state = formData.get('state');
            const zipCode = formData.get('zipCode');
            const serviceType = formData.get('serviceType');
            const urgency = formData.get('urgency');
            const description = formData.get('description');
            const preferredDate = formData.get('preferredDate');
            const preferredTime = formData.get('preferredTime');
            const alternateDate = formData.get('alternateDate');
            const additionalNotes = formData.get('additionalNotes');

            // Prepare plain-text message
            const message = `
First Name: ${firstName}
Last Name: ${lastName}
Email: ${email}
Phone: ${phone}
Property Type: ${propertyType}
Address: ${address}, ${city}, ${state}, ${zipCode}
Service Type: ${serviceType}
Urgency Level: ${urgency}
Description: ${description}
Preferred Date & Time: ${preferredDate} at ${preferredTime}
Alternate Date: ${alternateDate || 'N/A'}
Additional Notes: ${additionalNotes || 'N/A'}
`;

            // Create payload for Web3Forms
            const payload = new FormData();
            payload.append('access_key', 'a5219f00-7197-4fbb-a482-7a1c77f5a484');
            payload.append('name', `${firstName} ${lastName}`);
            payload.append('email', email);
            payload.append('message', message);
            payload.append('subject', `New Booking Request: ${serviceType}`);
            payload.append('replyto', email);

            // Send form
            try {
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: payload
                });

                const result = await response.json();

                if (result.success) {
                    alert('Thank you! Your booking request has been submitted successfully. We will contact you shortly.');
                    bookingForm.reset();
                } else {
                    console.error(result);
                    alert('Oops! Something went wrong while submitting your request. Please try again.');
                }
            } catch (error) {
                console.error(error);
                alert('Network error. Please check your connection and try again.');
            }
        });
    }
});
