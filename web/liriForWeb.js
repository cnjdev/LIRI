const request = require('request');
const googlebooks = require('google-books-search');
const GiantBomb = require('giant-bomb');
const Spotify = require('node-spotify-api');

let giantbomb = new GiantBomb(
	'6009cad7e30be9d76c13cd1e71df331da5e16427',
	'LIRI_Giant_Bomb_Module'
);

let spotify = new Spotify({
	id: '74c37d2cac5c405f91e10a68740f787b',
	secret: '6cba3ffd937f4b3c9dd66ba42aabf783'
});

let omdbApiKeys = {
	class_key: '40e9cece',
	app_key: 'ad937c9a'
};

getResult = (err, data, res) => {
	return {
		error: err,
		data: data,
		response: res
	}
};

getBookInfo = (query = "1984", returnResult) => {
	googlebooks.search(query, 
		function (err, data, res) {
			return returnResult(getResult(err, data, res));
		}
	);
};

getGameInfo = (query = "Diablo", returnResult) => {
	giantbomb.search(
		{ 
      query: query,
      resources: [ 'game' ], 
      fields: [ 
        'name', 
        'expected_release_year',
        'platforms',
        'site_detail_url'
      ],
      format: 'json', 
      limit: 10 
    }, 
    function(err, res, body){
    	let data = null;
    	if (res.statusCode == 200){
        data = JSON.parse(body);
      }
      return returnResult(getResult(err, data, res));
    }
	);
};

getMovieInfo = (query = "Jumanji", returnResult) => {
	var omdbApiUrl = "http://www.omdbapi.com/" +
				"?t=" + query + 
				"&apikey=" + omdbApiKeys.app_key;

	request(omdbApiUrl, 
		function(err, res, body) {
			let data = null;
    	if (res.statusCode == 200){
        data = JSON.parse(body);
      }
      return returnResult(getResult(err, data, res));
		}
	);
};

getSongInfo = (query = "Scatman", returnResult) => {
	spotify.search(
		{ type: 'track', query: query }, 
		function(err, data, res) {
			return returnResult(getResult(err, data, res));
		}
	);
}

module.exports = {
	bookInfo: getBookInfo,
	gameInfo: getGameInfo,
	movieInfo: getMovieInfo,
	songInfo: getSongInfo
};

/*

getBookInfo("Kidnapped", function(result){
	console.log(result);
});

getGameInfo("Psychonauts", function(result){
	console.log(result);
});

getMovieInfo("Sharknado", function(result){
	console.log(result);
});

getSongInfo("Connection", function(result){
	console.log(result);
});

*/