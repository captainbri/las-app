var pictureSource;   // picture source
var destinationType; // sets the format of returned value

document.addEventListener("deviceready",onDeviceReady,false);
function onDeviceReady() {
	pictureSource=navigator.camera.PictureSourceType;
	destinationType=navigator.camera.DestinationType;
}		
    
function onPhotoDataSuccess(imageData) {
	var smallImage = document.getElementById('smallImage');
	smallImage.style.display = 'block';
	smallImage.src = "data:image/jpeg;base64," + imageData;
	
	var imagefield = document.getElementById('image');
	imagefield.value = "data:image/jpeg;base64," + imageData;
}

function onPhotoURISuccess(imageURI) {
	var largeImage = document.getElementById('largeImage');
	largeImage.style.display = 'block';
	largeImage.src = imageURI;
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
