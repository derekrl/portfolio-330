const outputDiv = document.getElementById('output');
const pagesDiv = document.getElementById('pages');
const buttonBack = document.getElementById('button-back');
const buttonsPN = document.getElementById('buttons');
const buttonPrev = document.getElementById('button-previous');
const buttonNext = document.getElementById('button-next');

let apiURL = 'https://swapi.dev/api/starships/';

fetchAPI(apiURL)

buttonBack.addEventListener('click', () =>
    fetchAPI(apiURL));
buttonPrev.addEventListener('click', (event) =>
    changePage(event.target.dataset.url));
buttonNext.addEventListener('click', (event) =>
    changePage(event.target.dataset.url));

/**
 * Fetch and parse JSON from the specified URL, and redraw full output
 * @param {string} apiURL 
 */

function fetchAPI(apiURL) {
    fetch(apiURL)
        .then(response => {
            if (response.ok) {
                return response;
            }
            throw Error(response.statusText);
        })
        .then(response => response.json())
        .then(data => {
            renderShipList(data);
            buttonNext.dataset.url = data.next;
            buttonPrev.dataset.url = data.previous;
        })
        .catch(error => console.log('There was an error:', error));
}

/**
 * Creates and displays ul containing all ships in given parsed data object
 * @param {object} data 
 */

function renderShipList(data) {
    outputDiv.innerHTML = '';
    element = document.createElement('ul');
    element.dataset.type = 'ships';

    data.results.forEach(item => {
        let newElement = renderSingleShip(item);
        element.appendChild(newElement);
    })

    Array.from(element.children).forEach(item =>
        item.addEventListener('click', (event) =>
            fetchDetails(event.target.dataset.url))
    )

    outputDiv.appendChild(element);
    drawPaginationButtons(data);

    buttonBack.style.display = 'none';
    pagesDiv.style.display = 'flex';
    buttonsPN.style.display = 'flex';
}

/**
 * Creates li element for a single given ship
 * @param {object} ship 
 * @returns {HTMLElement} li
 */

function renderSingleShip(ship) {
    const element = document.createElement('li')
    element.dataset.url = ship.url;
    element.innerHTML = ship.name;
    return element;
}

/**
 * Generates pagination buttons given parsed data object
 * @param {object} data 
 */

function drawPaginationButtons(data) {
    let count = Math.round(data.count / 10);
    let current = 0;
    if (apiURL.includes('page')) {
        current = Number.parseInt(apiURL.slice(-1));
    } else {
        current = 1;
    }

    pagesDiv.innerHTML = '<span>Pages:</span>';

    for (i = 1; i <= count; i++) {
        button = document.createElement('button');
        button.innerText = i;
        if (i == current) button.classList.add('current');
        button.addEventListener('click', (event) =>
            changePage(buildApiURL(event.target.innerText)), false)
        pagesDiv.appendChild(button);
    }

}

/**
 * Create an apiURL to load the specified page number
 * @param {number} page 
 * @returns {string} url
 */

function buildApiURL(page) {
    if (page === 1) {
        url = 'https://swapi.dev/api/starships/';
    } else {
        url = `https://swapi.dev/api/starships/?page=${page}`
    }
    return url;
}

/**
 * Load ship list of specified apiURL
 * @param {string} url 
 */

function changePage(url) {
    if (url != 'null') {
        fetchAPI(url)
        apiURL = url;
    } else {
        console.log('null')
    };
}

/**
 * Fetch details of a single ship at specified url
 * @param {string} url 
 */

function fetchDetails(url) {
    fetch(url)
        .then(response => {
            outputDiv.innerHTML = 'Waiting for response...';
            if (response.ok) {
                return response;
            }
            throw Error(response.statusText);
        })
        .then(response => response.json())
        .then(data => listDetails(data))
        .catch(error => console.log('There was an error:', error))
}

/**
 * Display details of a given ship object
 * @param {object} ship 
 */

function listDetails(ship) {
    outputDiv.innerHTML = '';
    let list = document.createElement('ul');
    list.dataset.type = 'details';

    Object.entries(ship).forEach(([key, value]) => {
        let element = document.createElement('li');
        element.innerHTML = `${key}: ${value}`;
        list.appendChild(element);
    })
    outputDiv.appendChild(list);

    buttonBack.style.display = 'inline-block';
    pagesDiv.style.display = 'none';
    buttonsPN.style.display = 'none';
}

