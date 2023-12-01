import { fetchListing } from "../api/auth/fetchListing.js";
import { createHTML } from "./createPage.js";

async function displayListing() {
  const listing = await fetchListing();
  createHTML(listing);
}

document.addEventListener("DOMContentLoaded", function () {
  displayListing();
});
