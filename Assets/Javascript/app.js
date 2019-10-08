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

// Capture Submit Button Click
  $("#add-train").on("click", function(event) {
    event.preventDefault();

// Grabbed values from form text boxes
  trainName = $("#trainName-input").val().trim();
  destination = $("#destination-input").val().trim();
  frequency = $("#frequency-input").val().trim();
  startTime = $("#startTime-input").val().trim();
  trainRunning = true;

//Creat a variable to the database with a branch of "/trains". Push children to the branch
 let trainRef = database.ref("/trains");
  trainRef.child(trainName).set({
    trainName: trainName,
    destination: destination,
    frequency: frequency,
    startTime: startTime,
    trainRunning: trainRunning
  });
//Reset the form upon submission
  document.getElementById("ferryForm").reset();
});

// Firebase watcher .on("child_added"
  database.ref("/trains").on("child_added", function(snapshot) {

//train row to be added to table
  var newTrainRow = $("<tr>");
//story snapshot of "/trains" portion of DB to "allTrains"
  var allTrains = snapshot.val();

// Console.loging all trains
  console.log(allTrains);

// pull train information from firebase, and append to train row
  var newTrainName = $("<td>").text(allTrains.trainName);
  newTrainRow.append(newTrainName);

  var newTrainDestination = $("<td>").text(allTrains.destination);
  newTrainRow.append(newTrainDestination);

// train next arrival and time until arrival formulas
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

//checkbox for removing trains
  var removeTrainTD = $("<td>");
  var removeTrainbutton = $("<button>").text("✓").attr("trainName", allTrains.trainName);
  removeTrainbutton.addClass("checkbox");
  removeTrainTD.append(removeTrainbutton);
  newTrainRow.append(removeTrainTD);

//append new train row to train container
  $("#trainContainer").append(newTrainRow);
}, 
function(errorObject) {
console.log("Errors handled: " + errorObject.code);
}
);

// REMOVE A FERRY FUNCTION
  $(document).on("click",".checkbox", function() {
  let dbRef = database.ref("trains");
  var trainForRemoval = $(this).attr("trainName");
  let dbRefChild = dbRef.child(trainForRemoval);
  dbRefChild.remove();
  window.location.reload();
  });;

// CLEAR THE SCHEDULE FUNCTION
  $("#clearSchedule").on("click", function(event) {
  let dbRef = database.ref("trains");
  dbRef.remove();
  setTimeout(window.location.reload(), 2000);
  });

