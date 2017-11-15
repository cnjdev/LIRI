var filesys = require('fs');

function log(text){
	// log to console
	console.log(text);

	// log to file
	filesys.appendFile("logs/log.txt", "\r\n" + text, function(err){
		if (err) console.log(err);
	});
}

function logLines(lines){
	lines.forEach(line => {
		this.log(line);
	});
}

module.exports = {
	log: log,
	logLines: logLines
};