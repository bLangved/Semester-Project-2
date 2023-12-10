import { apiPath } from "../baseUrl.js";
const urlEndpoint = `${apiPath}/auction/listings/`;

async function fetchListings(queryParams) {
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

function getNewestListingsParams() {
  return new URLSearchParams({
    limit: "16",
    sort: "created",
    sortOrder: "desc",
    _bids: "true",
    _active: "true",
  });
}

function getTag1ListingsParams() {
  return new URLSearchParams({
    limit: "8",
    sort: "created",
    sortOrder: "desc",
    _tag: "vinyl",
    _active: "true",
  });
}

export async function fetchNewestListings() {
  return fetchListings(getNewestListingsParams());
}

export async function fetchTag1Listings() {
  return fetchListings(getTag1ListingsParams());
}
