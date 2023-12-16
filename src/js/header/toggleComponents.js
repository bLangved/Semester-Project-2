const navbarToggler = document.querySelector("#navToggler");
const navbarMenu = document.querySelector("#navbarNav");
const navbarIcon = document.querySelector(".hamburger-icon");
const searchbarContainer = document.querySelector("#searchbarInputContainer");
const searchbarButton = document.querySelector("#searchbarButton");
const searchContainer = document.querySelector("#searchContainer");

document.addEventListener("DOMContentLoaded", function () {
  navbarMenu.classList.add("slide-out-to-right");

  // NAVBAR
  navbarToggler.addEventListener("click", function () {
    toggleNavbarMenu();
  });

  function toggleNavbarMenu() {
    if (!navbarIcon.classList.contains("active")) {
      navbarIcon.classList.add("active");
    } else {
      navbarIcon.classList.remove("active");
    }
    if (!searchbarContainer.classList.contains("d-none")) {
      searchbarContainer.classList.add("d-none");
    }
    if (navbarMenu.classList.contains("slide-to-center")) {
      navbarMenu.classList.replace("slide-to-center", "slide-out-to-right");
    } else {
      navbarMenu.classList.replace("slide-out-to-right", "slide-to-center");
    }
  }

  // SEARCHBAR
  searchbarButton.addEventListener("click", function () {
    toggleSearchbar();
  });

  function toggleSearchbar() {
    if (searchbarContainer.classList.contains("d-none")) {
      searchbarContainer.classList.remove("d-none");
    } else {
      searchbarContainer.classList.add("d-none");
    }
    if (navbarMenu.classList.contains("slide-to-center")) {
      navbarIcon.classList.remove("active");
      navbarMenu.classList.replace("slide-to-center", "slide-out-to-right");
    }
  }
});

function handleClickOutside(event) {
  if (
    !searchbarButton.contains(event.target) &&
    !searchbarContainer.classList.contains("d-none")
  ) {
    searchbarContainer.classList.add("d-none");
  }

  if (
    !searchContainer.contains(event.target) &&
    !searchContainer.classList.contains("d-none")
  ) {
    searchContainer.classList.add("d-none");
  }
  if (
    !navbarToggler.contains(event.target) &&
    navbarMenu.classList.contains("slide-to-center")
  ) {
    navbarIcon.classList.remove("active");
    navbarMenu.classList.replace("slide-to-center", "slide-out-to-right");
  }
}

document.addEventListener("click", handleClickOutside);
