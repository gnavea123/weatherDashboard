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
      console.log("Display Results geo API 1.0 : ");
      console.log(result);
      console.log("LAtitude");
      console.log(result["0"].lat);
      console.log("Longitud");
      console.log(result["0"].lon);

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
        "&cnt=6" +
        "&appid=" +
        APIKey;
      console.log("Display New FORECAST URL geo API 2.5: ");
      console.log(forecastQueryURL);

      // console.log("Unix Format Forecast Date: " + dayjs.unix(1706426900));
      // var unixFormat = dayjs.unix(1706426900);
      // console.log(unixFormat);
      // var newDate = unixFormat.format("MMM D YYYY");
      // console.log(newDate);

      //-------------------
      //  call to FORECAST api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid={API key}
      //api.openweathermap.org/data/2.5/forecast/daily?lat=44.34&lon=10.99&cnt=7&appid={API key}
      //  The above subscription is paid
      //
      //
      //
      //

      //
      //---  pul data from the Forecast API  IT IS ONLY PULLING 1 LIST. SHOULD BE AT LEAST 5

      fetch(forecastQueryURL)
        .then((response) => response.json())
        .then((result) => {
          // --- filtering one forecast per day
          var uniqueForecastDays = [];
          //--
          console.log("Output from forecast query");
          console.log(result);

          var fiveDaysForecast = result.list.filter((forecast) => {
            var forecastDate = new Date(forecast.dt_txt).getDate();
            if (!uniqueForecastDays.includes(forecastDate)) {
              return uniqueForecastDays.push(forecastDate);

              //
            }
            //---------
          }); // end of ilter
          console.log("Display fiveDaysForecast variable: ");
          console.log(fiveDaysForecast);
        }); // end of result fetch
      //
    }); // -- enf of fetch query base

  //
  //
}); // end of function on CLick event
