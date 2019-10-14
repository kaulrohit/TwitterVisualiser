const mongoController = require('./mongoController');
var viscrime = mongoController.viscrime;

exports.searchImages = async (req, res) => {
    let count = req.body.db_count ? parseInt(req.body.db_count) : 20;
    let skip = 0;
    var crimes = req.body.crimes ? req.body.crimes : 'NoCrime';
    if (!Array.isArray(crimes))
    {
        crimes = [crimes];
    }

    viscrime.find({manualAnnotation: {$all: crimes}}).limit(count).skip(skip).lean().exec()
        .then(viscrime => {
            console.log(viscrime);
            res.render('imagesearch', {
                //first 30
                data: images.map(image => ({
                    full_text: (crimeNumTypesArr[image.crimeType] + ": " + image.caption),
                    image_url: ("http://43.240.97.137/images/" + image.filename)
                }))
            });
        })
        .catch(function (err) {
            console.log(err)
        });
};