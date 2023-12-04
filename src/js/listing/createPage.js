import { timeSinceDate } from "../formatting/dateFormatting.js";
import { formatFullName } from "../formatting/profileObject.js";
import { highestBid } from "./highestBid.js";
import {
  setActiveThumbnailOnLoad,
  setActiveCarouselItem,
} from "./imageActiveState.js";

// import { timeRemaining } from "../formatting/timeToExpire.js";

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

  // Event listener for previous button
  prevButton.addEventListener("click", () => {
    let activeIndex = findActiveCarouselIndex(carouselInner) - 1;
    if (activeIndex < 0) {
      activeIndex = carouselInner.children.length - 1; // Loop back to the last item if at the beginning
    }
    setActiveCarouselItem(activeIndex, carouselInner, thumbnailsRow);
  });

  // Event listener for next button
  nextButton.addEventListener("click", () => {
    let activeIndex = findActiveCarouselIndex(carouselInner) + 1;
    if (activeIndex >= carouselInner.children.length) {
      activeIndex = 0; // Loop back to the first item if at the end
    }
    setActiveCarouselItem(activeIndex, carouselInner, thumbnailsRow);
  });

  // Helper function to find the index of the active carousel item
  function findActiveCarouselIndex(carouselInner) {
    return Array.from(carouselInner.children).findIndex((item) =>
      item.classList.contains("active"),
    );
  }

  carouselContainer.append(prevButton);
  carouselContainer.append(nextButton);

  container.append(imagesContainer);

  const infoContainer = document.createElement("div");
  infoContainer.classList.add("container");

  const listingTitle = document.createElement("h1");
  listingTitle.classList.add("header-4", "mt-3", "mb-3");
  listingTitle.innerText = listing.title;
  infoContainer.append(listingTitle);

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
  const sellerPreText = document.createElement("span");
  sellerPreText.classList.add("ms-2");
  sellerPreText.innerText = "Seller:";
  const sellerName = document.createElement("span");
  sellerName.classList.add("ms-1");
  sellerName.innerText = formatFullName(listing.seller.name);
  sellerContainer.append(sellerAvatar, sellerPreText, sellerName);
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
  placeBidButton.classList.add("btn", "btn-primary", "mt-3", "mb-3", "col-12");
  placeBidButton.type = "submit";
  placeBidContainer.append(placeBidInput, placeBidButton);
  biddingContainer.append(placeBidContainer);
  infoContainer.append(biddingContainer);

  const descriptionContainer = document.createElement("div");
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
