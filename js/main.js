/**
 * Pooja Pandya Portfolio — Main JavaScript
 * Handles navigation, mobile menu, scroll reveals, and interactions.
 */

(function () {
    'use strict';

    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navbar = document.querySelector('.navbar');

    /* ──────────────────────────────────────────────
       Mobile menu
       ────────────────────────────────────────────── */

    function openMenu() {
        hamburger.classList.add('active');
        navMenu.classList.add('active');
        const bars = hamburger.querySelectorAll('.bar');
        bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
        bars[1].style.opacity = '0';
        bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
    }

    function closeMenu() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        const bars = hamburger.querySelectorAll('.bar');
        bars.forEach(bar => {
            bar.style.transform = '';
            bar.style.opacity = '';
        });
    }

    function toggleMenu() {
        if (hamburger.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    }

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', toggleMenu);
        hamburger.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleMenu();
            }
        });

        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                closeMenu();
            }
        });
    }

    /* ──────────────────────────────────────────────
       Navbar scroll effect
       ────────────────────────────────────────────── */

    if (navbar) {
        const onScroll = () => {
            navbar.classList.toggle('scrolled', window.scrollY > 10);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    /* ──────────────────────────────────────────────
       Scroll reveal — [data-reveal] elements
       Hero elements trigger immediately on load;
       all others trigger on scroll intersection.
       ────────────────────────────────────────────── */

    // Hero elements: reveal on page load with a short delay
    const heroElements = document.querySelectorAll('[data-reveal="hero"]:not(section)');
    if (heroElements.length > 0) {
        // Small delay to ensure CSS transition is registered
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                heroElements.forEach(el => el.classList.add('revealed'));
            });
        });
    }

    // Non-hero elements: reveal on scroll
    const scrollRevealElements = document.querySelectorAll('[data-reveal]:not([data-reveal="hero"])');
    if (scrollRevealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -40px 0px'
        });

        scrollRevealElements.forEach(el => revealObserver.observe(el));
    }

    /* ──────────────────────────────────────────────
       Smooth scroll for anchor links
       ────────────────────────────────────────────── */

    document.addEventListener('click', (e) => {
        const anchor = e.target.closest('a[href^="#"]');
        if (!anchor) return;
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });

    /* ──────────────────────────────────────────────
       Dynamic year
       ────────────────────────────────────────────── */

    const yearEl = document.querySelector('.js-year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    /* ──────────────────────────────────────────────
       Swiper initialization (case study pages)
       ────────────────────────────────────────────── */

    if (typeof Swiper !== 'undefined') {
        const carousel = document.querySelector('.hifi-carousel');
        if (carousel) {
            new Swiper('.hifi-carousel', {
                loop: true,
                autoplay: { delay: 6000, disableOnInteraction: false },
                pagination: { el: '.swiper-pagination', clickable: true },
                navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
                effect: 'fade',
                fadeEffect: { crossFade: true },
                speed: 800,
                keyboard: { enabled: true },
            });
        }
    }

    /* ──────────────────────────────────────────────
       Form handling (contact page)
       ────────────────────────────────────────────── */

    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const data = Object.fromEntries(new FormData(form));

            if (!data.name || !data.email || !data.message) {
                alert('Please fill in all required fields.');
                return;
            }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
                alert('Please enter a valid email address.');
                return;
            }

            alert('Thank you for your message! I\'ll get back to you soon.');
            form.reset();
        });
    });

    /* ──────────────────────────────────────────────
       Page visibility
       ────────────────────────────────────────────── */

    document.addEventListener('visibilitychange', () => {
        document.body.classList.toggle('page-hidden', document.hidden);
    });

})();
