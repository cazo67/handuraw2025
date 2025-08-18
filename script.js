// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
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

// Event cards scroll-triggered animations
const eventCards = document.querySelectorAll('.event-card');
const eventsContainer = document.querySelector('.events-container');

if (eventsContainer && eventCards.length > 0) {
    eventsContainer.addEventListener('scroll', () => {
        const containerRect = eventsContainer.getBoundingClientRect();
        const containerCenter = containerRect.left + containerRect.width / 2;
        
        eventCards.forEach((card, index) => {
            const cardRect = card.getBoundingClientRect();
            const cardCenter = cardRect.left + cardRect.width / 2;
            const distanceFromCenter = Math.abs(cardCenter - containerCenter);
            
            if (distanceFromCenter < 150) {
                card.style.transform = 'scale(1.1)';
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
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    }
    
    // Recalculate parallax on resize
    handleParallax();
});

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll-heavy functions
window.removeEventListener('scroll', handleParallax);
window.addEventListener('scroll', throttle(handleParallax, 16)); // ~60fps

// Lazy loading for images (if needed)
const images = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// Add smooth hover effects for cards
document.querySelectorAll('.event-card, .sponsor-item, .rank-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu with Escape key
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Focus management for accessibility
const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
const modal = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    if (navMenu.classList.contains('active')) {
        // Focus first link when menu opens
        const firstFocusableElement = navMenu.querySelectorAll(focusableElements)[0];
        firstFocusableElement?.focus();
    }
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