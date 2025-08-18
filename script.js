// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        if (navToggle) navToggle.classList.remove('active');
        if (navMenu) navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navToggle && navMenu && 
        !navToggle.contains(e.target) && 
        !navMenu.contains(e.target) && 
        navMenu.classList.contains('active')) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
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

// Touch event handlers for better mobile experience
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', e => {
    touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', e => {
    touchEndY = e.changedTouches[0].screenY;
    handleGesture();
});

function handleGesture() {
    if (touchEndY < touchStartY) {
        // Swipe up - could trigger animations or other effects
    }
    if (touchEndY > touchStartY) {
        // Swipe down - could trigger animations or other effects
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

// Resize handler for responsive adjustments
window.addEventListener('resize', () => {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768) {
        if (navToggle) navToggle.classList.remove('active');
        if (navMenu) navMenu.classList.remove('active');
        document.body.style.overflow = '';
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
});

// Improved mobile touch handling
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
    
    // Horizontal swipe detection for mobile menu
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 100) {
            // Swipe right - open menu if closed
            if (navMenu && !navMenu.classList.contains('active')) {
                navToggle.classList.add('active');
                navMenu.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        } else if (deltaX < -100) {
            // Swipe left - close menu if open
            if (navMenu && navMenu.classList.contains('active')) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    }
}

// Enhanced keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu with Escape key
        if (navToggle) navToggle.classList.remove('active');
        if (navMenu) navMenu.classList.remove('active');
        document.body.style.overflow = '';
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
if ('ontouchstart' in window) {
    // Add touch-specific styles
    document.body.classList.add('touch-device');
    
    // Improve tap responsiveness
    document.addEventListener('touchstart', function() {}, { passive: true });
}

// Viewport height fix for mobile browsers
function setViewportHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

setViewportHeight();
window.addEventListener('resize', setViewportHeight);
window.addEventListener('orientationchange', () => {
    setTimeout(setViewportHeight, 100);
});

// Console welcome message
console.log(`
🎉 Unified Foundation Day Website
📱 Mobile-optimized and responsive
✨ Smooth animations and interactions
🚀 Optimized for performance

Built with modern web standards.
`);

// Service Worker registration (optional - for PWA features)
if ('serviceWorker' in navigator) {
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