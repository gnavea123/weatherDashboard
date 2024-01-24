console.log("Log inititalised");

// Add your own API key between the ""
var APIKey = "e248b13b3adb6046dcac73b0fc1980f3";

// Here we are building the URL we need to query the database

$("#search-button").on("click", function (event) {
  event.preventDefault();

  var city = $("#search-input").val();
  console.log("button City ");
  console.log(city);
});

//   var city = $(this).attr(userInput);
//   // console.log(city);
//   var queryURL =
//     "https://api.openweathermap.org/data/2.5/weather?q=" +
//     city +
//     "&appid=" +
//     APIKey;

//   console.log(queryURL);
//   //
