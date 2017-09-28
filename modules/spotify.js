var Spotify = require('node-spotify-api');
var logging = require('../logs/log.js');

var client;
 
function LIRI_Spotify(keys){
	client = new Spotify(keys);

	this.getSongInfo = function(params){

		// find song to get info on (Scatman is the default)
		var songName = "Scatman";
		if (params.length > 0)
			songName = params[0];

		// run query on song
		client.search(
			{ type: 'track', query: songName }, 
			function(err, data) {
			  if (err) {
			    logging.log(err);
			  }
			  else {
			  	// get first track of results
			  	var track = data.tracks.items[0];

			  	// collect artists of track
			  	var artists = [];
			  	track.artists.forEach(function(artist){
			  		artists.push(artist.name);
			  	});

			  	// log track information
			  	logging.log("********************");
			  	logging.log("Title: " + track.name);
			  	logging.log("Album: " + track.album.name);
			  	logging.log("Artist(s): " + artists.join(", "));
			  	logging.log("Preview URL: " + track.preview_url);     
			  }
			}
		);

	};

}

module.exports = LIRI_Spotify;