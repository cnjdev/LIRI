var fetchBreedDescription = require('../util/breedFetcher');
var logging = require('../logs/log.js');

function LIRI_BreedInfo(){
    
    this.getBreedInfo = function(params){

        var searchBreed = "Burmese";
		if (params.length > 0)
			searchBreed = params[0];
    
        fetchBreedDescription(searchBreed, 
            (error, description) => {

                // If there is an error log it.
			    if (error) {
			        logging.log(error);
			        return;
                }
                
                // log info for search breed
                logging.log("********************");
                logging.log(`${searchBreed} Info:`);
                logging.log(description);
            }
        );
    }

}

module.exports = LIRI_BreedInfo;