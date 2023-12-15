import { apiPath } from "../baseUrl.js";
const profileName = JSON.parse(localStorage.getItem("profile")).name;
const urlEndpoint = `${apiPath}/auction/profiles/${profileName}`;

export async function fetchListingsId() {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`${urlEndpoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const profile = await response.json();
      const profileWins = profile.wins;
      return await profileWins;
    } else {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
  } catch (error) {
    console.error("Fetch error:", error.message);
    throw error;
  }
}

export async function fetchListingsWon() {
  return fetchListingsId();
}

export async function fetchListing(id) {
  const listingEndpoint = `${apiPath}/auction/listings/${id}?_seller=true&_bids=true`;
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(listingEndpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      return await response.json();
    } else if (response.status === 404) {
      return { id, notFound: true };
    } else {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
  } catch (error) {
    console.error("Fetch error:", error.message);
    throw error;
  }
}
