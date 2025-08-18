// Mobile Navigation Toggle - Enhanced for mobile devices
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle && navMenu) {
    // Add touch event listener for better mobile responsiveness
    navToggle.addEventListener('touchstart', (e) => {
        e.preventDefault();
        e.stopPropagation();
    }, { passive: false });

    navToggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
        } else {
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
        }
    });

    // Prevent event bubbling on nav toggle
    navToggle.addEventListener('touchend', (e) => {
        e.stopPropagation();
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', (e) => {
        if (navToggle) navToggle.classList.remove('active');
        if (navMenu) navMenu.classList.remove('active');
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
    });

    // Add touch events for better mobile experience
    link.addEventListener('touchend', (e) => {
        if (navToggle) navToggle.classList.remove('active');
        if (navMenu) navMenu.classList.remove('active');
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
    });
});

// Close mobile menu when clicking outside - Enhanced
document.addEventListener('click', (e) => {
    if (navToggle && navMenu && 
        !navToggle.contains(e.target) && 
        !navMenu.contains(e.target) && 
        navMenu.classList.contains('active')) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
    }
});

// Also handle touch events for mobile
document.addEventListener('touchend', (e) => {
    if (navToggle && navMenu && 
        !navToggle.contains(e.target) && 
        !navMenu.contains(e.target) && 
        navMenu.classList.contains('active')) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed nav height
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Event cards scroll-triggered animations (mobile-friendly)
const eventCards = document.querySelectorAll('.event-card');
const eventsContainer = document.querySelector('.events-container');

if (eventsContainer && eventCards.length > 0) {
    // Only apply scroll effects on desktop
    if (window.innerWidth > 768) {
        eventsContainer.addEventListener('scroll', () => {
            const containerRect = eventsContainer.getBoundingClientRect();
            const containerCenter = containerRect.left + containerRect.width / 2;
            
            eventCards.forEach((card, index) => {
                const cardRect = card.getBoundingClientRect();
                const cardCenter = cardRect.left + cardRect.width / 2;
                const distanceFromCenter = Math.abs(cardCenter - containerCenter);
                
                if (distanceFromCenter < 150) {
                    card.style.transform = 'scale(1.05)';
                    card.style.opacity = '1';
                    card.style.zIndex = '10';
                } else {
                    card.style.transform = 'scale(1)';
                    card.style.opacity = '0.8';
                    card.style.zIndex = '1';
                }
            });
        });
        
        // Trigger initial check
        eventsContainer.dispatchEvent(new Event('scroll'));
    } else {
        // Reset styles for mobile
        eventCards.forEach(card => {
            card.style.transform = 'none';
            card.style.opacity = '1';
            card.style.zIndex = 'auto';
        });
    }
}

// Announcement cards hover effects for desktop
const announcementCards = document.querySelectorAll('.announcement-card');
announcementCards.forEach(card => {
    if (window.innerWidth > 768) {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    }
    
    // Add touch effects for mobile
    card.addEventListener('touchstart', () => {
        card.style.transform = 'scale(0.98)';
    });
    
    card.addEventListener('touchend', () => {
        card.style.transform = 'scale(1)';
    });
});

// Intersection Observer for section animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(50px)';
    section.style.transition = 'all 0.8s ease';
    observer.observe(section);
});

// Active navigation highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.style.background = '';
        link.style.color = '';
        if (link.getAttribute('href').substring(1) === current) {
            link.style.background = 'linear-gradient(45deg, #06360a, #037926)';
            link.style.color = 'white';
        }
    });
});

// Parallax effect for background (disabled on mobile for performance)
function handleParallax() {
    if (window.innerWidth > 768) {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.home');
        if (parallax) {
            const speed = scrolled * 0.5;
            parallax.style.transform = `translateY(${speed}px)`;
        }
    }
}

window.addEventListener('scroll', handleParallax);

// Enhanced touch event handlers for better mobile experience
let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;

document.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
}, { passive: true });

document.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    touchEndY = e.changedTouches[0].screenY;
    handleGesture();
}, { passive: true });

function handleGesture() {
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;
    const minSwipeDistance = 50;
    
    // Only handle horizontal swipes that are more significant than vertical ones
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
        if (deltaX > minSwipeDistance && navMenu && !navMenu.classList.contains('active')) {
            // Swipe right - open menu if closed
            navToggle.classList.add('active');
            navMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
        } else if (deltaX < -minSwipeDistance && navMenu && navMenu.classList.contains('active')) {
            // Swipe left - close menu if open
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
        }
    }
}

// Initialize animations on load
window.addEventListener('load', () => {
    // Remove loading screen
    const loadingScreen = document.querySelector('.loading');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 2500);
    }

    // Initialize first section
    const homeSection = document.querySelector('.home');
    if (homeSection) {
        setTimeout(() => {
            homeSection.style.opacity = '1';
            homeSection.style.transform = 'translateY(0)';
        }, 500);
    }
});

// Enhanced resize handler for responsive adjustments
window.addEventListener('resize', () => {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768) {
        if (navToggle) navToggle.classList.remove('active');
        if (navMenu) navMenu.classList.remove('active');
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
    }
    
    // Recalculate parallax on resize
    handleParallax();
    
    // Reset event card animations based on screen size
    const eventCards = document.querySelectorAll('.event-card');
    if (window.innerWidth <= 768) {
        eventCards.forEach(card => {
            card.style.transform = 'none';
            card.style.opacity = '1';
            card.style.zIndex = 'auto';
        });
    }
    
    // Reset announcement card effects for mobile
    const announcementCards = document.querySelectorAll('.announcement-card');
    if (window.innerWidth <= 768) {
        announcementCards.forEach(card => {
            card.style.transform = 'none';
        });
    }
});

// Enhanced keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu with Escape key
        if (navToggle) navToggle.classList.remove('active');
        if (navMenu) navMenu.classList.remove('active');
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
    }
    
    // Tab navigation improvement for mobile menu
    if (navMenu && navMenu.classList.contains('active') && e.key === 'Tab') {
        const focusableElements = navMenu.querySelectorAll('a');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey) {
            if (document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            }
        } else {
            if (document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    }
});

// Mobile-specific optimizations
if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
    // Add touch-specific styles
    document.body.classList.add('touch-device');
    
    // Improve tap responsiveness
    document.addEventListener('touchstart', function() {}, { passive: true });
    
    // Add specific mobile classes for styling
    document.documentElement.classList.add('mobile-device');
}

// Viewport height fix for mobile browsers (addresses address bar issues)
function setViewportHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

setViewportHeight();
window.addEventListener('resize', setViewportHeight);
window.addEventListener('orientationchange', () => {
    setTimeout(setViewportHeight, 100);
});

// Prevent zoom on double tap for mobile
let lastTouchEnd = 0;
document.addEventListener('touchend', function (event) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, { passive: false });

// Smooth scroll polyfill for older browsers
if (!CSS.supports('scroll-behavior', 'smooth')) {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const targetPosition = target.offsetTop - 70;
                const startPosition = window.pageYOffset;
                const distance = targetPosition - startPosition;
                const duration = 800;
                let start = null;

                function step(timestamp) {
                    if (!start) start = timestamp;
                    const progress = timestamp - start;
                    const progressPercentage = Math.min(progress / duration, 1);
                    
                    // Easing function
                    const easeInOutCubic = progressPercentage < 0.5 
                        ? 4 * progressPercentage * progressPercentage * progressPercentage 
                        : (progressPercentage - 1) * (2 * progressPercentage - 2) * (2 * progressPercentage - 2) + 1;
                    
                    window.scrollTo(0, startPosition + distance * easeInOutCubic);
                    
                    if (progress < duration) {
                        window.requestAnimationFrame(step);
                    }
                }
                
                window.requestAnimationFrame(step);
            }
        });
    });
}

// Console welcome message
console.log(`
🎉 Unified Foundation Day Website
📱 Mobile-optimized and responsive
✨ Smooth animations and interactions
🚀 Enhanced mobile navigation
💡 Touch-friendly interface

Built with modern web standards.
Navigation fixes applied for mobile devices.
`);

// Service Worker registration (optional - for PWA features)
if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Performance monitoring for mobile
if (window.performance && window.performance.timing) {
    window.addEventListener('load', () => {
        const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
        console.log(`Page load time: ${loadTime}ms`);
        
        // Warn if load time is too high for mobile
        if (loadTime > 3000) {
            console.warn('Page load time is high. Consider optimizing for mobile.');
        }
    });
}

// Add loading states for better mobile UX
function showLoading(element) {
    if (element) {
        element.style.opacity = '0.6';
        element.style.pointerEvents = 'none';
    }
}

function hideLoading(element) {
    if (element) {
        element.style.opacity = '1';
        element.style.pointerEvents = 'auto';
    }
}

// Lazy loading for images (if any are added later)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    // Observe lazy images when they're added
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}