import { fetchOngoingListings } from "../api/auth/listingsBidOngoing.js";
import { fetchListingsWon, fetchListing } from "../api/auth/listingsWon.js";
import { createCardsWon, createDeletedCardsWon } from "./createCards.js";

document.addEventListener("DOMContentLoaded", async function () {
  try {
    const ongoingListings = await fetchOngoingListings();
    const ongoingContainer = document.querySelector(
      "#ongoingListingsContainer",
    );
    if (ongoingListings.length > 0) {
      ongoingListings.forEach((listing) => {
        createCardsWon(listing, ongoingContainer);
      });
    }
  } catch (error) {
    console.error("Error loading ongoing listings:", error.message);
  }

  try {
    const listingsWon = await fetchListingsWon();
    const containerWon = document.querySelector("#listingsWonContainer");
    const deletedListings = []; // Array to store IDs of listings that no longer exist

    if (listingsWon.length > 0) {
      for (const listingId of listingsWon) {
        const newListings = await fetchListing(listingId);
        if (newListings.notFound) {
          deletedListings.push(listingId); // Store the ID of the listing that no longer exists
        } else {
          createCardsWon(newListings, containerWon);
        }
      }

      if (deletedListings.length > 0) {
        // There will be a 404 error since these objects no longer exists, but they are still displayed on the "listings-Won page".
        deletedListings.forEach((id) => {
          createDeletedCardsWon(id, containerWon);
        });
      }
    }
  } catch (error) {
    console.error("Error loading listings:", error.message);
  }
});
