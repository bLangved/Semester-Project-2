import {
  validateNoroffEmail,
  checkLength,
  isValidUrl,
} from "../validation/inputValidation.js";
import loadingAnimation from "../animations/loadingAnimation.js";
import { register } from "../api/auth/register.js";

const registerForm = document.querySelector("#registerForm");
const formErrorMessage = document.querySelector("#registerErrorMessage");
const firstName = document.querySelector("#registerFirstName");
const lastName = document.querySelector("#registerLastName");
const email = document.querySelector("#registerEmail");
const emailType = document.querySelector("#registerEmailType");
const password = document.querySelector("#registerPassword");
const passwordConfirm = document.querySelector("#registerPasswordConfirm");
const avatar = document.querySelector("#registerAvatar");

const iconFirstNameSucsess = document.querySelector(
  "#registerFirstNameSucsess",
);
const iconFirstNameError = document.querySelector("#registerFirstNameError");
const iconLastNameSucsess = document.querySelector("#registerLastNameSucsess");
const iconLastNameError = document.querySelector("#registerLastNameError");
const iconMailSucsess = document.querySelector("#registerEmailSucsess");
const iconMailError = document.querySelector("#registerEmailError");
const iconPasswordSucsess = document.querySelector("#registerPasswordSucsess");
const iconPasswordError = document.querySelector("#registerPasswordError");
const iconPasswordConfirmSucsess = document.querySelector(
  "#registerPasswordConfirmSucsess",
);
const iconPasswordConfirmError = document.querySelector(
  "#registerPasswordConfirmError",
);
const iconAvatarSucsess = document.querySelector("#registerAvatarSucsess");
const iconAvatarError = document.querySelector("#registerAvatarError");

const submitButton = document.querySelector("#submitButtonRegister");

const requiredFields = [
  firstName,
  lastName,
  email,
  password,
  passwordConfirm,
  avatar,
];
/**
 * Checks input fields if they matches patterns for validation
 * @returns {number}
 */
function validateForm() {
  let validationPassed = 0;

  if (checkLength(firstName.value, 2) === true) {
    iconFirstNameSucsess.classList.remove("d-none");
    iconFirstNameError.classList.add("d-none");
    validationPassed++;
  } else {
    if (firstName.targeted) {
      iconFirstNameSucsess.classList.add("d-none");
      iconFirstNameError.classList.remove("d-none");
    }
  }
  if (checkLength(lastName.value, 2) === true) {
    iconLastNameSucsess.classList.remove("d-none");
    iconLastNameError.classList.add("d-none");
    validationPassed++;
  } else {
    if (lastName.targeted) {
      iconLastNameSucsess.classList.add("d-none");
      iconLastNameError.classList.remove("d-none");
    }
  }
  if (validateNoroffEmail(email.value) === true) {
    iconMailSucsess.classList.remove("d-none");
    iconMailError.classList.add("d-none");
    validationPassed++;
  } else {
    if (email.targeted) {
      iconMailSucsess.classList.add("d-none");
      iconMailError.classList.remove("d-none");
    }
  }
  if (checkLength(password.value, 8) === true) {
    iconPasswordSucsess.classList.remove("d-none");
    iconPasswordError.classList.add("d-none");
    validationPassed++;
  } else {
    if (password.targeted) {
      iconPasswordSucsess.classList.add("d-none");
      iconPasswordError.classList.remove("d-none");
    }
  }
  if (passwordConfirm.value !== password.value) {
    if (passwordConfirm.targeted) {
      iconPasswordConfirmSucsess.classList.add("d-none");
      iconPasswordConfirmError.classList.remove("d-none");
    }
  } else if (checkLength(passwordConfirm.value, 8) !== true) {
    if (passwordConfirm.targeted) {
      iconPasswordConfirmSucsess.classList.add("d-none");
      iconPasswordConfirmError.classList.remove("d-none");
    }
  } else {
    iconPasswordConfirmSucsess.classList.remove("d-none");
    iconPasswordConfirmError.classList.add("d-none");
    validationPassed++;
  }
  if (isValidUrl(avatar.value) === true) {
    iconAvatarSucsess.classList.remove("d-none");
    iconAvatarError.classList.add("d-none");
  } else {
    if (avatar.targeted) {
      iconAvatarSucsess.classList.add("d-none");
      iconAvatarError.classList.remove("d-none");
    }
  }

  /**
   * @description Autogenerates an email for the user that matches API email-pattern requirements.
   * @description User choose if said user is student/employee by dropdown menu
   */
  function updateEmailBasedOnName() {
    const first = firstName.value.replace(/\s+/g, "");
    const last = lastName.value.replace(/\s+/g, "");
    const selectedEmailType = emailType.value;
    const combined = `${first}.${last}`;
    email.value = combined + "@" + selectedEmailType;
  }

  // updates the inputs in real time when typing in the textfields
  firstName.addEventListener("input", updateEmailBasedOnName);
  lastName.addEventListener("input", updateEmailBasedOnName);
  emailType.addEventListener("change", updateEmailBasedOnName);

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
        submitButton.style.setProperty("--progress-width", "20%");
        break;
      case 2:
        submitButton.style.setProperty("--progress-width", "40%");
        submitButton.style.color = "black";
        break;
      case 3:
        submitButton.style.setProperty("--progress-width", "60%");
        submitButton.style.color = "black";
        break;
      case 4:
        submitButton.style.setProperty("--progress-width", "80%");
        submitButton.style.color = "black";
        break;
      case 5:
        submitButton.style.setProperty("--progress-width", "100%");
        submitButton.style.color = "white";
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
  if (!isValidationPassed) {
    formErrorMessage.classList.remove("d-none");
    formErrorMessage.textContent =
      "Please ensure all fields are valid before proceeding!";
  } else {
    formErrorMessage.textContent = "";
    const fullName = `${firstName.value}_${lastName.value}`;
    const registerCredentials = {
      name: fullName,
      email: email.value,
      password: password.value,
      avatar: avatar.value || null,
    };
    loadingAnimation.classList.remove("d-none");
    registerForm.classList.add("d-none");
    await register(registerCredentials);
  }
});
