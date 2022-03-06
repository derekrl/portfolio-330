/*
map = document.getElementById('map').contentDocument;
console.log(map);
// console.log(map.contentDocument);
// map.addEventListener('click', console.log('click'));
map.addEventListener('click', event => console.log(event.target));
*/

let worldmapSVG = 'https://upload.wikimedia.org/wikipedia/commons/3/3b/BlankMap-World-with-Circles.svg';
let mapDiv = document.getElementById('map');
let mapElement = '';
let outputText1 = document.querySelector('#output span');
let zoomButton = document.getElementById('zoom');
const parser = new DOMParser();

zoomButton.addEventListener('click', () => this.toggleZoom());

getTheMap(worldmapSVG);

let style = document.createElement("style");
// style.appendChild(document.createTextNode(""));
document.head.appendChild(style);
style.sheet.insertRule('.us {fill: #48f !important}');
outputText1.innerHTML = 'Country: United States of America';
// colorCountry('us');

let currentCountry = 'United States of America';

function getTheMap(url) {
    /*
    let headers = new Headers({
        'Accept-Encoding': 'br, gzip',
        'Test-header': 'string'
    });
    let request = new Request(url,
        {
            method: 'GET',
            mode: 'cors',
            header: headers
        }
    );
    */

    // request has compression headers in it by default

    fetch(url)
        .then(response => {
            // console.log('Waiting...');
            if (response.ok) {
                return response;
            }
            throw Error(response.statusText);
        })
        .then(response => response.text())
        .then(text => {
            return parser.parseFromString(text, 'image/svg+xml').querySelector('svg');
        })
        .then(map => {
            map.addEventListener('click', event => countryClicked(event));
            mapElement = map;
            mapDiv.appendChild(map);
        })
        .catch(error => console.log('There was an error:', error));
}

function countryClicked(event) {

    // console.log(event);
    let target = event.target;

    if (target.tagName == 'svg') return false; // area outside map bounds
    if (target.id == 'ocean') return false; // we're going ocean?

    while (target.parentElement.tagName != 'svg') {
        // go up tree until it's a root country element
        // possibly re-work to manage sub-nations and colonies <title>s
        target = target.parentElement;
    }

    let code = target.id;
    let name = target.getElementsByTagName('title')[0].innerHTML;
    console.log(`Country: ${code} Name: ${name}`, target);
    console.log(event, event.layerX, event.layerY);

    markCountry(code, name);
}

function markCountry(code, name) {
    style.sheet.deleteRule(0);
    style.sheet.insertRule(`.${code} {fill: #48f !important}`);
    outputText1.innerHTML = `Country: ${name}`;
    currentCountry = name;
}

function toggleZoom() {
    if (mapDiv.classList.contains('zoomed')) {
        mapDiv.classList.remove('zoomed');
        zoomButton.innerText = 'Zoom in';
    } else {
        mapDiv.classList.add('zooming');
        outputText1.innerHTML = 'Zoom where?';
        mapDiv.addEventListener('click', event => this.zoomIn(event), { once: true });
    }

}

function zoomIn(event) {
    // console.log(event);
    outputText1.innerHTML = `Country: ${currentCountry}`;
    zoomButton.innerText = 'Zoom out';
    mapDiv.classList.remove('zooming');
    perX = event.layerX / mapDiv.scrollWidth;
    perY = event.layerY / mapDiv.scrollHeight;
    mapDiv.classList.add('zoomed');
    mapDiv.scrollTo(
        perX * (mapDiv.scrollWidth - mapDiv.clientWidth),
        perY * (mapDiv.scrollHeight - mapDiv.clientHeight)
    );
    // console.log(perX, perY, perX * mapDiv.scrollWidth, perY * mapDiv.scrollHeight)
}
