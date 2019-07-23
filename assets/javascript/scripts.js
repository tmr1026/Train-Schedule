var config = {
    apiKey: "AIzaSyAuIXUm3xm3_r0HcDYxf2piEWEhueHfen4",
    authDomain: "train-scheduler-ef71c.firebaseapp.com",
    databaseURL: "https://train-scheduler-ef71c.firebaseio.com",
    projectId: "train-scheduler-ef71c",
    storageBucket: "train-scheduler-ef71c.appspot.com",
    messagingSenderId: "5089508270"
};

firebase.initializeApp(config);

let database = firebase.database();

$("#submit").on("click", function () {
    event.preventDefault();
    var trainName = $("#train-name").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrain = moment($("#first-train").val().trim(), "hh:mm").subtract(1, "years").format("x");
    var frequency = $("#frequency").val().trim();

    if ( !name || !destination || !firstTrain || !frequency ) {
        alert("Please add further details for train")
    }else{
        train = {
            name = trainName,
            destination = destination,
            firstTrain = firstTrain,
            frequency = frequency,
        };
        database.ref().push(train);

        $("#train-name").val("");
        $("#destination").val("");
        $("#first-train").val("");
        $("#frequency").val("");

        return false;
    }
});

database.ref().on("child_added", function (childSnapshot) {
    var train = childSnapshot.val();
    
    let remainder = moment().diff(moment.unix(train.firstTrain), "minutes") % train.frequency;
    let minsAway = train.frequency - remainder;
    let nextTrain = moment().add(minsAway, "minutes");
    nextTrain = moment(nextTrain).format("hh:mm");

    $("#addTableData").append("<tr><td>" + train.trainName + "</td><td>" + train.destination + "</td><td>" + train.frequency + "</td><td>" + nextTrain + "</td><td>" + minsAway + "</td></tr>");

});

