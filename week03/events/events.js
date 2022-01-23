/**** Chapter 7 ****/

// addEventListener('click', () => alert('Clicky'));

/*
function doSomething(event) {
    console.log(event.type);
    console.log(event.target);
    console.log(`screen: (${event.screenX},${event.screenY}), page: (${event.pageX},${event.pageY}), client: (${event.screenX},${event.screenY})`)
}
addEventListener('click', doSomething);
*/

let clickParagraph = document.getElementById('click');

clickParagraph.addEventListener('click', () => console.log('click'));
clickParagraph.addEventListener('mousedown', () => console.log('down'));
clickParagraph.addEventListener('mouseup', () => console.log('up'));

let dblclickParagraph = document.getElementById('dblclick');
dblclickParagraph.addEventListener('dblclick', highlight);

function highlight(event) {
    event.target.classList.toggle('highlight');
}

function highlightNo(event) {
    // event.target.classList.toggle('highlight');
    console.log('I am incredibly annoying');
}

let mouseParagraph = document.getElementById('mouse');
mouseParagraph.addEventListener('mouseover', highlight);
mouseParagraph.addEventListener('mouseout', highlight);
mouseParagraph.addEventListener('mousemove', () => console.log('You moved!'));

addEventListener('keydown', highlightNo);
addEventListener('keyup', (event) => console.log(`Key up on ${new Date}`));
addEventListener('keypress', (event) => console.log(`Character key [${event.key}] pressed`));
addEventListener('keydown', (event) => console.log(`Key [${event.key}] pressed`));

addEventListener('keydown', (event) => {
    if (event.key === 'c' && event.ctrlKey) {
        console.log('Cancel time');
    }
})
//  also shiftKey, altKey, metaKey

addEventListener('click', (event) => {
    if (event.shiftKey) {
        console.log('Shifty');
    }
})

addEventListener('touchend', () => console.log('Touch end'));
// touchstart, touchmove, touchend, touchcancel
// events.touches.length
// events.touches[n]
// touch.screenX .screenY .radiusX .force .identifier

let onceParagraph = document.getElementById('once');
onceParagraph.addEventListener('click', remove);

function remove(event) {
    console.log('Enjoy this while it lasts')
    onceParagraph.style.backgroundColor = 'pink';
    onceParagraph.removeEventListener('click', remove);
}

let brokenLink = document.getElementById('broken');
brokenLink.addEventListener('click', (event) => {
    event.preventDefault();
    console.log('This site never loads');
})

ulElement = document.getElementById('list');
liElement = document.querySelector('#list li');

// bubbling: starts on specific element, propagates upwards
ulElement.addEventListener('click', (event) => console.log('Clicked on ul'));
liElement.addEventListener('click', (event) => {
    console.log('Clicked on li')
    event.stopPropagation();
}, false);

// capturing: starts on root element, propagates downwards
// ulElement.addEventListener('click', (event) => console.log('Clicked on ul'), true);
// liElement.addEventListener('click', (event) => console.log('Clicked on li'), true);

/*
// handle both? need separate event listeners
// capturing
ulElement.addEventListener('click', (event) => console.log('Clicked on ul'), true);
liElement.addEventListener('click', (event) => console.log('Clicked on li'), true);
// bubbling
ulElement.addEventListener('click', (event) => console.log('Clicked on ul'), false);
liElement.addEventListener('click', (event) => console.log('Clicked on li'), false);
*/

ulElement.addEventListener('click', highlight);
// propagates down to individuals