import { fetchSearch } from "../api/auth/fetchListingsSearch.js";
import { createCards } from "../index/cards.js";
import loadingAnimation from "../animations/loadingAnimation.js";

const form = document.querySelector("#searchbarContainer form");
const searchbar = document.querySelector("#searchbarInput");
const containerSearch = document.querySelector("#searchRow");
const searchMessage = document.querySelector("#search-message");

const searchContainer = document.querySelector("#searchContainer");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    searchContainer.classList.remove("d-none");
    loadingAnimation.classList.remove("d-none");
    const searchTerm = searchbar.value;
    if (searchTerm.length > 1) {
      const searchResults = await fetchSearch(searchTerm);
      containerSearch.textContent = "";
      if (searchResults.length > 0) {
        searchMessage.classList.add("d-none");
        searchResults.forEach((listing) => {
          createCards(listing, containerSearch);
          loadingAnimation.classList.add("d-none");
        });
      } else {
        searchMessage.classList.remove("d-none");
        searchMessage.innerText = "No listings found for your search.";
      }
    }
  } catch (error) {
    console.error("Error loading listings:", error.message);
  }
});
