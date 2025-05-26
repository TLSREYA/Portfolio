// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Active navigation link update on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// Contact Form Functionality
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    const formInputs = contactForm.querySelectorAll('input, textarea');
    const submitButton = contactForm.querySelector('button[type="submit"]');

    // Add input validation styles
    formInputs.forEach(input => {
        input.addEventListener('input', () => {
            validateInput(input);
        });

        input.addEventListener('blur', () => {
            validateInput(input);
        });
    });

    function validateInput(input) {
        const value = input.value.trim();
        const isValid = value !== '';
        
        if (input.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const isEmailValid = emailRegex.test(value);
            input.classList.toggle('is-invalid', !isEmailValid);
            input.classList.toggle('is-valid', isEmailValid);
        } else {
            input.classList.toggle('is-invalid', !isValid);
            input.classList.toggle('is-valid', isValid);
        }
    }

    function validateForm() {
        let isValid = true;
        formInputs.forEach(input => {
            validateInput(input);
            if (input.classList.contains('is-invalid')) {
                isValid = false;
            }
        });
        return isValid;
    }

    // Form submission handling
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            showNotification('Please fill all fields correctly', 'error');
            return;
        }

        // Disable submit button and show loading state
        submitButton.disabled = true;
        submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending...';

        try {
            const formData = new FormData(contactForm);
            const formObject = Object.fromEntries(formData);
            
            // Here you would typically send the data to your backend
            // For now, we'll simulate an API call
            await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
            
            // Show success message
            showNotification('Message sent successfully! I will get back to you soon.', 'success');
            contactForm.reset();
            
            // Reset form validation states
            formInputs.forEach(input => {
                input.classList.remove('is-valid', 'is-invalid');
            });
        } catch (error) {
            showNotification('Failed to send message. Please try again.', 'error');
        } finally {
            // Re-enable submit button
            submitButton.disabled = false;
            submitButton.innerHTML = 'Send Message';
        }
    });
}

// Notification system
function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;

    // Add to document
    document.body.appendChild(notification);

    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    // Remove notification after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Typing effect for hero section
const heroText = document.querySelector('.hero-section h1');
if (heroText) {
    const text = heroText.textContent;
    heroText.textContent = '';
    let index = 0;

    function typeText() {
        if (index < text.length) {
            heroText.textContent += text.charAt(index);
            index++;
            setTimeout(typeText, 100);
        }
    }

    // Start typing effect when the page loads
    window.addEventListener('load', () => {
        setTimeout(typeText, 500);
    });
}

// Project cards hover effect
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Progress bars animation
const progressBars = document.querySelectorAll('.progress-bar');
const animateProgressBars = () => {
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => {
            bar.style.width = width;
        }, 100);
    });
};

// Trigger progress bars animation when the about section is in view
const aboutSection = document.querySelector('#about');
if (aboutSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateProgressBars();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(aboutSection);

    // Parallax effect for about section background
    window.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = aboutSection.getBoundingClientRect();
        const x = (clientX - left) / width;
        const y = (clientY - top) / height;
        
        aboutSection.style.setProperty('--mouse-x', x);
        aboutSection.style.setProperty('--mouse-y', y);
    });

    // Animate skill items on scroll
    const skillItems = document.querySelectorAll('.skill-item');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, { threshold: 0.2 });

    skillItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        skillObserver.observe(item);
    });

    // Add hover effect for education and experience items
    const timelineItems = document.querySelectorAll('.education-item, .experience-item');
    timelineItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const dot = item.querySelector('::before');
            if (dot) {
                dot.style.transform = 'scale(1.5)';
                dot.style.boxShadow = '0 0 15px var(--primary-color)';
            }
        });

        item.addEventListener('mouseleave', () => {
            const dot = item.querySelector('::before');
            if (dot) {
                dot.style.transform = 'scale(1)';
                dot.style.boxShadow = 'none';
            }
        });
    });
}

// Theme toggle functionality (if needed)
const toggleTheme = () => {
    document.body.classList.toggle('dark-theme');
};

// Particle effect for hero section background
const createParticles = () => {
    const heroSection = document.querySelector('.hero-section');
    if (!heroSection) return;

    // Clear existing particles
    const existingParticles = heroSection.querySelectorAll('.particle');
    existingParticles.forEach(particle => particle.remove());

    // Create new particles
    for (let i = 0; i < 75; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random positioning
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.top = Math.random() * 100 + 'vh';
        
        // Random size
        const size = Math.random() * 4 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Random animation duration and delay
        particle.style.animationDuration = (Math.random() * 4 + 3) + 's';
        particle.style.animationDelay = (Math.random() * 2) + 's';
        
        // Random opacity
        particle.style.opacity = Math.random() * 0.3 + 0.1;
        
        // Add mouse interaction
        particle.addEventListener('mouseover', () => {
            particle.style.transform = 'scale(1.5)';
            particle.style.opacity = '0.5';
        });
        
        particle.addEventListener('mouseout', () => {
            particle.style.transform = 'scale(1)';
            particle.style.opacity = Math.random() * 0.3 + 0.1;
        });
        
        heroSection.appendChild(particle);
    }
};

// Initialize particle effect and recreate on window resize
window.addEventListener('load', createParticles);
window.addEventListener('resize', createParticles);

// Add mouse move effect for particles
document.querySelector('.hero-section').addEventListener('mousemove', (e) => {
    const particles = document.querySelectorAll('.particle');
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    particles.forEach(particle => {
        const rect = particle.getBoundingClientRect();
        const particleX = rect.left + rect.width / 2;
        const particleY = rect.top + rect.height / 2;
        
        const deltaX = mouseX - particleX;
        const deltaY = mouseY - particleY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        
        if (distance < 100) {
            const angle = Math.atan2(deltaY, deltaX);
            const force = (100 - distance) / 100;
            particle.style.transform = `translate(${Math.cos(angle) * force * 20}px, ${Math.sin(angle) * force * 20}px)`;
        }
    });
}); 