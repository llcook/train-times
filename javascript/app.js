// INITIALIZE DATABASE
var config = {
    apiKey: "AIzaSyAXCM4xF-y-Z_RThOBgEIHr9Pii1b4D39Y",
    authDomain: "fir-558d2.firebaseapp.com",
    databaseURL: "https://fir-558d2.firebaseio.com",
    projectId: "fir-558d2",
    storageBucket: "fir-558d2.appspot.com",
    messagingSenderId: "497309884882"
};
firebase.initializeApp(config);

var database = firebase.database();

// BUTTON FOR ADDING TRAINS
$("#submit").on("click", function (event) {

    // PREVENT SUBMIT BUTTON FROM RELOADING PAGE
    event.preventDefault();

    // GRAB VALUES FROM SUBMISSION FORM
    var trainName = $("#trainName").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrain = $("#firstTrain").val().trim();
    var frequency = $("#frequency").val().trim();

    $("#trainName").val("");
    $("#destination").val("");
    $("#firstTrain").val("");
    $("#frequency").val("");

    // PUSH VALUES TO DATABASE
    database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
    });
});

// FIREBASE EVENT FOR ADDING TRAIN TO DATABASE
// AND ADD ROW WHEN USER ADDS ENTRY
database.ref().on("child_added", function (childSnapshot) {

    // STORE CHILD DATA
    trainName = childSnapshot.val().trainName;
    destination = childSnapshot.val().destination;
    firstTrain = moment((childSnapshot.val().firstTrain), "HHmm").subtract(1, "days");
    frequency = childSnapshot.val().frequency;

    // INTEGRATE MOMENT.JS AND CALCULATE TIMES
    var currentTime = moment();

    var timeDiff = currentTime.diff(moment(firstTrain), "minutes");
    var timeLeft = timeDiff % frequency;
    var minsAway = frequency - timeLeft;

    var nextTrain = moment().add(minsAway, "minutes");
    var nextArr = moment(nextTrain).format("hh:mm a");

    // APPEND ROW TO TABLE
    var newRow = $("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextArr + "</td><td>" + minsAway + "</td>");

    $("tbody").append(newRow);

});