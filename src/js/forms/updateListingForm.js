import loadingAnimation from "../animations/loadingAnimation.js";
import { listing } from "../api/auth/createListing.js";
import { checkLength, isValidUrl } from "../validation/inputValidation.js";

const form = document.querySelector("#listingForm");

const title = document.querySelector("#title");
const description = document.querySelector("#description");
const tags = document.querySelector("#tags");
const mainImageUrl = document.querySelector("#mainImgUrl");
// const addImgContainer = document.querySelector("#additionalImagesContainer");
const endDate = document.querySelector("#endDate");
const endTime = document.querySelector("#endTime");

const titleMessage = document.querySelector("#titleMessage");
const mainImgUrlMessage = document.querySelector("#mainImgUrlMessage");
// const addImgContainerMessage = document.querySelector(
//   "#addImgContainerMessage"
// );
const endTimeAndDateMessage = document.querySelector("#endTimeAndDateMessage");
const formMessage = document.querySelector("#formMessage");

// const AddImgBtn = document.querySelector("#additionalImagesButton");
const submitButton = document.querySelector("#submitButtonListing");

const requiredFields = [title, endDate, endTime];

/**
 * Checks input fields if they matches patterns for validation
 * @returns {number}
 */
function validateForm() {
  const combinedDateTime = new Date(endDate.value + "T" + endTime.value);
  let validationPassed = 0;

  if (checkLength(title.value, 1) === true) {
    validationPassed++;
    titleMessage.innerText = "";
  } else {
    titleMessage.innerText = "Title is a required field";
  }
  if (mainImageUrl.value.length >= 1) {
    if (isValidUrl(mainImageUrl.value)) {
      mainImgUrlMessage.innerText = "";
    } else {
      mainImgUrlMessage.innerText = "Fill inn a valid url";
    }
  } else {
    mainImgUrlMessage.innerText = "";
  }
  if (combinedDateTime >= new Date()) {
    validationPassed++;
    endTimeAndDateMessage.innerText = "";
  } else {
    endTimeAndDateMessage.innerText = "End date and time must be in the future";
  }
  return validationPassed;
}

/**
 * Validates the form in real-time as the user types into the input fields
 * SubmitButton gets a transition color effect
 */
requiredFields.forEach((field) => {
  field.targeted = false;
  field.addEventListener("input", () => {
    field.targeted = true;
    const isValidationPassed = validateForm();
    switch (isValidationPassed) {
      case 1:
        submitButton.style.color = "black";
        submitButton.style.setProperty("--progress-width", "50%");
        break;
      case 2:
        submitButton.style.setProperty("--progress-width", "100%");
        submitButton.style.color = "white";
        formMessage.classList.add("d-none");
        break;
      default:
        submitButton.style.setProperty("--progress-width", "0%");
    }
  });
});

// Handles the form submission event
submitButton.addEventListener("click", async (e) => {
  e.preventDefault();
  const isValidationPassed = validateForm();
  if (isValidationPassed === 2) {
    const tagsArray = tags.value.split(",").map((tag) => tag.trim());

    const additionalImageInputs = document.querySelectorAll(
      'input[name="additionalImageUrls[]"]',
    );
    const additionalImgUrlsArray = Array.from(additionalImageInputs)
      .map((input) => input.value)
      .filter((url) => isValidUrl(url));

    let mediaArray = [];
    if (isValidUrl(mainImageUrl.value)) {
      mediaArray.push(mainImageUrl.value);
    }
    mediaArray = mediaArray.concat(additionalImgUrlsArray);

    const combinedDateTime = new Date(endDate.value + "T" + endTime.value);
    const endsAtUTC = combinedDateTime.toISOString();

    const listingObject = {
      title: title.value,
      description: description.value,
      endsAt: endsAtUTC,
      tags: tagsArray,
      ...(mediaArray.length > 0 && { media: mediaArray }),
    };
    loadingAnimation.classList.remove("d-none");
    form.classList.add("d-none");
    await listing(listingObject);
  } else {
    formMessage.classList.remove("d-none");
    formMessage.innerText = "Fill inn all fields that are required";
  }
});
