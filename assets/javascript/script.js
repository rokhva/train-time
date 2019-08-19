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
  let loginTime = 0;

  $(document).ready(function(){
    loginTime = moment().format("HH:mm");
    console.log(loginTime);
  })

  //on click listener for when submit button is pressed. Grabs info and sends it to Firebase
  $(".btn").on("click", function(event){
    //prevents page from reloading constantly
    event.preventDefault();
    console.log("hi");

    //next four lines grab the all the user values from the form
    let name = $("#name").val();
    let destination = $("#destination").val();
    let time = $("#first-time").val();
    let min= $("#min").val();
    
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
})

//grabs only the new information in firebase
database.ref().on("child_added", function(snapshot){
  console.log(snapshot);

  //creates a new row
  let newRow = $("<tr>");
  //grabs the value out of firebase and puts in a new table col (next 3 lines)
  let newName = $("<td>").text(snapshot.val().name);
  let newDestination = $("<td>").text(snapshot.val().destination);
  let newMin = $("<td>").text(snapshot.val().min);

  //appends all the values and colomns into the new row
  newRow.append(newName, newDestination, newMin);
  //and then adds them to the table body
  $("tbody").append(newRow);


  //grabbing user value from form for first time of train
  let firstTime = snapshot.val().time;
  console.log(firstTime);

  //grabbing user value from form for frequency of train
  let frequency = snapshot.val().min;
  console.log(frequency);

  //feeding the time format to moment
  let parse = moment(firstTime, "HH:mm").subtract(1, "years");;
  console.log(parse);

  let diffTime = moment().diff(moment(parse), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  let timeRemain = diffTime % frequency;

  let minUntilNext = frequency - timeRemain;
  console.log("MINUTES TILL TRAIN: " + minUntilNext);

  let nextTrain = moment().add(minUntilNext, "minutes");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

  let newArrTime = moment(nextTrain).format("hh:mm");

});