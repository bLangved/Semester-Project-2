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
  cardBody.classList.add(
    "card-body",
    "d-flex",
    "flex-row",
    "h-100",
    "card_body-profile",
  );

  const image = document.createElement("img");
  image.classList.add("card-img");
  image.src = firstIndexImage(listing.media);
  cardBody.append(image);

  const textWrapper = document.createElement("div");
  textWrapper.classList.add(
    "d-flex",
    "flex-column",
    "flex-grow-1",
    "ms-2",
    "card_textWrapper-profile",
  );

  const title = document.createElement("span");
  title.classList.add("card-title", "title-profile");
  title.innerText = listing.title;
  textWrapper.append(title);

  const tagsContainer = document.createElement("div");
  tagsContainer.classList.add("card-subtitle", "tagsContainer-profile");
  tagsContainer.innerText = "Tags:\n";
  if (listing.tags && Array.isArray(listing.tags)) {
    listing.tags.forEach((tag) => {
      const tagsElement = document.createElement("a");
      tagsElement.classList.add("card-link", "rounded", "p-1", "tags-profile");
      tagsElement.innerText = tag;
      tagsElement.href = "#";
      tagsContainer.append(tagsElement);
    });
  }
  textWrapper.append(tagsContainer);

  //   const bids = document.createElement("span");
  //   bids.classList.add("card-subtitle");
  //   bids.innerText = `Bids: ${listing._count.bids}`;
  //   textWrapper.append(bids);

  const endDate = document.createElement("span");
  endDate.classList.add("mt-auto", "align-self-end");
  endDate.innerText = `Expires in: ${timeRemaining(listing.endsAt)}`;
  textWrapper.append(endDate);

  cardBody.append(textWrapper);
  card.append(cardBody);
  cardWrapper.append(card);
  container.append(cardWrapper);
}
