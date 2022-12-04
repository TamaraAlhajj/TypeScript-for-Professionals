"use strict";
/* eslint-disable import/export */
/**
 * Typescript course code and notes
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const utils_1 = require("./utils");
// Basic Intro //
let msg = 'Hello world';
msg += ' again';
console.log(msg);
// Primitives //
const isPresent = false;
const magic = 66.6;
const hello = 'world';
let notDefined;
const notPresent = null;
const penta = Symbol('star');
// const big: bigint = 24n
// Note that this produces an error in this case
// error TS2737: BigInt literals are not available when targeting lower than ES2020.
// Instance Types
const regexp = /ab+c/;
const array = [1, 2, 3];
const set = new Set(array);
class Queue {
    constructor() {
        this.data = [];
    }
    push(item) { this.data.push(item); }
    pop() { return this.data.shift(); }
}
const queue = new Queue();
// Arrays //
let arr = [1, 2, 3];
arr = [1];
arr = [1, 2, 3, 4, 5, 6];
// Type error example: arr = ['hello']
// Tuples //
let tuple1;
let tuple2;
tuple1 = [1, '2'];
tuple2 = [1, 2];
tuple1 = [4, 'random'];
tuple2 = [0, 0];
const center = {
    x: 0,
    y: 0
};
const unit = {
    x: 1,
    y: 1
};
// JS and thus TS allow for modification of const variable properties
unit.x = 5;
center.y = 5;
// Functions //
function add(a, b) {
    return a + b;
}
function log(message) {
    console.log('LOG: ', message);
}
// handling rest params must be with array types
function sum(...values) {
    return values.reduce((previous, current) => {
        return previous + current;
    });
}
sum(1, 2, 3, 4, 5);
let getSum;
getSum = (a, b) => a + b;
getSum = (a, b, c) => a + b + c;
const user = { id: 'user-a123' };
const product = { id: 'product-a123' };
let pointA = { x: 0, y: 0 };
const pointB = { x: 0, y: 0, z: 0 };
// TS allows for extra info, in assignment function params, etc
// Called Duck-Typing (if it walks like a duck, talks like a duck...)
// Of course this doesn't work the other way around, because of missing info
pointA = pointB;
// Classes //
class Animal {
    constructor(name) {
        this.name = name;
    }
    catch(numOfMice) {
        console.log(`${this.name} caught ${numOfMice} mice!`);
    }
}
const cat = new Animal('Mochi');
cat.catch(10);
// Generics //
const numFIFO = new Queue();
queue.push(123);
queue.push('123');
queue.pop();
numFIFO.push(123);
numFIFO.push(22);
// ERR: numFIFO.push('123')
numFIFO.pop();
// any vs. unknown //
// universal super types
// any var can be assigned them
// any allows you completely bypass the type system (created for easy migration from js to ts)
// can be used as a boolean even if it's a string
// this decreases type safety
// unknown is different and safer, you can accept anything into an unknown but will not allow unsafe usage
// must match usage type definition
// This can be used as a universal utility, such as when you have a function that must accept any type
// Type Assertion //
// let str: unknown, but later defined as a string
// const trimmed = (str as string).trim()
// Type Casting //
const abc = 'abc';
const num = +abc;
console.log(num < 7);
// Modules //
// see top of file for import
// you can also import all with * as utils and access with utils.printCats
console.log((0, utils_1.printCats)(10));
// declarations can be made in a septate *.d.ts file
// definitely typed is an open source type declaration resource
// example usage:
// npm i @types/node will create a declaration file with useful definitions
// Async Await //
const delay = (ms) => __awaiter(void 0, void 0, void 0, function* () { return yield new Promise(resolve => setTimeout(resolve, ms)); });
const spaceJourney = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Starting our journey though the inner planets...');
    yield delay(2000);
    console.log('Hello Mercury');
    yield delay(3000);
    console.log('Hello Venus');
    yield delay(4000);
    console.log('Hello Earth');
    yield delay(1000);
    console.log('and Moon');
    yield delay(5000);
    console.log('Hello Mars');
});
void spaceJourney();
/**
 * SECTION 2 - INTERMEDIATE CONCEPTS
 */
// Lexical This //
class Person {
    constructor(_age) {
        // Better method setup - these arrow functions are lexically scoped
        // arrow functions in js capture this from the surrounding context
        // so 'this' is what ever it is in the constructor
        // Thus both usages below will not produce errors, and we needn't worry about correct usage
        this.growOld2 = () => {
            this._age++;
        };
        this.getAge2 = () => {
            return this._age;
        };
        this._age = _age;
    }
    // Setup to produce errors
    // Recall that these methods are invoked on the calling context
    growOld() {
        this._age++;
    }
    getAge() {
        return this._age;
    }
}
const sharath = new Person(29);
sharath.growOld(); // here 'this' is person
// Since js functions are first class they can be stored in a variable
// However doing that in this case means that the function is not called on any object
// Result in losing the calling context of 'this'
// Error case example - here 'this' is undefined when growOld() is called
// const growOld = sharath.growOld()
// growOld()
// However this works
const getAge2 = () => sharath.getAge2();
getAge2();
// We would never do this method to variable assignment right?
// 'real-world' example: setTimeout(sharath.growOld, 1000) again loses context of 'this'
// However this works:
setTimeout(sharath.getAge2, 3000);
console.log('On Sharath\'s next birthday he will be aged: ', sharath.getAge());
const point = {
    x: 0,
    y: 0
};
class UnmodifiableAnimal {
    constructor(name) {
        this.name = name;
    }
}
const sheep = new UnmodifiableAnimal('black sheep');
console.log(sheep.name);
function padLeft(input, padding) {
    if (typeof padding === 'number') {
        return Array(padding + 1).join(' ') + input;
    }
    if (typeof padding === 'string') {
        return padding + input;
    }
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    throw new Error(`Expected number or string, got '${padding}'.`);
}
padLeft('tabbed text', 4);
padLeft('big space', '              ');
// Literal Types //
let direction;
direction = 'North';
// direction = 'n0r7h'
direction = 'South';
function rollDice() {
    return (Math.floor(Math.random() * 6) + 1);
}
console.log('rolled dice: ', rollDice());
// Type Narrowing //
// Example using a union type and narrowing with instanceof
class Cat {
    meow() {
        console.log('mew');
    }
}
class Dog {
    bark() {
        console.log('woof');
    }
}
function speak(animal) {
    if (animal instanceof Cat) {
        animal.meow();
    }
    if (animal instanceof Dog) {
        animal.bark();
    }
}
const mochi = new Cat();
speak(mochi);
function area(shape) {
    // Discriminating by kind, typescript can infer the shape's properties
    // See this by hovering over each value
    if (shape.kind === 'square')
        return shape.size * shape.size;
    if (shape.kind === 'rectangle')
        return shape.width * shape.height;
    if (shape.kind === 'circle')
        return 2 * Math.PI * shape.radius;
    if (shape.kind === 'triangle')
        return 0.5 * shape.base * shape.height;
    return 0;
}
// Class Parameter Properties //
// Remove redundant variables within classes by using class access modifiers
// With Public, Private, or Protected we create these variables for use in the instance
// So we can declare them as properties simply with the modifiers
// Rather than setting this.name = to the passed name etc.
class Angel {
    constructor(name, fallen) {
        this.name = name;
        this.fallen = fallen;
    }
}
const gabriel = new Angel('Gabriel', false);
const lucifer = new Angel('Lucifer', true);
console.log('Angel: %s, Has Fallen: %s', gabriel.name, gabriel.fallen);
console.log('Angel: %s, Has Fallen: %s', lucifer.name, lucifer.fallen);
// Strict Compiler Option //
// strict is actually a collection of options in the tsconfig
// by default true
// Some consequences of setting to false
// No compile time errors...
// for unprovided type annotations, instead infers type any
// instances initialized without member properties
// when we try to access properties of a variable that may or may not exists
// false - dynamic
// true - type safety
// null vs undefined
function logVowels(value) {
    return (value.match(/[aeiou]/gi));
}
logVowels('hello'); // returns array with 2 vowels found
logVowels('sky'); // returns null
const myClient1 = {
    name: 'Eve',
    address: 'taylor@email.com',
    number: 123456789,
    hasPurchased: true
};
// Optional modifiers //
// members with a '?'
// undefined is automatically set as possible value of an optional modified
// so you can set it explicitly to undefined
// you cannot set it to null however, that must be an explicit type declaration
const myClient2 = {
    name: 'Layla',
    number: 123456789,
    hasPurchased: true
};
const dinnerTable = {
    wood: 'hard',
    legs: 4,
    painted: false
};
// our app merges both definitions
function handleRequest(req) {
    console.log(req.body);
    console.log(req.json);
}
// Types vs Interfaces //
// types can extract types into type aliases
// interfaces do not support this, so in these cases you need to use types
// Tip: you can get away with almost always defaulting to types...
// ...except for specific cases like declaration merging
// usage of types can enforce structure for better code for consistency
// never type //
// can be used for function that will never (should never) return something
const fail = (message) => {
    throw new Error(message);
};
// only never can be assigned to never
let _ensureAllCasesAreCovered;
// _ensureAllCasesAreCovered = someUnhandledInput; will error out in a function
// you can use this to make functions more easily iterable, factorable, or added to
/**
 * SECTION 3 - ADVANCED CONCEPTS
 */
// implements keyword //
// same as js...
// eg Cat implements Animal, all functions in Animal must be in Cat
// Definite Assignment Assertion //
// exclamation mark can be used before assignment
// as seen before, we again should be careful to ensure that it will indeed exist
let primaryColor;
function randPrimaryColor() {
    const index = (0, crypto_1.randomInt)(2);
    const colors = ['red', 'blue', 'yellow'];
    primaryColor = colors[index];
}
randPrimaryColor();
function isFlower(plant) {
    return plant.scent !== undefined;
}
function isTree(plant) {
    return plant.wood !== undefined;
}
function plantsInMyGarden(plant) {
    if (isFlower(plant))
        return plant.scent;
    if (isTree(plant))
        return plant.wood;
    const _ensure = plant;
    return _ensure;
}
// Assertion Functions //
function exists(person, message) {
    if (typeof person !== 'string')
        throw Error('I am not'); // redundant
    else
        console.log(`${person} says: ${message}, therefore I am`);
}
const maybePerson = 'Rene';
exists(maybePerson, 'I think');
function overloaded(string) { }
overloaded('str');
// Abstract Classes //
class Command {
    execute() {
        console.log('Executing: ', this.cmd());
    }
}
class GitUndoCommand extends Command {
    cmd() {
        return ('git reset --soft HEAD~1');
    }
}
const menu = {
    tabouleh: { name: 'Tabouleh', type: 'mezza' },
    waraq: { name: 'Waraq 3ineb', type: 'mezza' },
    koubeh: { name: 'Koubeh', type: 'mezza' },
    maqloubeh: { name: 'Maqloubeh ma3 La7meh', type: 'main' },
    knaffeh: { name: 'Knaffeh', type: 'dessert' }
};
const employeeIndex = {
    123: { name: 'Sally Hans' },
    478: { name: 'Mary Magdalene' },
    305: { name: 'Doris Day' },
    278: { name: 'Layla Mourad' }
};
// without readonly here, the input array is overridden with the operations
function reverseSorted(input) {
    return input.slice().sort((a, b) => a - b).reverse();
}
const start = [101, 21, 5, 2, 9, 13, 10, 3894, 83, 13948, 11, 3];
const end = reverseSorted(start);
console.table({ start, end });
// Double Assertion //
// Avoid and use with caution
// Could be helpful in migrating some js code
let point2 = { x: 0, y: 0 };
let point3 = { x: 0, y: 0, z: 0 };
const dish = { name: 'Stew,', type: 'main' };
point2 = point3; // structure of 2D is a subset of 3D so this is allowed
// point3 = point2
// z axis is missing in 2D type, 3D cannot be contained in 2D
// not allowed, error
point3 = point2; // tells ts to trust us
// dish = point3 // Error
// point3 = dish // Error
// point3 = dish as Point3D // Error
// ts finds the difference to great, and tells us this may be a mistake
point3 = dish; // tells ts to trust us
// Why? unknown is allowed one-way compatibility with all types
// const Assertion //
// Technique to increase type safety of objects
// All obj members are inferred to be readonly
const ruler = {
    name: 'Sargon',
    empire: 'Akkadian'
};
// here empire is not type string but rather the literal value 'Akkadian'
const goddess = {
    name: 'Ishtar',
    empire: 'Akkadian'
};
// still mutable
goddess.name = 'Inanna';
// this parameter //
// calling context
// obj implicitly passed by the js runtime
// dependent on how it is invoked
// ts supports annotating what this should be
// must be the first param within the fc declaration
// it is a fake param and not part of the generated js
// only used for compile time checking
function double() {
    return this.value * 2;
}
const valid = {
    value: 3,
    double
};
const invalid = {
    valve: 3,
    double
};
valid.double();
// invalid.double()
console.log('double value on calling context: ', valid.double());
// Generic Constraints //
// <T extends someOtherType>
// T & {name: string}
/**
 * SECTION 4 - EXPERT (✿◠‿◠)
 */
// typeof Type Operator //
// Useful for js migration
const refactoredVariable = {
    originalMember: 0,
    newMember: 0
};
const preExistingCode = {
    originalMember: 4,
    newMember: 5
};
const apiResponse = {
    data: 'stuff',
    user: {
        id: 123,
        email: 'blah@email.com'
    },
    pull_requests: {
        open: 2,
        merged: 101,
        closed: 4
    }
};
// new type out of given structure
function getOpenPRs(res) {
    return res.pull_requests.open;
}
const weatherToday = {
    UV: 'low',
    humidity: '63 %',
    wind: '32 km/h',
    temp: -2
};
// 2 different approaches
// we can use these approaches for any function, in this case a getter
// explicit typing
function getWeatherDetail(obj, key) {
    return obj[key];
}
// more abstract
function getWeatherDetailAgain(obj, key) {
    return obj[key];
}
const todaysUV = getWeatherDetail(weatherToday, 'UV');
const todaysTemp = getWeatherDetailAgain(weatherToday, 'temp');
// const fakeMember = getWeatherDetailAgain(weatherToday, 'fake')
console.log({ todaysUV, todaysTemp });
// Mapped Types //
// Mapped type modifiers //
// Template Literal Type //
/**
 * Section 5 - SUPER ᕙ(`▿´)ᕗ
 */
