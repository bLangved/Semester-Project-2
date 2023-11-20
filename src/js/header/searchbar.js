// /**
//  * Filters the posts on the website based on text input in searchbar
//  *
//  * Accepts 2 options atm: username (string) and id (number)
//  */
// const searchbarInput = document.querySelector("#searchbarInput");
// searchbarInput.addEventListener("input", filterPosts);

// function filterPosts() {
//   const inputValue = searchbarInput.value.trim(); // get the current value of the input field
//   const allCards = document.querySelectorAll(".card"); // targets all .card elements on page with .card class

//   allCards.forEach((card) => {
//     const postId = card.getAttribute("data-id"); // get the data-id attribute from each card (id)
//     const userName = card.querySelector(".card-top-text").innerText.trim(); // get the innerText of the userName element

//     if (
//       postId.startsWith(inputValue) ||
//       userName.toLowerCase().startsWith(inputValue.toLowerCase())
//     ) {
//       card.style.display = "block"; // Shows the card that matches the input criteria
//     } else {
//       card.style.display = "none"; // hide the cards that does not match the input criteria
//     }
//   });
// }
