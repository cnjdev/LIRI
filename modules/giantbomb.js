var GiantBomb = require('giant-bomb');
var logging = require('../logs/log.js');

var client;

function LIRI_Giant_Bomb(keys){
	client = new GiantBomb(keys.api_key, keys.user_agent);

	this.getGameInfo = function(params){
		// find game to get info on (Psychonauts is the default)
		var gameName = "Psychonauts";
		if (params.length > 0)
			gameName = params[0];

		client.search(
			{ 
        query: gameName,
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
    	function(error, response, body){
    		
    		// If there is an error log it.
			  if (error) {
			    logging.log(error);
			    return;
			  }

        if (response.statusCode === 200){
        	let data = JSON.parse(body);

          data.results.forEach(game => {
            logging.log("*********************");
            logging.log("Title: " + game.name);
            logging.log("Year: " + game.expected_release_year);
            var platformNames = game.platforms.map(platform => platform.name);
            logging.log("Platforms: " + platformNames.join(', '));
            logging.log("URL: " + game.site_detail_url);
          });
        }
        
    	}
    );

	};
}

module.exports = LIRI_Giant_Bomb;