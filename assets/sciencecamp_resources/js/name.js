
var name = "Lena";


function show(){
	document.getElementById("demo").textContent= name ;
} 

function change(){
	name = prompt("Und dein ganzer Name?","");
}


var cat= "Vielleicht";

function kitty(){
	cat = prompt("Magst du Katzen?","");
	if(cat == "Ja" ){
	document.getElementById("cat").src="http://stuffpoint.com/cats/image/104659-cats-cute-cat.jpg";
	}else{
	document.getElementById("cat").src="http://i.dailymail.co.uk/i/pix/2014/08/05/1407225932091_wps_6_SANTA_MONICA_CA_AUGUST_04.jpg";
	}
	
}


function calc(){
	var sum = 0;
	for(var i = 1; i<=100; i++){
		sum += i;
	}
	document.getElementById("sum").textContent = sum;

}

var id=0;
var array=[1,2,3,4,5,6,7,8,9];

function getelem(){
	id = prompt("Welches Element willst du?", "Gib eine Zahl zwischen 0 und " + (array.length -1) + " ein.")
	document.getElementById("elem").textContent = "Das " + id + "-te Element ist: " + array[id];
}
