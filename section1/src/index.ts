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

const queue = new Queue()

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
type User = { id: string }
type Product = { id: string }

const user: User = { id: 'user-a123' }
const product: Product = { id: 'product-a123' }

type Point2D = { x: number, y: number }
type Point3D = { x: number, y: number, z: number }

let pointA: Point2D = { x: 0, y: 0 }
const pointB: Point3D = { x: 0, y: 0, z: 0 }

// TS allows for extra info, in assignment function params, etc
// Called Duck-Typing (if it walks like a duck...)
// Of course this doesn't work the other way around, because of missing info
pointA = pointB

// Classes
class Animal {
  // private is accessible only within the class
  // protected is accessible from within children as well
  // In both cases attribute is not accessible by the object eg. cat.name
  private readonly name: string

  constructor (name: string) {
    this.name = name
  }

  catch (numOfMice: number): void {
    console.log(`${this.name} caught ${numOfMice} mice!`)
  }
}

const cat = new Animal('Mochi')
cat.catch(10)

// Generics

const numFIFO = new Queue<number>()

queue.push(123)
queue.push('123')
queue.pop()

numFIFO.push(123)
numFIFO.push(22)
// ERR: numFIFO.push('123')
numFIFO.pop()

// any vs. unknown
// universal super types
// any var can be assigned them

// any allows you completely bypass the type system (created for easy migration from js to ts)
// can be used as a boolean even if it's a string
// this decreases type safety

// unknown is different and safer, you can accept anything into an unknown but will not allow unsafe usage
// must match usage type definition
// This can be used as a universal utility, such as when you have a function that must accept any type
