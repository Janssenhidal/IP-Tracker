const getBtn = document.getElementById('search');
const axios = require('axios');

let ipAddress = document.getElementById('ipAddress');
let location = document.getElementById('location');
let timezone = document.getElementById('timezone');
let isp = document.getElementById('isp');

// ---- Creation of the map ----

let mapURL = "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw";

//Setting multiple layers to be called by the control

let grayscale = L.tileLayer(mapURL, { id: 'mapbox/light-v9', tileSize: 512, zoomOffset: -1, attribution: "" }),
    streets = L.tileLayer(mapURL, { id: 'mapbox/streets-v11', tileSize: 512, zoomOffset: -1, attribution: "" }),
    satellite = L.tileLayer(mapURL, { id: 'mapbox/satellite-v9', tileSize: 512, zoomOffset: -1, attribution: "" }),
    dark = L.tileLayer(mapURL, { id: 'mapbox/dark-v10', tileSize: 512, zoomOffset: -1, attribution: "" });

let map = L.map('mapid', {
    layers: [streets]
}).setView([0, 0], 2);

let blackLocationMarker = L.icon({
    iconUrl: 'images/icon-location.svg',
    iconSize: [36, 46],
    iconAnchor: [12, 54],
});

//Create markerGroup inside layerGroup to make it easier to control the markers
let markerGroup = L.layerGroup().addTo(map);

//Set the map options for MAX zoom and MIN zoom
map.options.maxZoom = 15; map.options.minZoom = 3;

// Add the base maps as layers

L.control.layers({
    "Grayscale": grayscale,
    "Streets": streets,
    "Satellite": satellite,
    "Dark": dark,
}, "", { position: "bottomright" }).addTo(map);

//GET CAll TO THE API
axios.get('https://geo.ipify.org/api/v1?apiKey=at_PFVk7CGvwYF7tQ1do6CCqLZQEeBYZ&ipAddress=').then(response => {

    // EXTRACT DATA FROM API CALL AND INPUT INSIDE HTML

    ipAddress.innerHTML = response.data.ip;
    location.innerHTML = `${response.data.location.city}, ${response.data.location.region} ${response.data.location.postalCode}`
    timezone.innerHTML = response.data.location.timezone;
    isp.innerHTML = response.data.isp;

    //SET MAP VIEW AND MARKER TO COORDS

    map.setView([response.data.location.lat, response.data.location.lng], 11);
    let customMarker = new L.Marker([response.data.location.lat, response.data.location.lng], { icon: blackLocationMarker });
    customMarker.addTo(markerGroup);
}).catch(error => {
    console.log(error);
});


//If ENTER button is pressed call getData function
let getIP = document.querySelector('.inputIP').addEventListener("keyup", (event) => {
    if (event.keyCode === 13) {
        getData();
    }
});

//Function run when search button is clicked
function getData() {
    getIP = document.querySelector('.inputIP').value;
    let searchValue = getIP.trim();

    markerGroup.clearLayers()

    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(searchValue)) {
        axios.get(`https://geo.ipify.org/api/v1?apiKey=at_PFVk7CGvwYF7tQ1do6CCqLZQEeBYZ&ipAddress=${getIP}`).then(response => {
            ipAddress.innerHTML = response.data.ip;
            location.innerHTML = `${response.data.location.city}, ${response.data.location.region} ${response.data.location.postalCode}`
            timezone.innerHTML = response.data.location.timezone;
            isp.innerHTML = response.data.isp;

            map.setView([response.data.location.lat, response.data.location.lng], 11);
            let customMarker = new L.Marker([response.data.location.lat, response.data.location.lng], { icon: blackLocationMarker });
            customMarker.addTo(markerGroup);
        }).catch(error => {
            console.log(error);
        });
    } else {
        alert("Please enter a valid IP Address or Domain");
    }

}

getBtn.addEventListener('click', getData);