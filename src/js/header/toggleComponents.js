const navbarToggler = document.querySelector("#navToggler");
const navbarMenu = document.querySelector("#navbarNav");
const navbarIcon = document.querySelector(".hamburger-icon");
const searchbarContainer = document.querySelector("#searchbarInputContainer");
const searchbarButton = document.querySelector("#searchbarButton");

// When clicking back and forth, the hamburger-menu icon might get reversed if toggle with searchbar on mobile aswell
document.addEventListener("DOMContentLoaded", function () {
  navbarMenu.classList.add("slide-out-to-right");

  navbarToggler.addEventListener("click", function () {
    navbarIcon.classList.toggle("active");
    if (!searchbarContainer.classList.contains("d-none")) {
      searchbarContainer.classList.add("d-none");
    }
    if (navbarMenu.classList.contains("slide-to-center")) {
      navbarMenu.classList.replace("slide-to-center", "slide-out-to-right");
    } else {
      navbarMenu.classList.replace("slide-out-to-right", "slide-to-center");
    }
  });
});

searchbarButton.addEventListener("click", function () {
  searchbarContainer.classList.toggle("d-none");
  if (navbarIcon.classList.contains("active")) {
    navbarMenu.classList.add("slide-out-to-right");
    navbarIcon.classList.toggle("active");
  }
});
window.addEventListener("resize", function () {
  if (window.innerWidth >= 768) {
    searchbarContainer.classList.add("d-none");
  }
});
