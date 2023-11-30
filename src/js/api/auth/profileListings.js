import { apiPath } from "../baseUrl.js";
const urlEndpoint = `${apiPath}/auction/profiles/bjornar_langved/listings`;

export async function fetchProfileListings() {
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
