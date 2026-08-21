const dismissPreloader = () => {
  document.body.classList.remove("is-loading");
  const preloader = document.getElementById("preloader");
  if (!preloader) return;
  preloader.classList.add("hide");
  setTimeout(() => preloader.remove(), 250);
};

const initProjectFilters = () => {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".projects-grid .project-card");

  if (!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const selectedFilter = btn.getAttribute("data-filter");

      filterBtns.forEach((b) => {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");

      projectCards.forEach((card) => {
        const category = card.getAttribute("data-category") || "";
        const categories = category.split(/\s+/);
        const isMatch = selectedFilter === "all" || categories.includes(selectedFilter);

        if (isMatch) {
          card.classList.remove("is-hidden");
        } else {
          card.classList.add("is-hidden");
        }
      });
    });
  });
};

let toastTimeout = null;

const showToast = (message) => {
  const toast = document.getElementById("toast");
  const toastText = toast ? toast.querySelector(".toast-text") : null;
  if (!toast || !toastText) return;

  toastText.textContent = message;
  toast.classList.add("show");

  if (toastTimeout) {
    clearTimeout(toastTimeout);
  }

  toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 2400);
};

const copyToClipboard = async (text, label) => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
    } else {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
    }
    showToast(`Copied ${label || text} to clipboard!`);
  } catch (err) {
    showToast(`Failed to copy: ${text}`);
  }
};

const initCopyButtons = () => {
  const copyBtns = document.querySelectorAll(".copy-btn");
  if (!copyBtns.length) return;

  copyBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      const text = btn.getAttribute("data-copy");
      const label = btn.getAttribute("data-label");

      if (text) {
        copyToClipboard(text, label);
        const icon = btn.querySelector("i");
        if (icon) {
          icon.className = "bx bx-check";
          btn.classList.add("copied");
          setTimeout(() => {
            icon.className = "bx bx-copy";
            btn.classList.remove("copied");
          }, 1500);
        }
      }
    });
  });
};

const initScrollEnhancements = () => {
  const progressBar = document.getElementById("scroll-progress");
  const backToTopBtn = document.getElementById("back-to-top");
  const navLinks = document.querySelectorAll(".nav-links a");
  const sections = document.querySelectorAll("header[id], section[id]");

  const handleScroll = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

    // Scroll progress bar
    if (progressBar && scrollHeight > 0) {
      const progressPercent = (scrollTop / scrollHeight) * 100;
      progressBar.style.width = `${progressPercent}%`;
    }

    // Back to top button
    if (backToTopBtn) {
      if (scrollTop > 350) {
        backToTopBtn.classList.add("show");
      } else {
        backToTopBtn.classList.remove("show");
      }
    }

    // Active link highlighting
    let currentSectionId = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute("id");
      }
    });

    if (currentSectionId) {
      navLinks.forEach((link) => {
        if (link.getAttribute("href") === `#${currentSectionId}`) {
          link.classList.add("active");
        } else {
          link.classList.remove("active");
        }
      });
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }
};

const initMobileNav = () => {
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-links a, .nav-cv-btn");

  if (!navToggle || !navMenu) return;

  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    const icon = navToggle.querySelector("i");
    if (icon) {
      icon.className = isOpen ? "bx bx-x" : "bx bx-menu";
    }
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navMenu.classList.contains("open")) {
        navMenu.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
        const icon = navToggle.querySelector("i");
        if (icon) icon.className = "bx bx-menu";
      }
    });
  });
};

const initThemeToggle = () => {
  const themeToggles = document.querySelectorAll(".theme-toggle");
  const root = document.documentElement;

  const getPreferredTheme = () => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  };

  const applyTheme = (theme, showNotification = false) => {
    root.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);

    themeToggles.forEach((btn) => {
      const icon = btn.querySelector("i");
      if (icon) {
        icon.className = theme === "dark" ? "bx bx-sun" : "bx bx-moon";
      }
      const label = `Switch to ${theme === "dark" ? "light" : "dark"} mode`;
      btn.setAttribute("aria-label", label);
      btn.setAttribute("title", label);
    });

    if (showNotification) {
      showToast(`${theme === "dark" ? "🌙 Dark" : "☀️ Light"} mode enabled`);
    }
  };

  // Sync state on load
  applyTheme(getPreferredTheme(), false);

  themeToggles.forEach((btn) => {
    btn.addEventListener("click", () => {
      const current = root.getAttribute("data-theme") === "dark" ? "dark" : "light";
      const next = current === "dark" ? "light" : "dark";
      applyTheme(next, true);
    });
  });

  // Listen to OS theme changes if user hasn't explicitly overridden
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
    if (!localStorage.getItem("theme")) {
      applyTheme(e.matches ? "dark" : "light", false);
    }
  });
};

const initApp = () => {
  initThemeToggle();
  dismissPreloader();
  initProjectFilters();
  initCopyButtons();
  initScrollEnhancements();
  initMobileNav();
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}




  