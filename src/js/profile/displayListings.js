import {
  fetchActiveListings,
  fetchInactiveListings,
} from "../api/auth/profileListings.js";
import { createCardsProfile } from "./listingCard.js";

document.addEventListener("DOMContentLoaded", async function () {
  try {
    // Active listings
    const listingsActive = await fetchActiveListings();
    const containerActive = document.querySelector("#activeListingsContainer");
    listingsActive.forEach((listing) => {
      createCardsProfile(listing, containerActive);
    });

    // Inactive listings
    let listingsInactive = await fetchInactiveListings();
    listingsInactive = filterInactiveListings(listingsInactive);
    const containerInactive = document.querySelector(
      "#inactiveListingsContainer",
    );
    if (listingsInactive.length > 0) {
      listingsInactive.forEach((listing) => {
        createCardsProfile(listing, containerInactive);
      });
    } else {
      console.log("No inactive listings found");
    }
  } catch (error) {
    console.error("Error loading listings:", error.message);
  }
});

function filterInactiveListings(listings) {
  const currentDate = new Date();
  return listings.filter((listing) => {
    const endsAtDate = new Date(listing.endsAt);
    return endsAtDate < currentDate;
  });
}
