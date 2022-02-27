var element = document.getElementById('demo1');
var context = element.getContext('2d');

context.strokeStyle = 'red';
context.fillStyle = 'rgba(0, 0, 255, 0.5)';
context.fillRect(10, 10, 100, 100);
context.strokeRect(10, 10, 100, 100);

function drawPattern() {
    var canvas = document.getElementById('demo2');
    var context = canvas.getContext('2d');
    context.strokeStyle = 'red';

    var img = new Image();
    img.src = 'img/bike.png';
    img.onload = function () {
        var pattern = context.createPattern(img, 'repeat');
        context.fillStyle = pattern;
        context.fillRect(10, 10, 100, 100);
        context.strokeRect(10, 10, 100, 100);
    };
}

drawPattern();

function drawGradient() {
    var canvas = document.getElementById('demo3');
    var context = canvas.getContext('2d');
    context.strokeStyle = 'red';
    var gradient = context.createLinearGradient(0, 0, 0, 200);
    gradient.addColorStop(0, 'blue');
    gradient.addColorStop(1, 'white');
    context.fillStyle = gradient;
    context.fillRect(10, 10, 100, 100);
    context.strokeRect(10, 10, 100, 100);
}

drawGradient();

function drawCircle(canvas) {
    var context = canvas.getContext('2d');
    context.beginPath();
    context.arc(100, 100, 50, 0, Math.PI * 2, true);
    context.closePath();
    context.strokeStyle = 'red';
    context.fillStyle = 'blue';
    context.lineWidth = 3;
    context.fill();
    context.stroke();
}

drawCircle(document.getElementById('demo4'));
drawCircle(document.getElementById('demo5'));

function saveDrawing() {
    var canvas5 = document.getElementById('demo5');
    window.open(canvas5.toDataURL('image/png'));
}

var button = document.getElementById('saveButton');
button.addEventListener('click', saveDrawing, false);

window.addEventListener('load', drawImageToCanvas, false);

function drawImageToCanvas() {
    var canvas = document.getElementById('demo6');
    var context = canvas.getContext('2d');
    var image = document.getElementById('myImageElem');
    context.drawImage(image, 0, 0);
}

// drawImageToCanvas();

/*
var canvas = document.getElementById('demo1');
var context = canvas.getContext('2d');
var image = document.getElementById('myImageElem');
// draw the image at x=0 and y=0 on the canvas
context.drawImage(image, 68, 68);
var imageData = context.getImageData(0, 0, 1, 1);
var pixelData = imageData.data;
console.log(pixelData.length);
*/

window.addEventListener('load', manipulateImage, false);

function manipulateImage() {
    var canvas = document.getElementById('demo7');
    var context = canvas.getContext('2d');
    var image = document.getElementById('secondImage');
    context.drawImage(image, 60, 60);
    var imageData = context.getImageData(0, 0, 200, 200);
    for (var i = 0; i < imageData.data.length; i += 4) {
        var red = imageData.data[i];
        var green = imageData.data[i + 1];
        var blue = imageData.data[i + 2];
        var grayscale = red * 0.3 + green * 0.59 + blue * 0.11;
        imageData.data[i] = grayscale;
        imageData.data[i + 1] = grayscale;
        imageData.data[i + 2] = grayscale;
    }
    context.putImageData(imageData, 0, 0);
}

// manipulateImage();
