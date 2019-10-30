var fs = require("fs");
var mime = require("mime-types");

exports.getForm = function(req, res){
	res.render('imageUpload');
}

exports.uploadImage = function(req, res){
	//console.log(req.body.crimes.map(num =>{
	//	return kvCrimes[num]
	//}));
	// Add data to database
	// We don't have a production DB yet
	var file = req.files.file;
	var path = `storage/taggedImages/${req.body.crimes.reduce((acc, val) => acc + parseInt(val), 0)}.${file.md5}.${mime.extension(file.mimetype)}`
	if (!(file.mimetype == "image/jpeg" || file.mimetype == "image/png")) {
		res.send({ error: "Error: incorrect file type" });
	}
	file.mv(path, function(err) {
		if (err) {
			return res.status(500).send(err);
		}
		console.log("Image moved to " + path);
	});


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