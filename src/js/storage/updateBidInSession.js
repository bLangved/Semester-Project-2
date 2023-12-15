export function updateListingInSessionStorage(updatedListing) {
  const listings = JSON.parse(sessionStorage.getItem("listings"));
  const listingIndex = listings.findIndex(
    (listing) => listing.id === updatedListing.id,
  );

  if (listingIndex !== -1) {
    listings[listingIndex] = updatedListing;
    sessionStorage.setItem("listings", JSON.stringify(listings));
  }
}
