exports.getForm = function(req, res){
	res.render('imageUpload', {image: undefined});
}

exports.uploadImage = function(req, res){
	console.log(req.body.crimes.reduce((acc, val) => acc + parseInt(val), 0));
	// Add data to database
	// We don't have a production DB yet
	res.redirect('/checkImage');
}