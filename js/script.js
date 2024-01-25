console.log("Log inititalised");

// Add your own API key between the ""
var APIKey = "e248b13b3adb6046dcac73b0fc1980f3";

// Here we are building the URL we need to query the database

$("#search-button").on("click", function (event) {
  event.preventDefault();

  var city = $("#search-input").val();
  console.log("button City: ");
  console.log(city);

  // function displayCityInfo(event) {
  //   // event.preventDefault();
  //   //var userSelection = event.target;
  //   //console.log(event);
  //   // console.log(userSelection);
  //   var userInput = $("#search-button").val();
  //   console.log("Value of userINput: ");
  //   console.log(userInput);

  //   var city = $(this).attr(userInput);
  //   // console.log(city);
  //   // var queryURL = "https://www.omdbapi.com/?q=" + city + "&apikey=trilogy";

  // var queryURL =
  //   "https://api.openweathermap.org/data/2.5/weather?q=" +
  //   city +
  //   "&appid=" +
  //   APIKey;

  //------------------  Geocoding API to obtain latitutde and longitude coordinates
  //
  var queryURL =
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
    city +
    "&limit=5" +
    "&appid=" +
    APIKey;

  console.log(queryURL);

  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (result) {
      console.log("Display Results geo API 1.0 : ");
      console.log(result);
      console.log("LAtitude");
      console.log(result["0"].lat);
      console.log("Longitud");
      console.log(result["0"].lon);

      // ------------------  getting info from API using lat and longitude coordinates

      var long = result["0"].lon;
      var latd = result["0"].lat;
      // var newQueryURL =
      //   "https://api.openweathermap.org/data/2.5/weather?q=" +
      //   city +
      //   "&appid=" +
      //   APIKey;
      var newQueryURL =
        "https://api.openweathermap.org/data/2.5/weather?lat=" +
        latd +
        "&lon=" +
        long +
        "&appid=" +
        APIKey;
      console.log("Display New Result URL geo API 2.5: ");
      console.log(newQueryURL);

      fetch(newQueryURL)
        .then(function (response) {
          return response.json();
        })
        .then(function (result) {
          console.log("Display Results geo API 2.5.0 : ");
          console.log(result);
          var today = dayjs();
          var reformatDate = dayjs(today).format("DD/MM/YYYY");

          // var reformatDate = dayjs(today, "DD-MM-YY").format(
          //   "dddd, D MMMM YYYY, h:mm:ss a"
          // );
          //$("#currentDay").text(reformatDate);
          var currentHour = dayjs().format("HH");
          console.log(reformatDate);
          console.log(currentHour);

          // --------------- setting up variables for City
          var humidity = result.main.humidity;
          var windSpeed = result.wind.speed;
          var tempKelvin = result.main.temp;
          var tempCelcius = tempKelvin - 273.15;
          // CAlling DayJS for date format

          // * The city name
          // * The date
          // * An icon representation of weather conditions
          // * The temperature
          // * The humidity
          // * The wind speed

          console.log("CIty: ");
          console.log(city);
          console.log("Date: ");
          console.log(reformatDate);
          // * An icon representation of weather cond itions

          console.log("Actual Temperature Celcius: ");
          console.log(tempCelcius);
          console.log("Actual Humidity: ");
          console.log(humidity);
          console.log("Actual Wind Speed: ");
          console.log(windSpeed);
        });
    });
});
//   //
