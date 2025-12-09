// Basic interactivity for the SNPR Holdings site

window.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const hint = document.getElementById('formHint');

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

        const mailtoLink = `mailto:rhutaning@gmail.com?subject=${subject}&body=${encodeURIComponent(bodyLines.join('\n'))}`;

        hint.textContent = 'Opening your email client…';
        window.location.href = mailtoLink;
    });
});
