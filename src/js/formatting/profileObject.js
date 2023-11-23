/**
 * @description Recieves string, capitalize it, and slice off everything after underscore
 * @param {string} profileName
 * @returns Capitaliced first name
 */
export function formatName(profileName) {
  let underscoreIndex = profileName.indexOf("_");
  let formattedName = profileName.slice(0, underscoreIndex);
  formattedName =
    formattedName.charAt(0).toUpperCase() + formattedName.slice(1);
  return formattedName;
}

/**
 * @description Receives a string, capitalizes the sections before and after the underscore, and replaces the underscore with a space
 * @param {string} profileName
 * @returns Formatted name
 */
export function formatFullName(profileName) {
  // Split the string at the underscore
  let nameParts = profileName.split("_");

  // Capitalize each part
  for (let i = 0; i < nameParts.length; i++) {
    nameParts[i] = nameParts[i].charAt(0).toUpperCase() + nameParts[i].slice(1);
  }

  // Join the parts with a space
  return nameParts.join(" ");
}
