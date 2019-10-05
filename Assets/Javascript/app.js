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
  var nextArrival = "";
  var minutesAway = 0;

// var todaysDate = new Date();
  // console.log(todaysDate);
      
// Capture Button Click
  $("#add-train").on("click", function(event) {
    event.preventDefault();

    // Grabbed values from text boxes
      trainName = $("#trainName-input").val().trim();
      destination = $("#destination-input").val().trim();
      frequency = $("#frequency-input").val().trim();
      startTime = $("#startTime-input").val().trim();

    // Code for handling the push
      database.ref().push({
        trainName: trainName,
        destination: destination,
        frequency: frequency,
        startTime: startTime,
      });
  });
  


// Firebase watcher .on("child_added"
  database.ref().on("child_added", function(snapshot) {
  // storing the snapshot.val() in a variable for convenience
    var newTrainRow = $("<tr>")
    var allTrains = snapshot.val();

  // Console.loging the last user's data
    console.log(allTrains);
    console.log(allTrains.trainName);

    var newTrainName = $("<td>").text(allTrains.trainName);
    newTrainRow.append(newTrainName);

    var newTrainDestination = $("<td>").text(allTrains.destination);
    newTrainRow.append(newTrainDestination);

    var newTrainFrequency = $("<td>").text(allTrains.frequency);
    newTrainRow.append(newTrainFrequency);

    var newTrainNextArrival = $("<td>").text("19:00");
    newTrainRow.append(newTrainNextArrival);

    var newTrainMinutesAway = $("<td>").text("30");
    newTrainRow.append(newTrainMinutesAway);

    $("#trainContainer").append(newTrainRow);

  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });
