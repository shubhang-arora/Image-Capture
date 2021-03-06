<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>HTML5 Demo: getUserMedia (Treehouse Blog)</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <link rel="stylesheet" href="{{asset('css/styles.css')}}">
</head>
<body>
<h3>Demo: Take a Selfie With JavaScript</h3>

<div class="container">

    <div class="app">

        <a href="#" id="start-camera" class="visible">Touch here to start the app.</a>
        <video id="camera-stream"></video>
        <img id="snap">

        <p id="error-message"></p>

        <div class="controls">
            <a href="#" id="delete-photo" title="Delete Photo" class="disabled"><i class="material-icons">delete</i></a>
            <a href="#" id="take-photo" title="Take Photo"><i class="material-icons">camera_alt</i></a>
            <a href="#" id="download-photo" download="selfie.png" title="Save Photo" class="disabled"><i class="material-icons">file_download</i></a>
        </div>

        <!-- Hidden canvas element. Used for taking snapshot of video. -->
        <canvas></canvas>

    </div>

</div>
<script src="{{asset('js/script.js').'?v='.rand(10000,10)}}"></script>
</body>
</html>




