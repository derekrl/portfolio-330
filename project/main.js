import { setSelectedLang, swapInputs } from './ui.js';
import { detectLanguage, getTranslation } from './libretranslate.js';
import { qs, selectorListener, elementListener } from "./utilities.js";

const sourceLangSelect = qs('#source-lang');
// const sourceLangDetect = document.getElementById('source-detect');
const sourceTextInput = qs('#source-text');
const targetLangSelect = qs('#target-lang');
const targetTextInput = qs('#target-text');

const mapTextSource = qs('#source-cell span');
const mapButtonSource = qs('#source-button');
const mapTextTarget = qs('#target-cell span');
const mapButtonTarget = qs('#target-button');
// const testButton = document.getElementById('test-button');
const mapParentDiv = qs('#map-parent');
const mapElement = qs('#map');
// const zoomer = qs('#zoom-range');

const worldmapSVGPath = 'world-map.svg';

let currSource = '';
let currTarget = '';

let styleCountryFills = document.createElement('style');
let styleMapBox = document.createElement('style');


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

    sourceLangSelect.addEventListener('change', () => markCountries(sourceLangSelect.value, 'lang', 'source'));
    // utils.onTouchElement(sourceLangSelect, () => markCountries(sourceLangSelect.value, 'lang', 'source'));
    // sourceLangDetect.addEventListener('click', () => {
    //     detectLanguage(sourceTextInput.value)
    //         .then(response => console.log(response), response => console.log(`Error: ${response}`))
    // });
    targetLangSelect.addEventListener('change',
        () => markCountries(targetLangSelect.value, 'lang', 'target'));

    // document.getElementById('action-swap').addEventListener('click', () => {
    //     swapInputs();
    //     markCountries(sourceLangSelect.value, 'lang', 'source');
    //     markCountries(targetLangSelect.value, 'lang', 'target');
    // });

    selectorListener('click', '#action-swap', () => {
        swapInputs();
        markCountries(sourceLangSelect.value, 'lang', 'source');
        markCountries(targetLangSelect.value, 'lang', 'target');
    });

    // document.getElementById('action-translate').addEventListener('click', () => {
    //     document.body.style.cursor = 'progress';
    //     getTranslation(sourceTextInput.value, sourceLangSelect.value, targetLangSelect.value)
    //         .then(
    //             response => {
    //                 document.body.style.cursor = 'auto';
    //                 targetTextInput.value = response.translatedText},
    //             response => {
    //                 document.body.style.cursor = 'auto';
    //                 console.log(`Error: ${response}`)}
    //             )
    // });

    selectorListener('click', '#action-translate', () => {
        document.body.style.cursor = 'progress';
        getTranslation(sourceTextInput.value, sourceLangSelect.value, targetLangSelect.value)
            .then(
                response => {
                    document.body.style.cursor = 'auto';
                    targetTextInput.value = response.translatedText
                },
                response => {
                    document.body.style.cursor = 'auto';
                    console.log(`Error: ${response}`)
                }
            )
    })

    elementListener('click', mapButtonSource, event => activateSelectionButton(event));
    elementListener('click', mapButtonTarget, event => activateSelectionButton(event));

    document.head.appendChild(styleCountryFills);
    styleCountryFills.sheet.insertRule('.stub {background: transparent}', 0);
    mapTextSource.innerHTML = 'Stub';
    mapTextSource.dataset.code = 'null';
    styleCountryFills.sheet.insertRule('.stub2 {background: transparent}', 1);
    mapTextTarget.innerHTML = 'Stub';
    mapTextTarget.dataset.code = 'null';
    markCountries('en', 'lang', 'source');
    markCountries('es', 'lang', 'target');

    // console.log(styleCountryFills.sheet);

    // console.log(mapDiv.clientWidth);

    // console.log(styleMapBox);

    document.head.appendChild(styleMapBox);

    sizeMapDiv(true);
    window.addEventListener('resize', () => sizeMapDiv());

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
            elementListener('click', map, event => countryClicked(event))
            // utils.elementListener('contextmenu', map, event => (countryClicked(event)))
            elementListener('dblclick', map, event => doubleClickZoom(event))
            elementListener('mousemove', map, event => panMap(event))
            // map.addEventListener('click', (event) => countryClicked(event));
            // map.addEventListener('contextmenu', (event) => countryClicked(event));
            // map.addEventListener('dblclick', (event) => doubleClickZoom(event));

            mapElement.appendChild(map);
            mapElement.dataset.fresh = 'true';

            if (/Mobile/i.test(window.navigator.userAgent)) {
                mapElement.addEventListener('touchstart', () => removeInternalOverlay(), { once: true });
            } else {
                mapElement.addEventListener('mouseover', () => removeInternalOverlay(), { once: true });
            }

            function removeInternalOverlay() {
                mapElement.dataset.fresh = 'false';
                qs('#map-overlay').remove();

            }

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

function activateSelectionButton(event) {
    let target = event.target;

    if (target.id === 'source-button') {
        mapButtonSource.dataset.active = 'true';
        if (mapButtonTarget.dataset.active === 'true') {
            mapButtonTarget.dataset.active = 'false';
        }
    } else {
        mapButtonTarget.dataset.active = 'true';
        if (mapButtonSource.dataset.active === 'true') {
            mapButtonSource.dataset.active = 'false';
        }
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
    // let name = target.getElementsByTagName('title')[0].innerHTML;
    // console.log(code, name);
    // console.log(`Country: ${code} Name: ${name}`, target);
    // console.log(event);
    // console.log(`Button ${event.buttons}, X ${event.layerX}, Y ${event.layerY}`);

    let which = '';

    if (mapButtonSource.dataset.active === 'true') {
        which = 'source';
    }

    if (mapButtonTarget.dataset.active === 'true') {
        which = 'target';
    }

    markCountries(code, 'country', which);
    // markCountries(code, 'country', event.buttons === 0 ? 'source' : 'target');
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

    // console.log(data);

    if (which === 'source') {
        if (data[0] === currTarget) return false
        currSource = data[0];
    };
    if (which === 'target') {
        if (data[0] === currSource) return false;
        currTarget = data[0];
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

    // build css selector
    data[2].forEach(a => { string += `, .${a}` })

    // fix ', .us, .gb, .au, .nz'
    string = string.slice(2);

    // console.log(string);

    if (which === 'source') {
        styleCountryFills.sheet.deleteRule(0);
        styleCountryFills.sheet.insertRule(`${string} {fill: var(--blue-2) !important}`, 0);
        mapTextSource.innerHTML = `Source language: ${data[1]}`;
        mapTextSource.dataset.code = data[0];
        setSelectedLang(data[0], 'source');
    } else {
        styleCountryFills.sheet.deleteRule(1);
        styleCountryFills.sheet.insertRule(`${string} {fill: var(--orange-2) !important}`, 1);
        mapTextTarget.innerHTML = `Target language: ${data[1]}`;
        mapTextTarget.dataset.code = data[0];
        setSelectedLang(data[0], 'target');
    }
    // console.log(style.sheet.cssRules);
}

function toggleZoom() {
    if (mapElement.classList.contains('zoomed')) {
        zoomOut();
    } else {
        mapElement.classList.add('zooming');
        // zoomButton.innerText = 'Zoom where?';
        mapElement.addEventListener('click', (event) => zoomIn(event), {
            once: true,
        });
    }
}

function doubleClickZoom(event) {
    if (mapElement.classList.contains('zoomed')) {
        zoomOut();
    } else {
        zoomIn(event);
    }
}

function zoomOut() {
    mapElement.classList.remove('zoomed');
    // zoomButton.innerText = 'Zoom in';
    // zoomer.value = 0;
}

function zoomIn(event) {
    // console.log(event);
    // mapTextSource.innerHTML = `Language: ${currentLanguageSource}`;
    // zoomButton.innerText = 'Zoom out';
    // zommer.value = 100;
    mapElement.classList.remove('zooming');
    let perX = event.layerX / mapElement.scrollWidth;
    let perY = event.layerY / mapElement.scrollHeight;
    mapElement.classList.add('zoomed');
    mapElement.scrollTo(
        perX * (mapElement.scrollWidth - mapElement.clientWidth),
        perY * (mapElement.scrollHeight - mapElement.clientHeight)
    );
    // console.log(perX, perY, perX * mapDiv.scrollWidth, perY * mapDiv.scrollHeight)
}

/*
function setZoom(x, y) {
    let oldValue = curZoom;
    let newValue = zoomer.value;
    let oldWidth = mapDiv.scrollWidth;
    let oldHeight = mapDiv.scrollHeight;
    let oldOffsetLeft = mapDiv.scrollLeft;
    let oldOffsetTop = mapDiv.scrollTop;
    let fullWidth = 2754;
    let fullHeight = 1398;
    let boxWidth = mapParent.clientWidth;
    let boxHeight = mapParent.clientHeight;

    // console.log(mapParent.clientWidth, mapDiv.clientWidth);

    if (x === null) {
        x = boxWidth / 2;
        y = boxHeight / 2;
    }

    console.log(boxWidth + ((fullWidth - boxWidth) * newValue / 100));
    styleMapZoom.sheet.deleteRule(0);
    styleMapZoom.sheet.insertRule(`#map svg {width: ${
        boxWidth + ((fullWidth - boxWidth) * newValue / 100)
    }px;}`);
    console.log(oldOffsetLeft, oldValue, x, newValue);
    mapDiv.scrollTo(
        oldOffsetLeft / (oldValue / 100) * (newValue / 100) + x,
        oldOffsetTop / (oldValue / 100) * (newValue / 100) + y
    );

    curZoom = newValue;
}
*/

function panMap(event) {
    // console.log(event);
    if (event.buttons === 0) return false;

    mapElement.scrollTo(
        mapElement.scrollLeft - event.movementX,
        mapElement.scrollTop - event.movementY
    )
}

function sizeMapDiv(first) {
    if (first !== true) {
        styleMapBox.sheet.deleteRule(0);
        styleMapBox.sheet.deleteRule(0);
    }
    styleMapBox.sheet.insertRule(`#map{width: ${mapParentDiv.clientWidth}px}`, 0);
    styleMapBox.sheet.insertRule(`#map{height: ${1398 / (2754 / mapParentDiv.clientWidth)}px}`, 1)
}
