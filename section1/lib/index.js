"use strict";
let msg = 'Hello world';
msg += ' again';
console.log(msg);
// Primitives
let isPresent = false;
let magic = 66.6;
let hello = 'world';
let notDefined = undefined;
let notPresent = null;
let penta = Symbol('star');
let big = 24n;
// Instance Types
let regexp = new RegExp('ab+c');
let array = [1, 2, 3];
let set = new Set(array);
class Queue {
}
