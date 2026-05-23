document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS Animation
    if(typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 100,
        });

        // Recalculate animation trigger points once all assets/images are fully loaded
        window.addEventListener('load', () => {
            AOS.refresh();
        });
    }

    // Initialize Lucide Icons
    if(typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Sticky Navbar
    const navbar = document.getElementById('navbar');
    if(navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
                // Change text color for mobile menu icon if not open
                const menuBtn = document.getElementById('mobile-menu-btn');
                if(menuBtn) menuBtn.classList.add('text-gray-800');
            } else {
                navbar.classList.remove('scrolled');
                // Revert text color
                const menuBtn = document.getElementById('mobile-menu-btn');
                if(menuBtn) menuBtn.classList.remove('text-gray-800');
            }
        });
    }

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuClose = document.getElementById('mobile-menu-close');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.add('open');
        });
    }
    
    if (mobileMenuClose && mobileMenu) {
        mobileMenuClose.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
        });
    }

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if(question) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all others
                faqItems.forEach(i => i.classList.remove('active'));
                
                // Toggle current
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });

    // Initialize Swiper if it exists on the page
    if (typeof Swiper !== 'undefined' && document.querySelector('.gallery-swiper')) {
        new Swiper('.gallery-swiper', {
            slidesPerView: 1,
            spaceBetween: 20,
            loop: true,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            breakpoints: {
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 }
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
    }

    // Initialize PhotoSwipe (Lightbox)
    // Simplified setup for static pages
    const lightboxGallery = document.querySelectorAll('.lightbox-link');
    if (lightboxGallery.length > 0 && typeof PhotoSwipeLightbox !== 'undefined') {
        const lightbox = new PhotoSwipeLightbox({
            gallery: '#gallery-container',
            children: 'a',
            pswpModule: () => window.PhotoSwipe
        });
        lightbox.init();
    }
});
