// MAP OF FIELD SITES //////////////////////////////////////////////////////////////
// Initialize the map

const zoom_level = 14

const map = new maplibregl.Map({
    container: 'map', // container ID — matches <div id="map">
    style: 'https://api.maptiler.com/maps/streets/style.json?key=wsyYBQjqRwKnNsZrtci1', // style URL
        // share in maptiler + paste here for custom basemap
    center: [-118.4441094,
          34.0722013], // starting position [lng, lat]
    zoom: zoom_level // starting zoom level
});

// Fetch GeoJSON on Map Load ///////////////////////////////////////////////////////
map.on('load',function(){
    console.log("the map is done loading!")
    fetch('lab3-data.geojson')
    .then(function get_data(data){
        return data.json()
    })
    .then(data =>{
        console.log(data)
        results = data;
        //// For loop is here
        data.features.forEach(processData)
    })
})


// addmarker(lat, lon, title, message)
function processData(results){
    let longitude = results.geometry.coordinates[0]
    let latitude = results.geometry.coordinates[1]
    let title = results.properties.Name
    let message = `<h4>${results.properties.Event}</h4><p>${results.properties.Quote}</p>`

    let color = results.properties.Color

    addMarker(longitude, latitude, title, message, color)
}


// Add markers with Java function
function addMarker(lon, lat, title, message, clr){
    let popup_message = `<h3>${title}:</h3> ${message}`
    new maplibregl.Marker({color: clr})
    .setLngLat([lon,lat])
    .setPopup(new maplibregl.Popup({offset: 25})
    .setHTML(popup_message)).addTo(map)
    console.log(`Added ${name} marker!`)
};

// Button function

function createButton(lon, lat, title, zoom_lvl){
    // button html
    const newButton = document.createElement("button");
        // document is built-in call for DOM
    newButton.id = "button"+title; // is unique
    newButton.innerHTML = title;
    newButton.setAttribute("lat",lat);
    newButton.setAttribute("lon",lon);
    newButton.addEventListener('click',function(){
        map.setZoom(zoom_lvl)
        map.flyTo({
            center: [lon, lat],
        })
    })

    // add the button
    document.getElementById("content").appendChild(newButton)
};