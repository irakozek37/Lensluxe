// LENSLUXE V2 - Modern Interactive Features


document.addEventListener('DOMContentLoaded', function() {
   
    // === MOBILE MENU ===
    const burger = document.getElementById('burger');
    const mobileMenu = document.getElementById('mobileMenu');
   
    if (burger) {
        burger.addEventListener('click', function() {
            this.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });
    }
   
    // Close mobile menu when clicking a link
    const mobileLinks = mobileMenu?.querySelectorAll('a');
    mobileLinks?.forEach(link => {
        link.addEventListener('click', () => {
            burger.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });
   
    // === THEME TOGGLE ===
    const themeBtn = document.getElementById('themeBtn');
    const body = document.body;
   
    // Check saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
        if (themeBtn) themeBtn.querySelector('.theme-icon').textContent = '☾';
    }
   
    if (themeBtn) {
        themeBtn.addEventListener('click', function() {
            body.classList.toggle('dark-theme');
            const icon = this.querySelector('.theme-icon');
           
            if (body.classList.contains('dark-theme')) {
                icon.textContent = '☾';
                localStorage.setItem('theme', 'dark');
            } else {
                icon.textContent = '☀';
                localStorage.setItem('theme', 'light');
            }
        });
    }
   
    // === HERO SLIDER ===
    const slides = document.querySelectorAll('.hero-slide');
    const slidePrev = document.getElementById('slidePrev');
    const slideNext = document.getElementById('slideNext');
    const currentSlideEl = document.querySelector('.current-slide');
   
    if (slides.length > 0) {
        let currentSlide = 0;
        const totalSlides = slides.length;
       
        function showSlide(n) {
            slides.forEach(slide => slide.classList.remove('active'));
            currentSlide = (n + totalSlides) % totalSlides;
            slides[currentSlide].classList.add('active');
           
            if (currentSlideEl) {
                currentSlideEl.textContent = String(currentSlide + 1).padStart(2, '0');
            }
        }
       
        function nextSlide() {
            showSlide(currentSlide + 1);
        }
       
        function prevSlide() {
            showSlide(currentSlide - 1);
        }
       
        if (slidePrev) slidePrev.addEventListener('click', prevSlide);
        if (slideNext) slideNext.addEventListener('click', nextSlide);
       
        // Auto advance
        let autoSlide = setInterval(nextSlide, 5000);
       
        // Pause on hover
        const heroSlider = document.getElementById('heroSlider');
        if (heroSlider) {
            heroSlider.addEventListener('mouseenter', () => clearInterval(autoSlide));
            heroSlider.addEventListener('mouseleave', () => {
                autoSlide = setInterval(nextSlide, 5000);
            });
        }
    }
   
    // === SCROLL REVEAL ===
    const revealElements = document.querySelectorAll('[data-reveal]');
   
    const revealOnScroll = () => {
        revealElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const windowHeight = window.innerHeight;
           
            if (rect.top < windowHeight * 0.85) {
                el.classList.add('revealed');
            }
        });
    };
   
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check
   
    // === ANIMATED COUNTER ===
    const statNumbers = document.querySelectorAll('.stat-number');
    let counted = false;
   
    const animateCount = (el) => {
        const target = parseInt(el.getAttribute('data-count'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
       
        const updateCount = () => {
            current += increment;
            if (current < target) {
                el.textContent = Math.floor(current) + '+';
                requestAnimationFrame(updateCount);
            } else {
                el.textContent = target + '+';
            }
        };
       
        updateCount();
    };
   
    const checkCounters = () => {
        if (!counted && statNumbers.length > 0) {
            const firstStat = statNumbers[0];
            const rect = firstStat.getBoundingClientRect();
           
            if (rect.top < window.innerHeight * 0.85) {
                statNumbers.forEach(animateCount);
                counted = true;
            }
        }
    };
   
    window.addEventListener('scroll', checkCounters);
   
    // === SMOOTH SCROLL ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 100;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
   
    // === GALLERY FILTER (for gallery page) ===
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
   
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
           
            const filter = this.getAttribute('data-filter');
           
            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.9)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
   
    // === LIGHTBOX (for gallery page) ===
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
   
    let currentLightboxIndex = 0;
    const allImages = [];
   
    galleryItems.forEach((item, index) => {
        const img = item.querySelector('img');
        if (img) {
            allImages.push(img.src);
            item.addEventListener('click', () => {
                openLightbox(index);
            });
        }
    });
   
    function openLightbox(index) {
        if (lightbox && allImages[index]) {
            currentLightboxIndex = index;
            lightboxImg.src = allImages[index];
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
   
    function closeLightbox() {
        if (lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
   
    function showPrevImage() {
        currentLightboxIndex = (currentLightboxIndex - 1 + allImages.length) % allImages.length;
        lightboxImg.src = allImages[currentLightboxIndex];
    }
   
    function showNextImage() {
        currentLightboxIndex = (currentLightboxIndex + 1) % allImages.length;
        lightboxImg.src = allImages[currentLightboxIndex];
    }
   
    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxPrev) lightboxPrev.addEventListener('click', showPrevImage);
    if (lightboxNext) lightboxNext.addEventListener('click', showNextImage);
   
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
    }
   
    // Keyboard controls
    document.addEventListener('keydown', (e) => {
        if (lightbox?.classList.contains('active')) {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') showPrevImage();
            if (e.key === 'ArrowRight') showNextImage();
        }
    });
   
    // === FORM VALIDATION (for contact page) ===
    const contactForm = document.getElementById('contactForm');
   
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
           
            let isValid = true;
            const formGroups = this.querySelectorAll('.form-group');
           
            formGroups.forEach(group => {
                const input = group.querySelector('input, textarea, select');
                const error = group.querySelector('.error-msg');
               
                if (input.hasAttribute('required') && !input.value.trim()) {
                    group.classList.add('error');
                    if (error) error.textContent = 'This field is required';
                    isValid = false;
                } else if (input.type === 'email' && input.value) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(input.value)) {
                        group.classList.add('error');
                        if (error) error.textContent = 'Please enter a valid email';
                        isValid = false;
                    }
                } else {
                    group.classList.remove('error');
                }
            });
           
            if (isValid) {
                const successMsg = document.getElementById('formSuccess');
                if (successMsg) {
                    contactForm.style.display = 'none';
                    successMsg.style.display = 'block';
                   
                    setTimeout(() => {
                        contactForm.reset();
                        contactForm.style.display = 'grid';
                        successMsg.style.display = 'none';
                    }, 3000);
                }
            }
        });
       
        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                const group = this.closest('.form-group');
                if (group?.classList.contains('error') && this.value.trim()) {
                    group.classList.remove('error');
                }
            });
        });
    }
   
    // === FAQ ACCORDION (for services page) ===
    const faqItems = document.querySelectorAll('.faq-item');
   
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
       
        if (question) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
               
                faqItems.forEach(faq => faq.classList.remove('active'));
               
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });
   
    console.log('LensLuxe V2 loaded successfully! 📸');
});

