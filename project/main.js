import { setSelectedLang, swapInputs } from './ui.js';
import { detectLanguage, getTranslation } from './libretranslate.js';

const sourceLangSelect = document.getElementById('source-lang');
// const sourceLangDetect = document.getElementById('source-detect');
const sourceTextInput = document.getElementById('source-text');
const targetLangSelect = document.getElementById('target-lang');
const targetTextInput = document.getElementById('target-text');

const mapTextSource = document.querySelector('#map-interface span:nth-of-type(1)');
const mapTextTarget = document.querySelector('#map-interface span:nth-of-type(2)');
const zoomButton = document.getElementById('zoom');
// const testButton = document.getElementById('test-button');
const mapDiv = document.getElementById('map');

const worldmapSVGPath = 'world-map.svg';

let style = document.createElement('style');

const langData = [
    ['en', 'English', ['us', 'gb', 'au', 'nz', 'ag', 'bs', 'bb', 'bz', 'bw', 'bn', 'ca', 'dm', 'fj', 'gm', 'gh', 'gd', 'gy', 'jm', 'ke', 'lr', 'mu', 'fm', 'ng', 'kn', 'lc', 'vc', 'sl', 'sg', 'sb', 'za', 'ss', 'tt']],
    ['ar', 'Arabic', ['bh', 'eg', 'jo', 'kw', 'lb', 'ly', 'mr', 'om', 'ps', 'qa', 'sa', 'sy']],
    ['az', 'Azerbaijani', ['az']],
    ['zh', 'Chinese', ['cn']],
    ['cs', 'Czech', ['cz']],
    ['nl', 'Dutch', ['be', 'nl', 'sr']],
    ['fi', 'Finnish', ['fi']],
    ['fr', 'French', ['fr', 'bj', 'bf', 'cg', 'cd', 'ci', 'ga', 'gn', 'ml', 'mc', 'ne', 'sn']],
    ['de', 'German', ['de', 'at', 'ch', 'lu', 'li']],
    ['hi', 'Hindi', ['in', 'pk']],
    ['hu', 'Hungarian', ['hu']],
    ['id', 'Indonesian', ['id']],
    ['ga', 'Irish', ['ie']],
    ['it', 'Italian', ['it', 'mt', 'sm', 'va']],
    ['ja', 'Japanese', ['jp']],
    ['ko', 'Korean', ['kr', 'kp']],
    ['pl', 'Polish', ['pl']],
    ['pt', 'Portuguese', ['pt', 'br', 'ao', 'cv', 'gw', 'mz', 'st']],
    ['ru', 'Russian', ['ru', 'by', 'kz', 'kg', 'tj']],
    ['es', 'Spanish', ['es', 'mx', 'cl', 'co', 'cr', 'cu', 'do', 'ec', 'sv', 'gq', 'gt', 'hn', 'ni', 'pa', 'py', 'pe', 'uy', 'vz']],
    ['sv', 'Swedish', ['se']],
    ['tr', 'Turkish', ['tr', 'cy']],
    ['uk', 'Ukrainian', ['ua']],
    ['vi', 'Vietnamese', ['vn']]
]

initPage();

function initPage() {

    zoomButton.addEventListener('click', () => toggleZoom());

    sourceLangSelect.addEventListener('change', () =>
        markCountries(sourceLangSelect.value, 'lang', 'source'));
    // sourceLangDetect.addEventListener('click', () => {
    //     detectLanguage(sourceTextInput.value)
    //         .then(response => console.log(response), response => console.log(`Error: ${response}`))
    // });
    targetLangSelect.addEventListener('change', () =>
        markCountries(targetLangSelect.value, 'lang', 'target'));
    document.getElementById('action-swap').addEventListener('click', () => {
        swapInputs();
        markCountries(sourceLangSelect.value, 'lang', 'source');
        markCountries(targetLangSelect.value, 'lang', 'target');
    });
    document.getElementById('action-translate').addEventListener('click', () => {
        document.body.style.cursor = 'progress';
        getTranslation(sourceTextInput.value, sourceLangSelect.value, targetLangSelect.value)
            .then(
                response => {
                    document.body.style.cursor = 'auto';
                    targetTextInput.value = response.translatedText},
                response => {
                    document.body.style.cursor = 'auto';
                    console.log(`Error: ${response}`)}
                )
    });


    document.head.appendChild(style);
    style.sheet.insertRule('.stub {background: transparent}', 0);
    mapTextSource.innerHTML = 'Stub';
    mapTextSource.dataset.code = 'null';
    style.sheet.insertRule('.stub2 {background: transparent;}', 1);
    mapTextTarget.innerHTML = 'Stub';
    mapTextTarget.dataset.code = 'null';
    markCountries('en', 'lang', 'source');
    markCountries('es', 'lang', 'target');

    let parser = new DOMParser();

    fetch(worldmapSVGPath)
        .then((response) => {
            // console.log('Waiting...');
            if (response.ok) {
                return response;
            }
            throw Error(response.statusText);
        })
        .then((response) => response.text())
        .then((text) => {
            return parser
                .parseFromString(text, 'image/svg+xml')
                .querySelector('svg');
        })
        .then((map) => {
            map.addEventListener('click', (event) =>
                countryClicked(event));
            map.addEventListener('contextmenu', (event) =>
                countryClicked(event)
            );
            map.addEventListener('dblclick', (event) => doubleClickZoom(event));
            mapDiv.appendChild(map);
        })
        .catch((error) => console.log('There was an error:', error));
}

function findDataFromCountry(country) {
    return langData.filter(filter);

    function filter(element) {
        return element[2].includes(country);
    }
}

function findDataFromLang(lang) {
    return langData.filter(filter);

    function filter(element) {
        return element[0] === lang;
    }
}

function countryClicked(event) {
    // console.log(event);
    event.preventDefault();

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
    console.log(code, name);
    // console.log(`Country: ${code} Name: ${name}`, target);
    // console.log(event);
    // console.log(`Button ${event.buttons}, X ${event.layerX}, Y ${event.layerY}`);

    markCountries(code, 'country', event.buttons === 0 ? 'source' : 'target');
}

function markCountries(code, codeType, which) {

    let data = [];

    if (codeType === 'country') {
        data = findDataFromCountry(code)[0];
    } else if (codeType === 'lang') {
        data = findDataFromLang(code)[0];
    }

    // console.log(data);
    if (!data) {
        console.log(`Language not supported or country has multiple official languages`);
        return false;
    }

    /* false negatives
    if (data[0] === mapTextSource.dataset.code || data[0] === mapTextTarget.dataset.code) {
        console.log('Already marked');
        return false;
    }
    */

    let string = '';

    /*
    for (let i = 0; i < data[2].length; i++) {
        if (i == 0) {
            string = `.${data[2][i]}`;
        } else {
            string += `, .${data[2][i]}`
        };
    }
    */
    data[2].forEach(a => {string += `, .${a}`})
    string = string.slice(2);
    // fix ', .us, .gb, .au, .nz'

    // console.log(string);

    if (which === 'source') {
        style.sheet.deleteRule(0);
        style.sheet.insertRule(`${string} {fill: #48f !important}`, 0);
        mapTextSource.innerHTML = `Source language: ${data[1]}`;
        mapTextSource.dataset.code = data[0];
        setSelectedLang(data[0], 'source');
    } else {
        style.sheet.deleteRule(1);
        style.sheet.insertRule(`${string} {fill: #f84 !important}`, 1);
        mapTextTarget.innerHTML = `Target language: ${data[1]}`;
        mapTextTarget.dataset.code = data[0];
        setSelectedLang(data[0], 'target');
    }
    // console.log(style.sheet.cssRules);
}

function toggleZoom() {
    if (mapDiv.classList.contains('zoomed')) {
        zoomOut();
    } else {
        mapDiv.classList.add('zooming');
        zoomButton.innerText = 'Zoom where?';
        mapDiv.addEventListener('click', (event) => zoomIn(event), {
            once: true,
        });
    }
}

function doubleClickZoom(event) {
    if (mapDiv.classList.contains('zoomed')) {
        zoomOut();
    } else {
        zoomIn(event);
    }
}

function zoomOut() {
    mapDiv.classList.remove('zoomed');
    zoomButton.innerText = 'Zoom in';
}

function zoomIn(event) {
    // console.log(event);
    // mapTextSource.innerHTML = `Language: ${currentLanguageSource}`;
    zoomButton.innerText = 'Zoom out';
    mapDiv.classList.remove('zooming');
    let perX = event.layerX / mapDiv.scrollWidth;
    let perY = event.layerY / mapDiv.scrollHeight;
    mapDiv.classList.add('zoomed');
    mapDiv.scrollTo(
        perX * (mapDiv.scrollWidth - mapDiv.clientWidth),
        perY * (mapDiv.scrollHeight - mapDiv.clientHeight)
    );
    // console.log(perX, perY, perX * mapDiv.scrollWidth, perY * mapDiv.scrollHeight)
}
