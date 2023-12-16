import { deleteListing } from "../api/auth/deleteListing.js";
import { timeRemaining, timeSinceDate } from "../formatting/dateFormatting.js";
import { formatFullName } from "../formatting/profileObject.js";
import { updateListingInSessionStorage } from "../storage/updateBidInSession.js";
import { submitBid } from "./addBid.js";
import { highestBid } from "./highestBid.js";
import {
  setActiveThumbnailOnLoad,
  setActiveCarouselItem,
} from "./imageActiveState.js";

export function createHTML(listing) {
  console.log(listing);
  const auctionEndTime = new Date(listing.endsAt);
  const currentTime = new Date();
  const auctionEnded = currentTime >= auctionEndTime;

  const container = document.querySelector("#listingContainerRow");
  container.classList.add(
    "container-md",
    "p-0",
    "mt-md-4",
    "d-flex",
    "flex-column",
    "flex-lg-row",
    "gap-lg-3",
  );

  // IMAGES
  const imagesContainer = document.createElement("div");
  imagesContainer.classList.add("img-container_listing");

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
  setupActiveImageClickEvent();
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
    listing.media.length > 1
  ) {
    listing.media.forEach((imageSrc, index) => {
      const col = document.createElement("div");
      col.classList.add("col", "d-flex", "justify-content-center");

      const thumbnail = document.createElement("img");
      thumbnail.classList.add("img-thumbnail", "thumbnails_listing");
      thumbnail.src = imageSrc;

      thumbnail.addEventListener("click", () => {
        setActiveCarouselItem(index, carouselInner, thumbnailsRow);
        setupActiveImageClickEvent();
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
    setupActiveImageClickEvent();
  });

  nextButton.addEventListener("click", () => {
    let activeIndex = findActiveCarouselIndex(carouselInner) + 1;
    if (activeIndex >= carouselInner.children.length) {
      activeIndex = 0;
    }
    setActiveCarouselItem(activeIndex, carouselInner, thumbnailsRow);
    setupActiveImageClickEvent();
  });

  function findActiveCarouselIndex(carouselInner) {
    return Array.from(carouselInner.children).findIndex((item) =>
      item.classList.contains("active"),
    );
  }

  function setupActiveImageClickEvent() {
    const imgs = carouselInner.querySelectorAll("img");
    imgs.forEach((img) => {
      img.onclick = null;
    });

    const activeItem = carouselInner.querySelector(".carousel-item.active");
    if (activeItem) {
      const img = activeItem.querySelector("img");
      if (img) {
        img.style.cursor = "pointer";
        img.onclick = () => window.open(img.src, "_blank");
      }
    }
  }

  carouselContainer.append(prevButton, nextButton);

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

  const sellerContainer = document.createElement("div");
  sellerContainer.classList.add(
    "container",
    "d-flex",
    "align-items-center",
    "p-3",
    "rounded-4",
    "sellerContainer-listing",
  );
  // sellerContainer.href = `profile.html`;
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
    bidderName.innerText = `${formatFullName(bid.bidderName)}`;
    const bidAmountContainer = document.createElement("div");
    bidAmountContainer.classList.add("d-flex", "align-items-center");
    const amountIcon = document.createElement("i");
    amountIcon.classList.add("fa-solid", "fa-coins", "fa-lg", "credits-icon");
    const amount = document.createElement("span");
    amount.classList.add("ms-1");
    amount.innerText = `${bid.amount}`;
    bidAmountContainer.append(amountIcon, amount);
    const bidDate = document.createElement("span");
    bidDate.innerText = timeSinceDate(bid.created);
    bidderContainer.append(bidderName, bidAmountContainer, bidDate);
    biddingContainer.append(bidderContainer);
  });
  if (!auctionEnded) {
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

    placeBidButton.addEventListener("click", async (e) => {
      e.preventDefault();
      try {
        const updatedListing = await submitBid(Number(placeBidInput.value));
        console.log(updatedListing);
        updateListingInSessionStorage(updatedListing);
        window.location.reload();
      } catch (error) {
        console.error("Error submitting bid:", error.message);
      }
    });

    biddingContainer.append(placeBidContainer);
  }
  infoContainer.append(biddingContainer);

  if (auctionEnded && listing.bids && listing.bids.length > 0) {
    const wonByContainer = document.createElement("div");
    wonByContainer.classList.add("mt-3");

    const wonByPreText = document.createElement("span");
    wonByPreText.innerText = "Won by: ";
    wonByContainer.append(wonByPreText);

    const lastBid = listing.bids[listing.bids.length - 1];
    const wonByBuyer = document.createElement("span");
    wonByBuyer.innerText = formatFullName(lastBid.bidderName);
    wonByContainer.append(wonByBuyer);

    infoContainer.append(wonByContainer);
  }
  const descriptionContainer = document.createElement("div");
  descriptionContainer.classList.add("mt-5", "mb-5");
  const descriptionHeader = document.createElement("h2");
  descriptionHeader.innerText = "Description:";
  const description = document.createElement("p");
  description.classList.add("fst-italic");
  description.innerText = listing.description;
  descriptionContainer.append(descriptionHeader, description);
  infoContainer.append(descriptionContainer);

  const additionalContainer = document.createElement("div");
  additionalContainer.classList.add("mb-5");
  const auctionIdContainer = document.createElement("div");
  const AuctionIdPreText = document.createElement("span");
  AuctionIdPreText.classList.add("fw-bold");
  AuctionIdPreText.innerText = "Auction id: ";
  const auctionId = document.createElement("span");
  auctionId.innerText = listing.id;
  auctionIdContainer.append(AuctionIdPreText, auctionId);

  const expiresContainer = document.createElement("div");
  const expiresPreText = document.createElement("span");
  expiresPreText.classList.add("fw-bold");
  expiresPreText.innerText = "Expires in: ";
  const expires = document.createElement("span");
  expires.innerText = timeRemaining(listing.endsAt);
  expiresContainer.append(expiresPreText, expires);

  additionalContainer.append(auctionIdContainer, expiresContainer);

  infoContainer.append(additionalContainer);

  const profileObject = JSON.parse(localStorage.getItem("profile"));
  const profileName = profileObject.name;
  if (listing.seller.name === profileName) {
    const editListingContainer = document.createElement("div");

    const editButton = document.createElement("button");
    editButton.classList.add("btn", "btn-warning", "col-12", "mb-3");
    editButton.type = "button";
    editButton.innerText = "Edit listing";
    editButton.addEventListener("click", () => {
      const currentListing = JSON.stringify(listing);
      localStorage.setItem("currentListing", currentListing);
      window.location.href = "listing-edit.html";
    });

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("btn", "btn-danger", "col-12", "mb-3");
    deleteButton.type = "button";
    deleteButton.innerText = "Delete listing";
    deleteButton.addEventListener("click", () => {
      if (confirm("Are you sure you want to delete the listing?")) {
        const params = new URLSearchParams(window.location.search);
        const id = params.get("id");
        deleteListing(id);
      }
    });

    editListingContainer.append(editButton, deleteButton);

    infoContainer.append(editListingContainer);
  }

  container.append(infoContainer);

  setActiveThumbnailOnLoad(thumbnailsRow);
}
