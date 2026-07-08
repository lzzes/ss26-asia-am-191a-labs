// MAP OF FIELD SITES ////////////////////////////////////////////////////////////
// Initialize the map
const map = new maplibregl.Map({
    container: 'map', // container ID — matches <div id="map">
    style: 'https://api.maptiler.com/maps/streets/style.json?key=wsyYBQjqRwKnNsZrtci1', // style URL
        // share in maptiler + paste here for custom basemap
    center: [-117.85, 35.2], // starting position [lng, lat]
    zoom: 6 // starting zoom level
});


// Add markers with Java function
function addMarker(lon, lat, text, name,image){
    let popup_message = `<h2>${name}:</h2> ${text} <br> <img src=img/${image} alt=${name} width=100%></img>`
    new maplibregl.Marker({color: "#7900B0"})
    .setLngLat([lon,lat])
    .setPopup(new maplibregl.Popup({offset: 25})
    .setHTML(popup_message)).addTo(map)
    console.log(`Added ${name} marker!`)
};

// Add markers
let pisgah_text = "conducted electrical resistivity and active seismic surveys to determine the fault location";
addMarker(-116.48328486944, 34.79898053056, pisgah_text, "Pisgah Fault", "pisgah.jpg")


let cloudcroft_text = 'studied sediment and debris flow after the Palisades fire';
let cloudcroft_img = 'cloudcroft.jpg'
addMarker(-118.5712340057312, 34.049481153824, cloudcroft_text, "Cloudcroft Debris Basin", cloudcroft_img)


let lonepine_text = 'collected atmospheric data with data acquisition systems we constructed';
addMarker(-118.248305, 36.576566, lonepine_text, "Lone Pine Lake", "daq.jpg")

let rainbow_text = 'mapped sedimentary formations, including the Barstow syncline'
addMarker(-117.034215, 35.031173, rainbow_text, "Rainbow Basin", "barstow-syncline.jpg")

let newberry_text = "conducted gravity survey to determine the density structure across the Calico Fault"
addMarker(-116.663025, 34.826019, newberry_text, "Calico Fault", "grav.jpg")

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

createButton(-118.248305, 36.576566, "Sierra Nevadas", 7)
createButton(-116.731720, 35.347134, "Mojave Desert", 7)
createButton(-118.410269, 34.057910, "Los Angeles", 10)
createButton(-117.85, 35.2, "Reset Map", 6)