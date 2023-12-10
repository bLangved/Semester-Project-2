import { initializeProfilePage } from "./user.js";
import { toggleLoginDisplay } from "../api/auth/userState.js";
import { apiPath } from "../api/baseUrl.js";
const updateAvatarInput = document.querySelector("#newAvatarUrl");
const userName = JSON.parse(localStorage.getItem("profile"))?.name;
const urlEndpoint = `${apiPath}/auction/profiles/${userName}/media`;
/**
 * @description Recieves valid url-string for profile-avatar, and updates database with said string
 * @param {string} imageUrl - url where image is stored
 */
export async function updateAvatar(imageUrl) {
  console.log(imageUrl);
  const token = localStorage.getItem("token");
  try {
    const data = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ avatar: imageUrl }),
    };
    const response = await fetch(urlEndpoint, data);
    if (response.ok) {
      await response.json();
      console.log(response);
      updateAvatarInput.value = "";
      const profile = JSON.parse(localStorage.getItem("profile"));
      profile.avatar = imageUrl;
      localStorage.setItem("profile", JSON.stringify(profile));
      initializeProfilePage();
      toggleLoginDisplay();
      setTimeout(() => location.reload(), 250);
    } else {
      console.log("Status Code:", response.status);
      throw new Error("Failed to update profile avatar.");
    }
  } catch (error) {
    console.error(error);
  }
}
