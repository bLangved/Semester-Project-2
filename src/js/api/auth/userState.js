import { logout } from "./logout.js";
import { formatName } from "../../formatting/profileObject.js";

export function toggleLoginDisplay() {
  const isLoggedIn = Boolean(localStorage.getItem("token"));
  document.querySelector("#loginItem").classList.toggle("d-none", isLoggedIn);
  document.querySelector("#logoutItem").classList.toggle("d-none", !isLoggedIn);

  if (isLoggedIn) {
    const profileString = localStorage.getItem("profile");
    if (profileString) {
      const profile = JSON.parse(profileString);

      if (profile.avatar) {
        document.querySelector("#avatarNav").src = profile.avatar;
      }
      if (profile.name) {
        document.querySelector("#nameNav").innerText = formatName(profile.name);
      }
      if (profile.credits) {
        document.querySelector("#creditsNav").innerText = profile.credits;
      }
    }
  }
}

document.addEventListener("DOMContentLoaded", toggleLoginDisplay);

document.querySelector("#logoutItem").addEventListener("click", logout);
