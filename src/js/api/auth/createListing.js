import { apiPath } from "../baseUrl.js";
import loadingAnimation from "../../animations/loadingAnimation.js";
const urlEndpoint = `${apiPath}/auction/listings`;

const statusContainer = document.querySelector("#statusContainer");
const statusMessage = document.querySelector("#statusMessage");
const statusIconCheck = document.querySelector("#statusIconCheck");
const statusIconXmark = document.querySelector("#statusIconXmark");

const btnNewListing = document.querySelector("#btnOption1");
btnNewListing.addEventListener("click", () => {
  window.location = "listing-create.html";
});
const btnHomepage = document.querySelector("#btnOption2");
btnHomepage.addEventListener("click", () => {
  window.location = "index.html";
});

/**
 * @description Register listing to database
 * @param {object} listingObject Object containg data on listing
 * @returns The listing data
 */
export async function listing(listingObject) {
  const token = localStorage.getItem("token");
  try {
    const data = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(listingObject),
    };
    const response = await fetch(urlEndpoint, data);
    if (response.ok) {
      // const json = await response.json();
      loadingAnimation.classList.add("d-none");
      statusIconCheck.classList.toggle("d-none");
      statusContainer.classList.toggle("d-none");
      statusMessage.innerText =
        "Listing sucsessful! What do you want to do next?";
      btnNewListing.innerText = "Create another listing";
    } else {
      loadingAnimation.classList.add("d-none");
      statusIconXmark.classList.toggle("d-none");
      statusContainer.classList.toggle("d-none");
      statusMessage.innerText =
        "Listing unsucsessful! What do you want to do next?";
      btnNewListing.innerText = "Try again";
      displayRegisterError(response.status);
    }
  } catch (error) {
    console.error("Registration error:", error);
  }
}

function displayRegisterError(statusCode) {
  let errorMessage = "";

  if (statusCode === 400) {
    // client-side errors
    errorMessage = `Status code ${statusCode} Client error:\nImage url is not accessible.`;
  } else if (statusCode === 401) {
    // Server-side errors
    errorMessage = `Status code ${statusCode} Client error:\nSome other issue.`;
  } else {
    // Other unexpected errors
    errorMessage = `Status code ${statusCode}\nUnexpected error occurred during registration.`;
  }
  statusMessage.innerText = errorMessage;
}
