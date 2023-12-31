import { timeRemaining } from "../formatting/dateFormatting.js";
export function createCards(object, container) {
  const cardWrapper = document.createElement("div");
  cardWrapper.classList.add(
    "col-12",
    "col-lg-6",
    "mb-3",
    "d-flex",
    "align-items-center",
    "card-container_search",
  );
  const card = document.createElement("a");
  card.classList.add("card", "p-0", "d-flex", "flex-row");
  card.href = `listing.html?id=${object.id}`;

  const img = document.createElement("img");
  img.classList.add("card-img");
  if (object.media && object.media.length > 0) {
    img.src = object.media[0];
  } else {
    img.src = "images/placeholder/no_image_placeholder.jpeg";
  }
  card.append(img);

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body", "d-flex", "flex-column");
  card.append(cardBody);

  const title = document.createElement("span");
  title.classList.add("fw-bold");
  if (object.title.length > 25) {
    title.innerText = object.title.substring(0, 25) + "...";
  } else {
    title.innerText = object.title;
  }
  cardBody.append(title);

  const endDate = document.createElement("span");
  endDate.classList.add("mt-auto");
  endDate.innerText = `Expires in: ${timeRemaining(object.endsAt)}`;
  cardBody.append(endDate);

  cardWrapper.append(card);
  container.append(cardWrapper);
}
