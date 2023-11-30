/**
 * @description Automaticly sets time and date as of now in listingForm.js
 */
document.addEventListener("DOMContentLoaded", function () {
  var now = new Date();

  var formattedDate =
    now.getFullYear() +
    "-" +
    String(now.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(now.getDate()).padStart(2, "0");

  var endDateInput = document.querySelector("#endDate");
  endDateInput.value = formattedDate;
  endDateInput.min = formattedDate;

  var hours = now.getHours().toString().padStart(2, "0");
  var minutes = now.getMinutes().toString().padStart(2, "0");
  var formattedTime = hours + ":" + minutes;

  var endTimeInput = document.querySelector("#endTime");
  endTimeInput.value = formattedTime;
  endTimeInput.min = formattedTime;
});
