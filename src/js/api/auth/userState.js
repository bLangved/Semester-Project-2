import { logout } from "./logout.js";

function toggleLoginDisplay() {
  const isLoggedIn = Boolean(localStorage.getItem("token"));
  document.querySelector("#loginItem").classList.toggle("d-none", isLoggedIn);
  document.querySelector("#logoutItem").classList.toggle("d-none", !isLoggedIn);

  if (isLoggedIn) {
    const profileString = localStorage.getItem("profile");
    if (profileString) {
      const profile = JSON.parse(profileString);

      if (profile.avatar) {
        document.querySelector("#avatar").src = profile.avatar;
      }
    }
  }
}

document.addEventListener("DOMContentLoaded", toggleLoginDisplay);

document.querySelector("#logoutItem").addEventListener("click", logout);
