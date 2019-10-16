let chiIndicinaData = {
	points: null,
};
const initialiseIndicinaData = async() => {
    await fetch('/mlmap')
    .then(res => res.json())
    .then(data => chiIndicinaData.points = data)
    .catch(() => console.log("Error in loading data."));

    console.log("Machine learning data loaded...");
    renderLayers();
};



/**
 * initialise everything
 */
const runScript = () => {
    console.log("Setting up deckgl...");
    
	setupInterface();
	initialiseData();
    initialiseIndicinaData();
}

runScript();
