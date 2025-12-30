// DOM Elements
const navbar = document.querySelector('.navbar');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const typingText = document.querySelector('.typing-text');
const portfolioItems = document.querySelectorAll('.portfolio-item');

// Mobile Menu
if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Scroll Header Style
// Scroll Header Style Removed to use CSS properties only

// Typing Text
const texts = ["Android Developer", "Desktop App Developer", "VBA & Office Expert", "Accountant"];
let count = 0;
let index = 0;
let currentText = "";
let letter = "";

(function type() {
    if (count === texts.length) {
        count = 0;
    }
    currentText = texts[count];
    letter = currentText.slice(0, ++index);

    if (typingText) {
        typingText.textContent = letter;
        if (letter.length === currentText.length) {
            count++;
            index = 0;
            setTimeout(type, 2000); // pause at end
        } else {
            setTimeout(type, 100);
        }
    }
}());

// Snap Scroll Animations
const projectObserverOptions = {
    threshold: 0.5
};

const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Find the year background within this portfolio item and animate it
            const yearBg = entry.target.querySelector('.project-year-bg');
            if (yearBg) yearBg.classList.add('visible');
        } else {
            // Optional: Remove class to replay animation when scrolling back
            entry.target.classList.remove('visible');
            const yearBg = entry.target.querySelector('.project-year-bg');
            if (yearBg) yearBg.classList.remove('visible');
        }
    });
}, projectObserverOptions);

document.querySelectorAll('.portfolio-item').forEach(el => {
    projectObserver.observe(el);
});

// Snap Scroll Animation Trigger
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Optional: Loading media if we wanted scroll-based lazy load
            // but user asked for sequential after load.
        }
    });
}, observerOptions);

portfolioItems.forEach(item => {
    observer.observe(item);
});

// Also observe standard scroll elements if any
const scrollElements = document.querySelectorAll('.animate-scroll, .animate-fade-up');
const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

scrollElements.forEach(el => scrollObserver.observe(el));

// Sequential Media Loading (GIFs)
window.addEventListener('load', () => {
    const mediaList = document.querySelectorAll('.lazy-media');
    let mediaIndex = 0;

    function loadNextMedia() {
        if (mediaIndex >= mediaList.length) return;

        const img = mediaList[mediaIndex];
        const src = img.getAttribute('data-src');

        if (src) {
            // Create a temp image to download
            const tempImg = new Image();
            tempImg.src = src;
            tempImg.onload = () => {
                img.src = src; // Swap source
                mediaIndex++;
                loadNextMedia(); // Load next
            };
            tempImg.onerror = () => {
                console.warn('Failed to load:', src);
                mediaIndex++;
                loadNextMedia();
            };
        } else {
            mediaIndex++;
            loadNextMedia();
        }
    }

    // Start loading sequence
    loadNextMedia();
});


// Full Canvas Background
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let width, height;
let particles = [];

// Adjust mouse interaction
let mouse = { x: null, y: null, radius: 150 };
window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
});

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

function initParticles() {
    particles = [];
    const numberOfParticles = (width * height) / 5000;
    for (let i = 0; i < numberOfParticles; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 2 + 1,
            color: 'rgba(100, 255, 218, ' + (Math.random() * 0.5 + 0.1) + ')'
        });
    }
}

function drawParticles() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
        // Update
        p.x += p.vx;
        p.y += p.vy;

        // Bounce
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Mouse Interact
        if (mouse.x != null) {
            let dx = mouse.x - p.x;
            let dy = mouse.y - p.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < mouse.radius) {
                const angle = Math.atan2(dy, dx);
                const force = (mouse.radius - distance) / mouse.radius;
                const moveX = Math.cos(angle) * force * 2;
                const moveY = Math.sin(angle) * force * 2;
                p.x -= moveX;
                p.y -= moveY;
            }
        }

        // Draw
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
    });

    requestAnimationFrame(drawParticles);
}

window.addEventListener('resize', () => {
    resize();
    initParticles();
});

resize();
initParticles();
drawParticles();

// Keyboard Scrolling Support
window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
        e.preventDefault();
        window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        window.scrollBy({ top: -window.innerHeight, behavior: 'smooth' });
    }
});
