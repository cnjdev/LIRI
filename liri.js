// required files
var apiKeys = require('./keys.js');
var logging = require('./logs/log.js');
var inquire = require('inquirer');
var LIRI_Twitter = require('./modules/twitter.js');
var LIRI_Spotify = require('./modules/spotify.js');
var LIRI_OMDBAPI = require('./modules/omdbapi.js');
var LIRI_Macros = require('./macros/macros.js');

// initialized components
var liriTwitter = new LIRI_Twitter(apiKeys.twitter);
var liriSpotify = new LIRI_Spotify(apiKeys.spotify);
var liriOMDBAPI = new LIRI_OMDBAPI(apiKeys.omdbapi);

// LIRI Operations
var operations = {
	"my-tweets": liriTwitter.getLastTweets,
	"spotify-this-song": liriSpotify.getSongInfo,
	"movie-this": liriOMDBAPI.getMovieInfo
};

// Macro setup
var liriMacros = new LIRI_Macros(operations);
operations["do-what-it-says"] = liriMacros.runMacro;

function run(command, params){
	if (operations[command] != null){
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