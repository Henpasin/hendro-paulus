(() => {
  const root = document.documentElement;
  const toggle = document.getElementById("themeToggle");
  const toggleIcon = toggle.querySelector("i");
  const navbar = document.querySelector(".navbar");
  const year = document.getElementById("year");
  const glow = document.querySelector(".cursor-glow");
  const navLinks = [...document.querySelectorAll(".nav-link")];

  year.textContent = new Date().getFullYear();

  const savedTheme = localStorage.getItem("portfolio-theme");
  if (savedTheme) {
    root.setAttribute("data-bs-theme", savedTheme);
  }

  const syncThemeIcon = () => {
    const isDark = root.getAttribute("data-bs-theme") === "dark";
    toggleIcon.className = isDark ? "bi bi-sun-fill" : "bi bi-moon-stars-fill";
  };

  syncThemeIcon();

  toggle.addEventListener("click", () => {
    const current = root.getAttribute("data-bs-theme");
    const next = current === "dark" ? "light" : "dark";
    root.setAttribute("data-bs-theme", next);
    localStorage.setItem("portfolio-theme", next);
    syncThemeIcon();
  });

  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 24);
  });

  if (glow) {
    window.addEventListener("mousemove", (e) => {
      glow.style.left = `${e.clientX}px`;
      glow.style.top = `${e.clientY}px`;
    });
  }

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

  const sections = [...document.querySelectorAll("main section[id]")];
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${entry.target.id}`
          );
        });
      });
    },
    { rootMargin: "-45% 0px -45% 0px" }
  );

  sections.forEach((section) => sectionObserver.observe(section));

  document.querySelectorAll(".navbar-collapse .nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      const collapseEl = document.getElementById("mainNav");
      const collapse = bootstrap.Collapse.getInstance(collapseEl);
      if (collapse) collapse.hide();
    });
  });
})();
