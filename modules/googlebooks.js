var googlebooks = require("google-books-search");
var logging = require('../logs/log.js');

function LIRI_Google_Books(){
	this.getBookInfo = function(params){

		var searchQuery = "Fahrenheit 451";
		if (params.length > 0)
			searchQuery = params[0];

		googlebooks.search(searchQuery, 
			function(error, data) {

			  // If there is an error log it.
			  if (error) {
			    logging.log(error);
			    return;
			  }

			  data.forEach(function(book){
			  	logging.log("*********************");
			  	logging.log("Title: " + book.title);
			  	logging.log("Subtitle: " + book.subtitle);
			  	if (book.authors !== undefined){
			  		logging.log("Author(s): " + book.authors.join(", "));
			  	}
			  	logging.log("URL: " + book.link);
			  });

			}
		);
	};
}

module.exports = LIRI_Google_Books;