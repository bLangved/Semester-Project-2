import { logout } from "../api/auth/logout.js";
import { formatFullName } from "../formatting/profileObject.js";

export function initializeProfilePage() {
  const isLoggedIn = Boolean(localStorage.getItem("token"));
  document.querySelector("#loginItem").classList.toggle("d-none", isLoggedIn);
  document.querySelector("#logoutItem").classList.toggle("d-none", !isLoggedIn);

  if (isLoggedIn) {
    const profileString = localStorage.getItem("profile");
    if (profileString) {
      const profile = JSON.parse(profileString);

      if (profile.avatar) {
        document.querySelector("#avatarProfile").src = profile.avatar;
      }
      if (profile.name) {
        document.querySelector("#nameProfile").innerText = formatFullName(
          profile.name,
        );
      }
      if (profile.credits) {
        document.querySelector("#creditsProfile").innerText = profile.credits;
      }
    }
  }
}
document.addEventListener("DOMContentLoaded", initializeProfilePage);
document.querySelector("#logoutItem").addEventListener("click", logout);
