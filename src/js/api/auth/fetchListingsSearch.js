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

function getSearchTagParams(tag) {
  return new URLSearchParams({
    limit: "8",
    sort: "created",
    sortOrder: "desc",
    _tag: tag,
    _active: "true",
  });
}

// Function to fetch listings based on tag and title
export async function fetchSearch(tag) {
  const tagResults = await fetchListings(getSearchTagParams(tag));
  return tagResults;
}
