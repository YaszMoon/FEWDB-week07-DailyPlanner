// Time variables
var timeSlots = [
  "9AM",
  "10AM",
  "11AM",
  "12PM",
  "1PM",
  "2PM",
  "3PM",
  "4PM",
  "5PM",
];
var today = moment();

// Text content for current day displayed at top of page
var currentDay = $("#currentDay");
currentDay.text(today.format("dddd Do MMMM YYYY"));

// Within the container
var containerEl = $(".container");
// To create one row
function createRow(time) {
  // Create div class="row time-block" to hold line
  var rowEl = $("<div>");
  rowEl.addClass("row time-block");
  // Create div for time class="hour col-2"
  var timeEl = $('<div class="hour col-1">');
  timeEl.text(time);
  timeEl.css({ "padding-top": "30px" });

  // Create div for description class="description col-8"
  var savedText = localStorage.getItem(time)
  if (savedText == null) {
    savedText = ""
  }
  var descripEl = $(
    `<input type="text" class="description textarea col-10" id=${time}>`
  );
  descripEl.val(savedText)

  // Check time and add styling for past, present and future time slots
  var timeCheck = moment(time, "hA");
  if (today > timeCheck) {
    descripEl.addClass("past");
  } else if (today < timeCheck && today > timeCheck.subtract(1, "hour")) {
    descripEl.addClass("present");
  } else {
    descripEl.addClass("future");
  }

  // Create i for save button class="saveBtn col-2 fa-solid fa-floppy-disk"
  var btnEl = $(
    `<div class="saveBtn col-1"><i class="fas fa-save" data-id=${time}></div>`
  );
  btnEl.css({ "padding-top": "30px" });

  rowEl.append(timeEl, descripEl, btnEl);

  return rowEl;
}

// Initialise Planner
for (var i = 0; i < timeSlots.length; i++) {
  var newRow = createRow(timeSlots[i]);
  containerEl.append(newRow);
}

$(".saveBtn i").on("click", function (event) {
  var check = event.target.dataset.id;
  var eventInput = $('#'+check).val();
  localStorage.setItem(check, eventInput)
});