// Initialize the map
const map = new maplibregl.Map({
    container: 'map', // container ID — matches <div id="map">
    style: 'https://api.maptiler.com/maps/streets/style.json?key=wsyYBQjqRwKnNsZrtci1', // style URL
        // share in maptiler + paste here for custom basemap
    center: [-117.85, 35.5], // starting position [lng, lat]
    zoom: 6 // starting zoom level
});

let pisgah_mark = [-116.48328486944, 34.79898053056];
let pisgah_text = 'Pisgah Fault: conducted electrical resistivity and active seismic surveys to determine the fault location';


let cloudcroft_mark = [-118.5712340057312, 34.049481153824];
let cloudcroft_text = 'Cloudcroft Debris Basin: studied sediment and debris flow after the Palisades fire';

let lonepine_mark = [-118.248305, 36.576566];
let lonepine_text = 'Lone Pine Lake: collected atmospheric data with data acquisition systems we constructed';

// Add a marker to the map
new maplibregl.Marker({color: "#7900B0"})
    .setLngLat(pisgah_mark)
    .setPopup(new maplibregl.Popup({ offset: 25 })
        .setHTML(pisgah_text))
    .addTo(map);

new maplibregl.Marker({color: "#7900B0"})
    .setLngLat(cloudcroft_mark)
    .setPopup(new maplibregl.Popup({ offset: 25 })
        .setHTML(cloudcroft_text))
    .addTo(map);

new maplibregl.Marker({color: "#7900B0"})
    .setLngLat(lonepine_mark)
    .setPopup(new maplibregl.Popup({ offset: 25 })
        .setHTML(lonepine_text))
    .addTo(map);