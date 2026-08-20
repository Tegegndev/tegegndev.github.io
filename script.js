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

const initApp = () => {
  dismissPreloader();
  initProjectFilters();
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}


  