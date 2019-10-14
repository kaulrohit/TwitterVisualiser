let chiIndicinaData = {
	points: null,
};

const indicinaLayer = new deck.HexagonLayer({
    id: "indicina-layer",
    data: chiTweetData.points,
    pickable: true,
    colorRange: TWEET_COLOR_RANGE,
    lightSettings: LIGHT_SETTINGS,
    radius: 250,
    elevationRange: [0, 800],
    elevationScale: 4,
    opacity: 0.6,
    coverage: 0.9,
    fp64: false,
    z: 1,
    extruded: false,
    getPosition: d => d,
    onHover: updateIndicinaLayerTooltip,
    ...chiTweetOptions.points,
});

const initialiseData = async() => {
	await fetch('/indica')
	.then(res => res.json())
	.then(data => loadData(data, "default"))
	.catch(() => console.log("Error in loading data."));

	// statsBuilder();
	renderLayers();
};

//Updates tooltip for new data when hovered over by user.
const updateIndicinaLayerTooltip = ({x, y, object}) => {
	try {
		const tooltip = document.querySelector("#tooltip");
		if (object) {
			tooltip.style.visibility = "visible";
			tooltip.style.top = `${y}px`;
			tooltip.style.left = `${x}px`;
			tooltip.innerHTML = `
				<div>Latitude: ${object.centroid[0]}</div>
				<div>Longitude: ${object.centroid[0]}</div>
				<div>${object.points.length} tweet${(object.points.length === 1) ? "" : "s"}</div>`;
		} else {
			tooltip.innerHTML = "";
			tooltip.style.visibility = "hidden";
		}
	} catch(e) {
		console.log(e);
	}
};