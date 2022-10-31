"use strict";
/* eslint-disable @typescript-eslint/consistent-type-definitions */
/* eslint-disable @typescript-eslint/no-unused-vars */
Object.defineProperty(exports, "__esModule", { value: true });
let msg = 'Hello world';
msg += ' again';
console.log(msg);
// Primitives
const isPresent = false;
const magic = 66.6;
const hello = 'world';
let notDefined;
const notPresent = null;
const penta = Symbol('star');
const big = 24n;
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
// Arrays
let arr = [1, 2, 3];
arr = [1];
arr = [1, 2, 3, 4, 5, 6];
// Type error example: arr = ['hello']
// Tuples
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
// TS allows modification of const variable properties
unit.x = 5;
center.y = 5;
// Functions
function add(a, b) {
    return a + b;
}
function log(message) {
    console.log('LOG: ', message);
}
// handling rest params
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
// Called Duck-Typing (if it walks like a duck...)
// Of course this doesn't work the other way around, because of missing info
pointA = pointB;
// Classes
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
// Generics
const numFIFO = new Queue();
queue.push(123);
queue.push('123');
queue.pop();
numFIFO.push(123);
numFIFO.push(22);
// ERR: numFIFO.push('123')
numFIFO.pop();
// any vs. unknown
// universal super types
// any var can be assigned them
// any allows you completely bypass the type system (created for easy migration from js to ts)
// can be used as a boolean even if it's a string
// this decreases type safety
// unknown is different and safer, you can accept anything into an unknown but will not allow unsafe usage
// must match usage type definition
// This can be used as a universal utility, such as when you have a function that must accept any type
