var map = L.map('map').setView([49.013736, 8.404334], 14);

L.tileLayer('http://c.tile.stamen.com/toner/{z}/{x}/{y}.png', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
}).addTo(map);

var infobau = [49.013817, 8.419790];
var schlosspark = [49.013149, 8.404364];
var klinikum = [49.015609, 8.374574];
var gameforge = [49.019921, 8.440989];
var his = [49.010194, 8.418930];

L.Routing.control({
  waypoints: [
    L.latLng(infobau[0], infobau[1]),
    L.latLng(klinikum[0], klinikum[1])
  ]
}).addTo(map);