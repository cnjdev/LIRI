// required files
var inquire = require('inquirer');

var apiKeys = require('./keys.js');
var aliases = require('./aliases.js');
var logging = require('./logs/log.js');
var LIRI_Twitter = require('./modules/twitter.js');
var LIRI_Spotify = require('./modules/spotify.js');
var LIRI_OMDBAPI = require('./modules/omdbapi.js');
var LIRI_Geocode = require('./modules/geocode.js');
var LIRI_Weather = require('./modules/weather.js');
var LIRI_GoogleBooks = require('./modules/googlebooks.js');
var LIRI_Macros = require('./macros/macros.js');

// initialized components
var liriTwitter = new LIRI_Twitter(apiKeys.twitter);
var liriSpotify = new LIRI_Spotify(apiKeys.spotify);
var liriOMDBAPI = new LIRI_OMDBAPI(apiKeys.omdbapi);
var liriGeocode = new LIRI_Geocode();
var liriWeather = new LIRI_Weather();
var liriGoogleBooks = new LIRI_GoogleBooks();

// LIRI Operations
var operations = {
	"my-tweets": liriTwitter.getLastTweets,
	"spotify-this-song": liriSpotify.getSongInfo,
	"movie-this": liriOMDBAPI.getMovieInfo,
	"geocode-this": liriGeocode.getGeocodeInfo,
	"weather-info": liriWeather.getWeatherInfo,
	"google-books": liriGoogleBooks.getBookInfo
};

// Macro setup
var liriMacros = new LIRI_Macros(operations);
operations["do-what-it-says"] = liriMacros.runMacro;

var aliasMap = {
	"my-tweets": ["get-tweets", "twitter"],
	"spotify-this-song": ["song-info", "spotify"],
	"movie-this": ["movie-info", "omdbapi"],
	"geocode-this": ["geocode", "location-info"],
	"weather-info": ["weather", "get-weather"],
	"google-books": ["book-info", "book-search"],
	"do-what-it-says": ["run-macro", "run-file"]
};
var liriAliases = new aliases(aliasMap);

function run(command, params){
	command = liriAliases.resolve(command);

	if (command != null && operations[command] != null){
		logging.log("Running Command: " + command + " with Params: " + params);
		operations[command](params);
	}
}

// check for # parameters
if (process.argv.length < 3){
	// ask user to pick operation and enter parameters
	inquire.prompt([
    {
      type: "list",
      message: "Choose an operation: ",
      choices: Object.keys(operations),
      name: "command"
    },
    {
      type: "input",
      message: "Enter parameter for operation: ",
      name: "param"
    }
  ])
  .then(function(response) {
  	console.log(response);
  	run(response.command, [response.param]);
  });
}
else {
	// figure out what to do next
	var command = process.argv[2].toLowerCase();
	var params = process.argv.slice(3);
	run(command, params);
}