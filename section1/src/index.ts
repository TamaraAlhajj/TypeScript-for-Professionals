let msg: string = 'Hello world';
msg += ' again';
console.log(msg);

// Primitives
let isPresent: boolean = false;
let magic: number = 66.6;
let hello: string = 'world';

let notDefined: undefined = undefined;
let notPresent: null = null;

let penta: symbol = Symbol('star');
let big: bigint = 24n;

// Instance Types
let regexp: RegExp = new RegExp('ab+c')
let array: Array<number> = [1,2,3];
let set: Set<number> = new Set(array);

class Queue<T> {
    
}