const addImagesButton = document.querySelector("#additionalImagesButton");
/**
 * @description when "add additional images"-button is clicked on listing-create.html, adds a new input field for pasting URL to image
 */
addImagesButton.addEventListener("click", () => {
  var container = document.getElementById("additionalImagesContainer");
  var existingInputs = container.getElementsByTagName("input").length;

  if (existingInputs < 4) {
    var input = document.createElement("input");
    input.type = "text";
    input.className = "form-control mb-2";
    input.name = "additionalImageUrls[]";
    input.placeholder = "Enter additional image URL";
    container.appendChild(input);
  } else {
    // Optional: Alert the user or disable the button if the limit is reached
    alert("Maximum of 4 additional images can be added.");
  }
});
