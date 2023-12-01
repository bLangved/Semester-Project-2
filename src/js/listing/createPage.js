import {
  firstIndexImage,
  restIndexedImage,
} from "../arrayOperations/fetchingMedia.js";
// import { timeRemaining } from "../formatting/timeToExpire.js";

export function createHTML(listing) {
  const container = document.querySelector("#listingContainer");

  const imagesContainer = document.createElement("div");

  const mainImage = document.createElement("img");
  mainImage.classList.add("card-img");
  mainImage.src = firstIndexImage(listing.media);
  imagesContainer.append(mainImage);

  const carouselContainer = document.createElement("div");
  carouselContainer.classList.add("carousel", "slide");
  carouselContainer.setAttribute("data-ride", "carousel");
  carouselContainer.id = "carouselId";

  const carouselInner = document.createElement("div");
  carouselInner.classList.add("carousel-inner");

  if (listing.media && Array.isArray(listing.media)) {
    for (let i = 1; i < listing.media.length; i++) {
      const carouselItem = document.createElement("div");
      carouselItem.classList.add("carousel-item");
      if (i === 1) {
        carouselItem.classList.add("active");
      }

      const addImage = document.createElement("img");
      addImage.classList.add("img-thumbnail", "thumbnails-listing");
      addImage.src = restIndexedImage(listing.media, i);
      carouselItem.append(addImage);
      carouselInner.append(carouselItem);
    }
  }
  carouselContainer.append(carouselInner);
  imagesContainer.append(carouselContainer);

  container.append(imagesContainer);

  // Add previous button
  const prevButton = document.createElement("button");
  prevButton.classList.add("carousel-control-prev");
  prevButton.setAttribute("type", "button");
  prevButton.setAttribute("data-bs-target", "#carouselId");
  prevButton.setAttribute("data-bs-slide", "prev");

  const prevIcon = document.createElement("span");
  prevIcon.classList.add("carousel-control-prev-icon");
  prevIcon.setAttribute("aria-hidden", "true");

  const prevText = document.createElement("span");
  prevText.classList.add("visually-hidden");
  prevText.textContent = "Previous";

  prevButton.append(prevIcon);
  prevButton.append(prevText);

  // Add next button
  const nextButton = document.createElement("button");
  nextButton.classList.add("carousel-control-next");
  nextButton.setAttribute("type", "button");
  nextButton.setAttribute("data-bs-target", "#carouselId");
  nextButton.setAttribute("data-bs-slide", "next");

  const nextIcon = document.createElement("span");
  nextIcon.classList.add("carousel-control-next-icon");
  nextIcon.setAttribute("aria-hidden", "true");

  const nextText = document.createElement("span");
  nextText.classList.add("visually-hidden");
  nextText.textContent = "Next";

  nextButton.append(nextIcon);
  nextButton.append(nextText);

  carouselContainer.append(prevButton);
  carouselContainer.append(nextButton);

  imagesContainer.append(carouselContainer);

  container.append(imagesContainer);
}
