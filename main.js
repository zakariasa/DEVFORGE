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
window.addEventListener("mousemove", (e) => {
    gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out"
    });
});

// Hero Animation
const heroTl = gsap.timeline();
heroTl.from("#hero h1", {
    y: 100,
    opacity: 0,
    duration: 1.2,
    ease: "power4.out",
    stagger: 0.2
})
.from("#hero p", {
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out"
}, "-=0.8")
.from(".hero-btns", {
    y: 20,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out"
}, "-=0.6")
.from("nav", {
    y: -100,
    opacity: 0,
    duration: 1.2,
    ease: "power4.out"
}, "-=1.2");

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
