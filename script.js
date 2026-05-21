    window.addEventListener("load", function () {
      const preloader = document.getElementById("preloader");
      setTimeout(function () {
        document.body.classList.remove("is-loading");
        if (!preloader) return;
        preloader.classList.add("hide");
        setTimeout(function () {
          preloader.remove();
        }, 650);
      }, 1000);
    });
  