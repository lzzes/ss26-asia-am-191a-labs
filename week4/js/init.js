// MAP OF FIELD SITES //////////////////////////////////////////////////////////////
// Initialize the map

let mapOptions = {'centerLngLat': [-118.444,34.0709],'startingZoomLevel':14}
let dataUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRfTewIgLqZwNMly_LOjGhAg0wVbpbo_OUKH0ksH4CNgN_dOKqxrxolW-MfzATfXQ7M3Wr08_Cpwk80/pub?output=csv"
const map = new maplibregl.Map({
    container: 'map',
    style: 'https://api.maptiler.com/maps/streets-v2-light/style.json?key=wsyYBQjqRwKnNsZrtci1',
    center: mapOptions.centerLngLat,
    zoom: mapOptions.startingZoomLevel
});

// Functions
function createButtons(lat,lng,title){
    const newButton = document.createElement("button");
    newButton.id = "button"+title;
    newButton.innerHTML = title;
    newButton.setAttribute("lat",lat);
    newButton.setAttribute("lng",lng);
    newButton.addEventListener('click', function(){
        map.flyTo({
            center: [lng,lat],
        })
    })
    document.getElementById("contents").appendChild(newButton);
}

// Fetch data on Map Load ///////////////////////////////////////////////////////
// Uses PapaParse and an arrow function!
map.on('load', function() {
    Papa.parse(dataUrl, {
        download: true,
        header: true,
        complete: results => {
            processData(results.data)
        }
    });
});


function processData(results){
    //console.log(results) //for debugging: this can help us see if the results are what we want
    results.forEach(feature => {
        console.log(`Read features for ${feature['How would you categorize the scope of the issue listed above?']}`)
        addMarker(feature);
    });
};

function addMarker(feature) {
    // Assign variables
    let longitude;
    let latitude;
    let title;
    let scope;
    let message;
    let location;
    let m_clr

    console.log(feature)
    if (feature.lng) longitude = feature.lng;
    if (feature.lat) latitude = feature.lat;
    if (feature['Where did the demonstration take place?']) location = feature['Where did the demonstration take place?']
    if (feature['What political/societal issue was targeted by the demonstration?']) title = feature['What political/societal issue was targeted by the demonstration?'];
    if (feature['How would you categorize the scope of the issue listed above?']) scope = feature['How would you categorize the scope of the issue listed above?'];
    if (feature['What would you like to share about your experience at the demonstration?']) message = feature['What would you like to share about your experience at the demonstration?']

    // Create marker
    // Custom pop-up message
    let popup_message = `<h5>${title}</h5><i>${location}</i><p>${message}</p>`

    // If-statement for the color
    if (scope == "Federal")
        m_clr = "red"
    if (scope == "Local")
        m_clr = "purple"
    if (scope == "International")
        m_clr = "#0A8C00"
    if (scope == "Statewide")
        m_clr = "yellow"

    new maplibregl.Marker({color: m_clr})
        .setLngLat([longitude, latitude])
        .setPopup(new maplibregl.Popup()
            .setHTML(popup_message))
        .addTo(map)
    createButtons(latitude,longitude,title);
    console.log(`Added ${title} marker`)
}

add_legend(
  map,
  "Scope of Issues",
  values = c("Local", "Statewide", "Federal", "International"),
  colors = c("purple","yellow","red","#0A8C00"),
  type = c("categorical")
)