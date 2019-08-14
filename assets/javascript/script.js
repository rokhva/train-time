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

  $(".btn").on("click", function(event){
    event.preventDefault();
    console.log("hi");
    let name = $("#name").val();
    let destination = $("#destination").val();
    let time = $("#first-time").val(); // need to store this as a time in fire base, use moment to convert?
    let min= $("#min").val();
    
    database.ref().push({
        name: name,
        role: destination,
        date: time,
        months: min,
        // dateAdded: firebase.database.ServerValue.TIMESTAMP,
    })

    $("#name").val("");
    $("#destination").val("");
    $("#first-time").val("");
    $("#min").val("");
})

  