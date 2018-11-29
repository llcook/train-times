// Initialize Firebase
var config = {
    apiKey: "AIzaSyAXCM4xF-y-Z_RThOBgEIHr9Pii1b4D39Y",
    authDomain: "fir-558d2.firebaseapp.com",
    databaseURL: "https://fir-558d2.firebaseio.com",
    // projectId: "fir-558d2",
    storageBucket: "fir-558d2.appspot.com",
    // messagingSenderId: "497309884882"
};
firebase.initializeApp(config);

var database = firebase.database();

// BUTTON FOR ADDING TRAINS
$("#submit").on("click", function(event){
    
    //Prevent the submit button from reloading the page.
    event.preventDefault();

    //Get the values from the submission form.
    var trainName = $("#trainName").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrain = $("#firstTrain").val().trim();
    var frequency = $("#frequency").val().trim();

    //Push the values to the database.
    database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
    });
});

// FIREBASE EVENT FOR ADDING TRAIN TO DATABASE
// AND ADD ROW WHEN USER ADDS ENTRY

database.ref().on("child_added", function(childSnapshot) {

    console.log(childSnapshot.val());

    trainName = childSnapshot.val().trainName;
    destination = childSnapshot.val().destination;
    firstTrain = childSnapshot.val().firstTrain;
    frequency = childSnapshot.val().frequency;

    // console.log(trainName + destination + firstTrain + frequency);

    // CALCULATE THE NEXT ARRIVAL

    // CALCULATE MINUTES AWAY

    var newRow = $("<tr><td>" + trainName + "<td>" + destination + "<td>" + frequency + "<td>VAR NEXTARR</td><td>VAR MINSAWAY</td>");

    $("tbody").append(newRow);

});

////////////////////////////////////////////////

// ON INITIAL LOAD, GET SNAPSHOT OF STORED DATA
// FUNCTION ALLOWS YOU TO UPDATE PAGE IN REAL-TIME WHEN FBDB CHANGES
// see codersbay activity for reference

////////////////////////////////////////////////