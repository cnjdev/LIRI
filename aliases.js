var resolved = {};

// aliases are only allowed on CLI; macros must use the original names!
function LIRI_Aliases(aliasMap){
	resolved = {};
	for (origName in aliasMap){
		resolved[origName] = origName;
		var aliases = aliasMap[origName];
		for (alias of aliases){
			resolved[alias] = origName;
		}
	}

	this.resolve = function(alias){
		return resolved[alias];
	}
}


module.exports = LIRI_Aliases;