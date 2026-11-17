/* =========================================================
   DELEEP KAMATH — PORTFOLIO INTERACTIONS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const themeToggle = document.getElementById("themeToggle");
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".nav-link");
  const yearElement = document.getElementById("currentYear");

  /* -----------------------------------------
     1. Automatic footer year
  ----------------------------------------- */

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  /* -----------------------------------------
     2. Dark / light theme
  ----------------------------------------- */

  const savedTheme = localStorage.getItem("portfolio-theme");

  if (savedTheme === "light") {
    body.setAttribute("data-theme", "light");
  }

  function updateThemeIcon() {
    const isLight = body.getAttribute("data-theme") === "light";

    if (themeToggle) {
      themeToggle.innerHTML = isLight
        ? '<i class="fa-solid fa-moon"></i>'
        : '<i class="fa-solid fa-sun"></i>';

      themeToggle.setAttribute(
        "aria-label",
        isLight ? "Switch to dark theme" : "Switch to light theme"
      );
    }
  }

  updateThemeIcon();

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const isLight = body.getAttribute("data-theme") === "light";

      if (isLight) {
        body.removeAttribute("data-theme");
        localStorage.setItem("portfolio-theme", "dark");
      } else {
        body.setAttribute("data-theme", "light");
        localStorage.setItem("portfolio-theme", "light");
      }

      updateThemeIcon();
    });
  }

  /* -----------------------------------------
     3. Mobile navigation
  ----------------------------------------- */

  function closeMenu() {
    if (!navMenu || !menuToggle) return;

    navMenu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
  }

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("open");

      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
      );

      menuToggle.innerHTML = isOpen
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", (event) => {
      const clickedInsideMenu = navMenu.contains(event.target);
      const clickedToggle = menuToggle.contains(event.target);

      if (!clickedInsideMenu && !clickedToggle) {
        closeMenu();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 760) {
        closeMenu();
      }
    });
  }

  /* -----------------------------------------
     4. Scroll reveal animations
  ----------------------------------------- */

  const revealElements = document.querySelectorAll(".reveal");

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if ("IntersectionObserver" in window && !prefersReducedMotion) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -35px 0px"
      }
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("visible");
    });
  }

  /* -----------------------------------------
     5. Active navigation link on scroll
  ----------------------------------------- */

  const sections = document.querySelectorAll("main section[id]");

  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const currentId = entry.target.getAttribute("id");

            navLinks.forEach((link) => {
              const isCurrent = link.getAttribute("href") === `#${currentId}`;

              link.classList.toggle("active", isCurrent);
            });
          }
        });
      },
      {
        rootMargin: "-30% 0px -60% 0px"
      }
    );

    sections.forEach((section) => {
      sectionObserver.observe(section);
    });
  }
});

