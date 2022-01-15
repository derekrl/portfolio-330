const quiz = [
    ["What is Superman's real name?", "Clark Kent"],
    ["What is Wonder Woman's real name?", "Diana Prince"],
    ["What is Batman's real name?", "Bruce Wayne"]
];
function start(quiz) {
    let score = 0;
    // main game loop
    for (const [question, answer] of quiz) {
        const response = ask(question);
        check(response, answer);
    }
    // end of main game loop
    gameOver();

    function ask(question) {
        return prompt(question);
    }

    function check(response, answer) {

        if (response === answer) {
            alert('Correct!');
            score++;
        } else {
            alert(`Wrong! The correct answer was ${answer}`);
        }
    }

    function gameOver() {
        alert(`Game Over, you scored ${score} point${score !== 1 ? 's' : ''} `);
    }
}

function quizNinja() {
    start(quiz);
}

/**** Chapter 2 ****/

let scope1 = 'larger';
{ scope1 = 'now both smaller'; console.log(scope1); }
// no let, uses existing
console.log(scope1);

let scope2 = 'larger';
{ let scope2 = 'only this one smaller'; console.log(scope2); }
// with let, creates new
console.log(scope2);

{ scope3 = 'defined within block'; }
// no let on new variable, global scope
console.log(scope3);

{ let scope4 = 'string'; }
// with let, local, doesn't exist outside
// console.log(scope4);

function chap2() {
    const message = 'hello world!';
    // alert(message);

    console.log(typeof 'word');
    console.log(typeof 9786);
    console.log(typeof true);
    console.log(typeof { ninja: 'turtle' });
    console.log(typeof [1, 2, 3]);

    console.log(typeof message);

    let x = 3, y = 4, z = 5;
    x = 2;

    // const name1 = 'Alexa';
    // name1 = 'Siri';

    const name2 = { value: 'Alexa' };
    name2.value = 'Siri';

    // valid variable names
    $name = 'test'; // $ used by jquery, prob avoid
    _answer = 'answer'; // underscore generally referrs to private
    firstName = 'joe'; // camelCase good
    last_name = 'who';
    address_line1 = '100 Main St';

    const name3 = 'Bluh';
    `Hello ${name3}!`;

    Number('789');
    String(456);
    123..toString();
    256..toString(2); // binary. 8 octal, 16 hex, etc
    parseInt('1010', 2);
    // parseint works until it sees a letter and stops
    // Number errors the whole thing if it finds a letter

}

/**** Chapter 4 - Functions ****/

const goodbye = function () {
    console.log('Goodbye world!');
};
// semicolon because this is just an assignment statement with extra steps

// specify name
const goodbye1 = function bye() {
    console.log('Goodbye world!');
};

// variable number of parameters
// ... converts jank list to array
function mean(...values) {
    let total = 0;
    for (const value of values) {
        total += value;
    }
    return total / values.length;
}

// set default value for param
// params with default values last
function discout(price, amount = 10) {
    return price * (100 - amount) / 100;
}

// these do the same thing
function square(x) {
    return x * x;
}
const arrsquare = x => x * x;

// multiple params = parentheses
const arradd = (x, y) => x + y;
// no params = also parentheses
const arrhello = () => alert('Hello world!');
// just do parentheses
const tax = (salary) => {
    let taxable = salary - 8000;
    let lowerRate = .25 * taxable;
    taxable -= 20000;
    let higherRate = .4 * taxable;
    return lowerRate + higherRate;
}

// hoisting: functions are automatically at top of scope
// no need to arrange functions towards top

// variables declared by var
var specialName = "Joe";
// go to top of scope
// assignment not hoisted
// as confusing and unnecessary as it sounds. just plan ahead


// callback
function sing(song, callback) {
    console.log(`I'm singing along to ${song}`);
    callback();
}
function dance() {
    console.log("I'm moving my body to the groove");
}

// sing('Let it go', dance );
// sing('Let it go', ()=>{console.log("We're getting funky now")} );

// callback custom sorter
function numerically(a, b) {
    return a - b;
}
// > [1,3,12,5,23,18,7].sort(numerically);

// avoid over/underflows, subtractions can pile up in edge cases
// function numerically(a, b) {
//     if (a < b) {
//         return -1;
//     } else if (a > b) {
//         return 1;
//     } else {
//         return 0;
//     }
// }


const colors = ['Red', 'Green', 'Blue']

// for (let i=0, max=colors.length; i<max; i++) {
//     console.log(`Color at position ${i} is ${colors[i]}`);
// }
colors.forEach((color, index) =>
    console.log(`Color at position ${index} is ${color}`)
);

// map: iterate all. also takes arrow functions
[1, 2, 3].map(square);
[1, 2, 3].map(x => 2 * x);

['red', 'green', 'blue'].map(color => `<p>${color.toUpperCase()}</p>`);

// up to three params: array item, iter index, array itself
['red', 'green', 'blue'].map((color, index, array) =>
    `Element ${index} is ${color}. There are ${array.length} items in total.`);

// reduce: iterate into one value
// params: array item, starting amount
function reduce1() {
    return [1, 2, 3, 4, 5].reduce((acc, val) => acc + val);
}
function reduce2() {
    return [1, 2, 3, 4, 5].reduce((acc, val) => acc + val, 10);
}

let words = ['The', 'quick', 'brown', 'fox', 'jumped', 'over', 'the', 'lazy', 'dog'];
const total = words.reduce((acc, word) => acc + word.length, 0);
const average = total / words.length;

// filter: keep if true in callback
const numbers = [2, 7, 6, 5, 11, 23, 12];
numbers.filter(x => x % 2 === 0);

const array = [0, 1, '0', false, true, 'hello'];
array.filter(Boolean);
array.filter(x => !x); // falsy values

// these can be chained just in case it wasn't already enough of a mess
[1, 2, 3].map(x => x * x).reduce((acc, x) => acc + x); // returns 14

// function mean2(array) {
//     const total = array.reduce((a, b) => a + b);
//     return total / array.length;
// }
function mean3(array, callback) {
    if (callback) {
        console.log("callback");
        // array.map(callback);
        // book stupid. map creates a new array, does not modify
        array = array.map(callback);
    }
    const total = array.reduce((a, b) => a + b);
    return total / array.length;
}
// > mean2( [1,2,3] );
// > mean2( [1,2,3], x=>x*2 );
