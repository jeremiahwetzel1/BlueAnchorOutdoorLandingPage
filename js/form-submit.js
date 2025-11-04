// js/form-submit.js
// Simple AJAX submit for Formspree with UI feedback
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  if (!form) return;
  const status = document.getElementById('formStatus');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      status.textContent = 'Please fill out the required fields.';
      status.style.color = '#ff6b6b';
      return;
    }

    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.style.opacity = '0.7';
    status.textContent = 'Sending...';
    status.style.color = '#fff';

    const data = new FormData(form);
    try {
      const resp = await fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if (resp.ok) {
        status.textContent = 'Thanks — message sent! We usually reply within an hour.';
        status.style.color = '#10b981';
        form.reset();
      } else {
        const json = await resp.json().catch(() => ({}));
        status.textContent = json?.error || 'Problem sending your message.';
        status.style.color = '#ff6b6b';
      }
    } catch (err) {
      status.textContent = 'Network error — please try again later.';
      status.style.color = '#ff6b6b';
    } finally {
      submitButton.disabled = false;
      submitButton.style.opacity = '1';
      setTimeout(() => { status.textContent = ''; }, 7000);
    }
  });
});
