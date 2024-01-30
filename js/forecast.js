console.log("Forecast Log inititalised");

// Add your own API key between the ""
var APIKey = "e248b13b3adb6046dcac73b0fc1980f3";

// Here we are building the URL we need to query the database

$("#search-button").on("click", function (event) {
  event.preventDefault();

  // Empty the section associated with the city variables
  //--- clear();

  var city = $("#search-input").val();
  console.log("forecast button City: ");
  console.log(city);
  //  // Empty the section associated with the city variables
  clearForecast();

  //
  //var currentWweatherDiv = document.querySelector("#dashboard-section");
  var weatherCardsDiv = document.querySelector(".weather-cards");

  //------------------  Geocoding API to obtain latitutde and longitude coordinates
  //
  var baseQueryURL =
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
    city +
    "&limit=5" +
    "&appid=" +
    APIKey;

  console.log(baseQueryURL);

  fetch(baseQueryURL)
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

      // ------------------  getting info from FORECAST API using lat and longitude coordinates

      var long = result["0"].lon;
      var latd = result["0"].lat;
      // var newQueryURL =
      //   "https://api.openweathermap.org/data/2.5/forecast?q=" +
      //   city +
      //   "&appid=" +
      //   APIKey;
      // original place of forecastQuery

      var forecastQueryURL =
        "https://api.openweathermap.org/data/2.5/forecast?lat=" +
        latd +
        "&lon=" +
        long +
        "&appid=" +
        APIKey;
      console.log("Display New FORECAST URL geo API 2.5: ");
      console.log(forecastQueryURL);

      //---------
      //

      //
      //---  pul data from the Forecast API  IT IS ONLY PULLING 2 LIST. SHOULD BE AT LEAST 5

      fetch(forecastQueryURL)
        .then((response) => response.json())
        .then((result, index) => {
          console.log("value of forecast resultset: ");
          console.log(result.list);
          // var temp = result.list.["0"].main.temp;
          // console.log("value forecast temp: ");
          // console.log(temp);
          //
          var createWeatherCard = (result) => {
            console.log("value of createWeatherCard: ");
            console.log(createWeatherCard);
            //   //

            // -- Capturing data to load to HTML

            if (index === 0) {
              weatherCardsDiv.innerHTML = "";
              return "";
            } else {
              // Create the  list group to contain city variables and add the  content for each city
              var $cityForecast = $("<ul>");
              $cityForecast.addClass("main");
              // Add the newly created element to the DOM
              $(".weather-cards").append($cityForecast);

              //--- create cityVariablesItem
              var $cityForecasttItem = $(
                "<li class='cards-item cityVariables'>"
              );

              //console.log($cityVariablesItem);
              $cityForecasttItem.append(
                "<h3>" + result.dt_txt.split(" ")[0] + "</h3>"
              );
              // icon
              //  <img src="https://openweathermap.org/img/wn/04n@2x.png" alt="weather-icon">
              console.log("value of icon location:");
              console.log(result.weather[0].icon);

              $cityForecasttItem.append(
                "<img src=" +
                  "https://openweathermap.org/img/wn/" +
                  result.weather[0].icon +
                  "@2x.png" +
                  // "+alt=" +
                  // "weather-icon" +
                  ">"
                //
              );

              //

              $cityForecasttItem.append(
                "<h4>Temp: " +
                  (result.main.temp - 273.15).toFixed(2) +
                  " °C" +
                  "</h4>"
              );
              //
              $cityForecasttItem.append(
                "<h4>Wind: " + result.wind.speed + " KMH" + "</h4>"
              );
              // humidity variable
              $cityForecasttItem.append(
                "<h4>Humidity: " + result.main.humidity + " %" + "</h4>"
              );
              // console.log(windSpeed);
              console.log("validating cityForecasttItem: ");
              console.log($cityForecasttItem);
              // Append the variables
              $cityForecast.append($cityForecasttItem);
              //$(".weather-cards").append($cityForecast);

              console.log("Vaule of temp: ");
              console.log(result.main.temp - 273.15);
            } //-- end of if else statement
          }; // -- end of createWeatherCard

          //  position of var fiveDaysForecast
          // --- filtering one forecast per day

          var uniqueForecastDays = [];
          //--
          console.log("Output from forecast query");
          console.log(result);

          var fiveDaysForecast = result.list.filter((forecast, index) => {
            var forecastDate = new Date(forecast.dt_txt).getDate();

            if (index === 0) {
              weatherCardsDiv.innerHTML = "";
              return "";
            } else {
              if (!uniqueForecastDays.includes(forecastDate)) {
                return uniqueForecastDays.push(forecastDate);
                //
              } // end of include forecast
            } // End of if then else index
          }); // end of ilter
          console.log("Display fiveDaysForecast variable: ");
          console.log(fiveDaysForecast);

          // adding weather variables to html Cards for each forecast date
          //

          weatherCardsDiv.innerHTML = "";

          fiveDaysForecast.forEach((result) => {
            weatherCardsDiv.insertAdjacentHTML(
              "afterend",
              createWeatherCard(result)
              // $(".weather-cards").append($cityForecast);
            ); // end of inserADj
            if (createWeatherCard === "undefined") {
              delete createWeatherCard;
            }

            //   console.log("value of createWeatherCArd: ");
            //   console.log(createWeatherCard);
          }); //-- End of forEach
        }); // end of result fetch

      // API is still only returning 2 days of data Actual Day and forecast for 1 additional day.
      //
    }); // -- enf of fetch query base
  weatherCardsDiv.innerHTML = "";

  //
  function clearForecast() {
    $(".weather-cards").empty();
  }
  //
}); // end of function on CLick event
//
