// Mobile menu functionality
function toggleMobileMenu() {
    const navContainer = document.querySelector('.nav-container');
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    
    navContainer.classList.toggle('active');
    menuToggle.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (navContainer.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

function closeMobileMenu() {
    const navContainer = document.querySelector('.nav-container');
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    
    navContainer.classList.remove('active');
    menuToggle.classList.remove('active');
    document.body.style.overflow = '';
}

// DOM Content Loaded functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize announcements with correct sorting
    initializeAnnouncements();
    
    // Initialize first slide as active
    if (slides.length > 0) {
        slides[0].classList.add('active');
    }
    if (dots.length > 0) {
        dots[0].classList.add('active');
    }

    // Check if "See More" buttons should be visible
    checkAndShowSeeMoreButtons();

    // Close gallery when clicking outside content
    const galleryModal = document.getElementById('galleryModal');
    if (galleryModal) {
        galleryModal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeGallery();
            }
        });
    }

    // Close gallery with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeGallery();
            closeMobileMenu();
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                // Adjust scroll position for fixed header
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Enhanced scroll effect for header
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(20px)';
            header.style.boxShadow = '0 8px 30px rgba(47, 79, 47, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.1)';
            header.style.backdropFilter = 'blur(15px)';
            header.style.boxShadow = 'none';
        }
        
        // Hide header on scroll down, show on scroll up (mobile optimization)
        if (window.innerWidth <= 768) {
            if (scrollTop > lastScrollTop && scrollTop > 150) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }, false);

    // Add intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections for scroll animations
    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Add staggered animation to initially visible event cards
    setTimeout(() => {
        document.querySelectorAll('.event-card:not(.hidden)').forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 50);
        });
    }, 300);

    // Add staggered animation to announcement cards (will be applied after initialization)
    setTimeout(() => {
        document.querySelectorAll('.announcement-card').forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 50);
        });
    }, 100);

    // Add staggered animation to sponsor logos
    document.querySelectorAll('.sponsor-logo').forEach((logo, index) => {
        logo.style.opacity = '0';
        logo.style.transform = 'translateY(20px) scale(0.9)';
        logo.style.transition = `opacity 0.5s ease ${index * 0.05}s, transform 0.5s ease ${index * 0.05}s`;
        
        setTimeout(() => {
            logo.style.opacity = '1';
            logo.style.transform = 'translateY(0) scale(1)';
        }, 200 + (index * 50));
    });

    // Add enhanced animation to ranking items
    setTimeout(() => {
        // Animate side rankings first
        document.querySelectorAll('.side-rank').forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(50px) scale(0.8)';
            item.style.transition = `opacity 0.8s ease ${index * 0.2}s, transform 0.8s ease ${index * 0.2}s`;
            
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0) scale(1)';
            }, 100 + (index * 200));
        });

        // Animate center podium with dramatic effect
        document.querySelectorAll('.podium-rank').forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(100px) scale(0.5)';
            item.style.transition = `opacity 1s ease ${0.5 + index * 0.3}s, transform 1s ease ${0.5 + index * 0.3}s`;
            
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0) scale(1)';
                
                // Add special effect for first place
                if (item.classList.contains('first')) {
                    setTimeout(() => {
                        const rankNumber = item.querySelector('.rank-number');
                        if (rankNumber) {
                            rankNumber.style.animation = 'goldGlow 2s ease-in-out infinite alternate';
                        }
                    }, 500);
                }
            }, 500 + (index * 300));
        });
    }, 1000);

    // Add hover effects to ranking items
    document.querySelectorAll('.rank-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            if (!this.classList.contains('podium-rank')) {
                const teamName = this.querySelector('.team-name');
                if (teamName) {
                    teamName.style.background = 'rgba(154, 205, 50, 0.1)';
                }
            }
        });
        
        item.addEventListener('mouseleave', function() {
            if (!this.classList.contains('podium-rank')) {
                const teamName = this.querySelector('.team-name');
                if (teamName) {
                    teamName.style.background = 'rgba(255, 255, 255, 0.8)';
                }
            }
        });
    });

    // Add error handling for images
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            console.log('Image failed to load:', this.src);
            // You could add a placeholder image here if desired
        });
    });

    // Keyboard navigation for slideshow
    document.addEventListener('keydown', function(e) {
        const galleryModal = document.getElementById('galleryModal');
        if (galleryModal && galleryModal.style.display === 'flex') {
            if (e.key === 'ArrowLeft') {
                prevImage();
            } else if (e.key === 'ArrowRight') {
                nextImage();
            }
        } else {
            if (e.key === 'ArrowLeft') {
                showSlide(currentSlideIndex);
            } else if (e.key === 'ArrowRight') {
                showSlide(currentSlideIndex + 2);
            }
        }
    });

    // Touch/swipe support for mobile devices
    let touchStartX = 0;
    let touchEndX = 0;
    
    function handleGesture() {
        const swipeThreshold = 50;
        const swipeDistance = touchEndX - touchStartX;
        
        if (Math.abs(swipeDistance) > swipeThreshold) {
            const galleryModal = document.getElementById('galleryModal');
            if (galleryModal && galleryModal.style.display === 'flex') {
                if (swipeDistance > 0) {
                    prevImage();
                } else {
                    nextImage();
                }
            } else {
                const slideshow = document.querySelector('.highlights-slideshow');
                if (slideshow) {
                    if (swipeDistance > 0) {
                        showSlide(currentSlideIndex);
                    } else {
                        showSlide(currentSlideIndex + 2);
                    }
                }
            }
        }
    }
    
    document.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    document.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleGesture();
    });

    // Handle orientation change
    window.addEventListener('orientationchange', function() {
        setTimeout(() => {
            // Recalculate positions after orientation change
            window.scrollTo(0, window.scrollY);
        }, 100);
    });

    // Optimize touch interactions for mobile
    if ('ontouchstart' in window) {
        document.querySelectorAll('.event-card, .announcement-card, .see-more-btn').forEach(element => {
            element.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            });
            
            element.addEventListener('touchend', function() {
                this.style.transform = '';
            });
        });
    }
});

// Slideshow functionality
let currentSlideIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.nav-dot');

function showSlide(n) {
    if (slides.length === 0) return;
    
    slides[currentSlideIndex].classList.remove('active');
    dots[currentSlideIndex].classList.remove('active');
    
    currentSlideIndex = (n - 1 + slides.length) % slides.length;
    
    slides[currentSlideIndex].classList.add('active');
    dots[currentSlideIndex].classList.add('active');
}

function currentSlide(n) {
    showSlide(n);
}

// Auto-advance slideshow with pause on hover/focus
let slideshowTimer;

function startSlideshow() {
    slideshowTimer = setInterval(() => {
        showSlide(currentSlideIndex + 2);
    }, 2500);
}

function stopSlideshow() {
    clearInterval(slideshowTimer);
}

// Start slideshow
startSlideshow();

// Pause slideshow on hover/focus for better accessibility
document.addEventListener('DOMContentLoaded', function() {
    const slideshow = document.querySelector('.highlights-slideshow');
    if (slideshow) {
        slideshow.addEventListener('mouseenter', stopSlideshow);
        slideshow.addEventListener('mouseleave', startSlideshow);
        slideshow.addEventListener('focusin', stopSlideshow);
        slideshow.addEventListener('focusout', startSlideshow);
    }
});

// Enhanced announcement data with proper numbering and sorting
const announcements = [
    {
        id: 0, // This will always be placed at the end
        title: "𝐀𝐑𝐄 𝐘𝐎𝐔 𝐑𝐄𝐀𝐃𝐘 𝐓𝐎 𝐑𝐎𝐂𝐊? 🎤✨",
        body: "As we gear up to celebrate the 115th Unified Foundation Day and the Grand Alumni Homecoming, we're bringing the beat back with a night of epic music, good vibes, and" +  
        " unforgettable memories — and we want 𝐘𝐎𝐔 on stage! <br><br>Tag your bandmates, dust off those instruments, and get ready to bring the house down.\n 🎶🔥<br><br>" +
        " <a href='https://forms.gle/uHQKf445i3b7FgQ16' target='_blank'>Click here to register</a>", 
        photos: ["announcement/call_for_band_night.jpg"],
        date: "Posted: August 26, 2025",
        alt: "New Training Facility"
    },
    {
        id: 1,
        title: "🍂𝗔𝗧𝗧𝗘𝗡𝗧𝗜𝗢𝗡 𝗦𝗧𝗨𝗗𝗘𝗡𝗧-𝗘𝗡𝗧𝗥𝗘𝗣𝗥𝗘𝗡𝗘𝗨𝗥𝗦!🍂🌾",
        body:
            "Are you ready to showcase your creativity and business skills? Add a harvest vibe to our bazaar along Shan Cai Road by displaying your products at the CMU-SSC Booth during the 115th Unified Foundation Day and Grand Alumni Homecoming.<br><br>" +
            "📌<strong>How to join:</strong><br>" +
            "1. Fill out the Google Form below (open until September 2, 2025)<br>" +
            "2. Wait for confirmation.<br>" +
            "3. Prepare your products and celebrate with us!<br><br>" +
            "<a href='https://forms.gle/sCfqCVcybcyYiBhs6' target='_blank'>Click here to register</a><br><br>" +
            "<em>Note:</em> We only accept student-entrepreneurs selling dry goods and products.<br><br>" +
            "Let's make this Foundation Day a bountiful and memorable harvest celebration for the CMU community!<br><br>" +
            "#HANDURAW2025<br>" +
            "#THRIVINGCMU<br>" +
            "#LeadtoServe",
        photos: ["announcement/call_for_entrep.jpg",],
        date: "August 27, 2025",
        alt: "Registration Extended"
    },
    // Additional announcements can be uncommented as needed
    // {
    //     id: 3,
    //     title: "Volunteer Program Launch",
    //     body: "Join our volunteer program and be part of the championship experience! We are looking for enthusiastic individuals to help with event coordination, athlete support, and venue management. Volunteers will receive exclusive merchandise, meals, and certificates of appreciation.",
    //     photos: ["announcement4.png", "announcement4b.png", "announcement4c.png", "announcement4d.png"],
    //     date: "Posted: Dec 3, 2025",
    //     alt: "Volunteer Program"
    // },
    // Additional announcement entries would go here...
];

// Define additional events for expandable content
const additionalEvents = [
    {
        title: "Benchant",
        meta: "Sep 19, 2025 | Univ Convention Center",
        description: "Watch Benchant, a vibrant showcase of chants, movements, and school spirit that will fire up the crowd.",
        heads: "Head: Kyle Antonette Gonzales",
        image: "events/benchant.jpg",
        alt: "Benchant Image"
    },
    {
        title: "Hiphop",
        meta: "Sep 19, 2025 | Univ Convention Center",
        description: "Watch the Hip-hop Competition where dynamic moves, fierce beats, and unstoppable energy light up the stage!",
        heads: "Head: Rey Angelo Arsenal",
        image: "events/hiphop.jpg",
        alt: "HiHOP Image"
    },
    {
        title: "Drag Race",
        meta: "Sep 19, 2025 | Univ Convention Center",
        description: "Watch the Drag Race a dazzling showcase of charisma, creativity, and fierce runway performances!",
        heads: "Heads: Jaime Alambatin, Eduardo Tequillo, Marissa Ismael",
        image: "events/dragrace.jpg",
        alt: "Drag Race Image"
    },
    {
        title: "University Acquintance",
        meta: "Sep 19, 2025 | Univ Convention Center",
        description: "Watch out for the Acquaintance Party a night of fun, music, and unforgettable connections!",
        heads: "Heads: Jaime Alambatin, Eduardo Tequillo, Marissa Ismael",
        image: "events/acquintance.jpg",
        alt: "Acquintance Image"
    },
];

let currentAnnouncementIndex = 0;
let currentPhotoIndex = 0;
let eventsExpanded = false;
let announcementsExpanded = false;

// Enhanced sorting function for announcements
function sortAnnouncementsForDisplay() {
    return announcements.sort((a, b) => {
        // If 'a' is announcement 0, it should go to the end (return 1)
        if (a.id === 0 && b.id !== 0) return 1;
        // If 'b' is announcement 0, it should go to the end (return -1)  
        if (b.id === 0 && a.id !== 0) return -1;
        // For all other announcements, sort by ID in descending order (latest first)
        return b.id - a.id;
    });
}

// Enhanced function to check if "See More" buttons should be shown
function checkAndShowSeeMoreButtons() {
    // Check events - count total including hidden ones
    const allEventCards = document.querySelectorAll('.event-card');
    const visibleEventCards = document.querySelectorAll('.event-card:not(.hidden)');
    const eventsToggleContainer = document.querySelector('#events .see-more-container');
    
    // Show events button if there are more than 6 total events or hidden events exist
    if (allEventCards.length > 6 || visibleEventCards.length < allEventCards.length) {
        setTimeout(() => {
            if (eventsToggleContainer) {
                eventsToggleContainer.classList.add('visible');
            }
        }, 1000);
    }
    
    // Check announcements - show button if more than 6 announcements total
    const announcementsToggleContainer = document.querySelector('#announcements .see-more-container');
    if (announcements.length > 6) {
        setTimeout(() => {
            if (announcementsToggleContainer) {
                announcementsToggleContainer.classList.add('visible');
            }
        }, 1200);
    }
}

// Enhanced Events Toggle Function with better mobile performance
function toggleEvents() {
    const eventsGrid = document.getElementById('eventsGrid');
    const toggleBtn = document.getElementById('eventsToggleBtn');
    
    if (!eventsGrid || !toggleBtn) return;
    
    if (!eventsExpanded) {
        // Show hidden events first, then add additional events if needed
        const hiddenEvents = document.querySelectorAll('.event-card.hidden');
        
        hiddenEvents.forEach((event, index) => {
            setTimeout(() => {
                event.classList.remove('hidden');
                event.style.opacity = '0';
                event.style.transform = 'translateY(30px)';
                event.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                
                setTimeout(() => {
                    event.style.opacity = '1';
                    event.style.transform = 'translateY(0)';
                }, 50);
            }, index * 100);
        });
        
        // If we need more events to reach the requirement, add additional ones
        const totalVisibleAfterHidden = document.querySelectorAll('.event-card').length;
        const needMoreEvents = Math.max(0, Math.min(additionalEvents.length, 13 - totalVisibleAfterHidden));
        
        if (needMoreEvents > 0) {
            additionalEvents.slice(0, needMoreEvents).forEach((eventData, index) => {
                const eventCard = createEventCard(eventData);
                eventCard.classList.add('additional-event');
                eventsGrid.appendChild(eventCard);
                
                setTimeout(() => {
                    eventCard.style.opacity = '0';
                    eventCard.style.transform = 'translateY(30px)';
                    eventCard.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    
                    setTimeout(() => {
                        eventCard.style.opacity = '1';
                        eventCard.style.transform = 'translateY(0)';
                    }, 50);
                }, (hiddenEvents.length + index) * 100);
            });
        }
        
        toggleBtn.textContent = 'Show Less Events';
        eventsExpanded = true;
    } else {
        // Hide additional events and re-hide originally hidden events
        const hiddenEvents = eventsGrid.querySelectorAll('.event-card:nth-child(n+7):not(.additional-event)');
        const additionalEventCards = eventsGrid.querySelectorAll('.additional-event');
        
        // Remove additional events
        additionalEventCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px)';
                
                setTimeout(() => {
                    card.remove();
                }, 300);
            }, index * 50);
        });
        
        // Hide originally hidden events
        hiddenEvents.forEach((event, index) => {
            setTimeout(() => {
                event.style.opacity = '0';
                event.style.transform = 'translateY(30px)';
                
                setTimeout(() => {
                    event.classList.add('hidden');
                }, 300);
            }, (additionalEventCards.length * 50) + (index * 50));
        });
        
        toggleBtn.textContent = 'See More Events';
        eventsExpanded = false;
    }
}

// Enhanced Announcements Toggle Function with better mobile performance
function toggleAnnouncements() {
    const announcementsGrid = document.getElementById('announcementsGrid');
    const toggleBtn = document.getElementById('announcementsToggleBtn');
    
    if (!announcementsGrid || !toggleBtn) return;
    
    if (!announcementsExpanded) {
        // Show remaining announcements beyond the first 6
        const sortedAnnouncements = sortAnnouncementsForDisplay();
        const hiddenAnnouncements = sortedAnnouncements.slice(6);
        
        hiddenAnnouncements.forEach((announcement, index) => {
            const announcementCard = createAnnouncementCard(announcement, sortedAnnouncements.indexOf(announcement));
            announcementCard.classList.add('additional-announcement');
            announcementsGrid.appendChild(announcementCard);
            
            setTimeout(() => {
                announcementCard.style.opacity = '0';
                announcementCard.style.transform = 'translateY(30px)';
                announcementCard.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                
                setTimeout(() => {
                    announcementCard.style.opacity = '1';
                    announcementCard.style.transform = 'translateY(0)';
                }, 50);
            }, index * 100);
        });
        
        toggleBtn.textContent = 'Show Less Announcements';
        announcementsExpanded = true;
    } else {
        // Remove additional announcements
        const additionalCards = announcementsGrid.querySelectorAll('.additional-announcement');
        
        additionalCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px)';
                
                setTimeout(() => {
                    card.remove();
                }, 300);
            }, index * 50);
        });
        
        toggleBtn.textContent = 'See More Announcements';
        announcementsExpanded = false;
    }
}

// Create event card function with error handling
function createEventCard(eventData) {
    const card = document.createElement('div');
    card.className = 'event-card';
    
    card.innerHTML = `
        <div class="event-image">
            <img src="${eventData.image}" alt="${eventData.alt}" loading="lazy" onerror="this.style.display='none'">
        </div>
        <div class="event-content">
            <div class="event-title">${eventData.title}</div>
            <div class="event-meta">${eventData.meta}</div>
            <div class="event-description">${eventData.description}</div>
            <div class="event-heads">${eventData.heads}</div>
        </div>
    `;
    
    return card;
}

// Enhanced initialization function for announcements
function initializeAnnouncements() {
    const announcementsGrid = document.getElementById('announcementsGrid');
    if (!announcementsGrid) return;
    
    const sortedAnnouncements = sortAnnouncementsForDisplay();
    
    // Clear existing content
    announcementsGrid.innerHTML = '';
    
    // Create cards for the first 6 announcements (with proper sorting)
    const initialAnnouncements = sortedAnnouncements.slice(0, 6);
    initialAnnouncements.forEach((announcement, index) => {
        const originalIndex = sortedAnnouncements.indexOf(announcement);
        const card = createAnnouncementCard(announcement, originalIndex);
        announcementsGrid.appendChild(card);
    });
}

// Create announcement card function with enhanced mobile support
function createAnnouncementCard(announcement, index) {
    const card = document.createElement('div');
    card.className = 'announcement-card';
    card.onclick = () => openAnnouncement(index);
    
    // Add touch feedback for mobile
    if ('ontouchstart' in window) {
        card.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        card.addEventListener('touchend', function() {
            this.style.transform = '';
        });
    }
    
    card.innerHTML = `
        <div class="announcement-image">
            <img src="${announcement.photos[0]}" alt="${announcement.alt}" loading="lazy" onerror="this.style.display='none'">
            <span class="announcement-date">${announcement.date}</span>
        </div>
    `;
    
    return card;
}

// Enhanced Gallery functionality with mobile optimizations
function openAnnouncement(index) {
    const sortedAnnouncements = sortAnnouncementsForDisplay();
    
    currentAnnouncementIndex = index;
    currentPhotoIndex = 0;
    const announcement = sortedAnnouncements[index];
    
    if (!announcement) return;
    
    const galleryTitle = document.getElementById('galleryTitle');
    const galleryBody = document.getElementById('galleryBody');
    const galleryModal = document.getElementById('galleryModal');
    
    if (galleryTitle) galleryTitle.textContent = announcement.title;
    if (galleryBody) galleryBody.innerHTML = announcement.body;
    
    updateAnnouncementPhoto();
    
    if (galleryModal) {
        galleryModal.style.display = 'flex';
        // Prevent body scroll when modal is open
        document.body.style.overflow = 'hidden';
    }
    
    // Show/hide navigation arrows based on number of photos
    const prevBtn = document.querySelector('.gallery-nav.prev');
    const nextBtn = document.querySelector('.gallery-nav.next');
    
    if (announcement.photos.length > 1) {
        if (prevBtn) prevBtn.style.display = 'flex';
        if (nextBtn) nextBtn.style.display = 'flex';
    } else {
        if (prevBtn) prevBtn.style.display = 'none';
        if (nextBtn) nextBtn.style.display = 'none';
    }
}

function updateAnnouncementPhoto() {
    const sortedAnnouncements = sortAnnouncementsForDisplay();
    const announcement = sortedAnnouncements[currentAnnouncementIndex];
    const imageContent = document.getElementById('galleryImageContent');
    
    if (announcement && announcement.photos[currentPhotoIndex] && imageContent) {
        imageContent.innerHTML = `<img src="${announcement.photos[currentPhotoIndex]}" alt="${announcement.title}" style="max-width: 100%; max-height: 100%; object-fit: contain; border-radius: 15px;" onerror="this.style.display='none'">`;
    }
}

function closeGallery() {
    const galleryModal = document.getElementById('galleryModal');
    if (galleryModal) {
        galleryModal.style.display = 'none';
        // Restore body scroll
        document.body.style.overflow = '';
    }
}

function prevImage() {
    const sortedAnnouncements = sortAnnouncementsForDisplay();
    const announcement = sortedAnnouncements[currentAnnouncementIndex];
    if (announcement && announcement.photos.length > 1) {
        currentPhotoIndex = (currentPhotoIndex - 1 + announcement.photos.length) % announcement.photos.length;
        updateAnnouncementPhoto();
    }
}

function nextImage() {
    const sortedAnnouncements = sortAnnouncementsForDisplay();
    const announcement = sortedAnnouncements[currentAnnouncementIndex];
    if (announcement && announcement.photos.length > 1) {
        currentPhotoIndex = (currentPhotoIndex + 1) % announcement.photos.length;
        updateAnnouncementPhoto();
    }
}

// Enhanced resize handler for mobile optimization
function handleResize() {
    const navContainer = document.querySelector('.nav-container');
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    
    // Close mobile menu when screen becomes large
    if (window.innerWidth > 768) {
        if (navContainer) {
            navContainer.classList.remove('active');
            navContainer.style.display = '';
        }
        if (menuToggle) {
            menuToggle.classList.remove('active');
        }
        document.body.style.overflow = '';
    }
    
    // Reset header transform on resize
    const header = document.querySelector('.header');
    if (header && window.innerWidth > 768) {
        header.style.transform = '';
    }
}

// Debounced resize handler for better performance
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(handleResize, 250);
});

// Enhanced scroll performance
let ticking = false;

function updateScrollElements() {
    const header = document.querySelector('.header');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(20px)';
        header.style.boxShadow = '0 8px 30px rgba(47, 79, 47, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.1)';
        header.style.backdropFilter = 'blur(15px)';
        header.style.boxShadow = 'none';
    }
    
    ticking = false;
}

function requestScrollUpdate() {
    if (!ticking) {
        requestAnimationFrame(updateScrollElements);
        ticking = true;
    }
}

// Use optimized scroll handler
window.addEventListener('scroll', requestScrollUpdate, { passive: true });

// Utility function to check if device is mobile
function isMobileDevice() {
    return window.innerWidth <= 768 || 'ontouchstart' in window;
}

// Performance optimization: Reduce animations on low-end devices
function optimizeForDevice() {
    const isLowEnd = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;
    const isSlowConnection = navigator.connection && (navigator.connection.effectiveType === 'slow-2g' || navigator.connection.effectiveType === '2g');
    
    if (isLowEnd || isSlowConnection) {
        // Reduce or disable heavy animations
        document.documentElement.style.setProperty('--animation-duration', '0.1s');
        
        // Disable particle effects
        const heroAfter = document.querySelector('.hero::after');
        if (heroAfter) {
            heroAfter.style.animation = 'none';
        }
    }
}

// Call optimization on load
document.addEventListener('DOMContentLoaded', optimizeForDevice);

// Preload critical images for better performance
function preloadCriticalImages() {
    const criticalImages = [
        'maintitle.png',
        'bg1.png',
        'logo/SSCLogo.png',
        'logo/HandurawLogo.png'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Preload images when page loads
document.addEventListener('DOMContentLoaded', preloadCriticalImages);

// Service Worker registration for better mobile performance (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // You can uncomment this if you want to add a service worker
        // navigator.serviceWorker.register('/sw.js');
    });
}