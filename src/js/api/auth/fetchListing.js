import { apiPath } from "../baseUrl.js";
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const urlEndpoint = `${apiPath}/auction/listings/${id}?_seller=true&_bids=true`;

export async function fetchListing() {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(urlEndpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
  } catch (error) {
    console.error("Fetch error:", error.message);
    throw error;
  }
}
