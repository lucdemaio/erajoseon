// ============================================ 
// SMOOTH SCROLLING E ACTIVE NAV
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-list a');
    const sections = document.querySelectorAll('section[id]');

    // Active navigation on scroll
    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Highlight styling for active nav
    const style = document.createElement('style');
    style.textContent = `
        .nav-list a.active {
            color: #f5f1e8 !important;
            border-bottom: 3px solid #d4a574;
            padding-bottom: 5px;
        }
    `;
    document.head.appendChild(style);
});

// ============================================ 
// PARALLAX EFFECT
// ============================================

window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    let scrollPosition = window.pageYOffset;
    header.style.backgroundPosition = `0 ${scrollPosition * 0.5}px`;
});

// ============================================ 
// PAGE TURN ANIMATION
// ============================================

const bookPages = document.querySelectorAll('.book-page');

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
        }
    });
}, observerOptions);

bookPages.forEach(page => {
    observer.observe(page);
});

// ============================================ 
// READING TIME CALCULATOR
// ============================================

function calculateReadingTime() {
    const content = document.querySelector('.main-content');
    const words = content.innerText.split(/\s+/).length;
    const readingTime = Math.ceil(words / 200); // Average reading speed
    
    return readingTime;
}

// Display reading time (optional - can be added to footer)
const readingTime = calculateReadingTime();
console.log(`Estimated reading time: ${readingTime} minutes`);

// ============================================ 
// DARK MODE TOGGLE (Optional Enhancement)
// ============================================

function addDarkModeToggle() {
    // Check if user prefers dark mode
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (prefersDarkMode) {
        // Optional: Apply dark mode styles
        // document.body.classList.add('dark-mode');
    }
}

addDarkModeToggle();

// ============================================ 
// KEYBOARD NAVIGATION
// ============================================

document.addEventListener('keydown', (e) => {
    const sections = document.querySelectorAll('section[id]');
    let currentIndex = -1;

    // Find current section
    sections.forEach((section, index) => {
        if (section.getBoundingClientRect().top > -100) {
            if (currentIndex === -1) currentIndex = index;
        }
    });

    // Arrow keys for navigation
    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        if (currentIndex < sections.length - 1) {
            sections[currentIndex + 1].scrollIntoView({ behavior: 'smooth' });
        }
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        if (currentIndex > 0) {
            sections[currentIndex - 1].scrollIntoView({ behavior: 'smooth' });
        }
    } else if (e.key === 'Home') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (e.key === 'End') {
        e.preventDefault();
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
});

// ============================================ 
// HIGHLIGHT INTERACTIONS
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const highlights = document.querySelectorAll('.highlight-text, .highlight-box, .info-box');
    
    highlights.forEach(highlight => {
        highlight.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'all 0.3s ease';
        });
        
        highlight.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});

// ============================================ 
// COPY TO CLIPBOARD FOR QUOTES
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const quotes = document.querySelectorAll('.quote');
    
    quotes.forEach(quote => {
        quote.style.cursor = 'pointer';
        quote.addEventListener('click', function() {
            const text = this.innerText;
            navigator.clipboard.writeText(text).then(() => {
                // Show feedback
                const originalText = this.innerText;
                this.innerText = '✓ Copiato!';
                this.style.color = '#d4a574';
                
                setTimeout(() => {
                    this.innerText = originalText;
                    this.style.color = '';
                }, 2000);
            });
        });
    });
});

// ============================================ 
// SCROLL PROGRESS BAR
// ============================================

function addProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.id = 'progress-bar';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(to right, #d4a574, #8B7355);
        z-index: 9999;
        width: 0%;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

addProgressBar();

// ============================================ 
// TABLE OF CONTENTS GENERATOR (Optional)
// ============================================

function generateTableOfContents() {
    const toc = [];
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const title = section.querySelector('.section-title');
        if (title) {
            toc.push({
                id: section.id,
                title: title.innerText
            });
        }
    });
    
    return toc;
}

const tableOfContents = generateTableOfContents();
console.log('Table of Contents:', tableOfContents);

// ============================================ 
// MEDIA CARD INTERACTIONS
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const mediaCards = document.querySelectorAll('.media-card');
    
    mediaCards.forEach(card => {
        card.addEventListener('click', function() {
            if (this.classList.contains('featured')) {
                // Add visual feedback for featured items
                this.style.transform = 'scale(1.03)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 300);
            }
        });
    });
});

// ============================================ 
// LAZY LOADING FOR IMAGES (if added)
// ============================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.src = entry.target.dataset.src;
                observer.unobserve(entry.target);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================ 
// ACCESSIBILITY: SKIP TO CONTENT
// ============================================

function addAccessibilityFeatures() {
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-to-content';
    skipLink.textContent = 'Salta al contenuto principale';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 0;
        background: #d4a574;
        color: white;
        padding: 8px;
        text-decoration: none;
        z-index: 100;
        transition: top 0.3s ease;
    `;
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '0';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
}

addAccessibilityFeatures();

// ============================================ 
// PRINTING OPTIMIZATION
// ============================================

function optimizeForPrint() {
    const printButton = document.createElement('button');
    printButton.textContent = '🖨️ Stampa Pagina';
    printButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: #2c2c2c;
        color: #d4a574;
        border: 2px solid #d4a574;
        padding: 12px 20px;
        border-radius: 4px;
        cursor: pointer;
        font-weight: 600;
        font-family: 'Inter', sans-serif;
        z-index: 500;
        transition: all 0.3s ease;
        display: none;
    `;
    
    printButton.addEventListener('mouseenter', function() {
        this.style.background = '#d4a574';
        this.style.color = '#2c2c2c';
    });
    
    printButton.addEventListener('mouseleave', function() {
        this.style.background = '#2c2c2c';
        this.style.color = '#d4a574';
    });
    
    printButton.addEventListener('click', () => {
        window.print();
    });
    
    document.body.appendChild(printButton);
    
    // Show print button on desktop only
    if (window.innerWidth > 768) {
        printButton.style.display = 'block';
    }
    
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            printButton.style.display = 'block';
        } else {
            printButton.style.display = 'none';
        }
    });
}

optimizeForPrint();

// ============================================ 
// SMOOTH SECTION TRANSITIONS
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});

// ============================================ 
// ANALYTICS TRACKING (Optional - for development)
// ============================================

function trackPageInteractions() {
    const sections = document.querySelectorAll('section[id]');
    
    const trackingObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                console.log(`Viewed section: ${entry.target.id}`);
                // Here you could send data to analytics service
            }
        });
    }, { threshold: 0.5 });
    
    sections.forEach(section => {
        trackingObserver.observe(section);
    });
}

trackPageInteractions();

// ============================================ 
// INITIALIZATION
// ============================================

console.log('Era Joseon - Interactive History Page Loaded Successfully');
console.log('Total Reading Time: ~' + calculateReadingTime() + ' minutes');
console.log('Press ? for keyboard shortcuts information');

// ============================================ 
// KEYBOARD SHORTCUTS HELP
// ============================================

document.addEventListener('keydown', (e) => {
    if (e.key === '?') {
        alert(`
⌨️ SCORCIATOIE DA TASTIERA:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
↓ / Page Down → Sezione successiva
↑ / Page Up   → Sezione precedente
Home          → Inizio pagina
End           → Fine pagina
Click on quotes → Copia negli appunti
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        `);
    }
});
