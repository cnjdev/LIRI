var weather = require("weather-js");
var logging = require('../logs/log.js');

function LIRI_Weather(){
	this.getWeatherInfo = function(params){

		var searchLocation = "Matawan, NJ";
		if (params.length > 0)
			searchLocation = params[0];

		weather.find(
			{ search: searchLocation, degreeType: "F" }, 
			function(error, result) {

			  // If there is an error log it.
			  if (error) {
			    logging.log(error);
			    return;
			  }

			  // log weather for search location
				logging.log("********************");
				logging.log("Location: " + result[0].location.name);
				logging.log("Current Temperature: " + 
										result[0].current.temperature + " F");
    		logging.log("Weather: " + result[0].current.skytext);
    		logging.log("Wind: " + result[0].current.winddisplay);
    		logging.log("Humidity: " + result[0].current.humidity);
    		logging.log("Tomorrow's Forecast: " +
    								"Low of " + result[0].forecast[1].low + "F, " +
    								"High of " + result[0].forecast[1].high + "F");

			}
		);
	};
}

module.exports = LIRI_Weather;