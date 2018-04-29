// Initialize Firebase
var config = {
    apiKey: "AIzaSyBWm--Iwut2p-TiWjfX8z7dDnjZ2hnDWtM",
    authDomain: "week-7-5fac4.firebaseapp.com",
    databaseURL: "https://week-7-5fac4.firebaseio.com",
    projectId: "week-7-5fac4",
    storageBucket: "week-7-5fac4.appspot.com",
    messagingSenderId: "65475840209"
  };
  firebase.initializeApp(config);

// Create a variable to reference the database
var database = firebase.database();

// Initial Values
var trainName = "";
var destination = "";
var trainTime = "";
var frequency = "";

$(".btn").on("click", function(event){
    event.preventDefault();

    trainName = $("#input-train-name").val().trim();
    destination= $("#input-destination").val().trim();
    trainTime= $("#input-train-time").val().trim();
    frequency= $("#input-frequency").val().trim();

    console.log("this button works")

    database.ref().push({
        trainName: trainName,
        destination: destination,
        trainTime: trainTime,
        frequency: frequency,

    });
    //clears form//
    $("#input-train-name").val("");
    $("#input-destination").val("");
    $("#input-train-time").val("");
    $("#input-frequency").val("");
});

database.ref().on("child_added", function(childSnapshot){
   var trainAdded = childSnapshot.val().trainName;
   var destinationAdded = childSnapshot.val().destination;
   var timeAdded = childSnapshot.val().trainTime;
   var frequencyAdded = childSnapshot.val().frequency;

    console.log(trainAdded);
    console.log(destinationAdded);
    console.log(timeAdded);
    console.log(frequencyAdded);

    //moment.js BELOW

    
    var timeArray = timeAdded.split(":");
    var firstTime = moment().hours(timeArray[0]).minutes(timeArray[1]);
    var maxMoment = moment.max(moment(), firstTime);
    console.log("max " + maxMoment)

    var minutesAway = "";
    var nextArrival= "";

    if (maxMoment === firstTime){
        nextArrival = firstTime.format("hh:mm A");
        minutesAway = firstTime.diff(moment(), "minutes");
        
    } else {
        var differenceTimes = moment().diff(firstTime, "minutes");
        var tRemainder = differenceTimes % frequencyAdded;
        minutesAway = frequencyAdded - tRemainder;
        nextArrival= moment().add(minutesAway, "m").format("hh:mm A")
    }
    console.log(minutesAway)
    console.log(nextArrival)


// Add each train's data into the table
$("#table-body").append("<tr><td>" + trainAdded + "</td><td>" + destinationAdded + "</td><td>" +
frequencyAdded + "</td><td>" + nextArrival + "</td><td>" + minutesAway  + "</td></tr>");

});


