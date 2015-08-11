var map = L.map('map').setView([49.013736, 8.404334], 14);

L.tileLayer('http://a.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors | Tiles by <a href="http://hot.openstreetmap.org/">HOT</a>'
}).addTo(map);

// L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(map);

// L.tileLayer('http://otile1.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.jpg', {
//     attribution: 'Tiles Courtesy of <a href="http://www.mapquest.com/" target="_blank">MapQuest</a> <img src="http://developer.mapquest.com/content/osm/mq_logo.png">, &copy; Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
// }).addTo(map);

// L.tileLayer('http://c.tile.stamen.com/toner/{z}/{x}/{y}.png', {
//     attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
// }).addTo(map);

// L.tileLayer('http://c.tile.stamen.com/watercolor/{z}/{x}/{y}.png', {
//     attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
// }).addTo(map);

var infobau = [49.013817, 8.419790];
var schlosspark = [49.013149, 8.404364];
var klinikum = [49.015609, 8.374574];
var gameforge = [49.019921, 8.440989];
var his = [49.010194, 8.418930];

L.marker(infobau).addTo(map)
    .bindPopup('Hier findet das tolle Science Camp statt :)');
L.marker(schlosspark).addTo(map)
    .bindPopup('Am Schloss kann man gut relaxen');
L.marker(klinikum).addTo(map)
    .bindPopup('Im Klinikum haben wir über Informatik im Krankenhauseinsatz gelernt.');
L.marker(gameforge).addTo(map)
    .bindPopup('Bei Gameforge haben wir ein PHP Spiel entwickelt.');
L.marker(his).addTo(map)
    .bindPopup('Im HIS haben wir etwas über die Forschung in der Medizininformatik gelernt.');