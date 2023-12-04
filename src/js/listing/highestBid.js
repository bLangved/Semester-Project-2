/**
 * @description Retrieves an object, and returns the highest bid on object as a number
 * @param {object} listing
 * @returns A number
 */
export function highestBid(listing) {
  let highestBid = 0;
  if (listing.bids && Array.isArray(listing.bids)) {
    highestBid = listing.bids.reduce(
      (max, bid) => (bid.amount > max ? bid.amount : max),
      0,
    );
  }
  return highestBid;
}
