/**
 * @description Not actually an API requests, but it retrieves all objects from session storage, and filters out objects that are bidding on by the user.
 */
const profileName = JSON.parse(localStorage.getItem("profile")).name;
export async function fetchOngoingListings() {
  try {
    const listings = JSON.parse(sessionStorage.getItem("listings"));
    return listings.filter(
      (listing) =>
        listing.bids &&
        listing.bids.some((bid) => bid.bidderName === profileName),
    );
  } catch (error) {
    console.error("Fetch error:", error.message);
    throw error;
  }
}
