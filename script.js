const dismissPreloader = () => {
  document.body.classList.remove("is-loading");
  const preloader = document.getElementById("preloader");
  if (!preloader) return;
  preloader.classList.add("hide");
  setTimeout(() => preloader.remove(), 350);
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
          card.classList.add("filter-animating-in");
          card.classList.remove("filter-animating-out");
        } else {
          card.classList.add("filter-animating-out");
          setTimeout(() => {
            if (card.classList.contains("filter-animating-out")) {
              card.classList.add("is-hidden");
            }
          }, 200);
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
  toast.classList.remove("show");
  // Trigger reflow for re-animation
  void toast.offsetWidth;
  toast.classList.add("show");

  if (toastTimeout) {
    clearTimeout(toastTimeout);
  }

  toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 2600);
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
          }, 1600);
        }
      }
    });
  });
};

const initScrollEnhancements = () => {
  const progressBar = document.getElementById("scroll-progress");
  const backToTopBtn = document.getElementById("back-to-top");
  const navbar = document.getElementById("navbar");
  const navLinks = document.querySelectorAll(".nav-links a");
  const sections = document.querySelectorAll("header[id], section[id]");
  const heroPhoto = document.querySelector(".hero-photo-frame img");

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let ticking = false;

  const handleScroll = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

    // Smooth scroll progress bar
    if (progressBar && scrollHeight > 0) {
      const progressPercent = (scrollTop / scrollHeight) * 100;
      progressBar.style.width = `${progressPercent}%`;
    }

    // Navbar scrolled state elevation
    if (navbar) {
      if (scrollTop > 20) {
        navbar.classList.add("is-scrolled");
      } else {
        navbar.classList.remove("is-scrolled");
      }
    }

    // Back to top button
    if (backToTopBtn) {
      if (scrollTop > 350) {
        backToTopBtn.classList.add("show");
      } else {
        backToTopBtn.classList.remove("show");
      }
    }

    // Pro Multi-Layer Parallax Depth on Hero
    const heroBadge = document.querySelector(".hero-badge");
    if (heroPhoto && !prefersReducedMotion && scrollTop < 900) {
      const parallaxPhoto = (scrollTop * 0.1).toFixed(2);
      const parallaxBadge = (scrollTop * 0.15).toFixed(2);
      heroPhoto.style.transform = `translate3d(0, ${parallaxPhoto}px, 0) scale(1.02)`;
      if (heroBadge) {
        heroBadge.style.transform = `translate3d(0, -${parallaxBadge * 0.4}px, 0)`;
      }
    }

    // Scroll-Driven Laser Progress for Timeline
    const timeline = document.querySelector(".timeline");
    const timelineItems = document.querySelectorAll(".timeline-item");
    if (timeline && timelineItems.length > 0) {
      const rect = timeline.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const start = windowHeight * 0.75;
      const end = windowHeight * 0.25;

      if (rect.top <= start && rect.bottom >= end) {
        const totalHeight = rect.height;
        const progressPx = Math.min(Math.max(0, start - rect.top), totalHeight);
        const progressPercent = (progressPx / totalHeight) * 100;
        timeline.style.setProperty("--timeline-progress", `${progressPercent.toFixed(1)}%`);
      } else if (rect.top > start) {
        timeline.style.setProperty("--timeline-progress", "0%");
      } else if (rect.bottom < end) {
        timeline.style.setProperty("--timeline-progress", "100%");
      }

      timelineItems.forEach((item) => {
        const itemRect = item.getBoundingClientRect();
        if (itemRect.top <= windowHeight * 0.68) {
          item.classList.add("is-active");
        } else {
          item.classList.remove("is-active");
        }
      });
    }

    // Active link highlighting
    let currentSectionId = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 150;
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

    ticking = false;
  };

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        window.requestAnimationFrame(handleScroll);
        ticking = true;
      }
    },
    { passive: true }
  );

  handleScroll();

  // Smooth Momentum Anchor Navigation with dynamic navbar offset
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const navHeight = navbar ? navbar.offsetHeight : 70;
        const targetPos = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 14;
        window.scrollTo({
          top: targetPos,
          behavior: "smooth"
        });
        if (history.pushState) {
          history.pushState(null, null, href);
        }
      }
    });
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }
};

const initCardSpotlightGlow = () => {
  const spotlightCards = document.querySelectorAll(
    ".project-card, .cert-card, .focus-card, .seo-page-card, .skill-logo-card, .tool-card, .timeline-content"
  );

  spotlightCards.forEach((card) => {
    card.addEventListener(
      "mousemove",
      (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
      },
      { passive: true }
    );
  });
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

const initScrollReveal = () => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) {
    document
      .querySelectorAll(".reveal-item, .reveal-scale, .reveal-slide-right")
      .forEach((el) => el.classList.add("is-revealed"));
    return;
  }

  // Assign contextual animation styles
  document.querySelectorAll(".timeline-item").forEach((el) => el.classList.add("reveal-slide-right"));
  document
    .querySelectorAll(".skill-logo-card, .tool-card, .contact-card, .metric-card, .seo-page-card")
    .forEach((el) => el.classList.add("reveal-scale"));
  document
    .querySelectorAll(".section, .focus-card, .language-card, .project-card, .cert-card, .faq-item, .quick-message-box")
    .forEach((el) => el.classList.add("reveal-item"));

  const allRevealElements = document.querySelectorAll(".reveal-item, .reveal-scale, .reveal-slide-right");
  if (!allRevealElements.length) return;

  // Track parent grids to automatically stagger sibling cards
  const parentGrids = new Set();
  allRevealElements.forEach((el) => {
    if (el.parentElement) {
      parentGrids.add(el.parentElement);
    }
  });

  parentGrids.forEach((parent) => {
    const children = parent.querySelectorAll(":scope > .reveal-item, :scope > .reveal-scale, :scope > .reveal-slide-right");
    if (children.length > 1) {
      children.forEach((child, idx) => {
        const delay = Math.min((idx % 12) * 0.075, 0.55);
        child.style.setProperty("--reveal-delay", `${delay}s`);
      });
    }
  });

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          obs.unobserve(entry.target);
        }
      });
    },
    {
      rootMargin: "0px 0px -40px 0px",
      threshold: 0.05
    }
  );

  allRevealElements.forEach((el) => observer.observe(el));
};

const initMetricsCounter = () => {
  const metricCards = document.querySelectorAll(".metric-card");
  if (!metricCards.length) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const numEl = entry.target.querySelector(".metric-num");
          if (numEl) {
            const raw = numEl.textContent.trim();
            const match = raw.match(/^(\d+)(\+?)$/);
            if (match) {
              const targetVal = parseInt(match[1], 10);
              const suffix = match[2] || "";
              const duration = 1200;
              const startTime = performance.now();

              const updateCount = (now) => {
                const elapsed = now - startTime;
                const progress = Math.min(elapsed / duration, 1);
                // Smooth exponential ease-out
                const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
                const current = Math.floor(easeOut * targetVal);
                numEl.textContent = `${current}${suffix}`;

                if (progress < 1) {
                  requestAnimationFrame(updateCount);
                } else {
                  numEl.textContent = `${targetVal}${suffix}`;
                }
              };

              requestAnimationFrame(updateCount);
            }
          }
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  metricCards.forEach((c) => observer.observe(c));
};

const initLanguageProgressBars = () => {
  const languageCards = document.querySelectorAll(".language-card");
  if (!languageCards.length) return;

  languageCards.forEach((card) => {
    const abilities = card.querySelectorAll(".ability");
    abilities.forEach((ability) => {
      const valEl = ability.querySelector(".ability-value");
      if (!valEl) return;

      const match = valEl.textContent.match(/(\d+)%/);
      if (match) {
        const pct = match[1];
        // If track doesn't exist yet, insert it
        let track = ability.querySelector(".ability-track");
        if (!track) {
          track = document.createElement("div");
          track.className = "ability-track";
          const bar = document.createElement("div");
          bar.className = "ability-bar";
          bar.style.setProperty("--progress-pct", `${pct}%`);
          track.appendChild(bar);
          ability.appendChild(track);
        }
      }
    });
  });
};

const initTypingEffect = () => {
  const el = document.getElementById("typing-role");
  if (!el) return;

  const rawWords = el.getAttribute("data-words");
  let words = ["Backend & Web Builder", "Python & API Developer", "Automation & Scraping Specialist", "IT Student @ Wolaita Sodo"];
  try {
    if (rawWords) words = JSON.parse(rawWords);
  } catch (e) {
    // fallback
  }

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 90;

  const type = () => {
    const currentWord = words[wordIndex];
    if (isDeleting) {
      el.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 45;
    } else {
      el.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 90;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      typeSpeed = 2200; // Pause at end of word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typeSpeed = 450; // Pause before typing next word
    }

    setTimeout(type, typeSpeed);
  };

  setTimeout(type, 1000);
};

const init3DTilt = () => {
  // Only apply tilt on non-touch devices
  if (window.matchMedia("(pointer: coarse)").matches) return;

  const tiltCards = document.querySelectorAll(
    ".project-card, .cert-card, .hero-photo-frame, .focus-card, .metric-card"
  );

  tiltCards.forEach((card) => {
    let bounds;

    const onMouseEnter = () => {
      bounds = card.getBoundingClientRect();
      card.style.transition = "transform 0.1s ease-out, box-shadow 0.25s ease";
    };

    const onMouseMove = (e) => {
      if (!bounds) bounds = card.getBoundingClientRect();
      const mouseX = e.clientX - bounds.left;
      const mouseY = e.clientY - bounds.top;
      const xPct = mouseX / bounds.width - 0.5;
      const yPct = mouseY / bounds.height - 0.5;

      const rotateX = (-yPct * 10).toFixed(2);
      const rotateY = (xPct * 10).toFixed(2);

      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    };

    const onMouseLeave = () => {
      card.style.transition = "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease";
      card.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0)";
    };

    card.addEventListener("mouseenter", onMouseEnter);
    card.addEventListener("mousemove", onMouseMove);
    card.addEventListener("mouseleave", onMouseLeave);
  });
};

const initLightbox = () => {
  const modal = document.getElementById("lightbox-modal");
  const modalImg = document.getElementById("lightbox-img");
  const modalCaption = document.getElementById("lightbox-caption");
  const closeBtn = document.getElementById("lightbox-close");
  const backdrop = document.getElementById("lightbox-backdrop");

  if (!modal || !modalImg || !closeBtn || !backdrop) return;

  const openLightbox = (imgSrc, captionText) => {
    modalImg.src = imgSrc;
    modalImg.alt = captionText || "Preview";
    if (modalCaption) {
      modalCaption.textContent = captionText || "";
    }
    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    setTimeout(() => {
      if (!modal.classList.contains("active")) {
        modalImg.src = "";
      }
    }, 300);
  };

  // Attach to lightbox links (e.g. certificates)
  const lightboxLinks = document.querySelectorAll('[data-lightbox="true"]');
  lightboxLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const href = link.getAttribute("href");
      const caption = link.getAttribute("data-caption") || link.querySelector("h3")?.textContent || "";
      if (href) {
        openLightbox(href, caption);
      }
    });
  });

  closeBtn.addEventListener("click", closeLightbox);
  backdrop.addEventListener("click", closeLightbox);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeLightbox();
    }
  });
};

const initQuickContactForm = () => {
  const form = document.getElementById("quick-contact-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("form-name")?.value.trim() || "";
    const contactInfo = document.getElementById("form-email")?.value.trim() || "";
    const message = document.getElementById("form-message")?.value.trim() || "";

    if (!name || !contactInfo || !message) {
      showToast("Please fill in all fields");
      return;
    }

    // Compose prefilled telegram or mailto message
    const formattedMsg = `Hi Tegegn, my name is ${name} (${contactInfo}).\n\n${message}`;
    const telegramUrl = `https://t.me/tegegndev?text=${encodeURIComponent(formattedMsg)}`;

    showToast("Opening Telegram to send your message...");
    window.open(telegramUrl, "_blank", "noopener,noreferrer");

    form.reset();
  });
};

const initCustomCursor = () => {
  const dot = document.getElementById("cursor-dot");
  const ring = document.getElementById("cursor-ring");
  if (!dot || !ring) return;

  // Check if touch device or reduced motion is preferred
  if (
    window.matchMedia("(pointer: coarse)").matches ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    return;
  }

  let mouseX = -100;
  let mouseY = -100;
  let ringX = -100;
  let ringY = -100;
  let isVisible = false;

  const onMouseMove = (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;

    if (!isVisible) {
      dot.classList.add("active");
      ring.classList.add("active");
      isVisible = true;
    }
  };

  const renderRing = () => {
    // Smooth lerp follow physics
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;

    ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
    requestAnimationFrame(renderRing);
  };

  requestAnimationFrame(renderRing);

  window.addEventListener("mousemove", onMouseMove, { passive: true });

  document.addEventListener("mouseleave", () => {
    dot.classList.remove("active");
    ring.classList.remove("active");
    isVisible = false;
  });

  document.addEventListener("mouseenter", () => {
    if (mouseX > 0 && mouseY > 0) {
      dot.classList.add("active");
      ring.classList.add("active");
      isVisible = true;
    }
  });

  document.addEventListener("mousedown", () => {
    ring.classList.add("cursor-click");
    dot.classList.add("cursor-click");
  });

  document.addEventListener("mouseup", () => {
    ring.classList.remove("cursor-click");
    dot.classList.remove("cursor-click");
  });

  // Dynamic hover reaction on interactive elements
  const interactiveSelectors =
    "a, button, input, textarea, select, .project-card, .cert-card, .skill-logo-card, .tool-card, .contact-card, .faq-item summary, .filter-btn, .theme-toggle";

  document.addEventListener("mouseover", (e) => {
    if (e.target.closest(interactiveSelectors)) {
      ring.classList.add("cursor-hover");
      dot.classList.add("cursor-hover");
    }
  });

  document.addEventListener("mouseout", (e) => {
    if (e.target.closest(interactiveSelectors)) {
      ring.classList.remove("cursor-hover");
      dot.classList.remove("cursor-hover");
    }
  });
};

const initSkillsUnlock = () => {
  const unlockBtn = document.getElementById("unlock-skills-btn");
  const overlay = document.getElementById("skills-unlock-overlay");
  const lockedGrid = document.getElementById("locked-skills-grid");
  const statusBadge = document.getElementById("skills-status-badge");
  const lockIcon = document.getElementById("lock-icon-el");

  if (!unlockBtn || !overlay || !lockedGrid) return;

  unlockBtn.addEventListener("click", () => {
    // 1. Morph lock icon to unlocked
    if (lockIcon) {
      lockIcon.className = "bx bxs-lock-open-alt";
    }

    // 2. Play unlock animation
    unlockBtn.innerHTML = "<i class='bx bx-check-circle'></i> Superpowers Unlocked!";
    unlockBtn.style.background = "linear-gradient(135deg, #2e6f78 0%, #38bdf8 100%)";

    setTimeout(() => {
      // 3. Smoothly fade out overlay and unblur skills
      overlay.classList.add("unlocked");
      lockedGrid.classList.add("unlocked");

      // 4. Update status badge
      if (statusBadge) {
        statusBadge.classList.add("unlocked");
        statusBadge.innerHTML = "<i class='bx bxs-zap'></i> Full Potential Active (16+ Skills)";
      }

      // 5. Celebration toast
      showToast("🎉 Full potential unlocked! Let's build your next project together.");
    }, 350);
  });
};

const initApp = () => {
  initThemeToggle();
  dismissPreloader();
  initCustomCursor();
  initTypingEffect();
  initSkillsUnlock();
  initLanguageProgressBars();
  initScrollReveal();
  initMetricsCounter();
  init3DTilt();
  initCardSpotlightGlow();
  initLightbox();
  initQuickContactForm();
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






  