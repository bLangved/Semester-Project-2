export function firstIndexImage(arrayOfImages) {
  let imageUrl;

  if (arrayOfImages.length > 0) {
    imageUrl = arrayOfImages[0];
  } else {
    imageUrl =
      arrayOfImages.media || "/images/placeholder/placeholder_card.jpg";
  }
  return imageUrl;
}

export function restIndexedImage(arrayOfImages, index) {
  if (index > 0 && index < arrayOfImages.length) {
    return arrayOfImages[index];
  } else {
    return "/images/placeholder/placeholder_card.jpg";
  }
}
