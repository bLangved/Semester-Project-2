const profileImg = document.querySelector("#avatarProfile");
const avatarOptions = document.querySelector("#avatarOptions");

profileImg.addEventListener("click", () => {
  if (avatarOptions.classList.contains("d-none")) {
    avatarOptions.classList.toggle("d-none");
  } else {
    avatarOptions.classList.toggle("d-none");
  }
});

// function updateAvatar() {
//   // Logic to update avatar
// }

// function deleteAvatar() {
//   // Logic to delete avatar
// }

// function seeAvatar() {
//   // Logic to see avatar
// }
