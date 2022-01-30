const Dice1 = function (sides = 6) {
    this.sides = sides;
    this.roll = function () {
        return Math.floor(this.sides * Math.random() + 1)
    }
}

/*
let redDice = new Dice();
redDice instanceof Dice
redDice.sides
redDice.roll()
redDice.constructor // Function: Dice
let greenDice = new redDice.constructor(); // still Dice
*/

/*
const literalObject = {}; // easiest way
constructedObject = new Object{};
literalObject instanceof Object; // true
const literalArray = [1,2,3]; // easiest way
constructedArray = new Array(1,2,3); // avoid
constructedArray = new Array(1.5); // because it creates arrays of given length and fails
*/

// constructor functions and classes generally capitalized
// this is ES6 way, preferred over previous
// caveat: needs to be called with new eg. new Dice2()
class Dice2 {
    constructor(sides = 6) {
        this.sides = sides;
    }

    roll() {
        return Math.floor(this.sides * Math.random() + 1);
    }

    static description() {
        return 'A way of choosing random numbers';
    }
    // static methods not available to instances eg. redDice
}

/*
class Turtle {
    constructor(name) {
        this.name = name;
    }
    sayHi() {
        return `Hi dude, my name is ${this.name}`;
    }
}
*/

class Turtle {
    constructor(name, color) {
        this.name = name;
        // _private value. need to use getter/setter
        let _color = color;
        this.setColor = (color) => {
            if (typeof color === 'string') {
                return _color = color;
            } else {
                throw new Error('Color must be a string');
            }
        }
        this.getColor = () => _color;
    }
}

// Prototype: change things at runtime
// changes made apply to all objects of class, even those already existing

const leo = new Turtle('Leonardo');
Turtle.prototype.weapon = 'Hands';
Turtle.prototype.attack = function () {
    return `Feel the power of my ${this.weapon}!`;
}
const raph = new Turtle('Raphael');
raph.attack();

raph.constructor.prototype
Object.getPrototypeOf(raph) // recommended
raph.__proto__ // works but no

Turtle.prototype.isPrototypeOf(raph) // true

const don = new Turtle('Donatello');

// properties declared in prototypes apply the same to all prototypes, only exist once in memory
Turtle.prototype.weapon = 'Feet';
// now they all attack with feet if not explicitly declared as own property
leo.weapon = 'Katana Blades';
raph.weapon = 'Sai';
don.weapon = 'Bo Staff';

Turtle.prototype.food = 'Pizza';
Turtle.prototype.eat = function () {
    return 'Mmm, this ${this.food} tastes great!';
}

const mike = new Turtle('Michelangelo');
mike.eat();
mike.weapon = 'Nunchakus';
mike.attack();

raph2 = new Turtle('Raphael','Red');
raph2.getColor(); // red
