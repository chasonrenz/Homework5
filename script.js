$(document).ready(function() {


    //Variables


    var $currentDay = $("#currentDay");
    var $timeOfDay = $("#timeOfDay");


    //Moment.JS Variables
    $currentDay.text(moment().format("dddd, MMMM Do"));
    $timeOfDay.text(moment().format("HH:mm"));

    // Start building Time box portion of row
    let $col2TimeDiv = $('<div>');
    $col2TimeDiv.addClass('col-lg-1');
  
    // create timeBox element (contains time)
    const $timeBoxSpn = $('<span>');
    // can use this to get value
    $timeBoxSpn.attr('class','timeBox');
    
    // format hours for display
    let displayHour = 0;
    let ampm = "";
    if (hour > 12) { 
      displayHour = hour - 12;
      ampm = "pm";
    } else {
      displayHour = hour;
      ampm = "am";
    }
    
    // populate timeBox with time
    $timeBoxSpn.text(`${displayHour} ${ampm}`);

    //Color-Coding TimeBlocks to indicate time of day

    function changetimeColor() {

        var currentTime = new Date().getHours();
        if (document.body) {
            if (9 <= currentTime && currentTime < 17) {
                document.body.row-timeblock = green;
            }
            else {
                document.body.row-timeblock = red;
            }
        }

    $(".saveBtn").on('click', function() {

        var eventDetails = $(this).siblings("#textarea").val();
        console.log(eventDetails)
        var eventTime = $(this).parent().attr("id");
        console.log(eventTime)

        //Prototype

        savedInfo = { event: eventDetails, time: eventTime }
        console.log(savedInfo)

        //Local Storage

        var storageObject = JSON.parse(localStorage.getItem("storedEvents"))

        if (storageObject == null) {
            localStorage.setItem("storedEvents", JSON.stringify([{ event: eventDetails, time: eventTime }]))

        } else {
            storageObject.push(savedInfo)
            localStorage.setItem("storedEvents", JSON.stringify(storageObject))
        }

        //make text area display

        $(this).siblings("#textarea").val(eventDetails);
        changetimeColor();

    })

    function renderAppointments() {
        var arrayHolder = JSON.parse(localStorage.getItem("storedEvents"))
        console.log(arrayHolder)
        if (arrayHolder != null) {
            for (var i = 0; i < arrayHolder.length; i++) {

                var storedAppts = arrayHolder[i]
                console.log(storedAppts)
                var apptTime = storedAppts.time
                console.log(apptTime)
                var apptDetails = storedAppts.event
                console.log(apptDetails)

                if (apptDetails != null) {
                    $("#" + apptTime).children("#textarea").val(apptDetails)
                }

            }
        }
    }
});