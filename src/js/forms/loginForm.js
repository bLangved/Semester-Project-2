import {
  validateNoroffEmail,
  checkLength,
} from "../validation/inputValidation.js";
import loadingAnimation from "../animations/loadingAnimation.js";
import { login } from "../api/auth/login.js";

const loginForm = document.querySelector("#loginForm");
const formErrorMessage = document.querySelector("#loginErrorMessage");
const email = document.querySelector("#email");
const password = document.querySelector("#password");

const iconMailSucsess = document.querySelector("#emailSucsess");
const iconMailError = document.querySelector("#emailError");
const iconPasswordSucsess = document.querySelector("#passwordSucsess");
const iconPasswordError = document.querySelector("#passwordError");

const submitButton = document.querySelector("#submitButtonLogin");

const requiredFields = [email, password];
/**
 * Checks email and password if it matches patterns for validation
 * @returns {number}
 */
function validateForm() {
  let validationPassed = 0;

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
  if (isValidationPassed !== requiredFields.length) {
    formErrorMessage.classList.remove("d-none");
    formErrorMessage.textContent =
      "Please ensure all fields are valid before proceeding!";
  } else {
    formErrorMessage.textContent = "";

    const loginCredentials = {
      email: email.value,
      password: password.value,
    };
    loadingAnimation.classList.remove("d-none");
    loginForm.classList.add("d-none");
    await login(loginCredentials);
  }
});
