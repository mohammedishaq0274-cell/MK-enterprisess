// Enhanced script.js with smooth animations and functionality
document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle
    const body = document.body;
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme');
    
    if (currentTheme === 'light') {
        body.classList.add('light-mode');
    }
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('light-mode');
            const theme = body.classList.contains('light-mode') ? 'light' : 'dark';
            localStorage.setItem('theme', theme);
            
            // Add animation to theme toggle
            themeToggle.style.transform = 'scale(0.95)';
            setTimeout(() => {
                themeToggle.style.transform = 'scale(1)';
            }, 150);
        });
    }

    // Lazy-load non-critical images
    try {
        const imgs = document.querySelectorAll('img');
        imgs.forEach(img => {
            if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }
            if (!img.hasAttribute('decoding')) {
                img.setAttribute('decoding', 'async');
            }
        });
    } catch (_) {}

    // Smooth scrolling for navigation links
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

    // Category Filter with smooth animations
    const filterSelect = document.getElementById('category-filter');
    const categories = document.querySelectorAll('.product-category');
    
    if (filterSelect && categories.length > 0) {
        filterSelect.addEventListener('change', (e) => {
            try {
                const selected = e.target.value;
                
                categories.forEach((cat, index) => {
                    if (selected === 'all' || cat.dataset.category === selected) {
                        cat.style.display = 'block';
                        cat.classList.remove('hidden');
                        // Stagger the animation
                        setTimeout(() => {
                            cat.style.opacity = '1';
                            cat.style.transform = 'translateY(0)';
                        }, index * 100);
                    } else {
                        cat.style.opacity = '0';
                        cat.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            cat.classList.add('hidden');
                            cat.style.display = 'none';
                        }, 300);
                    }
                });
            } catch (error) {
                console.error('Error in category filter:', error);
            }
        });
    }

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    try {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe elements for scroll animations
        const animatedElements = document.querySelectorAll('.category-card, .product-card, .industry-logo');
        animatedElements.forEach(el => {
            el.classList.add('fade-in');
            observer.observe(el);
        });
    } catch (error) {
        console.error('Error setting up scroll animations:', error);
    }

    // Navbar scroll effect
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                // Scrolling down
                navbar.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up
                navbar.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop;
        });
    }

    // WhatsApp integration function
    function openWhatsApp() {
        try {
            // Replace with your actual WhatsApp number (include country code without +)
            const phoneNumber = '919885957350'; // Your phone number from the footer
            const message = 'Hello! I am interested in your products and services. Please provide more information.';
            
            // Create WhatsApp URL
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
            
            // Open WhatsApp in a new tab
            window.open(whatsappUrl, '_blank');
        } catch (error) {
            console.error('Error opening WhatsApp:', error);
            // Fallback: show an alert if WhatsApp fails to open
            alert('Please contact us at +91 98859 57350 for more information.');
        }
    }

    // Make the function globally available
    window.openWhatsApp = openWhatsApp;

    // Form submission with WhatsApp integration
    const enquiryForm = document.querySelector('.enquiry-form');
    if (enquiryForm) {
        enquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            try {
                const submitBtn = this.querySelector('button[type="submit"]');
                const emailInput = this.querySelector('input[type="email"]');
                
                if (!submitBtn) {
                    console.error('Submit button not found');
                    return;
                }
                
                // Validate email if provided
                if (emailInput && emailInput.value && !isValidEmail(emailInput.value)) {
                    alert('Please enter a valid email address.');
                    return;
                }
                
                const originalText = submitBtn.textContent;
                
                // Show loading state
                submitBtn.innerHTML = '<span class="loading"></span> Submitting...';
                submitBtn.disabled = true;
                
                // Simulate form submission and redirect to WhatsApp
                setTimeout(() => {
                    submitBtn.textContent = 'Redirecting to WhatsApp...';
                    submitBtn.style.background = 'linear-gradient(45deg, #25D366, #128C7E)';
                    
                    setTimeout(() => {
                        openWhatsApp();
                        // Reset button after a delay
                        setTimeout(() => {
                            submitBtn.textContent = originalText;
                            submitBtn.disabled = false;
                            submitBtn.style.background = '';
                            if (emailInput) emailInput.value = ''; // Clear form
                        }, 2000);
                    }, 1000);
                }, 1000);
            } catch (error) {
                console.error('Error in form submission:', error);
                alert('An error occurred. Please try again or contact us directly.');
            }
        });
    }
    
    // Email validation helper function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});