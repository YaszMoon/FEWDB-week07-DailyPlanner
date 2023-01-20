console.log('here')

// Within the container
var containerEl = $('.container')
// To create one line....
// Create div class="row time-block" to hold line
var rowEl = $('<div>')
rowEl.addClass('row time-block')
    // Create div for time class="hour col-2"
    var timeEl = $('<div class="hour col-2">')
    // Create div for description class="description col-8"
    var descripEl = $('<div class="description col-8">')
    // Create i for save button class="saveBtn col-2 fa-solid fa-floppy-disk"
    var btnEl = $('<i class="saveBtn col-2 fa-solid fa-floppy-disk">')
rowEl.append(timeEl, descripEl, btnEl)
containerEl.append(rowEl)

// For every row add data-time = 9AM etc....

// Past present future
// var timeNow
// if hh in timeNow > dataset.time {setAttribute("class", "past")}
// else if hh in timeNow < dataset.time {setAttribute("class", "future")}
// else {setAttribute("class", present)}