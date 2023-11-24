import { initializeProfilePage } from "./user.js";
import { toggleLoginDisplay } from "../api/auth/userState.js";
import { apiPath } from "../api/baseUrl.js";
const updateAvatarInput = document.querySelector("#newAvatarUrl");
const userName = JSON.parse(localStorage.getItem("profile"))?.name;
const urlEndpoint = `${apiPath}/auction/profiles/${userName}/media`;
/**
 * @description Updates avatar in database with an empty string
 */
export async function deleteAvatar() {
  const token = JSON.parse(localStorage.getItem("token"));
  const emptyAvatar = "";
  try {
    const data = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ avatar: emptyAvatar }),
    };
    const response = await fetch(urlEndpoint, data);
    if (response.ok) {
      await response.json();
      updateAvatarInput.value = "";
      const profile = JSON.parse(localStorage.getItem("profile"));
      profile.avatar = emptyAvatar;
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
