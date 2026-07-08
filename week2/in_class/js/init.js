// Initialize the map
const map = new maplibregl.Map({
    container: 'map', // container ID
    style: 'https://api.maptiler.com/maps/streets/style.json?key=wsyYBQjqRwKnNsZrtci1', // Your style URL
    center: [-118.43732, 34.07174], // Starting position [lng, lat]
    zoom: 15 // Starting zoom level
});

// Add a marker to the map
new maplibregl.Marker()
    .setLngLat([-118.43732, 34.07174])
    .setPopup(new maplibregl.Popup({ offset: 25 }) // Add popups
        .setHTML('UCLA Graduate Housing<br>Where I first lived in!'))
    .addTo(map); 


let westwood = new maplibregl.Marker()
    .setLngLat([-118.4,34])
    .setPopup(new maplibregl.Popup({offset: 25})
    .setHTML("Off campus housing")).addTo(map)

let ktown = new maplibregl.Marker()
    .setLngLat([-118.3,34])
    .setPopup(new maplibregl.Popup({offset: 25})
    .setHTML("Off campus housing")).addTo(map)

function myfirstfunction(){
    console.log('hello world')
};

function mysecondfunction(test1,test2){
    let result = test1+ test2;
    console.log(result)
};

function addMarker(lat, lon, text, name){
    let popup_message = "<h2>"+name+"</h2>"+text
    new maplibregl.Marker()
    .setLngLat([lon,lat])
    .setPopup(new maplibregl.Popup({offset: 25})
    .setHTML(popup_message)).addTo(map)
    return console.log(`Added ${name} marker!`)
};

addMarker(37.775, -121.55, "Mountain House", "MH")
// addMarker(34.5, -118.4, "LA Place", "LA")

// could do function init(){add all ur functions} and then call init()

function createButton(lat, lon, title, message){
    // button html
    const newButton = document.createElement("button");
        // document is built-in call for DOM
    newButton.id = "button"+title; // is unique
    newButton.innerHTML = title;
    newButton.setAttribute("lat",lat);
    newButton.setAttribute("lon",lon);
    newButton.addEventListener('click',function(){
        map.flyTo({
            center: [lon, lat],
        })
    })

    // add the button
    document.getElementById("contents").appendChild(newButton)
};

createButton(37.775, -121.55, "Mountain House", "MH")