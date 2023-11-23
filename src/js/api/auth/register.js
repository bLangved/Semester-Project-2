import { apiPath } from "../baseUrl.js";
import loadingAnimation from "../../animations/loadingAnimation.js";
const urlEndpoint = `${apiPath}/auction/auth/register`;

const statusContainer = document.querySelector("#statusContainer");
const statusMessage = document.querySelector("#statusMessage");
const statusIconCheck = document.querySelector("#statusIconCheck");
const statusIconXmark = document.querySelector("#statusIconXmark");

/**
 * @description Register user to database
 * @param {object} userObject User object
 * @returns The user's profile data or error message
 */
export async function register(userObject) {
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
      const json = await response.json();
      statusContainer.classList.toggle("d-none");
      statusMessage.innerText =
        "Sucsessful account creation. You will redirected to login-page shortly";
      statusIconCheck.classList.toggle("d-none");
      loadingAnimation.classList.add("d-none");
      setTimeout(() => {
        window.location.reload();
      }, 5000);
      loadingAnimation.classList.add("d-none");
      return json;
    } else {
      statusContainer.classList.toggle("d-none");
      statusIconXmark.classList.toggle("d-none");
      loadingAnimation.classList.add("d-none");
      displayRegisterError(response.status);
      setTimeout(() => {
        window.location.reload();
      }, 5000);
    }
  } catch (error) {
    console.error("Registration error:", error);
  }
}

function displayRegisterError(statusCode) {
  let errorMessage = "";

  if (statusCode >= 400 && statusCode < 500) {
    // client-side errors
    errorMessage = `Status code ${statusCode} Client error:\nRegistration failed due to client-side issues. Could also be that an account with the same provided details already exists.`;
  } else if (statusCode >= 500) {
    // Server-side errors
    errorMessage = `Status code ${statusCode} Server error:\nRegistration failed due to server-related issues.`;
  } else {
    // Other unexpected errors
    errorMessage = `Status code ${statusCode}\nUnexpected error occurred during registration.`;
  }
  statusMessage.innerText = errorMessage;
}
