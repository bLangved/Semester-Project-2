import { viewAvatar } from "./viewAvatar.js";
import { updateAvatar } from "./updateAvatar.js";
import { deleteAvatar } from "./deleteAvatar.js";
import { isValidUrl } from "../validation/inputValidation.js";
const profileImg = document.querySelector("#avatarProfile");
const avatarOptions = document.querySelector("#avatarOptions");
const viewBtn = document.querySelector("#viewAvatarBtn");
const updateBtn = document.querySelector("#updateAvatarBtn");
const deleteBtn = document.querySelector("#deleteAvatarBtn");
const updateContainer = document.querySelector("#updateAvatarForm");
const submitUpdateBtn = document.querySelector("#submitAvatarUrl");
const closeUpdateBtn = document.querySelector("#closeAvatarUrl");
const updateAvatarInput = document.querySelector("#newAvatarUrl");

const profile = JSON.parse(localStorage.getItem("profile"));

/**
 * @description Toggles profile options container on profile-click
 */
function toggleAvatarOptions() {
  avatarOptions.classList.toggle("d-none");
}

profileImg.addEventListener("click", (e) => {
  e.stopPropagation();
  toggleAvatarOptions();
});

document.addEventListener("click", (event) => {
  if (
    !profileImg.contains(event.target) &&
    !avatarOptions.contains(event.target)
  ) {
    if (!avatarOptions.classList.contains("d-none")) {
      toggleAvatarOptions();
    }
  }
});

viewBtn.addEventListener("click", () => {
  if (profile && profile.avatar) {
    viewAvatar(profile.avatar);
  } else {
    alert(
      "No avatar uploaded to profile. Please update avatar in the dropdown menu",
    );
    console.log("Profile avatar not found");
  }
});

updateBtn.addEventListener("click", () => {
  avatarOptions.classList.toggle("d-none");
  updateContainer.classList.toggle("d-none");
});

submitUpdateBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (isValidUrl(updateAvatarInput.value)) {
    console.log("Valid URL");
    updateAvatar(updateAvatarInput.value);
  } else {
    alert("Invalid URL");
  }
});

closeUpdateBtn.addEventListener("click", (e) => {
  e.preventDefault();
  updateAvatarInput.value = "";
  updateContainer.classList.toggle("d-none");
});

deleteBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (confirm("Are you sure you want to delete your avatar?")) {
    avatarOptions.classList.toggle("d-none");
    deleteAvatar();
  } else {
    avatarOptions.classList.toggle("d-none");
    console.log("User chose 'No'");
  }
});
