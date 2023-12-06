import { apiPath } from "../baseUrl.js";

export async function deleteListing(id) {
  const token = localStorage.getItem("token");
  const urlEndpoint = `${apiPath}/auction/listings/${id}`;
  try {
    const data = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(urlEndpoint, data);
    if (response.ok) {
      alert("Listing deleted");
      window.location.href = "index.html";
    } else {
      // displayRegisterError(response.status);
    }
  } catch (error) {
    console.error("Registration error:", error);
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
//     errorMessage = `Status code ${statusCode}\nUnexpected error occurred while trying to delete listing.`;
//   }
//   statusMessage.innerText = errorMessage;
// }
