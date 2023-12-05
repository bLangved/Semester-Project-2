import { apiPath } from "../baseUrl.js";
const urlEndpoint = `${apiPath}/auction/listings/`;

export async function fetchNewestListings() {
  const queryParams = new URLSearchParams({
    limit: "6",
    sort: "created",
    sortOrder: "desc",
    _bids: "true",
  });
  try {
    const response = await fetch(`${urlEndpoint}?${queryParams.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const listings = await response.json();
      return listings;
    } else {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
  } catch (error) {
    console.error("Fetch error:", error.message);
    throw error;
  }
}
