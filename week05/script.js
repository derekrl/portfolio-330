function amIOldEnough(age) {
    debugger;
    if (age < 12) {
        debugger;
        return 'No, sorry.';
    } else if (age < 18) {
        debugger;
        return 'Only if you are accompanied by an adult.';
    } else {
        debugger;
        return 'Yep, come on in!';
    }
}

let error = new Error('Oops, something went wrong');

/**** ERROR TYPES
EvalError
RangeError
ReferenceError
SyntaxError
TypeError
URIError
InternalError

-- Props --
name
message
stack
*/

function squareRoot(number) {
    'use strict';
    if (number < 0) {
        throw new RangeError(`Can't sqrt negative numbers`);
    }
    return Math.sqrt(number);
}

function imaginarySquareRoot(number) {
    'use strict';
    try {
        return String(squareRoot(number));
    } catch (error) {
        return squareRoot(-number) + 'i';
    }
}

// basic test
function itSquareRoots4() {
    return squareRoot(4) === 2;
}
