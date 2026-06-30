// Initialize the map
const map = new maplibregl.Map({
    container: 'map', // container ID — matches <div id="map">
    style: 'https://api.maptiler.com/maps/streets/style.json?key=wsyYBQjqRwKnNsZrtci1', // style URL
        // share in maptiler + paste here for custom basemap
    center: [-118.444, 34.0709], // starting position [lng, lat]
    zoom: 15 // starting zoom level
});

let home_marker = [-118.444, 34.0709];
let home_marker_text = 'Math Sciences 4328 aka the Technology Sandbox<br> is the lab where I used to work in '

// Add a marker to the map
new maplibregl.Marker()
    .setLngLat(home_marker)
    .setPopup(new maplibregl.Popup({ offset: 25 })
        .setHTML(home_marker_text))
    .addTo(map);