export function createCardsWon(object, container) {
  const cardWrapper = document.createElement("div");
  cardWrapper.classList.add("col-6", "col-md-4", "col-lg-3", "p-1");
  const card = document.createElement("a");
  card.classList.add("card", "p-0", "card-profile");
  card.href = `listing.html?id=${object.id}`;

  const img = document.createElement("img");
  img.classList.add("card-img-top");
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

  cardWrapper.append(card);
  container.append(cardWrapper);
}

export function createDeletedCardsWon(id, container) {
  const cardWrapper = document.createElement("div");
  cardWrapper.classList.add("col-6", "col-md-4", "col-lg-3", "p-1");
  const card = document.createElement("a");
  card.classList.add("card", "p-0", "card-profile");

  const img = document.createElement("img");
  img.classList.add("card-img-top");
  img.src = "images/placeholder/no_image_placeholder.jpeg";
  card.append(img);

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body", "d-flex", "flex-column");
  card.append(cardBody);

  const title = document.createElement("span");
  title.classList.add("fw-bold");
  title.innerText = "Listing deleted";
  cardBody.append(title);

  const idSubTitle = document.createElement("span");
  idSubTitle.classList.add("mt-auto");
  idSubTitle.innerText = `Id: ${id}`;
  cardBody.append(idSubTitle);

  cardWrapper.append(card);
  container.append(cardWrapper);
}
