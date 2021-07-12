var map = L.map('mapid').setView([51.505, -0.09], 10);

L.tileLayer('https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=YxoS3Qc2SbXcxdExZedQ', {
    attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
}).addTo(map);
var marker = L.marker([51.5, -0.09]).addTo(map);