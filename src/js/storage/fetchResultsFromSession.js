export function searchListingsByTitle(searchValue) {
  const listings = JSON.parse(sessionStorage.getItem("listings")) || [];
  const searchValueLower = searchValue.toLowerCase();
  return listings.filter((listing) =>
    listing.title.toLowerCase().includes(searchValueLower),
  );
}
