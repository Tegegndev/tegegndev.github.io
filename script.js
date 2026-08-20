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

const initApp = () => {
  dismissPreloader();
  initProjectFilters();
  initCopyButtons();
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}



  