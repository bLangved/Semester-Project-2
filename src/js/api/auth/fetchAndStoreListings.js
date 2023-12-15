import { apiPath } from "../baseUrl.js";
const urlEndpoint = `${apiPath}/auction/listings?_active=true&_bids=true`;

export async function fetchAllListings() {
  try {
    let allListings = [];
    let offset = 0;
    const limit = 100;
    let hasMoreListings = true;

    while (hasMoreListings) {
      const response = await fetch(
        `${urlEndpoint}&limit=${limit}&offset=${offset}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (response.ok) {
        const listings = await response.json();
        allListings = allListings.concat(listings);

        if (listings.length < limit) {
          hasMoreListings = false;
        } else {
          offset += limit;
        }
      } else {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
    }

    sessionStorage.setItem("listings", JSON.stringify(allListings));
  } catch (error) {
    console.error("Fetch error:", error.message);
    throw error;
  }
}
