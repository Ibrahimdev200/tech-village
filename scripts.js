document.addEventListener('DOMContentLoaded', function () {
    const forms = document.querySelectorAll('form');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');
    const dotContainer = document.getElementById('dot-container');

    // Handle form submission for all forms
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

    // Create dot animations
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

    // Toggle experience details
    const experienceSelect = document.getElementById('experience');
    const experienceDetails = document.getElementById('experience-details');
    
    if (experienceSelect) {
        experienceSelect.addEventListener('change', function () {
            experienceDetails.style.display = this.value === 'yes' ? 'block' : 'none';
        });
    }
});
