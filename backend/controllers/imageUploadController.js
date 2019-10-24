exports.getForm = function(req, res){
	res.render('imageUpload');
}

exports.uploadImage = function(req, res){
	console.log(req.body.crimes.map(num =>{
		return kvCrimes[num]
	}));
	// Add data to database
	// We don't have a production DB yet
	console.log(req.body.file)
	res.redirect('/uploadImage');
}

const kvCrimes = {
	1: "NoCrime",
	2: "Assault",
	4: "Theft",
	8: "Gun",
	16: "Drugs",
	32: "Property Damage",
	64: "Homicide",
	128: "Vehicular",
	256: "Sex Offence",
	512: "Hostage"
}