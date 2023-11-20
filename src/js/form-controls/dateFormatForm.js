document.addEventListener("DOMContentLoaded", function () {
  var today = new Date();
  var formattedDate =
    today.getFullYear() +
    "-" +
    String(today.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(today.getDate()).padStart(2, "0");
  document.querySelector("#endingDate").value = formattedDate;
});
