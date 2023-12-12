import { fetchSearch } from "../api/auth/fetchListingsSearch.js";
import { createCards } from "../search/cards.js";
import loadingAnimation from "../animations/loadingAnimation.js";
import { searchListingsByTitle } from "../storage/fetchResultsFromSession.js";

const tagsHeader = document.querySelector("#searchTagsHeader");
const titleHeader = document.querySelector("#searchTitleHeader");
const form = document.querySelector("#searchbarContainer form");
const searchbar = document.querySelector("#searchbarInput");
const containerSearchTags = document.querySelector("#searchTagsRow");
const containerSearchTitle = document.querySelector("#searchTitleRow");
const searchTagsMessage = document.querySelector("#searchTags-message");
const searchTitleMessage = document.querySelector("#searchTitle-message");

const searchContainer = document.querySelector("#searchContainer");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    searchContainer.classList.remove("d-none");
    loadingAnimation.classList.remove("d-none");
    const searchTerm = searchbar.value;

    if (searchTerm.length > 1) {
      const tagResults = await fetchSearch(searchTerm);
      const titleResults = searchListingsByTitle(searchTerm);

      // Clear previous results
      containerSearchTags.textContent = "";
      containerSearchTitle.textContent = "";

      // Process tag results
      if (tagResults.length > 0) {
        tagResults.forEach((listing) =>
          createCards(listing, containerSearchTags),
        );
      } else {
        // Handle no tag results
        tagsHeader.innerText = `Search result: "${searchTerm}"`;
        searchTagsMessage.classList.remove("d-none");
        searchTagsMessage.innerText = `No listings found for your search on "${searchTerm}".`;
        loadingAnimation.classList.add("d-none");
      }

      // Process title results
      if (titleResults.length > 0) {
        titleResults.forEach((listing) =>
          createCards(listing, containerSearchTitle),
        );
      } else {
        // Handle no title results
        titleHeader.innerText = `Search result: "${searchTerm}"`;
        searchTitleMessage.classList.remove("d-none");
        searchTitleMessage.innerText = `No other listings found for your search on "${searchTerm}".`;
        loadingAnimation.classList.add("d-none");
      }

      // Update UI based on results
      tagsHeader.innerText = `Results by tag: "${searchTerm}"`;
      titleHeader.innerText = `Other results containing: "${searchTerm}"`;
      loadingAnimation.classList.add("d-none");
    }
  } catch (error) {
    console.error("Error loading listings:", error.message);
  }
});
