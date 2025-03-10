document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const mainContent = document.querySelector('main');
    const footer = document.querySelector('footer');
    const sidebarItems = document.querySelectorAll('.accordion li > a');
    const sidebarClose = document.getElementById('sidebarClose');

    function updateSidebarVisibility() {
        if (window.innerWidth < 768) {
            sidebar.classList.add('hidden');
            sidebar.classList.remove('open');
        } else {
            sidebar.classList.remove('hidden');
        }
    }

    updateSidebarVisibility();

    // Toggle sidebar visibility on mobile (menu button)
    menuToggle.addEventListener('click', function () {
        if (window.innerWidth < 768) {
            sidebar.classList.toggle('hidden');
            sidebar.classList.toggle('open');
        }
    });

    // Close sidebar when the close button is clicked on mobile
    sidebarClose.addEventListener('click', function () {
        sidebar.classList.remove('open');
        sidebar.classList.add('hidden');
    });

    // Toggle sidebar collapsibility on desktop
    sidebarToggle.addEventListener('click', function () {
        if (window.innerWidth >= 768) {
            sidebar.classList.toggle('collapsed');
        }
    });

    // Close sidebar when clicking outside on mobile or when the close button is clicked
    mainContent.addEventListener('click', function () {
        if (window.innerWidth < 768 && sidebar.classList.contains('open')) {
            sidebar.classList.add('hidden');
            sidebar.classList.remove('open');
        }
    });

    footer.addEventListener('click', function () {
        if (window.innerWidth < 768 && sidebar.classList.contains('open')) {
            sidebar.classList.add('hidden');
            sidebar.classList.remove('open');
        }
    });

    // Handle window resize
    window.addEventListener('resize', updateSidebarVisibility);

    // Handle sidebar item click for collapsible sections
    sidebarItems.forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('data-target'));
            this.parentElement.classList.toggle('active');
            target.classList.toggle('hidden');
        });
    });

    // Lazy Loading for Service Images
    const lazyLoadImages = () => {
        const lazyImages = document.querySelectorAll('.grid-cols-1 img:not(.swiper-slide img)');

        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        console.log(img.src)
                        if (img.dataset.src) {

                            img.src = img.dataset.src;
                            img.classList.add('loaded');
                            observer.unobserve(img);
                        }
                    }
                });
            }, {
                rootMargin: '50px 0px'
            });

            lazyImages.forEach(img => {
                // Store original src
                img.dataset.src = img.src;
                // Replace with placeholder
                img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
                // Add Placeholder class
                img.classList.add('lazy-image');
                // start observing the image
                imageObserver.observe(img);
            });
        }
    };

    // Initialize lazy loading
    lazyLoadImages();

    // SCROLL POP UP
    const popup = document.getElementById('scroll-popup');
    const closeButton = document.getElementById('close-popup');
    let hasBeenShown = false;
    const scrollThreshold = 300;

    // Show/hide popup based on scroll position
    window.addEventListener('scroll', function () {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Show popup when scrolling down past threshold
        if (!hasBeenShown && scrollTop > scrollThreshold) {
            popup.classList.remove('hidden');
            requestAnimationFrame(() => {
                popup.style.transform = 'translateX(0)';
                popup.style.opacity = '1';
                popup.classList.add('show');
            });
            hasBeenShown = true;
        }

        // Hide popup when at top of page
        if (scrollTop < 100) {
            popup.style.transform = 'translateX(-100%)';
            popup.style.opacity = '0';
            popup.classList.remove('show');
            setTimeout(() => {
                popup.classList.add('hidden');
            }, 500);
        }
    });

    // Close button handler
    closeButton.addEventListener('click', function (e) {
        e.stopPropagation();
        popup.classList.remove('show');
        setTimeout(() => {
            popup.classList.add('hidden');
        }, 500);
    });

    // Prevent closing when clicking inside popup
    popup.addEventListener('click', function (e) {
        e.stopPropagation();
    });


    // Function to Toggle the pannel(avis Clients)


    // Get all elements once at the start
    const feedbackToggle = document.getElementById('feedbackToggle');
    const feedbackPanel = document.getElementById('feedbackPanel');
    const feedbackBackdrop = document.getElementById('feedbackBackdrop');
    const closeFeedback = document.getElementById('closeFeedback');

    function openPanel() {
        feedbackPanel.classList.remove('translate-x-full');
        feedbackPanel.classList.add('translate-x-0');
        feedbackBackdrop.classList.remove('opacity-0', 'pointer-events-none');
    }

    function closePanel() {
        feedbackPanel.classList.remove('translate-x-0');
        feedbackPanel.classList.add('translate-x-full');
        feedbackBackdrop.classList.add('opacity-0', 'pointer-events-none');
    }

    feedbackToggle.addEventListener('click', openPanel);
    closeFeedback.addEventListener('click', closePanel);
    feedbackBackdrop.addEventListener('click', closePanel);

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closePanel();
        }
    });

    // Back to top button
    // Get the button
    const backToTopButton = document.getElementById('back-to-top');

    // Show button when page is scrolled up 200px
    function toggleBackToTop() {
        if (window.scrollY > 200) {
            backToTopButton.style.display = 'block';
            // Use setTimeout to ensure display: block is applied before adding visible class
            setTimeout(() => {
                backToTopButton.classList.add('visible');
            }, 10);
        } else {
            backToTopButton.classList.remove('visible');
            // Wait for transition to complete before hiding the button
            setTimeout(() => {
                if (!backToTopButton.classList.contains('visible')) {
                    backToTopButton.style.display = 'none';
                }
            }, 300);
        }
    }

    // Scroll to top when button is clicked
    backToTopButton.addEventListener('click', function (e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Listen for scroll events
    window.addEventListener('scroll', toggleBackToTop);
    // Check initial scroll position
    toggleBackToTop();

});
