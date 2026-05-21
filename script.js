const firstName = "Tegegn";
const lastName = "Wukianos";

window.addEventListener("load", function () {
  const heroFirstName = document.getElementById("hero-first-name");
  const heroLastName = document.getElementById("hero-last-name");
  const greetingText = document.getElementById("greeting-text");
  const footerEthiopianYear = document.getElementById("ethiopian-year");

  if (heroFirstName) {
    heroFirstName.textContent = firstName;
  }

  if (heroLastName) {
    heroLastName.textContent = lastName;
  }

  if (greetingText) {
    const hour = new Date().getHours();
    let greeting = "";

    if (hour < 12) {
      greeting = "Good morning";
    } else if (hour < 18) {
      greeting = "Good afternoon";
    } else {
      greeting = "Good evening";
    }

    greetingText.textContent = greeting;
  }

  if (footerEthiopianYear) {
    const gregorianYear = new Date().getFullYear();
    const ethiopianYear = gregorianYear - 8;

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
