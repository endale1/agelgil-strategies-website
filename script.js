// ===== ENHANCED SECURITY FEATURES =====

// 1. CLICKJACKING PROTECTION
if (window.top !== window.self) {
    window.top.location = window.self.location;
}

// 2. DISABLE RIGHT-CLICK (Enabled for protection)
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    return false;
});

// 3. DISABLE TEXT SELECTION ON SENSITIVE ELEMENTS
document.addEventListener('selectstart', (e) => {
    if (e.target.tagName === 'IMG' || e.target.classList.contains('logo-image')) {
        e.preventDefault();
        return false;
    }
});

// 4. DISABLE DRAG AND DROP ON IMAGES
document.addEventListener('dragstart', (e) => {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
        return false;
    }
});

// 5. PREVENT CONSOLE TAMPERING
(function() {
    const noop = function() {};
    const methods = ['log', 'warn', 'error', 'info', 'debug'];
    const console = window.console || {};

    methods.forEach(method => {
        console[method] = noop;
    });
})();

// 6. DETECT AND PREVENT DEVTOOLS
(function() {
    const threshold = 160;
    const check = setInterval(() => {
        if (window.outerWidth - window.innerWidth > threshold ||
            window.outerHeight - window.innerHeight > threshold) {
            // DevTools detected - you can add custom action here
            clearInterval(check);
        }
    }, 1000);
})();

// 7. PREVENT KEYBOARD SHORTCUTS (F12, Ctrl+Shift+I, etc.)
document.addEventListener('keydown', (e) => {
    // F12
    if (e.keyCode === 123) {
        e.preventDefault();
        return false;
    }
    // Ctrl+Shift+I
    if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
        e.preventDefault();
        return false;
    }
    // Ctrl+Shift+J
    if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
        e.preventDefault();
        return false;
    }
    // Ctrl+U (View Source)
    if (e.ctrlKey && e.keyCode === 85) {
        e.preventDefault();
        return false;
    }
    // Ctrl+S (Save Page)
    if (e.ctrlKey && e.keyCode === 83) {
        e.preventDefault();
        return false;
    }
});

// 8. SECURE EXTERNAL LINKS
document.addEventListener('DOMContentLoaded', () => {
    const externalLinks = document.querySelectorAll('a[href^="http"]');
    externalLinks.forEach(link => {
        if (!link.href.includes(window.location.hostname)) {
            link.setAttribute('rel', 'noopener noreferrer');
            link.setAttribute('target', '_blank');
        }
    });
});

// 9. XSS PROTECTION - Sanitize user inputs
function sanitizeInput(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
}

// 10. CSRF TOKEN GENERATION (for forms)
function generateCSRFToken() {
    return Array.from(crypto.getRandomValues(new Uint8Array(32)))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
}

// ===== NAVIGATION FUNCTIONALITY =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.getElementById('navbar');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ===== SCROLL EFFECTS =====
// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Active navigation link on scroll
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav-link[href*=' + sectionId + ']').classList.add('active');
        } else {
            document.querySelector('.nav-link[href*=' + sectionId + ']').classList.remove('active');
        }
    });
}

window.addEventListener('scroll', scrollActive);

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll('.benefit-card, .service-card, .portfolio-item, .mv-card, .stat-item');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===== SECURITY UTILITIES =====
// XSS Protection - Sanitize user input
function sanitizeInput(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Rate limiting for form submissions
const rateLimiter = {
    lastSubmission: 0,
    minInterval: 30000, // 30 seconds between submissions

    canSubmit() {
        const now = Date.now();
        if (now - this.lastSubmission < this.minInterval) {
            return false;
        }
        return true;
    },

    recordSubmission() {
        this.lastSubmission = Date.now();
    },

    getRemainingTime() {
        const elapsed = Date.now() - this.lastSubmission;
        const remaining = Math.ceil((this.minInterval - elapsed) / 1000);
        return remaining > 0 ? remaining : 0;
    }
};

// ===== CONTACT FORM HANDLING WITH SECURITY =====
const contactForm = document.getElementById('contactForm');

// Clear error messages
function clearErrors() {
    document.querySelectorAll('.error-message').forEach(el => {
        el.textContent = '';
        el.style.display = 'none';
    });
}

// Show error message
function showError(fieldId, message) {
    const errorEl = document.getElementById(fieldId + 'Error');
    if (errorEl) {
        errorEl.textContent = message;
        errorEl.style.display = 'block';
    }
}

// Validate form fields
function validateForm() {
    clearErrors();
    let isValid = true;

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();

    // Name validation (required)
    if (!name || name.length < 2) {
        showError('name', 'Name is required and must be at least 2 characters long');
        isValid = false;
    } else if (!/^[A-Za-z\s]+$/.test(name)) {
        showError('name', 'Name can only contain letters and spaces');
        isValid = false;
    }

    // Email validation (required) - Enhanced validation
    if (!email) {
        showError('email', 'Email is required');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showError('email', 'Please enter a valid email address (e.g., name@example.com)');
        isValid = false;
    }

    // Phone validation (required) - Enhanced validation
    if (!phone) {
        showError('phone', 'Phone number is required');
        isValid = false;
    } else if (!isValidPhone(phone)) {
        showError('phone', 'Please enter a valid phone number (6-15 digits, numbers only)');
        isValid = false;
    }

    // Message validation (required)
    if (!message || message.length < 10) {
        showError('message', 'Message is required and must be at least 10 characters long');
        isValid = false;
    } else if (message.length > 1000) {
        showError('message', 'Message must not exceed 1000 characters');
        isValid = false;
    }

    return isValid;
}

// Modal functions
function showModal() {
    console.log('showModal called');
    const modal = document.getElementById('successModal');
    console.log('Modal element:', modal);
    if (modal) {
        modal.style.display = 'flex';
        modal.classList.add('show');
        console.log('Modal displayed');
    } else {
        console.error('Modal element not found!');
        // Fallback alert if modal not found
        alert('Thank you! Your message has been sent successfully. We\'ll get back to you soon.');
    }
}

function closeModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }
}

// Make closeModal available globally
window.closeModal = closeModal;

// Enhanced email validation
function isValidEmail(email) {
    // More strict email validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

// Enhanced phone validation
function isValidPhone(phone) {
    // Remove spaces and check if it's only digits
    const cleanPhone = phone.replace(/\s/g, '');
    // Must be between 6 and 15 digits
    return /^[0-9]{6,15}$/.test(cleanPhone);
}

// Form submission handler - SIMPLIFIED AND DIRECT
if (contactForm) {
    // Remove any existing listeners
    const newForm = contactForm.cloneNode(true);
    contactForm.parentNode.replaceChild(newForm, contactForm);
    const form = document.getElementById('contactForm');

    form.addEventListener('submit', function(e) {
        // ALWAYS prevent default
        e.preventDefault();
        e.stopPropagation();

        console.log('=== FORM SUBMISSION STARTED ===');
        console.log('Button clicked, form submitting...');

        // Check honeypot (spam protection)
        const honeypot = form.querySelector('input[name="bot-field"]');
        if (honeypot && honeypot.value) {
            console.log('Spam detected - aborting');
            return false;
        }

        // Validate form
        console.log('Validating form...');
        if (!validateForm()) {
            console.log('Validation FAILED');
            return false;
        }
        console.log('Validation PASSED');

        // Check rate limiting
        if (!rateLimiter.canSubmit()) {
            console.log('Rate limit exceeded');
            const remaining = rateLimiter.getRemainingTime();
            const rateLimitMsg = document.getElementById('rateLimitMessage');
            if (rateLimitMsg) {
                rateLimitMsg.textContent = `Please wait ${remaining} seconds before sending another message.`;
                rateLimitMsg.style.display = 'block';
                setTimeout(() => {
                    rateLimitMsg.style.display = 'none';
                }, 3000);
            }
            return false;
        }

        // Show loading state
        console.log('Showing loading state...');
        const submitBtn = document.getElementById('submitBtn');
        const btnText = submitBtn ? submitBtn.querySelector('.btn-text') : null;
        const btnLoading = submitBtn ? submitBtn.querySelector('.btn-loading') : null;

        if (submitBtn) {
            console.log('Disabling button...');
            if (btnText) btnText.style.display = 'none';
            if (btnLoading) btnLoading.style.display = 'inline';
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';
            submitBtn.style.cursor = 'not-allowed';
        }

        // Record submission for rate limiting
        rateLimiter.recordSubmission();

        // Show modal after delay
        console.log('Setting timeout for modal...');
        setTimeout(function() {
            console.log('=== SHOWING MODAL NOW ===');

            // Show success modal
            const modal = document.getElementById('successModal');
            if (modal) {
                console.log('Modal element found!');
                modal.style.display = 'flex';
                modal.style.visibility = 'visible';
                modal.style.opacity = '1';
                modal.classList.add('show');
                console.log('Modal should be visible now');
            } else {
                console.error('ERROR: Modal element NOT FOUND!');
                alert('Thank you! Your message has been sent successfully. We\'ll get back to you soon.');
            }

            // Reset form
            if (form) {
                form.reset();
            }
            clearErrors();

            // Reset button state
            if (submitBtn) {
                console.log('Re-enabling button...');
                if (btnText) btnText.style.display = 'inline';
                if (btnLoading) btnLoading.style.display = 'none';
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
                submitBtn.style.cursor = 'pointer';
            }

            console.log('=== FORM SUBMISSION COMPLETE ===');
        }, 1500);

        return false;
    }, true); // Use capture phase

    // Also add click handler to button as backup
    const submitBtn = document.getElementById('submitBtn');
    if (submitBtn) {
        submitBtn.addEventListener('click', function(e) {
            console.log('=== BUTTON CLICKED ===');
            console.log('Button is responsive!');
        }, true);
    }

    console.log('Form submit handler attached successfully');
    console.log('Submit button:', submitBtn);
} else {
    console.error('ERROR: Contact form not found!');
}

// Real-time validation
document.getElementById('name').addEventListener('blur', function() {
    const name = this.value.trim();
    if (!name) {
        showError('name', 'Name is required');
    } else if (name.length < 2) {
        showError('name', 'Name must be at least 2 characters long');
    } else if (!/^[A-Za-z\s]+$/.test(name)) {
        showError('name', 'Name can only contain letters and spaces');
    } else {
        document.getElementById('nameError').style.display = 'none';
    }
});

document.getElementById('email').addEventListener('blur', function() {
    const email = this.value.trim();
    if (!email) {
        showError('email', 'Email is required');
    } else if (!isValidEmail(email)) {
        showError('email', 'Please enter a valid email address (e.g., name@example.com)');
    } else {
        document.getElementById('emailError').style.display = 'none';
    }
});

document.getElementById('phone').addEventListener('blur', function() {
    const phone = this.value.trim();
    if (!phone) {
        showError('phone', 'Phone number is required');
    } else if (!isValidPhone(phone)) {
        showError('phone', 'Please enter a valid phone number (6-15 digits, numbers only)');
    } else {
        document.getElementById('phoneError').style.display = 'none';
    }
});

document.getElementById('message').addEventListener('blur', function() {
    const message = this.value.trim();
    if (!message) {
        showError('message', 'Message is required');
    } else if (message.length < 10) {
        showError('message', 'Message must be at least 10 characters long');
    } else {
        document.getElementById('messageError').style.display = 'none';
    }
});

document.getElementById('message').addEventListener('blur', function() {
    const message = this.value.trim();
    if (message && message.length < 10) {
        showError('message', 'Message must be at least 10 characters long');
    } else {
        document.getElementById('messageError').style.display = 'none';
    }
});

// ===== COUNTER ANIMATION FOR STATS =====
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + (element.textContent.includes('+') ? '+' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + (element.textContent.includes('+') ? '+' : '');
        }
    }, 16);
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statItems = entry.target.querySelectorAll('.stat-item h3');
            statItems.forEach(item => {
                const text = item.textContent;
                const hasPlus = text.includes('+');
                const number = parseInt(text.replace('+', ''));
                item.textContent = '0' + (hasPlus ? '+' : '');
                animateCounter(item, number);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const aboutStats = document.querySelector('.about-stats');
if (aboutStats) {
    statsObserver.observe(aboutStats);
}

// ===== PARALLAX EFFECT FOR HERO =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - scrolled / 700;
    }
});

// ===== LOADING ANIMATION =====
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ===== DYNAMIC YEAR IN FOOTER =====
const currentYear = new Date().getFullYear();
const footerText = document.querySelector('.footer-bottom p');
if (footerText) {
    footerText.innerHTML = footerText.innerHTML.replace('2024', currentYear);
}

// ===== PREVENT FORM RESUBMISSION =====
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}
