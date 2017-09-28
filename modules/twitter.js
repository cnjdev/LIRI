var Twitter = require('twitter');
var logging = require('../logs/log.js');

var client;

function LIRI_Twitter(keys){
	client = new Twitter(keys);

	this.getLastTweets = function(params){

		// determine how many tweets to fetch (20 is default)
		var tweetCount = 20;
		if (params.length > 0)
			tweetCount = params[0];

		// retrieve the tweets
		client.get('statuses/user_timeline',
			{count: tweetCount},
			function(error, tweets, response) {
				if (error){
					logging.log(error);
				}
				else {
			   	logging.log("********************");
			   	// for each tweet retrieved, log information
			   	tweets.forEach(function(tweet){
			   		logging.log("User @" + tweet.user.screen_name);
			   		logging.log(tweet.created_at);
			   		logging.log(tweet.text);
			   		logging.log("--------------------");
			   	});
			  }
			}
		);
	}
}

module.exports = LIRI_Twitter;