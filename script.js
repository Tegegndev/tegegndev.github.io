const firstName = "Tegegn";
const lastName = "Wukianos";

window.addEventListener("load", function () {
  const heroFirstName = document.getElementById("hero-first-name");
  const heroLastName = document.getElementById("hero-last-name");
  const footerEthiopianYear = document.getElementById("ethiopian-year");

  if (heroFirstName) {
    heroFirstName.textContent = firstName;
  }

  if (heroLastName) {
    heroLastName.textContent = lastName;
  }

  if (footerEthiopianYear) {
    const gregorianYear = new Date().getFullYear();
    const ethiopianYear = gregorianYear - 9;

    footerEthiopianYear.textContent = ethiopianYear + " E.C.";
  }

  const preloader = document.getElementById("preloader");
  setTimeout(function () {
    document.body.classList.remove("is-loading");
    if (!preloader) return;
    preloader.classList.add("hide");
    setTimeout(function () {
      preloader.remove();
    }, 650); 
  }, 500);
});

