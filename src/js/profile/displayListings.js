import { fetchProfileListings } from "../api/auth/profileListings.js";
import { createCardsProfile } from "./listingCard.js";

async function displayPersonalListings() {
  const container = document.querySelector("#listingsContainer");
  try {
    let listings = await fetchProfileListings();
    console.log(listings);

    listings = listings.sort((a, b) => {
      const dateA = new Date(a.endsAt).getTime();
      const dateB = new Date(b.endsAt).getTime();
      return dateA - dateB;
    });

    listings.forEach((listing) => {
      createCardsProfile(listing, container);
    });
  } catch (error) {
    console.error("Failed to load listings:", error);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  displayPersonalListings();
});
