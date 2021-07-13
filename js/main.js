const getBtn = document.getElementById('search');
let ipAddress = document.getElementById('ipAddress');
let location = document.getElementById('location');
let timezone = document.getElementById('timezone');
let isp = document.getElementById('isp');
const axios = require('axios');

let mapURL = "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw";
let grayscale = L.tileLayer(mapURL, { id: 'mapbox/light-v9', tileSize: 512, zoomOffset: -1, attribution: "" }),
    streets = L.tileLayer(mapURL, { id: 'mapbox/streets-v11', tileSize: 512, zoomOffset: -1, attribution: "" }),
    satellite = L.tileLayer(mapURL, { id: 'mapbox/satellite-v9', tileSize: 512, zoomOffset: -1, attribution: "" }),
    dark = L.tileLayer(mapURL, { id: 'mapbox/dark-v10', tileSize: 512, zoomOffset: -1, attribution: "" });

let map = L.map('mapid', {
    layers: [streets]
}).setView([0, 0], 5);

// Add the base maps as layers
L.control.layers({
    "Grayscale": grayscale,
    "Streets": streets,
    "Satellite": satellite,
    "Dark": dark,
}, "", { position: "bottomright" }).addTo(map);

// var marker = L.marker([response.data.location.lat, response.data.location.lng]).addTo(map);

axios.get('https://geo.ipify.org/api/v1?apiKey=at_PFVk7CGvwYF7tQ1do6CCqLZQEeBYZ&ipAddress=').then(response => {
    console.log(response.data);
    ipAddress.innerHTML = response.data.ip;
    location.innerHTML = `${response.data.location.city}, ${response.data.location.region} ${response.data.location.postalCode}`
    timezone.innerHTML = response.data.location.timezone;
    isp.innerHTML = response.data.isp;

    map.setView([response.data.location.lat, response.data.location.lng], 11);
    var marker = L.marker([response.data.location.lat, response.data.location.lng]).addTo(map);
});
function getData() {
    const getIP = document.querySelector('.inputIP').value;
    console.log(getIP);
    axios.get(`https://geo.ipify.org/api/v1?apiKey=at_PFVk7CGvwYF7tQ1do6CCqLZQEeBYZ&ipAddress=${getIP}`).then(response => {
        console.log(response.data);
        ipAddress.innerHTML = response.data.ip;
        location.innerHTML = `${response.data.location.city}, ${response.data.location.region} ${response.data.location.postalCode}`
        timezone.innerHTML = response.data.location.timezone;
        isp.innerHTML = response.data.isp;

        map.setView([response.data.location.lat, response.data.location.lng], 11);
    });
}

getBtn.addEventListener('click', getData);