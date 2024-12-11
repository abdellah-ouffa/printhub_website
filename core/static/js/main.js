document.addEventListener('DOMContentLoaded', function () {
    // Existing functionality
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const mainContent = document.querySelector('main');
    const footer = document.querySelector('footer');
    const sidebarItems = document.querySelectorAll('.accordion li > a');
    // Add this variable to select the close button element
    const sidebarClose = document.getElementById('sidebarClose');
    console.log(sidebarClose); // Logs the button element
    console.log(getComputedStyle(sidebarClose).display); // Logs the computed display property
    console.log(getComputedStyle(sidebarClose).visibility); // Logs the computed visibility property
    console.log(getComputedStyle(sidebarClose).zIndex); // Logs the computed z-index

    // console.log(sidebarItems)

    function updateSidebarVisibility() {
        if (window.innerWidth < 768) {
            sidebar.classList.add('hidden');
            sidebar.classList.remove('open');
        } else {
            sidebar.classList.remove('hidden');
        }
    }

    // Initial call to set correct state
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

    // NEW ENHANCEMENTS START HERE
    // Lazy Loading for Service Images
    const lazyLoadImages = () => {
        // !Important :The real images URLs are stored in "data-src" not "src" which means the browser doesn't load these original images initially
        // IntersectionObserver monitors the viewport and tells our JavaScript code when each image enters
        // view.Only then does it swap the placeholder (img.src = 'data:image/gif;base64,...') for the real image (img.src img.dataset.src)
        // At this point,the browser fetches and loads  the actual image file only for images that are visible
        const lazyImages = document.querySelectorAll('.grid-cols-1 img:not(.swiper-slide img)');

        if ('IntersectionObserver' in window) {
            // Setting up the Intersection Observer
            // The callback function inside IntersectionObserver( the function that processes entries) only runs when an observed image enters the viewport 
            // Initially,entries is empty because none of the images have intersected the viewport yet.
            // When an image first enters the viewport (based on our root margin),the observer automatically populates the entries list with that imgae entry.This
            // Triggers the callback function,allowing it to process the newly visible image
            // The entries.forEach loop in the callback function processes only those images that have recently come 
            // into view,setting their src and marking them as loaded 
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
                // This options object configures how the observer works
                // rootMarging:"50px 0px" means that the observer will consider an image "intersecting" if it comes
                // within 50px of the viewport vertically.This allows images to load slightly before they actually enter
                // the view port 
                rootMargin: '50px 0px'
            });

            // Preparing each image for Lazy Laoding
            // This loop simply setting up each image for lazy loading and telling the observer to start watching it
            lazyImages.forEach(img => {
                // Store original src
                img.dataset.src = img.src;
                // Replace with placeholder
                img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
                // Add Placeholder class
                // img.classList.add('lazy-image') adds a lazy-image class to  each image 
                // This class could be used for initial styling ,such as adding loading animation or a blur effect to the placeholder
                img.classList.add('lazy-image');
                // start observing the image
                // imageObserver.observe(img) tells the observer to start monitoring this image.As soon as it enters 
                // the viewport (or withing the specified rootMargin),the observer's callback will trigger ,eventually loading the image
                imageObserver.observe(img);
            });
        }
        // Browser Loads All img.src Values:
        // when the page initially loads,the browser sees that each <img> has a src attribute ,even if it's
        // just a tiny 1x1 pixel placeholder image
        // As a result,the browser loads each of these placeholder images(since they are small,this happens very quickly and does not impact the performance significantly)
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
                popup.style.transform = 'translateX(0)'; // Add this
                popup.style.opacity = '1'; // Add this
                popup.classList.add('show');
            });
            hasBeenShown = true;
        }

        // Hide popup when at top of page
        if (scrollTop < 100) {
            popup.style.transform = 'translateX(-100%)'; // Add this
            popup.style.opacity = '0'; // Add this
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
// End of your DOMContentLoaded 
