/**
 * @param {any} value
 * @param {number} length
 * @returns {boolean} true / false
 * @description Checking the length of the value passed in.
 */
export function checkLength(value, length) {
  if (value.trim().length >= length) {
    return true;
  } else {
    return false;
  }
}

/**
 * @param {string} email
 * @returns {string} email addresse
 * @description Checks for valid email pattern.
 */
export function validateEmail(email) {
  const regex = /\S+@\S+\.\S+/;
  const patternMatches = regex.test(email);
  return patternMatches;
}

/**
 * @param {string} email
 * @returns {string} email addresse
 * @description Checks for valid noroff email pattern. Needs to be a "." before the "@", and it needs to be a "@noroff.no" or "@stud.noroff.no"
 */
export function validateNoroffEmail(email) {
  const regex = /^[^@]+?\.[^@]+?@(stud\.noroff\.no|noroff\.no)$/;
  const patternMatches = regex.test(email);
  return patternMatches;
}

/**
 * @description Checks if string is a valid URL
 * @param {string} urlString
 * @returns {bool}
 */
export function isValidUrl(urlString) {
  try {
    new URL(urlString);
    return true;
  } catch (e) {
    return false;
  }
}
