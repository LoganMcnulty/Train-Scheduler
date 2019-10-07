// Initialize Firebase
  var firebaseConfig = {
      apiKey: "AIzaSyBHn3PzeCOcWZAqq98zDP2KcEMMT-Fd0jY",
      authDomain: "logan-unc.firebaseapp.com",
      databaseURL: "https://logan-unc.firebaseio.com",
      projectId: "logan-unc",
      storageBucket: "logan-unc.appspot.com",
      messagingSenderId: "1086533562296",
      appId: "1:1086533562296:web:8f6a50b90cd8697eb6294d"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

// Create a variable to reference the database.
  var database = firebase.database();
  
// Initial Values
  var trainName = "";
  var destination = "";
  var frequency = "";
  var startTime = "";
  var currentTime = moment();
  var newCurrentTime = currentTime.format("hh:mm")

// Capture Button Click
  $("#add-train").on("click", function(event) {
      event.preventDefault();

    // Grabbed values from text boxes
      trainName = $("#trainName-input").val().trim();
      destination = $("#destination-input").val().trim();
      frequency = $("#frequency-input").val().trim();
      startTime = $("#startTime-input").val().trim();
      
    // Code for handling the push
      database.ref("/trains").push({
        trainName: trainName,
        destination: destination,
        frequency: frequency,
        startTime: startTime,
      });
      document.getElementById("ferryForm").reset();
  });
  
// Firebase watcher .on("child_added"
  database.ref("/trains").on("child_added", function(snapshot) {

  // storing the snapshot.val() in a variable for convenience
    var newTrainRow = $("<tr>")
    var allTrains = snapshot.val();

  // Console.loging the last user's data
    console.log(allTrains);

    var newTrainName = $("<td>").text(allTrains.trainName);
    newTrainRow.append(newTrainName);

    var newTrainDestination = $("<td>").text(allTrains.destination);
    newTrainRow.append(newTrainDestination);

    var newTrainFrequency = $("<td>").text(allTrains.frequency);
    newTrainRow.append(newTrainFrequency);

    var firstTimeConverted = moment(allTrains.startTime, "HH:mm").subtract(1, "years");
    
    var diffTime = currentTime.diff(moment(firstTimeConverted), "minutes");

    var timeRemainder = diffTime % allTrains.frequency;

    var timeUntillTrain = allTrains.frequency - timeRemainder;

    var nextTrain = moment().add(timeUntillTrain, "minutes");
    var nextTrainHours = nextTrain.format("hh:mm")

    var newTrainNextArrival = $("<td>").text(nextTrainHours);
    newTrainRow.append(newTrainNextArrival);

    var newTrainMinutesAway = $("<td>").text(timeUntillTrain);
    newTrainRow.append(newTrainMinutesAway);

    var removeTrainTD = $("<td>").attr("trainName", allTrains.trainName);
    var removeTrainbutton = $("<button>").text("✓");
    removeTrainbutton.addClass("checkbox");
    removeTrainTD.append(removeTrainbutton);
    newTrainRow.append(removeTrainTD);

    $("#trainContainer").append(newTrainRow);
  }, 
    function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
    }
  );

// REMOVE A FERRY FUNCTION
  $(document).on("click",".checkbox", function() {
    event.preventDefault();
    console.log("test");

    
    // var trainRunning = false;
    // database.ref("trains").push({
    //   trainRunning: trainRunning,
    // });
  });

// CLEAR THE SCHEDULE FUNCTION
$("#clearSchedule").on("click", function(event) {
  database.ref("trains").remove();
  setTimeout(window.location.reload(), 2000);
});

