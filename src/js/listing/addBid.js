import { apiPath } from "../api/baseUrl.js";
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const urlEndpoint = `${apiPath}/auction/listings/${id}/bids`;

/**
 * @description Recieves bid input, and register to object in database
 * @param {number} bid
 */
export async function submitBid(bid) {
  const token = localStorage.getItem("token");
  try {
    const data = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ amount: bid }),
    };
    const response = await fetch(urlEndpoint, data);
    if (response.ok) {
      window.location.reload();
    } else {
      const errorResponse = await response.json();
      const errorMessage = errorResponse.errors[0].message;
      alert("Error message: " + errorMessage);
    }
  } catch (error) {
    console.error("Bid error:", error);
    alert("Error message: " + error.message);
  }
}
