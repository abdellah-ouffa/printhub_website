function updatePlaceholder() {
    var emailInput = document.querySelector('footer form input[type="email"]');
    if (window.innerWidth <= 768) {
        emailInput.placeholder = "Votre email";
    } else {
        emailInput.placeholder = "Entrez votre E-mail";
    }
}

// Run on page load
updatePlaceholder();

// Run on window resize
window.addEventListener('resize', updatePlaceholder);