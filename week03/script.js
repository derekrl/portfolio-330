/**** This Article ****/
/*
let user = {
    name: "John",
    age: 30
}

user.sayHi = function () {
    alert("Hello!");
}
*/
// user.sayHi();

/*
user = {
    sayHi() { // can omit function()
        alert("Hello");
    }
}
*/

let user = {
    name: "John",
    age: 30,

    sayHi() {
        alert(this.name);
    }
}
// value of *this* is calculated at runtime
// arrow function *this* is taken from parent/outside function

/**** Chapter 5 ****/
let superman = {
    name: 'Superman',
    'real name': 'Clark Kent',
    height: 75,
    weight: 235,
    hero: true,
    villain: false,
    allies: ['Batman', 'Supergirl', 'Superboy'],
    fly() {
        return 'Up, up and away!';
    }
};

let spiderman = {};

let name2 = 'Iron Man';
let realName2 = 'Tony Stark';
// let ironman = { name: name, realName: realName };
let ironMan = { name2, realName2 }; // short ES6 way

superman.name
superman['real name'] // has spaces
superman['real' + ' ' + 'name'] // property name built with concat

let bewitched = true;
let captainBritian = { name: 'Captain Britian', hero: bewitched ? false : true };

let name = Symbol('name');
let supergirl = { [name]: 'Supergirl' };
let realName = Symbol('real name');
supergirl[realName] = 'Kara Danvers';

let datedevil = { [name]: 'Daredevil', [realName]: 'Matt Murdoch' };

// does this exist?
// returns boolean 
'city' in superman;

// own vs inherited
superman.hasOwnProperty('city');

// list all properties
for (const key in superman) {
    console.log(key + ': ' + superman[key]);
}

// list only own properties
for (const key in superman) {
    if (superman.hasOwnProperty(key)) {
        console.log(key + ': ' + superman[key]);
    }
}

for (const key of Object.keys(superman)) {
    console.log(key);
}
for (const value of Object.values(superman)) {
    console.log(value);
}
for (const [key, value] of Object.entries(superman)) {
    console.log(`${key}: ${value}`);
}

// add value
superman.city = 'Metropolis';

// change value
superman['real name'] = 'Kal-El';

const jla = {
    superman: { realName: 'Clark Kent' },
    batman: { realName: 'Bruce Wayne' },
    wonderWoman: { realName: 'Diana Prince' },
    flash: { realName: 'Barry Allen' },
    aquaman: { realName: 'Arthur Curry' },
}

jla.wonderWoman.realName
jla['flash']['realName']
jla.aquaman['realName']

function greet({ greeting, name, age }) {
    return `${greeting}! My name is ${name} and I am ${age} years old`;
}
greet({ greeting: `What's up dude`, age: 10, name: `Bart` });

function greet({ greeting = 'Hello', name, age = 18 }) {
    return `${greeting}! My name is ${name} and I am ${age} years old`;
}
greet({ name: `Lisa`, age: 8 });

let dice = {
    sides: 6,
    roll() {
        return Math.floor(this.sides * Math.random()) + 1;
    }
}

let myMaths = {
    square(x) {
        return x * x;
    },
    mean(array, callback) {
        if (callback) {
            array.map(callback);
        }
        let total = array.reduce((a, b) => a + b);
        return total / array.length;
    }
}
// avoid collisions if same function name used multiple times
myMaths.square(3)
myMaths.mean([1, 2, 3])

/* JSON */
let batman = '{"name": "Batman","real name": "Bruce Wayne","height": 74, "weight": 210, "hero": true, "villain": false, "allies": ["Robin","Batgirl","Superman"]}'
// parse JSON data to object
JSON.parse(batman);

const wonderWoman = {
    name: 'Wonder Woman',
    'real name': 'Diana Prince',
    height: 72,
    weight: 165,
    hero: true,
    villain: false,
    allies: ['Wonder Girl', 'Donna Troy', 'Superman'],
    lasso: function () {
        console.log('You will tell the truth!');
    }
}
// turn object to JSON data
JSON.stringify(wonderWoman);
// JSON can't do methods, ignores lasso()

JSON.stringify(wonderWoman, null, " ");
// space argument - add newlines between each keypair

Math.PI // The ratio of the circumference and diameter of a circle
// 3.141592653589793
Math.SQRT2 // The square root of 2
// 1.4142135623730951
Math.SQRT1_2 // The reciprocal of the square root of 2
// 0.7071067811865476
Math.E // Euler's constant
// 2.718281828459045
Math.LN2 // The natural logarithm of 2
// 0.6931471805599453
Math.LN10 // The natural logarithm of 10
// 2.302585092994046
Math.LOG2E // Log base 2 of Euler's constant
// 1.4426950408889634
Math.LOG10E // Log base 10 of Euler's constant
// 0.4342944819032518

Math.abs(-4.6); // 4.6
Math.ceil(4.2); // 5
Math.floor(4.2); // 4
Math.round(4.4); // 4
Math.round(4.5); // 5
Math.trunc(4.9); // 4
Math.exp(1); // euler
Math.pow(3, 2) // 9
Math.pow(27, 1 / 3); // 3
Math.sqrt(121); // 11
Math.cbrt(8); // 2 (cube root)
Math.hypot(3, 4); // 5 (square root of (a squared + b squared))
Math.hypot(2, 3, 6); // 7
Math.log(Math.E); // 1
Math.log(1); // 0
Math.log2(8); // 3 (8 is 2^3)
Math.log10(1000000); // 6 (1 million is 10^6)
Math.max(1, 2, 3); // 3
Math.min(1, 2, 3); // 1
Math.sin(Math.PI / 6);
Math.cos(Math.PI / 6);
Math.tan(Math.PI / 4);
Math.asin(1) // arcsine, angle
Math.acos(0.5);
Math.atan(Math.sqrt(3));
// hyperbolic functions: .sinh, .asinh, .cosh, asonh, tanh, atanh
Math.random(); // 0 inc to 1 exc
6 * Math.random();
Math.floor(6 * Math.random);

let today = new Date();
today.toString();

let christmas = new Date('2017 12 25');
let chanukah = new Date('12 December 2017');
let eid = new Date('Sunday, June 25, 2017');
// new Date(year, month, day, hour, minutes, seconds, milliseconds)
let solstice = new Date(2017, 5, 21);
// months, days, etc count from zero instead of 1. 0 = january
let diwali = new Date(1508367600000); // epoch

// getters
diwali.getDay(); // thursday
diwali.getDate(); // 19th
diwali.getMonth(); // october
diwali.getYear(); // 117. y2k broke
diwali.getFullYear(); // 2017
// getHours getMinutes getSeconds getMilliseconds
// UTC variants getUTCHours use UTC instead of local time
diwali.getTime(); // epoch time

// 1 day is 1000 * 60 * 60 * 24 milliseconds
let christmasEve = new Date(christmas.getTime() - 1000 * 60 * 60 * 24)

// diff between local time and UTC
new Date().getTimezoneOffset();

// setters
diwali.setDate(7);
diwali.setMonth(10);
diwali.setFullYear(2018);
// setHours setMinutes setSeconds setMilliseconds and UTC variants

/* Regex */
let pattern = /[a-zA-Z]+ing$/;
// let pattern = new RegExp('a-zA-Z]+ing$');

pattern.test('joke'); // returns boolean
pattern.test('joking');

pattern.exec('joking'); // returns array with first match or null

// g global returns all matches
// i ignoreCase is duh
// m multiline

pattern = /javas/i
pattern.test('JavaScript');
pattern.ignoreCase // is flag active

// js uses normal regex chars and modifiers - . \d {a,b} ^$ etc

let word = 'abracadabra';

let greedyPattern = /a.+a/;
greedyPattern.exec(word); // abracadabra

let lazyPattern = /a.+?a/;
lazyPattern.exec(word); // abra

'Hello World!'.split(/\s+/); // ['Hello', 'World!']
'JavaScript.match(/[aeiou]/);' // ['a']
'JavaScript.match(/[aeiou]/g);' // ['a', 'a', 'i']

"I'm learning JavaScript".search(/java/i); // 13 (position of first match)
// -1 if no match

'JavaScript'.replace(/[aeiou]/ig, '*'); // 'J*v*Scr*pt

// capture groups
let link = "<a href='https://www.sitepoint.com' title='Oh Yeah!'>Awesome Web Resources</a>"
let mdLink = link.replace(/<a href='(.*?)'.*?>(.*?)<\/a>/g, "[$2]($1)");
