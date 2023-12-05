import { timeSinceDate } from "../formatting/dateFormatting.js";
import { formatFullName } from "../formatting/profileObject.js";
import { submitBid } from "./addBid.js";
import { highestBid } from "./highestBid.js";
import {
  setActiveThumbnailOnLoad,
  setActiveCarouselItem,
} from "./imageActiveState.js";

export function createHTML(listing) {
  console.log(listing);
  const container = document.querySelector("#listingContainer");
  function updateContainerClass() {
    if (window.innerWidth >= 768) {
      container.classList.add("container");
    } else {
      container.classList.remove("container");
    }
  }

  // IMAGES
  const imagesContainer = document.createElement("div");
  imagesContainer.classList.add("images_container-profile");

  const carouselContainer = document.createElement("div");
  carouselContainer.classList.add("carousel", "slide");
  carouselContainer.setAttribute("data-ride", "carousel");
  carouselContainer.id = "carouselId";

  const carouselInner = document.createElement("div");
  carouselInner.classList.add("carousel-inner");

  if (
    listing.media &&
    Array.isArray(listing.media) &&
    listing.media.length > 0
  ) {
    listing.media.forEach((imageSrc, index) => {
      const carouselItem = document.createElement("div");
      carouselItem.classList.add("carousel-item");
      if (index === 0) {
        carouselItem.classList.add("active");
      }
      const img = document.createElement("img");
      img.classList.add("img");
      img.src = imageSrc;
      carouselItem.append(img);
      carouselInner.append(carouselItem);
    });
  }
  carouselContainer.append(carouselInner);
  imagesContainer.append(carouselContainer);

  const thumbnailsRow = document.createElement("div");
  thumbnailsRow.classList.add(
    "row",
    "d-none",
    "d-md-flex",
    "mt-3",
    "overflow-auto",
  );

  if (
    listing.media &&
    Array.isArray(listing.media) &&
    listing.media.length > 0
  ) {
    listing.media.forEach((imageSrc, index) => {
      const col = document.createElement("div");
      col.classList.add("col");

      const thumbnail = document.createElement("img");
      thumbnail.classList.add("img-thumbnail");
      thumbnail.src = imageSrc;

      thumbnail.addEventListener("click", () => {
        setActiveCarouselItem(index, carouselInner, thumbnailsRow);
      });

      col.append(thumbnail);
      thumbnailsRow.append(col);
    });
  }
  imagesContainer.append(thumbnailsRow);

  // Previous button
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

  // Next button
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

  prevButton.addEventListener("click", () => {
    let activeIndex = findActiveCarouselIndex(carouselInner) - 1;
    if (activeIndex < 0) {
      activeIndex = carouselInner.children.length - 1;
    }
    setActiveCarouselItem(activeIndex, carouselInner, thumbnailsRow);
  });

  nextButton.addEventListener("click", () => {
    let activeIndex = findActiveCarouselIndex(carouselInner) + 1;
    if (activeIndex >= carouselInner.children.length) {
      activeIndex = 0;
    }
    setActiveCarouselItem(activeIndex, carouselInner, thumbnailsRow);
  });

  function findActiveCarouselIndex(carouselInner) {
    return Array.from(carouselInner.children).findIndex((item) =>
      item.classList.contains("active"),
    );
  }

  carouselContainer.append(prevButton);
  carouselContainer.append(nextButton);

  container.append(imagesContainer);

  // INFO-CONTAINER FOR TEXT AND BIDS
  const infoContainer = document.createElement("div");
  infoContainer.classList.add("container");

  const listingTitle = document.createElement("h1");
  listingTitle.classList.add("header-4", "mt-3", "mb-3");
  listingTitle.innerText = listing.title;
  infoContainer.append(listingTitle);

  const tagsContainer = document.createElement("div");
  tagsContainer.classList.add("d-flex", "align-items-center", "mb-3");
  const tagsTitle = document.createElement("span");
  tagsTitle.classList.add("fw-bold");
  tagsTitle.innerText = "Tags:";
  tagsContainer.append(tagsTitle);
  listing.tags.forEach((tag) => {
    const tags = document.createElement("span");
    tags.classList.add("p-1");
    tags.innerText = tag;
    tagsContainer.append(tags);
  });
  infoContainer.append(tagsContainer);

  const sellerContainer = document.createElement("a");
  sellerContainer.classList.add(
    "container",
    "d-flex",
    "align-items-center",
    "p-3",
    "rounded-4",
    "sellerContainer-listing",
  );
  sellerContainer.href = `profile.html`;
  const sellerAvatar = document.createElement("img");
  sellerAvatar.classList.add("img-thumbnail", "rounded-circle");
  sellerAvatar.src = listing.seller.avatar || "/images/avatar.jpeg";
  const sellerInfoContainer = document.createElement("div");
  sellerInfoContainer.classList.add("d-flex", "flex-column", "ms-2");
  const sellerName = document.createElement("span");
  sellerName.classList.add("fs-4");
  sellerName.innerText = formatFullName(listing.seller.name);
  sellerInfoContainer.append(sellerName);
  sellerContainer.append(sellerAvatar, sellerInfoContainer);
  infoContainer.append(sellerContainer);

  const bidContainer = document.createElement("div");
  bidContainer.classList.add("mt-3", "mb-3");
  const bidIcon = document.createElement("i");
  bidIcon.classList.add("fa-solid", "fa-coins", "fa-xl", "credits-icon");
  const bidAmount = document.createElement("span");
  bidAmount.classList.add("ms-2");
  bidAmount.innerText = `Highest bid: ${highestBid(listing)} credit`;

  bidContainer.append(bidIcon, bidAmount);
  infoContainer.append(bidContainer);

  const biddingContainer = document.createElement("div");
  biddingContainer.classList.add("mt-3", "mb-3");

  listing.bids.sort((a, b) => new Date(b.created) - new Date(a.created));
  listing.bids.forEach((bid) => {
    const bidderContainer = document.createElement("div");
    bidderContainer.classList.add(
      "container",
      "d-flex",
      "justify-content-between",
      "align-items-center",
      "p-2",
      "mb-2",
      "rounded-2",
      "bidderContainer-listing",
    );
    const bidderName = document.createElement("span");
    bidderName.classList.add("ms-1");
    bidderName.innerText = `Bidder: ${formatFullName(bid.bidderName)}`;
    const bidAmountContainer = document.createElement("div");
    bidAmountContainer.classList.add("d-flex", "align-items-center");
    const amountIcon = document.createElement("i");
    amountIcon.classList.add("fa-solid", "fa-coins", "fa-lg", "credits-icon");
    const amount = document.createElement("span");
    amount.classList.add("ms-1");
    amount.innerText = `${bid.amount} credit`;
    bidAmountContainer.append(amountIcon, amount);
    const bidDate = document.createElement("span");
    bidDate.innerText = timeSinceDate(bid.created);
    bidderContainer.append(bidderName, bidAmountContainer, bidDate);
    biddingContainer.append(bidderContainer);
  });

  const placeBidContainer = document.createElement("form");
  placeBidContainer.classList.add(
    "form-group",
    "d-flex",
    "flex-column",
    "align-items-center",
  );
  const placeBidInput = document.createElement("input");
  placeBidInput.classList.add("form-control", "mt-3");
  placeBidInput.type = "number";
  placeBidInput.placeholder = "Write in your bid";
  placeBidInput.required = "true";
  const placeBidButton = document.createElement("button");
  placeBidButton.innerText = "Submit bid";
  placeBidButton.classList.add("btn", "btn-primary", "mt-3", "col-12");
  placeBidButton.type = "submit";
  placeBidContainer.append(placeBidInput, placeBidButton);

  placeBidButton.addEventListener("click", (e) => {
    e.preventDefault();
    submitBid(Number(placeBidInput.value));
  });

  biddingContainer.append(placeBidContainer);
  infoContainer.append(biddingContainer);

  const watchlistButton = document.createElement("button");
  watchlistButton.type = "button";
  watchlistButton.innerText = "Add to watchlist";
  watchlistButton.classList.add("btn", "btn-info", "col-12");
  infoContainer.append(watchlistButton);

  const descriptionContainer = document.createElement("div");
  descriptionContainer.classList.add("mt-5", "mb-5");
  const descriptionHeader = document.createElement("h2");
  descriptionHeader.innerText = "Description:";
  const description = document.createElement("p");
  description.classList.add("fst-italic");
  description.innerText = listing.description;
  descriptionContainer.append(descriptionHeader, description);
  infoContainer.append(descriptionContainer);

  container.append(infoContainer);

  updateContainerClass();
  setActiveThumbnailOnLoad(thumbnailsRow);
  window.addEventListener("resize", updateContainerClass);
}
