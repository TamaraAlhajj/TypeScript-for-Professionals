/* eslint-disable @typescript-eslint/consistent-type-definitions */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { createDebuggerStatement } from 'typescript'

let msg: string = 'Hello world'
msg += ' again'
console.log(msg)

// Primitives
const isPresent: boolean = false
const magic: number = 66.6
const hello: string = 'world'

let notDefined: undefined
const notPresent: null = null

const penta: symbol = Symbol('star')
const big: bigint = 24n

// Instance Types
const regexp: RegExp = /ab+c/
const array: number[] = [1, 2, 3]
const set: Set<number> = new Set(array)

class Queue<T> {
  private readonly data: T[] = []
  push (item: T): void { this.data.push(item) }
  pop (): T | undefined { return this.data.shift() }
}

const queue: Queue<number> = new Queue()

// Arrays
let arr: number[] = [1, 2, 3]

arr = [1]
arr = [1, 2, 3, 4, 5, 6]
// Type error example: arr = ['hello']

// Tuples
let tuple1: [number, string]
let tuple2: [number, number]

tuple1 = [1, '2']
tuple2 = [1, 2]

tuple1 = [4, 'random']
tuple2 = [0, 0]

// Err tuple1 = [1,2];
// Err tuple2 = [1,'2'];
// Err tuple2 = [1,2,3];

// Object types and type aliases
type Point = { x: number, y: number }
const center: Point = {
  x: 0,
  y: 0
}

const unit: Point = {
  x: 1,
  y: 1
}

// TS allows modification of const variable properties
unit.x = 5
center.y = 5

// Functions
function add (a: number, b: number): number {
  return a + b
}

function log (message: string): void {
  console.log('LOG: ', message)
}

// handling rest params
function sum (...values: number[]): number {
  return values.reduce((previous, current) => {
    return previous + current
  })
}

sum(1, 2, 3, 4, 5)

// First class functions (stored func in js variable)

type Addition = (...values: number[]) => number
let getSum: Addition
getSum = (a: number, b: number) => a + b
getSum = (a: number, b: number, c: number) => a + b + c

// Structural Typing
