import { apiPath } from "../baseUrl.js";
import { save } from "../../storage/save.js";
import loadingAnimation from "../../animations/loadingAnimation.js";
const urlEndpoint = `${apiPath}/auction/auth/login`;
/**
 * @description Login user to database
 * @param {string} urlEndpoint login api endpoint
 * @param {object} userData user object
 * @returns The user's profile data
 */
export async function login(userData) {
  try {
    const postData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    };
    const response = await fetch(urlEndpoint, postData);
    if (response.ok) {
      const profile = await response.json();
      save("token", profile.accessToken);
      delete profile.accessToken;
      save("profile", profile);
      // Return user to destination

      loadingAnimation.classList.add("d-none");
      return profile;
    } else {
      displayLoginError(response.status);
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
  alert(errorMessage);
}
