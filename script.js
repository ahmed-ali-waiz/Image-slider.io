// DOM Elements
const heroSlides = document.querySelectorAll('.hero-slide');
const heroDots = document.querySelectorAll('.hero-dot');
const filterBtns = document.querySelectorAll('.filter-btn');
const mangaItems = document.querySelectorAll('.manga-item');
const loadMoreBtn = document.querySelector('.load-more-btn');
const searchInput = document.querySelector('.search-input');
const navLinks = document.querySelectorAll('.nav-link');

// Hero Slider Functionality
let currentSlide = 0;
const totalSlides = heroSlides.length;

function showSlide(index) {
    // Remove active class from all slides and dots
    heroSlides.forEach(slide => slide.classList.remove('active'));
    heroDots.forEach(dot => dot.classList.remove('active'));
    
    // Add active class to current slide and dot
    heroSlides[index].classList.add('active');
    heroDots[index].classList.add('active');
    
    currentSlide = index;
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
}

// Auto-advance hero slider
let heroInterval = setInterval(nextSlide, 5000);

// Hero dot click handlers
heroDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        clearInterval(heroInterval);
        showSlide(index);
        heroInterval = setInterval(nextSlide, 5000);
    });
});

// Pause auto-advance on hover
const heroSection = document.querySelector('.hero');
heroSection.addEventListener('mouseenter', () => {
    clearInterval(heroInterval);
});

heroSection.addEventListener('mouseleave', () => {
    heroInterval = setInterval(nextSlide, 5000);
});

// Filter Functionality
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all filter buttons
        filterBtns.forEach(filterBtn => filterBtn.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filter = btn.textContent.toLowerCase();
        
        // Filter manga items based on selection
        mangaItems.forEach(item => {
            const title = item.querySelector('.manga-title').textContent.toLowerCase();
            const author = item.querySelector('.manga-author').textContent.toLowerCase();
            
            if (filter === 'all') {
                item.style.display = 'block';
                item.style.animation = 'fadeInUp 0.6s ease forwards';
            } else if (filter === 'weekly shonen jump') {
                // Show popular Jump titles
                const jumpTitles = ['one piece', 'jujutsu kaisen', 'my hero academia', 'chainsaw man', 'demon slayer'];
                if (jumpTitles.some(jumpTitle => title.includes(jumpTitle))) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeInUp 0.6s ease forwards';
                } else {
                    item.style.display = 'none';
                }
            } else if (filter === 'jump+') {
                // Show Jump+ titles
                const jumpPlusTitles = ['spy family', 'kaiju no. 8', 'oshi no ko'];
                if (jumpPlusTitles.some(jumpTitle => title.includes(jumpTitle))) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeInUp 0.6s ease forwards';
                } else {
                    item.style.display = 'none';
                }
            } else {
                // Show other titles
                const mainTitles = ['one piece', 'jujutsu kaisen', 'my hero academia', 'chainsaw man', 'demon slayer', 'spy family', 'kaiju no. 8', 'oshi no ko'];
                if (!mainTitles.some(mainTitle => title.includes(mainTitle))) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeInUp 0.6s ease forwards';
                } else {
                    item.style.display = 'none';
                }
            }
        });
        
        // Animate visible items
        setTimeout(() => {
            const visibleItems = document.querySelectorAll('.manga-item[style*="block"]');
            visibleItems.forEach((item, index) => {
                item.style.animationDelay = `${index * 0.1}s`;
            });
        }, 100);
    });
});

// Search Functionality
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    
    mangaItems.forEach(item => {
        const title = item.querySelector('.manga-title').textContent.toLowerCase();
        const author = item.querySelector('.manga-author').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || author.includes(searchTerm)) {
            item.style.display = 'block';
            item.style.animation = 'fadeInUp 0.6s ease forwards';
        } else {
            item.style.display = 'none';
        }
    });
    
    // If search is empty, show all items
    if (searchTerm === '') {
        mangaItems.forEach(item => {
            item.style.display = 'block';
            item.style.animation = 'fadeInUp 0.6s ease forwards';
        });
    }
});

// Load More Functionality
let visibleItems = 8;
const itemsToShow = 4;

// Initially hide items beyond the first 8
function initializeMangaGrid() {
    mangaItems.forEach((item, index) => {
        if (index >= visibleItems) {
            item.style.display = 'none';
        }
    });
}

loadMoreBtn.addEventListener('click', () => {
    const hiddenItems = Array.from(mangaItems).slice(visibleItems, visibleItems + itemsToShow);
    
    hiddenItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.display = 'block';
            item.style.animation = 'fadeInUp 0.6s ease forwards';
        }, index * 100);
    });
    
    visibleItems += itemsToShow;
    
    // Hide load more button if all items are visible
    if (visibleItems >= mangaItems.length) {
        loadMoreBtn.style.display = 'none';
    }
});

// Navigation Active State
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active class from all nav links
        navLinks.forEach(navLink => navLink.classList.remove('active'));
        
        // Add active class to clicked link
        link.classList.add('active');
        
        // Smooth scroll to section
        const targetId = link.getAttribute('href');
        if (targetId.startsWith('#')) {
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Manga Item Click Handler
mangaItems.forEach(item => {
    item.addEventListener('click', () => {
        const title = item.querySelector('.manga-title').textContent;
        const chapter = item.querySelector('.manga-chapter').textContent;
        
        // Create a simple modal or alert for demo purposes
        // In a real application, this would navigate to the manga page
        alert(`Opening ${title} - ${chapter}`);
    });
});

// Scroll-based Navigation Highlight
function updateActiveNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Throttled scroll handler for performance
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }
    scrollTimeout = setTimeout(updateActiveNavOnScroll, 100);
});

// Language Selector Handler
const languageSelect = document.querySelector('.language-select');
languageSelect.addEventListener('change', (e) => {
    const selectedLanguage = e.target.value;
    
    // In a real application, this would change the language
    // For demo purposes, we'll just show an alert
    const languageNames = {
        'en': 'English',
        'es': 'Español',
        'th': 'ไทย'
    };
    
    console.log(`Language changed to: ${languageNames[selectedLanguage]}`);
});

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    // Arrow key navigation for hero slider
    if (e.key === 'ArrowLeft') {
        clearInterval(heroInterval);
        prevSlide();
        heroInterval = setInterval(nextSlide, 5000);
    } else if (e.key === 'ArrowRight') {
        clearInterval(heroInterval);
        nextSlide();
        heroInterval = setInterval(nextSlide, 5000);
    }
    
    // Escape key to clear search
    if (e.key === 'Escape' && document.activeElement === searchInput) {
        searchInput.value = '';
        searchInput.dispatchEvent(new Event('input'));
        searchInput.blur();
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Initialize manga grid
    initializeMangaGrid();
    
    // Set initial active states
    showSlide(0);
    
    // Add loading animation to manga items
    mangaItems.forEach((item, index) => {
        if (index < visibleItems) {
            item.style.animationDelay = `${index * 0.1}s`;
        }
    });
    
    console.log('MangaPlus website loaded successfully!');
});

// Performance optimization: Intersection Observer for lazy loading
const observerOptions = {
    root: null,
    rootMargin: '50px',
    threshold: 0.1
};

const mangaObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe manga items for lazy loading effects
mangaItems.forEach(item => {
    mangaObserver.observe(item);
});

// Add touch/swipe support for mobile hero slider
let touchStartX = 0;
let touchEndX = 0;

heroSection.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

heroSection.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const swipeDistance = touchEndX - touchStartX;
    
    if (Math.abs(swipeDistance) > swipeThreshold) {
        clearInterval(heroInterval);
        
        if (swipeDistance > 0) {
            prevSlide();
        } else {
            nextSlide();
        }
        
        heroInterval = setInterval(nextSlide, 5000);
    }
}

// Error handling for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.style.backgroundColor = '#333';
        this.style.color = '#999';
        this.alt = 'Image not available';
    });
});

// Add visual feedback for interactive elements
document.querySelectorAll('button, .manga-item, .nav-link').forEach(element => {
    element.addEventListener('mousedown', function() {
        this.style.transform = 'scale(0.98)';
    });
    
    element.addEventListener('mouseup', function() {
        this.style.transform = '';
    });
    
    element.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
});