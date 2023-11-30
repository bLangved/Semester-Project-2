const addImagesButton = document.querySelector("#additionalImagesButton");
/**
 * @description when "add additional images"-button is clicked on listing-create.html, adds a new input field for pasting URL to image
 */
addImagesButton.addEventListener("click", () => {
  const container = document.querySelector("#additionalImagesContainer");
  const existingInputs = container.getElementsByTagName("input").length;

  if (existingInputs < 4) {
    const input = document.createElement("input");
    input.type = "text";
    input.className = "form-control mb-2";
    input.name = "additionalImageUrls[]";
    input.placeholder = "Enter additional image URL";
    container.append(input);
  } else {
    // Optional: Alert the user or disable the button if the limit is reached
    alert("Maximum of 4 additional images can be added.");
  }
});
