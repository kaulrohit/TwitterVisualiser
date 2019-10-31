db.crimes.find().forEach(function(crime) {
    let updatedArray = []
    let currentLabel = ""
    for(i=1; i < crime.objectLabels.length; i++) {
        if (crime.objectLabels[i] !== ',' && crime.objectLabels[i] !== ']') {
            currentLabel += crime.objectLabels[i]
        } else {
            currentLabel = currentLabel.replace("'","").replace("'","").replace(" ","")
            updatedArray.push(currentLabel)
            currentLabel = ""
        }
    }
    db.crimes.update({_id: crime._id}, {$set:{"objectLabels": updatedArray}})
})

db.crimes.find().forEach(function(crime) {
    let updatedArray = []
    let currentLabel = ""
    for(i=1; i < crime.manualAnnotation.length; i++) {
        if (crime.manualAnnotation[i] !== ',' && crime.manualAnnotation[i] !== ']') {
            currentLabel += crime.manualAnnotation[i]
        } else {
            currentLabel = currentLabel.replace("'","").replace("'","").replace(" ","")
            updatedArray.push(currentLabel)
            currentLabel = ""
        }
    }
    db.crimes.update({_id: crime._id}, {$set:{"manualAnnotation": updatedArray}})
})

