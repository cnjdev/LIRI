var filesys = require('fs');
var logging = require('../logs/log.js');

var operations;

function LIRI_Macros(macroOps){
	operations = macroOps;

	this.runMacro = function(params){
		// find macro file in macros directory (default random.txt)
		var macroFile = "random.txt";
		if (params.length > 0)
			macroFile = params[0];

		var macroPath = "macros/" + macroFile;
		filesys.readFile(macroPath, "utf8", function(err, data){
			if (err){
				logging.log(err);
			}
			else {
				// get lines in macro text file and run commands
				var lines = data.split("\r\n");
				lines.forEach(function(line){
					logging.log("Line to run: " + line);

					// get command and params
					var lineArgs = line.split(",");
					var command = lineArgs[0];
					var params = lineArgs.slice(1);

					// if command found, run with params
					if (operations[command] != null){
						operations[command](params);
					}
				});
			}
		})
	}
}

module.exports = LIRI_Macros;