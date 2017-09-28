var request = require('request');
var logging = require('../logs/log.js');

var key;

function LIRI_OMDB_API(keys){
	key = keys.app_key;

	this.getMovieInfo = function(params){

		// find movie to get info on (Jumanji is the default)
		var movieName = "Jumanji";
		if (params.length > 0)
			movieName = params[0];
		
		// Then run a request to the OMDB API with the movie specified
		var omdbApiUrl = "http://www.omdbapi.com/" +
			"?t=" + movieName + 
			"&apikey=" + key;

		request(omdbApiUrl, function(error, response, body) {
			if (error){
				logging.log(error);
				return;
			}

		  // If the request is successful (i.e. if the response status code is 200)
		  if (response.statusCode === 200) {
		  	var movieInfo = JSON.parse(body);

		  	// collect ratings for movie
  			var movieRatings = {};
  			movieInfo.Ratings.forEach(function(rating){
  				movieRatings[rating.Source] = rating.Value;
  			});

  			// log movie information
  			logging.log("********************");
  			logging.log("Title: " + movieInfo["Title"]);
  			logging.log("Year: " + movieInfo["Year"]);
  			logging.log("Country: " + movieInfo["Country"]);
  			logging.log("Language: " + movieInfo["Language"]);
  			logging.log("Actors: " + movieInfo["Actors"]);
  			logging.log("Plot: " + movieInfo["Plot"]);
  			logging.log("IMDB Rating: " + movieRatings["Internet Movie Database"]);
  			logging.log("Rotten Tomatoes: " + movieRatings["Rotten Tomatoes"]);
  		}

	  });

	};
}

module.exports = LIRI_OMDB_API;