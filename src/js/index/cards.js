import { highestBid } from "../listing/highestBid.js";

const containerRow = document.querySelector("#listingRow");

export function createCards(object) {
  console.log(object);
  const card = document.createElement("a");
  card.classList.add(
    "card",
    "col-6",
    "col-md-4",
    "col-lg-3",
    "p-0",
    "card-index",
  );
  card.href = `listing.html?id=${object.id}`;

  const img = document.createElement("img");
  img.classList.add("card-img-top");
  img.src = object.media;
  card.append(img);

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");
  card.append(cardBody);

  const title = document.createElement("span");
  title.innerText = object.title;
  cardBody.append(title);

  const creditContainer = document.createElement("div");
  creditContainer.classList.add("d-flex", "align-items-center", "p-2");
  const creditIcon = document.createElement("i");
  creditIcon.classList.add("fa-solid", "fa-coins", "fa-xl", "credits-icon");
  const creditAmount = document.createElement("span");
  creditAmount.classList.add("ms-2");
  creditAmount.innerText = `Highest bid: ${highestBid(object.bids)}`;
  creditContainer.append(creditIcon, creditAmount);
  card.append(creditContainer);

  containerRow.append(card);
}
