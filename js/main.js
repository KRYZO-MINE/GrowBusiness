/**
 * SAHIL.TOP - Main Interactions
 * This script handles all the "magic" that makes the site feel alive.
 * Handcrafted by Sahil Jangra.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    /**
     * Mobile Navigation Logic
     * Handles the opening/closing of the glassmorphic overlay menu.
     */
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const closeMenuBtn = document.getElementById('close-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    const toggleMenu = (show) => {
        if (show) {
            mobileMenu.classList.remove('pointer-events-none', 'opacity-0');
            mobileMenu.classList.add('opacity-100');
            document.body.style.overflow = 'hidden';
        } else {
            mobileMenu.classList.add('opacity-0', 'pointer-events-none');
            mobileMenu.classList.remove('opacity-100');
            document.body.style.overflow = '';
        }
    };

    mobileMenuBtn?.addEventListener('click', () => toggleMenu(true));
    closeMenuBtn?.addEventListener('click', () => toggleMenu(false));
    mobileLinks.forEach(link => link.addEventListener('click', () => toggleMenu(false)));

    // Local Time Update
    const updateLocalTime = () => {
        const timeElement = document.getElementById('local-time');
        if (timeElement) {
            const now = new Date();
            const options = { 
                timeZone: 'Asia/Kolkata', 
                hour12: true, 
                hour: '2-digit', 
                minute: '2-digit', 
                second: '2-digit' 
            };
            timeElement.textContent = now.toLocaleTimeString('en-US', options);
        }
    };
    setInterval(updateLocalTime, 1000);
    updateLocalTime();

    // Year Update
    const yearElement = document.getElementById('year');
    if (yearElement) yearElement.textContent = new Date().getFullYear();

    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        revealElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            if (rect.top < windowHeight * 0.85) {
                el.classList.add('active');
            }
        });
    };
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check

    // FAQ Toggle
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        item.addEventListener('click', () => {
            const answer = item.querySelector('.faq-answer');
            const icon = item.querySelector('i');
            
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.querySelector('.faq-answer').style.maxHeight = null;
                    otherItem.querySelector('i').classList.remove('rotate-180');
                }
            });

            if (answer.style.maxHeight) {
                answer.style.maxHeight = null;
                icon.classList.remove('rotate-180');
            } else {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                icon.classList.add('rotate-180');
            }
        });
    });

    // Spotlight Effect
    document.addEventListener('mousemove', (e) => {
        const cards = document.querySelectorAll('.spotlight-card');
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // Portfolio Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active', 'bg-primary', 'border-primary'));
            btn.classList.add('active', 'border-primary');
            
            const filter = btn.getAttribute('data-filter');
            
            projectItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    setTimeout(() => item.style.opacity = '1', 10);
                } else {
                    item.style.opacity = '0';
                    setTimeout(() => item.style.display = 'none', 300);
                }
            });
        });
    });

    // Scroll to Top
    const scrollToTopBtn = document.getElementById('scrollToTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollToTopBtn.classList.remove('opacity-0', 'translate-y-20');
            scrollToTopBtn.classList.add('opacity-100', 'translate-y-0');
        } else {
            scrollToTopBtn.classList.add('opacity-0', 'translate-y-20');
            scrollToTopBtn.classList.remove('opacity-100', 'translate-y-0');
        }
    });

    scrollToTopBtn?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Contact Form Handling (Simplified)
    const contactForm = document.getElementById('contactForm');
    contactForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('button');
        const originalText = btn.innerHTML;
        
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner animate-spin mr-2"></i> Sending...';

        // Simulate sending (you can integrate the US-CLIENT Google Script endpoint here)
        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-check mr-2"></i> Message Sent!';
            btn.classList.replace('bg-primary', 'bg-green-500');
            contactForm.reset();
            
            setTimeout(() => {
                btn.disabled = false;
                btn.innerHTML = originalText;
                btn.classList.replace('bg-green-500', 'bg-primary');
            }, 3000);
        }, 2000);
    });
});
