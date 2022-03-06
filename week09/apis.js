let superman = document.getElementById('hero');
let powers = superman.dataset.powers;
// 'flight superSpeed'

// if you absolutely must support browsers from 2012
// const powers = superman.getAttribute('data-powers');

// data can only be string. unless:
// let maxLength = Number(element.dataset.maxLength);

if (window.localStorageAPI) {

    // localStorage: sticks around
    // sessionStorage: does not

    localStorage.setItem('name', 'Walter White');
    localStorage.getItem('name');
    localStorage.name = 'Heisenberg';
    console.log(localStorage.name);
    localStorage.removeItem('name');

    delete localStorage.name;

    // everything
    localStorage.clear();

    // storage event fires any time value is saved
    // key, newValue, oldValue, storageArea (local or session)

    addEventListener('storage', (event) => {
        console.log(`The ${event.key} was updated from ${event.oldValue} to ${event.newValue} and saved in
    ${event.storageArea}`)
    }, false);

    // can still only be strings, but no problem
    localStorage.setItem('superman', JSON.stringify(hero));
    superman = JSON.parse(localStorage.getItem('superman'));

}

if (window.geolocationAPI) {
    navigator.geolocation.getCurrentPosition(youAreHere);

    function youAreHere(position) {
        console.log(`Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`);
    }

    /* position properties:
    speed - ground speed in meters per second
    altiude - estimate of altitude in meters above WGS84
    heading - direction device is moving in. degree bearing, cw from N

    */

    let id = navigator.geolocation.watchPosition(youAreHere);
    navigator.geolocation.clearWatch(id);
}

if (window.webWorkers) {
    // run processes in background
    // it's expected that these are hosted on a server
    let worker = new Worker('task.js');

    // post message to worker
    worker.postMessage('Hello');

    // post message from within worker
    self.postMessage('Finished');

    // postMessage() fires message event
    worker.addEventListener('message', (event) => {
        console.log(event.data);
    }, false);

    worker.terminate();
    self.close();

}

if (window.Notification) {
    Notification.requestPermission()
        .then((permission) => {
            if (Notification.permission === 'granted') {
                new Notification('Hello JavaScript!');
            }
        });
}

if (window.notification) {
    const notification = new Notification('JavaScript: Novice to Ninja', {
        body: 'The new book from SitePoint',
        icon: 'sitepointlogo.png'
    });
    notification.close();
    notification.addEventListener('click', () => {
        window.open('https://sitepoint.com')
    }, false);
}

if (window.multimedia) {
    const video = document.getElementsByTagName('video')[0];
    video.play();
    video.pause();
    video.volume = 0.9;
    video.muted = true;
    video.currentTime += 10; // jumps forward 10 seconds
    video.playbackRate = 8; // fast-forward at 8 times as fast
    video.loop = true;
    video.duration;
    /* events
    play
    pause
    volumechange
    loadedmetadata - when all metadta has loaded
    */
    video.addEventListener('loadedmetadata', () => console.log(video.duration));
    video.addEventListener('pause', () => {
        console.log('The video has been paused');
    }, false)
}

document.querySelector('audio').volume = 0.25;

const canvasElement = document.getElementById('canvas');
const context = canvasElement.getContext('2d');
context.fillStyle = "#0000cc"; // a blue fill color
context.strokeStyle = "#ccc"; // a gray stroke color
context.lineWidth = 4;
context.fillRect(10, 10, 100, 50);
context.strokeRect(10, 100, 100, 50);
context.beginPath();
context.moveTo(130, 50);
context.lineTo(180, 50);
context.moveTo(155, 50);
context.lineTo(155, 90);
context.strokeStyle = '#c00';
context.lineWidth = 15;
context.stroke();
context.beginPath();
context.arc(200, 200, 30, 0, Math.PI * 2, false);
context.strokeStyle = '#ff0';
context.lineWidth = 4;
context.stroke();
context.fillStyle = '#0c0'; // a blue fill color
context.font = 'bold 26px sans-serif';
context.fillText('Hello', 20, 200);
