import { fetchProfileListings } from "../api/auth/profileListings.js";
import { createCardsProfile } from "./listingCard.js";

async function displayPersonalListings() {
  try {
    const listings = await fetchProfileListings();
    listings.forEach((listing) => {
      createCardsProfile(listing);
    });
  } catch (error) {
    console.error("Failed to load listings:", error);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  displayPersonalListings();
});
