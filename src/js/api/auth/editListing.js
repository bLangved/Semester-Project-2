import { apiPath } from "../baseUrl.js";
const urlEndpoint = `${apiPath}/auction/listings/`; // need ID at end

export async function updateListing(object) {
  const token = localStorage.getItem("token");
  try {
    const data = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(object),
    };
    const response = await fetch(urlEndpoint, data);
    if (response.ok) {
      alert("Listing updated");
      window.location.href = "index.html";
    } else {
      //   displayRegisterError(response.status);
    }
  } catch (error) {
    console.error("Update error:", error);
  }
}

// function displayRegisterError(statusCode) {
//   let errorMessage = "";

//   if (statusCode === 400) {
//     // client-side errors
//     errorMessage = `Status code ${statusCode} Client error:\n`;
//   } else if (statusCode === 401) {
//     // Server-side errors
//     errorMessage = `Status code ${statusCode} Client error:\n`;
//   } else {
//     // Other unexpected errors
//     errorMessage = `Status code ${statusCode}\nUnexpected error occurred while trying to update listing.`;
//   }
//   statusMessage.innerText = errorMessage;
// }
