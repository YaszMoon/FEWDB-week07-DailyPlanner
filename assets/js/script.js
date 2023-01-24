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

// Create container
var containerEl = $(".container");

// Add space for confirmation message
var confirmSave = $('<p id="confirmSave">')
// Add message styling
confirmSave.css("text-align", "center")
// Add to container
containerEl.append(confirmSave)

// To create one row
function createRow(time) {
  // Create div for the row
  var rowEl = $('<div class="row time-block">');

  // Create div for time
  var timeEl = $('<div class="hour col-1">');
  // Insert text for time slot
  timeEl.text(time);
  // Update styling
  timeEl.css("padding-top", "30px");

  // Get last input from local storage
  var savedText = localStorage.getItem(time);
  // If input is null, change var to empty string
  if (savedText == null) {
    savedText = "";
  }
  // Create div for description
  var descripEl = $(
    `<input type="text" class="description textarea col-10" id=${time}>`
  );
  // Set value of input to stored input
  descripEl.val(savedText);

  // Check time and add styling for past, present and future time slots
  var timeCheck = moment(time, "hA");
  if (today > timeCheck) {
    descripEl.addClass("past");
  } else if (today < timeCheck && today > timeCheck.subtract(1, "hour")) {
    descripEl.addClass("present");
  } else {
    descripEl.addClass("future");
  }

  // Create i for save button
  var btnEl = $(
    `<div class="saveBtn col-1"><i class="fas fa-save" data-id=${time}></div>`
  );
  btnEl.css({ "padding-top": "30px" });

  // Build row
  rowEl.append(timeEl, descripEl, btnEl);

  // Return the completed row
  return rowEl;
}

// Add space for save confirmation

// Initialise Planner
for (var i = 0; i < timeSlots.length; i++) {
  // Create new row
  var newRow = createRow(timeSlots[i]);
  // Add row to container
  containerEl.append(newRow);
}

$(".saveBtn i").on("click", function (event) {
  // Get button data-id
  var check = event.target.dataset.id;
  // Select relevant input field
  var eventInput = $("#" + check).val();
  // Save event to local storage
  localStorage.setItem(check, eventInput);

  // Update confirmation message
  // Clear message
  confirmSave.text("")
  // New message
  confirmSave.text(`Appointment at ${check} added to localStorage ✔️`);
});
