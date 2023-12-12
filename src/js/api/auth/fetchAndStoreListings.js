import { apiPath } from "../baseUrl.js";
const urlEndpoint = `${apiPath}/auction/listings/`;

export async function fetchAllListings() {
  try {
    const response = await fetch(`${urlEndpoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const listings = await response.json();
      sessionStorage.setItem("listings", JSON.stringify(listings));
    } else {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
  } catch (error) {
    console.error("Fetch error:", error.message);
    throw error;
  }
}
