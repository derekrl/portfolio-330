// let form = document.getElementsByTagName('form')[0];
// let form = document.forms.search;
let form = document.forms['search'];
// dot notation works, square brackets safer though

// let [input,button] = form.elements;
let input = form.searchInput;
// let input = form['searchInput'];

// input.addEventListener('focus', () => console.log('focused'), false);
// input.addEventListener('blur', () => console.log('blurred'), false);
input.addEventListener('change', () => console.log('changed'), false);

form.addEventListener('submit', search, false);

function search(event) {
    alert(`You searched for: ${input.value}`);
    event.preventDefault();
}

// input.value = 'Search here';

input.addEventListener('focus', function () {
    if (input.value === 'Search Here') {
        input.value = ''
    }
}, false);

input.addEventListener('blur', function () {
    if (input.value === '') {
        input.value = 'Search Here';
    }
}, false);
// this kind of works, probably better to use html placeholders though