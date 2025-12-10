// Basic interactivity for the SNPR Holdings site

window.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const hint = document.getElementById('formHint');
    const submitButton = document.getElementById('submitButton');
    const defaultHint = hint?.textContent || '';

    if (!contactForm) return;

    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const message = formData.get('message');

        const subject = encodeURIComponent('Project enquiry - SNPR Holdings');
        const bodyLines = [
            `Name: ${name}`,
            `Email: ${email}`,
            phone ? `Phone: ${phone}` : null,
            '',
            'Project details:',
            message
        ].filter(Boolean);

        const mailtoLink = `mailto:Rhulani@protonmail.com?subject=${subject}&body=${encodeURIComponent(bodyLines.join('\n'))}`;

        hint.textContent = 'Preparing your email client…';
        submitButton.disabled = true;
        submitButton.textContent = 'Opening email…';

        window.location.href = mailtoLink;

        setTimeout(() => {
            submitButton.disabled = false;
            submitButton.textContent = 'Send enquiry';
            hint.textContent = defaultHint;
        }, 3000);
    });
});
