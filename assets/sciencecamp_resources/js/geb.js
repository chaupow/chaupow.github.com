
var entries = [
    {
      name: "Erwin Schrödinger",
      month: 8,
      date: "12.8.1887",
      src: "http://pix.echtlustig.com/1212/schroedingers-katze-ist-am-leben-und-sehr-wuetend.jpg"
    },
    {
      name: "Alfred Hitchcock",
      month: 8,
      date: "13.8.1999",
      src: "http://i.imgur.com/97GEkeY.jpgy"
    }
 ];
 var now = new Date();
 
 
function birth(){
	for (var i = 0; i < entries.length; i++){
	  if (entries[i].month == now.getMonth() + 1){
			document.write("<li><img  src=\"" + entries[i].src +"\" style=\"width:600px;\"> <p>"+entries[i].name+" "+entries[i].date+"</p> </li>");
	  }
	}
}
