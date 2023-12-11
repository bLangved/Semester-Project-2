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

function getSearchParams(tag) {
  return new URLSearchParams({
    limit: "8",
    sort: "created",
    sortOrder: "desc",
    _tag: tag,
    _active: "true",
  });
}

export async function fetchSearch(tag) {
  return fetchListings(getSearchParams(tag));
}
