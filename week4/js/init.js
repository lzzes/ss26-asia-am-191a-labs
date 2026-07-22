// MAP OF FIELD SITES //////////////////////////////////////////////////////////////
// Initialize the map

let mapOptions = {'centerLngLat': [-121.545317, 37.764078],'startingZoomLevel':12}
let dataUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSbyyd3Y7Dbz9d1xIjbxR_p8tQb0opq8x8XKuoV5JnH2nDHzGeF0MWXjsZhDjgO3cj3w2QF6OXuxktq/pub?output=csv"
const map = new maplibregl.Map({
    container: 'map',
    style: 'https://api.maptiler.com/maps/streets-v2-light/style.json?key=wsyYBQjqRwKnNsZrtci1',
    center: mapOptions.centerLngLat,
    zoom: mapOptions.startingZoomLevel
});

// Functions
function createButtons(lat,lng,title,clr,fnt_clr,zoom_lvl){
    const newButton = document.createElement("button");
    newButton.id = "button"+title;
    newButton.innerHTML = title;
    newButton.setAttribute("lat",lat);
    newButton.setAttribute("lng",lng);
    newButton.style.color = fnt_clr
    newButton.style.backgroundColor = clr
    console.log(newButton.style)
    newButton.addEventListener('click', function(){
        map.flyTo({
            center: [lng,lat],
            zoom: [zoom_lvl]
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
        console.log(`Read features for ${feature['What street do you live on?']}`)
        addMarker(feature);
    });
};

function addMarker(feature) {
    // Assign variables
    let longitude;
    let latitude;
    let transportation;
    let message;
    let location;
    let m_clr

    console.log(feature)
    if (feature.lng) 
        longitude = feature.lng;
    if (feature.lat) 
        latitude = feature.lat;
    if (feature['What street do you live on?']) 
        location = feature['What street do you live on?']
    if (feature['Which mode of transportation do you (or your student) use to get to Mountain House High School?']) 
        transportation = feature['Which mode of transportation do you (or your student) use to get to Mountain House High School?'];
    if (feature["What would you like to share about your (or your student's) commute to the high school?"]) 
        message = feature["What would you like to share about your (or your student's) commute to the high school?"]

    console.log(feature)

    // Create marker
    // Custom pop-up message
    let popup_message = `<h5>${location}</h5><p>${message}</p>`

    // If-statement for the color
    if (transportation == "Walk")
        m_clr = "blue"
    else if (transportation == "Bike/scooter (non-electric)")
        m_clr = "purple"
    else if (transportation == "Bike/scooter (electric)")
        m_clr = "#0A8C00"
    else if (transportation == "Car")
        m_clr = "yellow"
    else if (transportation == "Motorcycle")
        m_clr = "navy"
    else m_clr = "black"

    new maplibregl.Marker({color: m_clr})
        .setLngLat([longitude, latitude])
        .setPopup(new maplibregl.Popup()
            .setHTML(popup_message))
        .addTo(map)
    // createButtons(latitude,longitude,title);
    console.log(`Added ${location} marker`)
}

createButtons(37.783022, -121.549709,"Altamont","#6c00af","#ffc800",14)
createButtons(37.773681, -121.550656,"Bethany","#ff0000aa","#ffc800",14)
createButtons(37.753839, -121.547473,"College Park","#027a6c","#ffc800",15)
createButtons(37.762071, -121.538280,"Cordes","#ca4700","#white",14)
createButtons(37.762370, -121.551918,"Hansen","#026d14","#ffc800",14)
createButtons(37.795476, -121.541981,"Lakeshore","#3742a2","white",14)
createButtons(37.789698, -121.549217,"Questa","#ff0000aa","black",14)
createButtons(37.771638, -121.539178,"Wicklund","#ffc800","black",14)

map.on('load', async () => {
    image = await map.loadImage('https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Red_star.svg/500px-Red_star.svg.png');
    map.addImage('star', image.data);
    map.addSource('point', {
        'type': 'geojson',
        'data': {
            'type': 'FeatureCollection',
            'features': [
                {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [-121.545317, 37.764078]
                    }
                }
            ]
        }
    });
    map.addLayer({
        'id': 'points',
        'type': 'symbol',
        'source': 'point',
        'layout': {
            'icon-image': 'star',
            'icon-size': 3,
        }
    });
});


const newButton = document.createElement("button");
    newButton.id = "button"+title;
    newButton.innerHTML = title;
    newButton.setAttribute("lat",lat);
    newButton.setAttribute("lng",lng);
    newButton.style.color = fnt_clr
    newButton.style.backgroundColor = clr
    console.log(newButton.style)
    newButton.addEventListener('click', function(){
        map.flyTo({
            center: [lng,lat],
            zoom: [zoom_lvl]
        })
    })
    document.getElementById("contents").appendChild(newButton);