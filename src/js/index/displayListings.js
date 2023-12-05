import { fetchNewestListings } from "../api/auth/fetchHomePageListings.js";
import { createCards } from "./cards.js";

document.addEventListener("DOMContentLoaded", async function () {
  try {
    const listings = await fetchNewestListings();
    listings.forEach((listing) => {
      createCards(listing);
    });
  } catch (error) {
    console.error("Error loading listings:", error.message);
  }
});
