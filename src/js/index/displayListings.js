import {
  fetchNewestListings,
  fetchTag1Listings,
} from "../api/auth/fetchHomePageListings.js";
import { createCards } from "./cards.js";

document.addEventListener("DOMContentLoaded", async function () {
  try {
    // Newest entries
    const listingsNewest = await fetchNewestListings();
    const containerNewest = document.querySelector("#listingRowNewest");
    listingsNewest.forEach((listing) => {
      createCards(listing, containerNewest);
    });
    // Based on tag
    const listingsTag1 = await fetchTag1Listings();
    const containerTag1 = document.querySelector("#listingRowTag1");
    if (listingsTag1 && listingsTag1.length > 0) {
      listingsTag1.forEach((listing) => {
        createCards(listing, containerTag1);
      });
    } else {
      console.log("No popular listings found");
    }
  } catch (error) {
    console.error("Error loading listings:", error.message);
  }
});
