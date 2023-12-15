import { apiPath } from "../baseUrl.js";
import { save } from "../../storage/save.js";
import { fetchAllListings } from "./fetchAndStoreListings.js";
import loadingAnimation from "../../animations/loadingAnimation.js";
const urlEndpoint = `${apiPath}/auction/auth/login`;

const statusContainer = document.querySelector("#statusContainer");
const statusMessage = document.querySelector("#statusMessage");
const statusIconCheck = document.querySelector("#statusIconCheck");
const statusIconXmark = document.querySelector("#statusIconXmark");

/**
 * @description Login user to database
 * @param {string} urlEndpoint login api endpoint
 * @param {object} userObject user object
 * @returns The user's profile data
 */
export async function login(userObject) {
  try {
    const postData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userObject),
    };
    const response = await fetch(urlEndpoint, postData);
    if (response.ok) {
      const profile = await response.json();
      save("token", profile.accessToken);
      delete profile.accessToken;
      save("profile", profile);
      statusContainer.classList.toggle("d-none");
      statusMessage.innerText =
        "Sucsessful login. You will redirected to homepage shortly";
      statusIconCheck.classList.toggle("d-none");
      await fetchAllListings();
      loadingAnimation.classList.add("d-none");
      window.location.href = "/index.html";
      return profile;
    } else {
      statusContainer.classList.toggle("d-none");
      statusIconXmark.classList.toggle("d-none");
      loadingAnimation.classList.add("d-none");
      displayLoginError(response.status);
      setTimeout(() => {
        window.location.reload();
      }, 5000);
    }
  } catch (error) {
    console.error("Login error:", error);
  }
}

function displayLoginError(statusCode) {
  const messageMap = {
    401: "Wrong login credentials. Please try again.",
    429: "Too many attempts. Please wait a few minutes.",
    500: "Internal Server Error",
    default: "Some error occurred. Try again later.",
  };
  const errorMessage = messageMap[statusCode] || messageMap.default;
  statusMessage.innerText = errorMessage;
}
