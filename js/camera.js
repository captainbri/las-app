var pictureSource;   // picture source
var destinationType; // sets the format of returned value

document.addEventListener("deviceready",onDeviceReady,false);
function onDeviceReady() {
	pictureSource=navigator.camera.PictureSourceType;
	destinationType=navigator.camera.DestinationType;
}		
    

function onPhotoURISuccess(imageURI) {
	var largeImage = document.getElementById('largeImage');
	largeImage.style.display = 'block';
	largeImage.src = imageURI;
	
	var imagefield = document.getElementById('image');
	imagefield.value = imageURI;
}



function getPhoto() {
	navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,
	destinationType: Camera.DestinationType.FILE_URI, 
	sourceType:Camera.PictureSourceType.PHOTOLIBRARY
	
	});
}

function onFail(message) {
	alert('Failed because: ' + message);
}
