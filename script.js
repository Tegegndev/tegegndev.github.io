const dismissPreloader = () => {
  document.body.classList.remove("is-loading");
  const preloader = document.getElementById("preloader");
  if (!preloader) return;
  preloader.classList.add("hide");
  setTimeout(() => preloader.remove(), 250);
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", dismissPreloader);
} else {
  dismissPreloader();
}

  