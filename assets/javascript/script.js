// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAWOLSPOMm7bDgawNfFbP-JwsGMR7unxFY",
  authDomain: "train-scheduler-a8441.firebaseapp.com",
  databaseURL: "https://train-scheduler-a8441.firebaseio.com",
  projectId: "train-scheduler-a8441",
  storageBucket: "",
  messagingSenderId: "397537133133",
  appId: "1:397537133133:web:162fbe180bb2527e"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


let database = firebase.database();


//on click listener for when submit button is pressed. Grabs info and sends it to Firebase
$(".btn").on("click", function (event) {
  //prevents page from reloading constantly
  event.preventDefault();
  console.log("hi");

  //next four lines grab the all the user values from the form
  let name = $("#name").val();
  let destination = $("#destination").val();
  let time = $("#first-time").val();
  let min = $("#min").val();

  //stops the user from submitting a form with emoty fields
  if (name !== "" || destination !== "" || time !== "" || min !== "") {

    //store the grabbed values in firebase
    database.ref().push({
      name: name,
      destination: destination,
      time: time,
      min: min,
    })
    //clears values once the submit button has been pressed
    $("#name").val("");
    $("#destination").val("");
    $("#first-time").val("");
    $("#min").val("");
  }
})

//grabs only the new information in firebase
database.ref().on("child_added", function (snapshot) {

  //creates a new row
  let newRow = $("<tr>");

  //grabs the value out of firebase and puts in a new table col (next 3 lines)
  let newName = $("<td>").text(snapshot.val().name);
  let newDestination = $("<td>").text(snapshot.val().destination);
  let newMin = $("<td>").text(snapshot.val().min);

  //grabbing user value from form for first time of train
  let firstTime = snapshot.val().time;

  //grabbing user value from form for frequency of train
  let frequency = snapshot.val().min;

  //feeding the time format to moment, and subtracting a year so the first time is always first
  let parse = moment(firstTime, "HH:mm").subtract(1, "years");;

  //difference in time between the first time and the current time
  let diffTime = moment().diff(moment(parse), "minutes");

  //getting the remainder of the difference and the frequency
  let timeRemain = diffTime % frequency;

  //subtracting the frequency of each train from the remainder to get MIN UNTIL NEXT TRAIN
  let minUntilNext = frequency - timeRemain;

  //adds minutes until next train
  let nextTrain = moment().add(minUntilNext, "minutes");

  //math for figuring and formatting the arrival time
  let newArrTime = moment(nextTrain).format("hh:mm");

  //creates a new row item for the number of minutes until next train
  let newTrain = $("<td>").text(minUntilNext);

  //creates a new row item for arrival time of next train
  let nextArrival = $("<td>").text(newArrTime);


  //appends all the values and colomns into the new row
  newRow.append(newName, newDestination, newMin, nextArrival, newTrain);

  //and then adds them to the table body
  $("tbody").append(newRow);

});