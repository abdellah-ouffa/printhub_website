
document.addEventListener('DOMContentLoaded', function () {
    if (typeof Swal === 'undefined') {
        console.error('SweetAlert2 library failed to load.');
        return;
    }
    const form = document.getElementById('contact-form');
    const responseMessage = document.getElementById('response-message');

    form.addEventListener('submit', async function (event) {
        event.preventDefault(); // Prevent the default form submission (page reload)

        const formData = new FormData(form);

        // Show loading message
        responseMessage.innerHTML = 'Submitting...';

        try {
            // Make the AJAX request using Fetch API
            const response = await fetch('/contact/submit/', {
                method: 'POST',
                body: formData,
                headers: {
                    'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]').value
                }
            });

            const result = await response.json();

            if (response.ok) {
                // Display success message using SweetAlert2
                console.log('SweetAlert is about to show...');
                Swal.fire({
                    title: 'Success!',
                    text: result.message,
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Great!'
                }).then(() => {
                    // Redirect after confirmation
                    window.location.href = '/'; // Redirect to the homepage or another page
                });

                form.reset(); // Reset the form
            } else {
                // Display error message using SweetAlert2
                Swal.fire({
                    title: 'Error!',
                    text: result.error || 'Something went wrong!',
                    icon: 'error',
                    confirmButtonColor: '#d33',
                    confirmButtonText: 'Try Again'
                });
            }
        } catch (error) {
            // Handle unexpected errors
            Swal.fire({
                title: 'Error!',
                text: error.message,
                icon: 'error',
                confirmButtonColor: '#d33',
                confirmButtonText: 'Try Again'
            });
        } finally {
            responseMessage.innerHTML = ''; // Clear the loading message
        }
    });
});
