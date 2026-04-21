// Initialize Lenis for Smooth Scrolling
const lenis = new Lenis({
    duration: 1.4,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Custom Cursor
const cursor = document.querySelector("#cursor");
const cursorInner = document.createElement("div");
cursorInner.classList.add("cursor-inner");
cursor.appendChild(cursorInner);

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    let dx = mouseX - cursorX;
    let dy = mouseY - cursorY;
    
    cursorX += dx * 0.15;
    cursorY += dy * 0.15;
    
    cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
    
    requestAnimationFrame(animateCursor);
}
animateCursor();

// Cursor Interaction
const interactiveElements = document.querySelectorAll("a, button, input, textarea, .game-card");
interactiveElements.forEach(el => {
    el.addEventListener("mouseenter", () => {
        cursor.classList.add("cursor-active");
        gsap.to(cursor, { scale: 2.5, duration: 0.3 });
    });
    el.addEventListener("mouseleave", () => {
        cursor.classList.remove("cursor-active");
        gsap.to(cursor, { scale: 1, duration: 0.3 });
    });
});

// Hero Particles
const canvas = document.getElementById("hero-particles");
if (canvas) {
    const ctx = canvas.getContext("2d");
    let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

class Particle {
    constructor() {
        this.reset();
    }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width || this.x < 0 || this.y > canvas.height || this.y < 0) {
            this.reset();
        }
    }
    draw() {
        ctx.fillStyle = `rgba(0, 242, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

for (let i = 0; i < 100; i++) {
    particles.push(new Particle());
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animateParticles);
}
animateParticles();
}

// Hero Animation
const heroTl = gsap.timeline();
heroTl.from("nav", {
    y: -50,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
})
.from("#hero h1", {
    clipPath: "inset(0 100% 0 0)",
    opacity: 0,
    duration: 1.5,
    ease: "power4.out"
}, "-=0.5")
.from("#hero p", {
    y: 30,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
}, "-=1")
.from(".hero-btns", {
    y: 20,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
}, "-=0.8");

// Reveal Animations
const revealElements = document.querySelectorAll(".reveal");
revealElements.forEach((el) => {
    gsap.to(el, {
        scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none"
        },
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out"
    });
});

// Magnetic Buttons Effect
const storeButtons = document.querySelectorAll(".btn-amazon, .btn-primary");
storeButtons.forEach(btn => {
    btn.addEventListener("mousemove", (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(btn, {
            x: x * 0.3,
            y: y * 0.3,
            duration: 0.3,
            ease: "power2.out"
        });
    });
    
    btn.addEventListener("mouseleave", () => {
        gsap.to(btn, {
            x: 0,
            y: 0,
            duration: 0.3,
            ease: "power2.out"
        });
    });
});

// Game Card Hover Parallax
const gameCards = document.querySelectorAll(".game-card");
gameCards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        
        gsap.to(card.querySelector("img"), {
            x: x * 20,
            y: y * 20,
            duration: 0.5,
            ease: "power2.out"
        });
    });
    
    card.addEventListener("mouseleave", () => {
        gsap.to(card.querySelector("img"), {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: "power2.out"
        });
    });
});
