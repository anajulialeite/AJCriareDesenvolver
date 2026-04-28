/* ============================================
   LANGUAGE TOGGLE
   ============================================ */
const langToggle = document.getElementById('langToggle');
let currentLang = localStorage.getItem('portfolioLang') || 'pt';

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('portfolioLang', lang);

    const elements = document.querySelectorAll('[data-pt][data-en]');
    elements.forEach(el => {
        el.textContent = el.getAttribute(`data-${lang}`);
    });

    const flag = langToggle.querySelector('.lang-flag');
    const label = langToggle.querySelector('.lang-label');

    if (lang === 'pt') {
        flag.textContent = '🇧🇷';
        label.textContent = 'PT';
        document.documentElement.lang = 'pt-BR';
    } else {
        flag.textContent = '🇺🇸';
        label.textContent = 'EN';
        document.documentElement.lang = 'en';
    }
}

langToggle.addEventListener('click', () => {
    setLanguage(currentLang === 'pt' ? 'en' : 'pt');
});

setLanguage(currentLang);


/* ============================================
   HAMBURGER MENU
   ============================================ */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});

navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
    });
});


/* ============================================
   ACTIVE NAV TRACKING
   ============================================ */
const sections = document.querySelectorAll('.section');
const navLinkEls = document.querySelectorAll('.nav-link');

function updateActiveNav() {
    const scrollPos = window.scrollY + 150;

    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');

        if (scrollPos >= top && scrollPos < top + height) {
            navLinkEls.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + id) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNav);
updateActiveNav();


/* ============================================
   SCROLL REVEAL
   ============================================ */
const revealElements = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-up');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));


/* ============================================
   HEADER SCROLL EFFECT
   ============================================ */
const header = document.getElementById('header');

function updateHeaderBg() {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    if (window.scrollY > 50) {
        header.style.background = isLight ? 'rgba(248, 247, 244, 0.95)' : 'rgba(10, 10, 15, 0.95)';
    } else {
        header.style.background = isLight ? 'rgba(248, 247, 244, 0.8)' : 'rgba(10, 10, 15, 0.8)';
    }
}

window.addEventListener('scroll', updateHeaderBg);


/* ============================================
   THEME TOGGLE
   ============================================ */
const themeToggle = document.getElementById('themeToggle');

function getPreferredTheme() {
    const saved = localStorage.getItem('portfolioTheme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolioTheme', theme);
    themeToggle.textContent = theme === 'light' ? '☀️' : '🌙';
    updateHeaderBg();
}

themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    setTheme(current === 'dark' ? 'light' : 'dark');
});

setTheme(getPreferredTheme());


/* ============================================
   FAQ ACCORDION
   ============================================ */
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const item = button.parentElement;
        const isActive = item.classList.contains('active');

        // Close all items
        document.querySelectorAll('.faq-item').forEach(faq => {
            faq.classList.remove('active');
            faq.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        });

        // Toggle clicked item
        if (!isActive) {
            item.classList.add('active');
            button.setAttribute('aria-expanded', 'true');
        }
    });
});


/* ============================================
   STATS COUNTER ANIMATION
   ============================================ */
const statNumbers = document.querySelectorAll('.stat-number');

function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'));
    const duration = 1500;
    const increment = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            el.textContent = target;
            clearInterval(timer);
        } else {
            el.textContent = Math.floor(current);
        }
    }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            statNumbers.forEach(num => animateCounter(num));
            statsObserver.disconnect();
        }
    });
}, { threshold: 0.3 });

const statsBar = document.querySelector('.stats-bar');
if (statsBar) statsObserver.observe(statsBar);


/* ============================================
   DYNAMIC FOOTER YEAR
   ============================================ */
const yearEl = document.getElementById('currentYear');
if (yearEl) yearEl.textContent = new Date().getFullYear();


/* ============================================
   VIDEO MODAL
   ============================================ */
const videoModal = document.getElementById('videoModal');
const videoPlayer = document.getElementById('videoPlayer');
const openBtn = document.getElementById('openVideoModal');
const closeBtn = document.getElementById('closeVideoModal');

if (openBtn && videoModal && videoPlayer && closeBtn) {
    openBtn.addEventListener('click', () => {
        videoModal.classList.add('active');
        videoModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        videoPlayer.play();
    });

    function closeVideoModal() {
        videoModal.classList.remove('active');
        videoModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        videoPlayer.pause();
        videoPlayer.currentTime = 0;
    }

    closeBtn.addEventListener('click', closeVideoModal);

    videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal) {
            closeVideoModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && videoModal.classList.contains('active')) {
            closeVideoModal();
        }
    });
}
