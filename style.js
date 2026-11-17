```javascript
/* =========================================
   1. DARK / LIGHT MODE
========================================= */

const toggleMode = document.getElementById("toggleMode");

// Restore saved theme
const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "light") {
    document.body.classList.add("light");
}

// Update theme button icon
function updateThemeIcon() {

    const isLight = document.body.classList.contains("light");

    toggleMode.innerHTML = isLight
        ? '<i class="fas fa-moon"></i>'
        : '<i class="fas fa-sun"></i>';

    toggleMode.setAttribute(
        "aria-label",
        isLight ? "Switch to dark mode" : "Switch to light mode"
    );
}

updateThemeIcon();

// Toggle theme
toggleMode.addEventListener("click", () => {

    document.body.classList.toggle("light");

    const isLight = document.body.classList.contains("light");

    localStorage.setItem(
        "portfolio-theme",
        isLight ? "light" : "dark"
    );

    updateThemeIcon();

});


/* =========================================
   2. MOBILE NAVIGATION
========================================= */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

function closeMenu() {

    navLinks.classList.remove("active");

    menuBtn.setAttribute("aria-expanded", "false");

    menuBtn.innerHTML = '<i class="fas fa-bars"></i>';

}

// Open and close mobile menu
menuBtn.addEventListener("click", () => {

    const isOpen = navLinks.classList.toggle("active");

    menuBtn.setAttribute("aria-expanded", isOpen);

    menuBtn.innerHTML = isOpen
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';

});

// Close menu when a navigation link is clicked
document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", closeMenu);

});

// Close menu when clicking outside
document.addEventListener("click", (event) => {

    const clickedInsideMenu = navLinks.contains(event.target);
    const clickedMenuButton = menuBtn.contains(event.target);

    if (!clickedInsideMenu && !clickedMenuButton) {
        closeMenu();
    }

});

// Close menu when switching to desktop width
window.addEventListener("resize", () => {

    if (window.innerWidth > 800) {
        closeMenu();
    }

});


/* =========================================
   3. SCROLL REVEAL ANIMATIONS
========================================= */

const revealElements = document.querySelectorAll(".reveal");

const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

if ("IntersectionObserver" in window && !prefersReducedMotion) {

    const observer = new IntersectionObserver((entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                observer.unobserve(entry.target);

            }

        });

    }, {
        threshold: 0.12
    });

    revealElements.forEach(element => {
        observer.observe(element);
    });

} else {

    // Display all content when animations are unsupported or disabled
    revealElements.forEach(element => {
        element.classList.add("visible");
    });

}


/* =========================================
   4. AUTOMATIC FOOTER YEAR
========================================= */

const currentYear = document.getElementById("currentYear");

currentYear.textContent = new Date().getFullYear();
```
