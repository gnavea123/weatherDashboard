console.log("Log inititalised");

// Add your own API key between the ""
var APIKey = "e248b13b3adb6046dcac73b0fc1980f3";

// Here we are building the URL we need to query the database

$("#search-button").on("click", function (event) {
  event.preventDefault();

  // Empty the section associated with the city variables
  clear();

  var city = $("#search-input").val();
  console.log("button City: ");
  console.log(city);

  //------------------  Geocoding API to obtain latitutde and longitude coordinates
  //
  var queryURL =
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
    city +
    "&limit=1" +
    "&appid=" +
    APIKey;

  console.log(queryURL);

  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (result) {
      // console.log("Display Results geo API 1.0 : ");
      // console.log(result);
      // console.log("LAtitude");
      // console.log(result["0"].lat);
      // console.log("Longitud");
      // console.log(result["0"].lon);

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
          // console.log("Display Results geo API 2.5.0 : ");
          // console.log(result);
          var today = dayjs();
          var reformatDate = dayjs(today).format("DD/MM/YYYY");

          var currentHour = dayjs().format("HH");
          console.log(reformatDate);
          console.log(currentHour);

          // --------------- setting up variables for City
          var humidity = result.main.humidity;
          var windSpeed = result.wind.speed;
          var tempKelvin = result.main.temp;
          // console.log(tempKelvin);
          var tempCelcius = tempKelvin - 273.15;
          // CAlling DayJS for date format

          // * The city name
          // * The date
          // * An icon representation of weather conditions
          // * The temperature
          // * The humidity
          // * The wind speed

          // console.log("CIty: ");
          // console.log(city);
          // console.log("Date: ");
          // console.log(reformatDate);
          // // * An icon representation of weather cond itions

          // console.log("Actual Temperature Celcius: ");
          // console.log(tempCelcius.toFixed(2));
          // console.log("Actual Humidity: ");
          // console.log(humidity);
          // console.log("Actual Wind Speed: ");
          // console.log(windSpeed);
          // -----
          // -- Capturing data to load to HTML

          // Create the  list group to contain city variables and add the  content for each city
          var $cityVariables = $("<ul>");
          $cityVariables.addClass("list-group");
          // Add the newly created element to the DOM
          //$("#article.section").append($cityVariables);

          // If the article has a headline, log and append to $articleList
          //var headline = article.headline.main;
          var $cityVariablestItem = $(
            "<li class='list-group-item cityVariables'>"
          );

          // console.log($cityVariablesItem);
          $cityVariablestItem.append(
            "<h2>" + city + "  (" + reformatDate + "  )" + "</h2>"
          );
          // --------
          // Article abstract details

          //var abstract = article.abstract;
          $cityVariablestItem.append(
            "<h3>Temperature: " + tempCelcius.toFixed(2) + " Celcius" + "</h3>"
          );

          //---Section Name for Article
          // var section = article.section_name;
          // console.log("Section Name: ");
          // console.log(article.section_name);
          $cityVariablestItem.append(
            "<h3>Wind: " + windSpeed + " KMH" + "</h3>"
          );

          // humidity variable
          $cityVariablestItem.append(
            "<h3>Humidity: " + humidity + " %" + "</h3>"
          );

          // console.log(windSpeed);
          // console.log("validating variableListItem: ");
          // console.log($cityVariablestItem);

          // Append the variables
          $cityVariables.append($cityVariablestItem);
          $("#dashboard-section").append($cityVariables);
        });
    });
  $;
  // Function to empty out the city variables section
  function clear() {
    $("#dashboard-section").empty();
  }
});
//   //
// // Create the  list group to contain city variables and add the  content for each city
// var $cityForecast = $("<ul>");
// $cityForecast.addClass("list-group");
// // Add the newly created element to the DOM
// $(".weather-cards").append($cityForecast);

// //--- create cityVariablesItem
// var $cityForecasttItem = $("<li class='list-group-item cityVariables'>");

// // console.log($cityVariablesItem);
// $cityForecasttItem.append(
//   "<h3>" + city + "  (" + reformatDate + "  )" + "</h2>"
// );
// // --------
// //
// $cityForecasttItem.append(
//   "<h3>Temperature: " + tempCelcius.toFixed(3) + " Celcius" + "</h3>"
// );
// //
// $cityForecasttItem.append("<h3>Wind: " + windSpeed + " KMH" + "</h3>");
// // humidity variable
// $cityForecasttItem.append("<h3>Humidity: " + humidity + " %" + "</h3>");
// // console.log(windSpeed);
// // console.log("validating variableListItem: ");
// // console.log($cityVariablestItem);
// // Append the variables
// $cityForecast.append($cityForecasttItem);
// $(".weather-cards").append($cityForecast);
