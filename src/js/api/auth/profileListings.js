import { apiPath } from "../baseUrl.js";
const urlEndpoint = `${apiPath}/auction/profiles/bjornar_langved/listings`;

export async function fetchProfileListings(queryParams) {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`${urlEndpoint}?${queryParams.toString()}`, {
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

function getActiveParams() {
  return new URLSearchParams({
    sort: "created",
    sortOrder: "desc",
    _active: "true",
  });
}

function getInactiveParams() {
  return new URLSearchParams({
    sort: "created",
    sortOrder: "desc",
  });
}

export async function fetchActiveListings() {
  return fetchProfileListings(getActiveParams());
}

export async function fetchInactiveListings() {
  return fetchProfileListings(getInactiveParams());
}
