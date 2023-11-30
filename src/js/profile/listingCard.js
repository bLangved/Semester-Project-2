import { firstIndexImage } from "../arrayOperations/fetchingMedia.js";
import { timeRemaining } from "../formatting/timeToExpire.js";
export function createCardsProfile(listing) {
  console.log(listing);
  const container = document.querySelector("#listingsContainer");
  const cardWrapper = document.createElement("div");
  cardWrapper.classList.add(
    "col-12",
    "col-md-6",
    "col-lg-4",
    "col-xl-3",
    "p-2",
  );

  const card = document.createElement("div");
  card.classList.add("card", "card-profile");

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body", "d-flex", "card_body-profile");

  const image = document.createElement("img");
  image.classList.add("card-img");
  image.src = firstIndexImage(listing.media);
  cardBody.append(image);

  const textWrapper = document.createElement("div");
  textWrapper.classList.add("d-flex", "flex-column", "ms-2");

  const title = document.createElement("span");
  title.classList.add("card-title", "title-profile");
  title.innerText = listing.title;
  textWrapper.append(title);

  const description = document.createElement("p");
  description.classList.add("card-text");
  description.innerText = listing.description;
  textWrapper.append(description);

  const endDate = document.createElement("span");
  endDate.innerText = `Listing ends: ${timeRemaining(listing.endsAt)}`;
  textWrapper.append(endDate);

  cardBody.append(textWrapper);
  card.append(cardBody);
  cardWrapper.append(card);
  container.append(cardWrapper);
}
