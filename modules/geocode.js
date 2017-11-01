var geocoder = require("geocoder");
var logging = require('../logs/log.js');

function LIRI_Geocode(){
	this.getGeocodeInfo = function(params){

		var searchLocation = "Matawan, NJ";
		if (params.length > 0)
			searchLocation = params[0];

		geocoder.geocode(searchLocation, 
			function(error, data) {

			  // If there is an error log it.
			  if (error) {
			    logging.log(error);
			    return;
			  }

			  // log geocode for search location
				logging.log("********************");
				logging.log("Formatted Address: " + data.results[0].formatted_address);
				logging.log("Geographic Coordinates: ");
				logging.log(" Latitude: " + data.results[0].geometry.location.lat);
				logging.log(" Longitude: " + data.results[0].geometry.location.lng);
			}
		);
	};
}

module.exports = LIRI_Geocode;