/**
 * Main JavaScript file for Pooja Pandya Portfolio
 * Handles navigation, mobile menu, and interactive elements
 */

// DOM Elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

/**
 * Toggle mobile navigation menu
 */
function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Toggle hamburger animation
    const bars = hamburger.querySelectorAll('.bar');
    bars.forEach((bar, index) => {
        if (hamburger.classList.contains('active')) {
            if (index === 0) bar.style.transform = 'rotate(-45deg) translate(-5px, 6px)';
            if (index === 1) bar.style.opacity = '0';
            if (index === 2) bar.style.transform = 'rotate(45deg) translate(-5px, -6px)';
        } else {
            bar.style.transform = '';
            bar.style.opacity = '';
        }
    });
}

/**
 * Close mobile menu when clicking on a nav link
 */
function closeMobileMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    
    // Reset hamburger
    const bars = hamburger.querySelectorAll('.bar');
    bars.forEach(bar => {
        bar.style.transform = '';
        bar.style.opacity = '';
    });
}

/**
 * Handle smooth scrolling for anchor links
 * @param {Event} e - Click event
 */
function handleSmoothScroll(e) {
    const href = e.target.getAttribute('href');
    
    // Check if it's an anchor link (starts with #)
    if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
}

/**
 * Add scroll effect to navigation
 */
function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    const scrolled = window.scrollY > 50;
    
    if (scrolled) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
}

/**
 * Animate project cards on scroll
 */
function animateOnScroll() {
    const cards = document.querySelectorAll('.project-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    cards.forEach(card => {
        // Set initial state for animation
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        observer.observe(card);
    });
}

/**
 * Handle project card clicks for better UX
 */
function handleProjectCardClicks() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Don't trigger if clicking on the actual link
            if (e.target.classList.contains('project-link')) {
                return;
            }
            
            // Find the link within the card and trigger it
            const link = card.querySelector('.project-link');
            if (link) {
                window.location.href = link.getAttribute('href');
            }
        });
        
        // Add keyboard accessibility
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const link = card.querySelector('.project-link');
                if (link) {
                    window.location.href = link.getAttribute('href');
                }
            }
        });
        
        // Make cards focusable
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', `View ${card.querySelector('.project-title').textContent} case study`);
    });
}

/**
 * Initialize lazy loading for images
 */
function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

/**
 * Handle form submissions (for contact form)
 */
function handleFormSubmission() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Basic form validation
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Simple validation
            if (!data.name || !data.email || !data.message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Show success message (replace with actual form handling)
            alert('Thank you for your message! I\'ll get back to you soon.');
            form.reset();
        });
    });
}

/**
 * Initialize Swiper carousels
 */
function initSwiper() {
    // Import Swiper
    if (typeof Swiper !== 'undefined') {
        const hifiSwiper = new Swiper('.hifi-carousel', {
            loop: true,
            autoplay: {
                delay: 6000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            effect: 'fade',
            fadeEffect: {
                crossFade: true,
            },
            speed: 800,
            spaceBetween: 0,
            keyboard: {
                enabled: true,
            },
        });
    }
}

/**
 * Initialize all functionality when DOM is loaded
 */
function init() {
    // Mobile menu functionality
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', toggleMobileMenu);
        
        navLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            closeMobileMenu();
        }
    });
    
    // Smooth scrolling for anchor links
    document.addEventListener('click', handleSmoothScroll);
    
    // Navbar scroll effect
    window.addEventListener('scroll', handleNavbarScroll);
    
    // Animate elements on scroll
    animateOnScroll();
    
    // Project card interactions
    handleProjectCardClicks();
    
    // Swiper initialization
    initSwiper();
    
    // Lazy loading
    initLazyLoading();
    
    // Form handling
    handleFormSubmission();
    
    // Set current year in footer
    const currentYear = new Date().getFullYear();
    const copyrightElements = document.querySelectorAll('.footer-content p');
    copyrightElements.forEach(element => {
        if (element.textContent.includes('2024')) {
            element.textContent = element.textContent.replace('2024', currentYear);
        }
    });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Handle page visibility changes for performance
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations or reduce activity when page is hidden
        document.body.classList.add('page-hidden');
    } else {
        // Resume normal activity when page is visible
        document.body.classList.remove('page-hidden');
    }
});
