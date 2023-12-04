export function setActiveThumbnailOnLoad(thumbnailsRow) {
  const thumbnails = thumbnailsRow.querySelectorAll(".img-thumbnail");
  if (thumbnails.length > 0) {
    thumbnails[0].classList.add("active-thumbnail");
  }
}

export function updateThumbnailActiveState(activeIndex, thumbnailsRow) {
  const thumbnails = thumbnailsRow.querySelectorAll(".img-thumbnail");
  thumbnails.forEach((thumbnail, index) => {
    if (index === activeIndex) {
      thumbnail.classList.add("active-thumbnail");
    } else {
      thumbnail.classList.remove("active-thumbnail");
    }
  });
}

export function setActiveCarouselItem(
  activeIndex,
  carouselInner,
  thumbnailsRow,
) {
  const carouselItems = carouselInner.querySelectorAll(".carousel-item");
  carouselItems.forEach((item, index) => {
    if (index === activeIndex) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
  updateThumbnailActiveState(activeIndex, thumbnailsRow);
}
