
var imageGallery = [
"https://farm8.staticflickr.com/7140/7065590393_b38f545ab3_c.jpg" ,
"https://farm8.staticflickr.com/7355/16440483571_cb05a5810b_c.jpg" ,
"https://farm9.staticflickr.com/8814/17061286149_6f7d279c83_c.jpg"
];

var imgCount = 0;
var totalImgs = imageGallery.length - 1;

function next() {
    imgCount++ ;
    if(imgCount > totalImgs) imgCount = 0

    document.getElementById("gallery").src = imageGallery[imgCount] ;
}

function previous() {
    imgCount--;
    if(imgCount < 0) imgCount = totalImgs ;
    document.getElementById("gallery").src = imageGallery[imgCount] ;    
} 
        