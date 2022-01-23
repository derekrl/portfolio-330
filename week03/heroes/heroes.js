/**** Chapter 6 ****/

const body = document.body;
typeof body; // "object"

body.nodeType; // 1
/* node types
1 element
2 attribute
3 text
8 comment
9 body
*/

body.nodeName; // "BODY"

// LEGACY
Document.body
Document.images
Document.links // all <a> and <area>+href
Document.anchors // all <a>+name
Document.forms
// These are node lists, not arrays, have index[n] and .length
// array = Array.from(document.images);
// array = [...document.images]

let h1 = document.getElementById('title');

let listItems = document.getElementsByTagName('li');
listItems[0];

let heroes1 = document.getElementsByClassName('hero');
heroes1.length;

document.getElementsByTagName('villian').length;

document.querySelector('#bats');

document.querySelectorAll('.hero');

let wonderWoman1 = document.querySelector('li:last-child');
let ul = document.querySelector('ul#roster');
let batman1 = ul.querySelector('li#bats');

let heroes = document.getElementById('roster');
heroes.childNodes; // all descendents. text nodes, etc
heroes.children; // only immediate descendents
heroes.firstChild;
heroes.lastChild;

let wonderWoman = document.querySelector('ul#roster  li:last-child');
wonderWoman.parentNode;
wonderWoman.nextSibling;
wonderWoman.previousSibling;

let textNode = wonderWoman.firstChild;
textNode.nodeValue;
wonderWoman.textContent;

wonderWoman.getAttribute('class');
wonderWoman.getAttribute('src');

wonderWoman.setAttribute('class', 'villain');
wonderWoman.getAttribute('class');

wonderWoman.setAttribute('id', 'amazon');
wonderWoman.getAttribute('id');

wonderWoman.className = 'hero';
// overwrites all classes on element

wonderWoman.classList.add('warrior');
wonderWoman.classList.remove('warrior');
wonderWoman.classList.toggle('hero');
wonderWoman.classList.toggle('hero');
wonderWoman.classList.contains('hero');
// ie only supports in 10+


// let flash = document.createElement('li');
// let flashText = document.createTextNode('Flash');
// flash.appendChild(flashText);

let flash = document.createElement('li');
flash.textContent = 'Flash';

function createElement(tag, text) {
    let el = document.createElement(tag);
    el.textContent = text;
    return el;
}

let aquaman = createElement('li', 'Aquaman');

heroes.appendChild(flash);
heroes.insertBefore(aquaman, wonderWoman);
heroes.appendChild(wonderWoman); // element can only appear once. if placed somewhere, removed from elsewhere

heroes.removeChild(aquaman);
heroes.appendChild(aquaman);

// let h1 = document.getElementById('title');
let oldText = h1.firstChild;
let newText = document.createTextNode('Justice League of America');
h1.replaceChild(newText, oldText);

h1.innerHTML = 'Suicide Squad';
heroes.innerHTML = '<li>Harley Quinn</li><li>Deadshot</li><li>Killer Croc</li><li>Enchantress</li><li>Captain Boomerang</li><li>Katana</li><li>Slipknot</li>';
// don't try to insert scripts with innerHTML, won't work

// let heroes = document.getElementById('roster');
let list = heroes.children;
list.length;

let batman = document.getElementById('bats');
heroes.removeChild(batman);
list.length;

heroes.children[2];

let superman = heroes.children[0];
superman.style.border = 'red 2px solid';
superman.style.backgroundColor = 'blue';
superman.style['background color'] = 'blue';
superman.style.display = 'none';
superman.style.display = 'block';

getComputedStyle(superman);
getComputedStyle(superman).getPropertyCSSValue('color').cssText;

superman.style.border('red 2px solid');
superman.classList.add('highlighted');
