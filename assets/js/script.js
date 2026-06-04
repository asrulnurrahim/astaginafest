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
            spaceBetween: 16,
            loop: false,
            rewind: true,
            watchSlidesProgress: true,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            breakpoints: {
                480: { slidesPerView: 2, spaceBetween: 16 },
                768: { slidesPerView: 3, spaceBetween: 16 },
                1024: { slidesPerView: 4, spaceBetween: 16 },
                1280: { slidesPerView: 5, spaceBetween: 20 }
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

    // === PREMIUM LIGHTBOX IMAGE PREVIEW MODAL ===
    // Select all potential previewable images (Gallery & Merchandise)
    const previewableImages = Array.from(document.querySelectorAll('.img-wrapper img, .grid-cols-2 img, .grid-cols-3 img, .lightbox-link img'))
        .filter(img => !img.closest('[onclick]'));
    
    if (previewableImages.length > 0) {
        // Create Lightbox Container DOM Elements
        const lightboxOverlay = document.createElement('div');
        lightboxOverlay.className = 'fixed inset-0 z-[9999] bg-black/90 backdrop-blur-md flex flex-col items-center justify-center opacity-0 pointer-events-none transition-all duration-300 ease-in-out';
        lightboxOverlay.id = 'premium-lightbox';

        // Close Button
        const closeBtn = document.createElement('button');
        closeBtn.className = 'absolute top-6 right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all duration-300 focus:outline-none';
        closeBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
        
        // Image Element
        const lightboxImg = document.createElement('img');
        lightboxImg.className = 'max-w-[90%] max-h-[75vh] md:max-h-[80vh] rounded-xl object-contain shadow-2xl scale-95 transition-all duration-300 ease-out border border-white/10';
        
        // Caption Text
        const lightboxCaption = document.createElement('p');
        lightboxCaption.className = 'text-white/90 text-center font-medium mt-6 text-base md:text-lg tracking-wide max-w-[80%] uppercase font-[\'Outfit\']';

        // Assemble Lightbox DOM
        lightboxOverlay.appendChild(closeBtn);
        lightboxOverlay.appendChild(lightboxImg);
        lightboxOverlay.appendChild(lightboxCaption);
        document.body.appendChild(lightboxOverlay);

        // Open Lightbox Function
        const openLightbox = (imgSrc, imgAlt) => {
            lightboxImg.src = imgSrc;
            lightboxCaption.textContent = imgAlt || 'Detail Produk';
            
            // Show overlay
            lightboxOverlay.classList.remove('pointer-events-none', 'opacity-0');
            lightboxOverlay.classList.add('opacity-100');
            
            // Zoom-in animation for image
            setTimeout(() => {
                lightboxImg.classList.remove('scale-95');
                lightboxImg.classList.add('scale-100');
            }, 50);

            // Prevent scrolling on background
            document.body.classList.add('overflow-hidden');
        };

        // Close Lightbox Function
        const closeLightbox = () => {
            // Zoom-out image
            lightboxImg.classList.remove('scale-100');
            lightboxImg.classList.add('scale-95');
            
            // Fade-out overlay
            lightboxOverlay.classList.remove('opacity-100');
            lightboxOverlay.classList.add('opacity-0', 'pointer-events-none');
            
            // Allow scrolling again
            document.body.classList.remove('overflow-hidden');
        };

        // Bind Click Events
        previewableImages.forEach(img => {
            img.classList.add('cursor-pointer');
            
            // Subtle premium zoom-in hover styling on image itself
            img.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), filter 0.4s ease';
            img.addEventListener('mouseenter', () => {
                img.style.filter = 'brightness(1.05)';
            });
            img.addEventListener('mouseleave', () => {
                img.style.filter = 'none';
            });

            img.addEventListener('click', (e) => {
                e.preventDefault();
                openLightbox(img.src, img.alt);
            });
        });

        // Close when clicking Close Button or dark backdrop
        closeBtn.addEventListener('click', closeLightbox);
        lightboxOverlay.addEventListener('click', (e) => {
            if (e.target === lightboxOverlay) {
                closeLightbox();
            }
        });

        // Close when pressing Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !lightboxOverlay.classList.contains('pointer-events-none')) {
                closeLightbox();
            }
        });
    }
});
