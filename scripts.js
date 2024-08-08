document.addEventListener('DOMContentLoaded', function () {
    // Dot animation setup
    const dotContainer = document.getElementById('dot-container');

    function createDots(count) {
        for (let i = 0; i < count; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            dot.style.width = `${Math.random() * 10 + 5}px`;
            dot.style.height = dot.style.width;
            dot.style.top = `${Math.random() * 100}%`;
            dot.style.left = `${Math.random() * 100}%`;
            dot.style.animationDuration = `${Math.random() * 5 + 5}s`;
            dotContainer.appendChild(dot);
        }
    }

    createDots(10);

    // Handle form submission for all forms
    const forms = document.querySelectorAll('form');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');

    forms.forEach(form => {
        form.addEventListener('submit', function (event) {
            event.preventDefault();

            fetch(form.action, {
                method: 'POST',
                body: new URLSearchParams(new FormData(form)),
            })
            .then(response => {
                if (response.ok) {
                    form.reset();
                    form.style.display = 'none';
                    successMessage.style.display = 'block';
                } else {
                    throw new Error('Network response was not ok.');
                }
            })
            .catch(error => {
                errorMessage.style.display = 'block';
            });
        });
    });

    // Toggle experience details visibility
    const experienceSelect = document.getElementById('experience');
    const experienceDetails = document.getElementById('experience-details');

    if (experienceSelect) {
        experienceSelect.addEventListener('change', function () {
            experienceDetails.style.display = this.value === 'yes' ? 'block' : 'none';
        });
    }

    // Contact form specific logic
    const contactForm = document.getElementById('contactForm');
    const sendMessageButton = document.getElementById('sendMessageButton');
    const loadingAnimation = document.getElementById('loadingAnimation');

    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();

            // Show loading animation
            loadingAnimation.classList.remove('hidden');
            sendMessageButton.disabled = true;

            // Gather form data
            const formData = new FormData(contactForm);

            // Send form data to Formspree
            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    contactForm.reset();
                    successMessage.style.display = 'block';
                    errorMessage.style.display = 'none';
                } else {
                    throw new Error('Form submission failed');
                }
            })
            .catch(error => {
                errorMessage.style.display = 'block';
                successMessage.style.display = 'none';
            })
            .finally(() => {
                // Hide loading animation
                loadingAnimation.classList.add('hidden');
                sendMessageButton.disabled = false;
            });
        });
    }

    // Menu toggle functionality
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.querySelector('nav ul');

    if (menuToggle) {
        menuToggle.addEventListener('change', function () {
            navMenu.style.transform = this.checked ? 'translateX(0)' : 'translateX(100%)';
        });
    }
});
