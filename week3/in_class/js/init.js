// Initialize the map

// let zoom_level = 15;
// let center_lon = -118.4430;
// let center_lat = 34.0691;

const mapOptions = {
    "zoom":15,
    "center": [-118.4430, 34.0691]
}

const map = new maplibregl.Map({
    container: 'map', // container ID
    style: 'https://api.maptiler.com/maps/streets-v2-light/style.json?key=wsyYBQjqRwKnNsZrtci1', // Your style URL
    center: mapOptions.center, // Starting position [lng, lat]
    zoom: mapOptions.zoom // Starting zoom level
});

function addMarker(lat,lng,title,message,color){
    let popup_message = `<h2>${title}</h2> <h3>${message}</h3>`
    new maplibregl.Marker()
        .setLngLat([lng, lat])
        .setPopup(new maplibregl.Popup()
            .setHTML(popup_message))
        .addTo(map)
    createButtons(lat,lng,title);
    return message
}


map.on('load',function(){
    console.log("hai everybody, the map is done loading")
    fetch('untitled.geojson')
    .then(function get_data(data){
        return data.json()
    })
    .then(data =>{
        console.log(data)
        results = data;
        data.features.forEach(processData)
    })
})

map.on('click',function(){
    console.log("map clicked")
})


function processData(results){
    let longitude = results.geometry.coordinates[0]
    let latitude = results.geometry.coordinates[1]
    let title = results.properties.place
    let color = results.properties.color
    let message = "meow"
    console.log(latitude, "longitude", longitude)

    addMarker(latitude, longitude, title, message, color)
}


function createButtons(lat,lng,title,color){
    const newButton = document.createElement("button");
    newButton.id = "button"+title;
    newButton.innerHTML = title;
    newButton.setAttribute("lat",lat);
    newButton.setAttribute("lng",lng);
    newButton.style = 'color: '+color;
    newButton.addEventListener('click', function(){
        map.flyTo({
            center: [lng,lat],
        })
    })
    document.getElementById("contents").appendChild(newButton);
}

let myArray = 'AA191su'
let myArray2 = [1, 4, 2, 5, 6]

for (let i = 0; i < myArray.length; i++){
    console.log("my array:", i)
}


for (let i = 0; i < myArray.length; i++){
    console.log("my array2", i)
    // addMarker
}

// for of loop: for x in y
// wont work for objects

for (const result of myArray){
    console.log("for of loop:", result)
}

function demo(something){
    console.log("for each loop:", something)
    addMarker(34.07089198374384+something, -118.4382362706527+something, `UCLA${something}`, "Where I lived on campus")
}

myArray2.forEach(demo);

addMarker(34.07089198374384, -118.4382362706527, "UCLA", "Where I lived on campus")
addMarker(34.05811237642655, -118.44350206574538, "Westwood", "Where I lived in Westwood off campus")
addMarker(34.06135445908777, -118.30375584669582, "Koreatown", "Where I currently live.")