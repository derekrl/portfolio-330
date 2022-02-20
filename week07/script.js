/**********************
 * CHAPTER 11
 * Further Functions
 */

/**
 * Function Properties and Methods
 */

function sayHello(greeting = 'Hello') {
    return `${greeting}, my name is ${this.name}`;
}

const clark = { name: 'Clark' };
const bruce = { name: 'Bruce' };

sayHello.call(clark, 'How do you do');
sayHello.call(bruce);
// first arg sets value of `this`

/*
function square(x) {
    return x*x;
    // no this, use null as first arg
}
*/

square.call(null, 4);

// apply same as call, but array instead of object
square.apply(null, [4]);

// can add props of choosing
square.description = 'Squares a number that is provided as an argument';

// cache: store results to not re-compute on same arg
function square(x) {
    square.cache = square.cache || {};
    if (!square.cache[x]) {
        square.cache[x] = x * x;
    }
    return square.cache[x]
}

square(3);
square(-11);
square.cache;
// {"3": 9, "-11": 121}

/**
 * Immediately Invoked Function Expressions
 * IIFE "iffy"
 */


// invoked as soon as it is defined
// parentheses around and at end
(function () {
    const temp = 'World';
    console.log(`Hello ${temp}`);
})();

// variables last for only as long as IIFE
let a = 1;
let b = 2;

(() => {
    const temp = a;
    a = b;
    b = temp;
})();
// temp no longer exists

// alt
let [aa, bb] = [1, 2];
[aa, bb] = [bb, aa];

(function () {
    const name = 'Peter Parker'; // This might be obtained from a cookie in reality
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date(), today = days[date.getDay()];
    console.log(`Welcome back ${name}. Today is ${today}`);
})();
// extra variables name, days, date no longer exist

// if need be can also just wrap in {} and use scope to isolate

(function () {
    'use strict';
    // this one is strict even if the rest of the doc isn't
})();


// self-contained blocks, these variables don't clash
(function () {
    // block A
    const name = 'Block A';
    console.log(`Hello from ${name}`);
}());

(function () {
    // block B
    const name = 'Block B';
    console.log(`Hello from ${name}`);
}());

/**
 * Functions that Define and Rewrite themselves
 */

function party() {
    console.log('Wow this is amazing!'); // first run
    party = function () {
        console.log('Been there, got the T-Shirt'); // subsequent runs
    }
}

// init-time branching
// good for compat checks
function ride() {
    if (window.unicorn) {
        ride = function () {
            // some code that uses the brand new and sparkly unicorn methods
            return 'Riding on a unicorn is the best!';
        }
    } else {
        ride = function () {
            // some code that uses the older pony methods
            return 'Riding on a pony is still pretty good';
        }
    }
    return ride();
}

// recursive functions
function factorial(n) {
    if (n === 0) {
        return 1;
    } else {
        return n * factorial(n - 1);
    }
}

function collatz(n, sequence = [n]) {
    if (n === 1) {
        return `Sequence took ${sequence.length} steps. It was ${sequence}`;
    }
    if (n % 2 === 0) {
        n = n / 2;
    } else {
        n = 3 * n + 1;
    }
    return collatz(n, [...sequence, n]);
}

/**
 * Callbacks
 */

//// Event-Driven Asynchronous Programming
function wait(message, callback, seconds) {
    setTimeout(callback, seconds * 1000);
    console.log(message);
}

function selfDestruct() {
    console.log('BOOOOM!');
}

wait('This tape will self-destruct in five seconds ... ', selfDestruct, 5);
console.log('Hmmm, should I accept this mission or not ... ?');

wait('This tape will self-destruct immediately ... ', selfDestruct, 0);
console.log('Hmmm, should I accept this mission or not ... ?');
// callback still waits for stack to clear

// Promises
// result as either resolved or rejected

// not real code - general layout
// two args are functions
/*
const promiseExample = new Promise((resolve, reject) => {
    // initialization code goes here
    if (success) {
        resolve(value);
    } else {
        reject(error);
    }
});
*/

const dice = {
    sides: 6,
    roll() {
        return Math.floor(this.sides * Math.random()) + 1;
    }
}
console.log('Before the roll');

const roll = new Promise((resolve, reject) => {
    const n = dice.roll();
    if (n > 1) {
        setTimeout(() => { resolve(n) }, n * 200);
    } else {
        setTimeout(() => reject(n), n * 200);
    }
});

roll.then(result => console.log(`Yes! I rolled a ${result}`),
    result => console.log(`Drat! ... I rolled a ${result}`));

roll.then(result => console.log(`I rolled a ${result}`))
    .catch(result => console.log(`Drat! ... I rolled a ${result}`));

console.log('After the roll');


//// Chaining Multiple Promises

// each .then only starts once previous is done
/*
login(userName)
    .then(user => getPlayerInfo(user.id))
    .then(info => loadGame(info))
    .catch( throw error)
*/


// Async Functions

/*
async function loadGame(userName) {
    try {
        const user = await login(userName);
        // next will not run until this await is done
        const info = await getPlayerInfo(user.id);
        // load the game using the returned info
    }
    catch (error) {
        throw error;
    }
}
*/


//// Generalized Functions

/*
function random(a, b = 1) {
    // if only 1 argument is provided, we need to swap the values of a and b
    if (b === 1) {
        [a, b] = [b, a];
    }
    return Math.floor((b - a + 1) * Math.random()) + a;
}
*/

function random(a, b, callback) {
    // if only one argument is supplied, assume the lower limit is 1
    if (b === undefined) b = a, a = 1;
    result = Math.floor((b - a + 1) * Math.random()) + a
    if (callback) {
        result = callback(result);
    }
    return result;
}

random(6);
random(10, 20);
random(1, 10, square); // square afterwards
random(1, 5, (n) => 2 * n); // x2 afterwards


//// Functions That Return Functions

function returnHello() {
    console.log('returnHello() called');
    return function () {
        console.log('Hello World!');
    }
}

const hello = returnHello();
hello();

function greeter(greeting = 'Hello') {
    return function () {
        console.log(greeting);
    }
}

const englishGreeter = greeter();
const frenchGreeter = greeter('Bonjour');
const germanGreeter = greeter('Guten Tag');


/**
 * Closures
 */

function outer1() {
    const outside = 'Outside!';
    function inner() {
        const inside = 'Inside!';
        console.log(outside);
        console.log(inside);
    }
    console.log(outside);
    inner();
}

function outer2() {
    const outside = 'Outside!';
    function inner() {
        const inside = 'Inside!';
        console.log(outside);
        console.log(inside);
    }
    return inner;
}

const closure1 = outer2();
// closure still has variables from inside()

function closure() {
    const a = 1.8;
    const b = 32;
    return c => c * a + b;
}
const toFahrenheit = closure();
toFahrenheit(30);


function counter(start) {
    let i = start;
    return function () {
        return i++;
    }
}
const count = counter(1);

//// Generators
// produce iterators that maintain the state of a value

function* exampleGenerator() {
    // code for the generator goes here
}

function* fibonacci(a, b) {
    let [prev, current] = [a, b];
    while (true) {
        [prev, current] = [current, prev + current];
        yield current;
        // yield instead of return: hold onto value until next call
    }
}

const sequence = fibonacci(1, 1); // starter
sequence.next(); // 2
sequence.next(); // 3
sequence.next(); // 5
for (n of sequence) {
    // stop the sequence after it reaches 100
    if (n > 10) break;
    console.log(n);
} // 8 13 21 34 55 89


/**
 * Functional Programming
 */

/** Pure function
 * 1. Return value based on only provided arguments, not values elsewhere
 * 2. No side-effects, no changes in value or data elsewhere in program
 *    Doesn't alter any source data, only creates new. Non-destructive
 * 3. Referential transparency - same arguments, same result
 */

function reverse(string) {
    return string.split('').reverse().join('');
}

const message = 'Hello JavaScript';
reverse(message);
message // hasn't changed


let number1 = 42;
let result1 = 0;
function impureAdd(x) {
    result1 = number1 + x;
}
impureAdd(10);
result1;


const number2 = 42;
function pureAdd(x, y) {
    return x + y;
}
let result2 = pureAdd(number2, 10);


function hypotenuse(a, b) {
    return Math.sqrt(square(a) + square(b));
}
hypotenuse(3, 4)

function sum(array, callback) {
    if (callback) {
        array = array.map(callback);
    }
    return array.reduce((a, b) => a + b);
}
sum([1, 2, 3]);
sum([1, 2, 3], square);

function mean(array) {
    return sum(array) / array.length;
}
mean([1, 2, 3]);

function variance(array) {
    return sum(array, square) / array.length - square(mean(array))
}
variance([1, 2, 3])

//// Higher-Order Functions
// take function as arg, return function, or both

function multiplier(x) {
    return function (y) {
        return x * y;
    }
}
doubler = multiplier(2);
doubler(10);
tripler = multiplier(3);
tripler(10);

function power(x) {
    return function (power) {
        return Math.pow(x, power);
    }
}
twoExp = power(2);
twoExp(5); // 32
tenExp = power(10);
tenExp(6); // 1000000

power(3)(5); // 243
// power(3) returns as function, (5) is arg to same function


//// Currying
// partial application of functions

function multiplierCurry(x, y) {
    if (y === undefined) {
        return function (z) {
            return x * z;
        }
    } else {
        return x * y;
    }
}

const tax = multiplierCurry(0.22, 400);

calcTax = multiplierCurry(0.22);
calcTax(400); // 88

function curryExample(func, ...oldArgs) {
    return function (...newArgs) {
        const allArgs = [...oldArgs, ...newArgs];
        return func(...allArgs);
    }
}

const divider = (x, y) => x / y;
divider(10, 5);

const reciprocal = curryExample(divider, 1);
reciprocal(2);


/**
 * CHAPTER 13
 * Ajax
 */

// Asynchonous JavaScript and XML
// generally json instead of xml nowadays but ajaj sounds silly

/**
 * Fetch API
 */

console.log(`
   ************** 
 *      RIP       * 
* example.com/data *
*    2022-2022     *
********************
`);

fetch('https://example.com/data')
    .then(console.log('Handling response'))
    .catch(console.log('Server returned an error'));
// also a promise

const url = 'https:example.com/data';
fetch(url)
    .then((response) => {
        if (response.ok) {
            return response;
        } throw Error(response.statusText);
    })
    .then(response => console.log('I\'m doing the thing'))
    .catch(error => console.log('There was an error!'))

//// Response Interface

/* Response object properties:
statusText
headers
url
redirected - bool
type
    basic - from same domain
    cors - valid cross-origin request
    opaque - "no-cors" request, access severely restricted
    error - guess
*/

// here's redirect
fetch(url)
    .then(response => response.redirect(newURL)) // redirects to another URL
    .then(console.log('Do something else'))
    .catch(error => console.log('There was an error: ', error));
// but it isn't actually supported anywhere
// ???

fetch(url)
    .then(response => response.text()) // transforms the text stream into a JavaScript string
    .then(text => console.log(text))
    .catch(error => console.log('There was an error: ', error));

fetch(url)
    .then(response => response.blob()) // transforms the data into a blob object
    .then(blob => console.log(blob.type))
    .catch(error => console.log('There was an error: ', error));

fetch(url)
    .then(response => response.json()) // transforms the JSON data into a JavaScript object
    .then(data => console.log(Object.entries(data)))
    .catch(error => console.log('There was an error: ', error));

// generally not creating these in JS, but example anyways
const response = new Response('Hello!', {
    ok: true,
    status: 200,
    statusText: 'OK',
    type: 'cors',
    url: '/api'
});

//// Request Interface

/* Request object properties
url
method - which HTTP method (default GET)
    GET retrieve resources
    POST usu used to create resources but can actually perform any task
    PUT "upsert" insert a resource or update it entirely
    PATCH partial updates to resource
    DELETE delete resource
headers
mode - specify if CORS used or not (default enabled)
cache - use cache?
credentials - cookies
redirect - what do if redir - follow, error, manual (click)
*/

const request = new Request('https://example.com/data', {
    method: 'GET',
    mode: 'cors',
    redirect: 'follow',
    cache: 'no-cache'
});
fetch(request)
    .then(console.log('Do something'))
    .catch(console.log('Handle Errors'));

// alt
fetch('https://example.com/data', {
    method: 'GET',
    mode: 'cors',
    redirect: 'follow',
    cache: 'no-cache'
})
    .then(console.log('Do something'))
    .catch(console.log('Do something'));

//// Headers Interface

// const headers = new Headers();
const headers = new Headers({ 'Content-Type': 'text/plain', 'Accept-Charset': 'utf-8', 'Accept-Encoding': 'gzip,deflate' })
// constructor can take args

headers.has('Content-Type');
headers.get('Content-Type');
headers.set('Content-Type', 'application/json');
headers.append('Accept-Encoding', 'gzip, deflate');
headers.delete('Accept-Encoding');
for (const entry of headers.entries()) {
    console.log(entry);
}

const url2 = 'https:example.com/data';
const headers2 = new Headers({ 'Content-Type': 'text/plain', 'Accept-Charset': 'utf-8', 'Accept-Encoding': 'gzip,deflate' })
const request2 = (url2, {
    headers: headers2
})
fetch(request2)
    .then(function (response) {
        if (response.ok) {
            return response;
        }
        throw Error(response.statusText);
    })
    .then(response => console.log('Do something'))
    .catch(error => console.log('There was an error!'));

/*
const request = new Request(form.action,
    {
        method: form.method,
        header: headers,
        body: data
    }
)
*/

// Form

data = new FormData(); // no form provided as an argument creates an empty form data instance
data.append('height', 75);
