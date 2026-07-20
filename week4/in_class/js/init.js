// declare variables
let mapOptions = {'centerLngLat': [-118.444,34.0709],'startingZoomLevel':5}
let dataUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRfTewIgLqZwNMly_LOjGhAg0wVbpbo_OUKH0ksH4CNgN_dOKqxrxolW-MfzATfXQ7M3Wr08_Cpwk80/pub?output=csv"

const map = new maplibregl.Map({
    container: 'map',
    style: 'https://api.maptiler.com/maps/streets-v2-light/style.json?key=wsyYBQjqRwKnNsZrtci1',
    center: mapOptions.centerLngLat,
    zoom: mapOptions.startingZoomLevel
});

function addMarker(lat,lng,title,message){
    let popup_message = `<h2>${title}</h2> <h3>${message}</h3>`
    new maplibregl.Marker()
        .setLngLat([lng, lat])
        .setPopup(new maplibregl.Popup()
            .setHTML(popup_message))
        .addTo(map)
    createButtons(lat,lng,title);
    return message
}

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

// map.on('load', function() {
//     fetch("dataUrl")
//         .then(response => response.json())
//         .then(data => {
//             processData(data);
//         });
// });

map.on('load', function() {
    // Use PapaParse to fetch and parse the CSV data from a Google Forms spreadsheet URL
    Papa.parse(dataUrl, {
        download: true, // Tells PapaParse to fetch the CSV data from the URL
        header: true, // Assumes the first row of your CSV are column headers
        complete: function(results) {
            // Process the parsed data
           console.log(results)
        }
    });
});

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
        //console.log(feature) // for debugging: are we seeing each feature correctly?
        // assumes your geojson has a "title" and "message" attribute
        // let coordinates = feature.geometry.coordinates;
        let longitude = feature.lng;
        let latitude = feature.lat;
        let title = feature.Timestamp;
        let message = feature.Zipcode;
        addMarker2(feature)
        // addMarker2(latitude,longitude,title,message);
    });
};


function addMarker2(feature) {
    let longitude;
    let latitude;
    let message;
    if (feature.lng) {longitude = feature.lng}
    if (feature.lat) {latitude = feature.lat}
    if (feature['Zipcode']) {message = feature['Zipcode']}
    new maplibregl.Marker()
        .setLngLat([longitude, latitude])
        .setPopup(new maplibregl.Popup()
            .setHTML(message))
        .addTo(map)

    createButtons(latitude, longitude, message)
    
}