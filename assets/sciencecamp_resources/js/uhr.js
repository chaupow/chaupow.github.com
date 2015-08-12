setInterval("zeitanzeigen()", 1000);

function zeitanzeigen(){
	var currentTime = new Date();
	var stunden = currentTime.getHours();
	var minuten = currentTime.getMinutes();
   	var sekunden = currentTime.getSeconds();
   	if (sekunden < 10) {
		sekunden= "0" + sekunden;
	}
   	if (minuten < 10) {
		minuten= "0" + minuten;
	}	
   	if (stunden< 10) {
		stunden= "0" + stunden;
	}
   	document.getElementById("uhr").textContent = stunden + ":" + minuten + ":" + sekunden;

}
