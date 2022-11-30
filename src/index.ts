/* eslint-disable @typescript-eslint/consistent-type-definitions */
/* eslint-disable @typescript-eslint/no-unused-vars */

/**
 * SECTION 1 - BASICS
 */

// Ensure typescript package is installed
// Initialize typescript config and env with:
// npx tsc --init --rootdir src --outdir lib
// To compile, and watch for changes run:
// npx tsc --watch

import { type } from 'os'
import { printCats } from './utils'

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

// const big: bigint = 24n
// Note that this produces an error in this case
// error TS2737: BigInt literals are not available when targeting lower than ES2020.

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

// Type Assertion
// let str: unknown, but later defined as a string
// const trimmed = (str as string).trim()

// Type Casting
const abc: string = 'abc'
const num = +abc
console.log(num < 7)

// Modules
// see top of file for import
// you can also import all with * as utils and access with utils.printCats
console.log(printCats(10))

// Type declaration
declare const process: any
declare const importantNumber: number
// declarations can be made in a septate *.d.ts file
// definitely typed is an open source type declaration resource
// example usage:
// npm i @types/node will create a declaration file with useful definitions

// Async Await
const delay = async (ms: number): Promise<void> => await new Promise(resolve => setTimeout(resolve, ms))
const spaceJourney = async (): Promise<void> => {
  console.log('Starting our journey though the inner planets...')
  await delay(2000)
  console.log('Hello Mercury')
  await delay(3000)
  console.log('Hello Venus')
  await delay(4000)
  console.log('Hello Earth')
  await delay(1000)
  console.log('and Moon')
  await delay(5000)
  console.log('Hello Mars')
}

void spaceJourney()

/**
 * SECTION 2 - INTERMEDIATE CONCEPTS
 */

// Lexical This

class Person {
  private _age: number
  constructor (_age: number) {
    this._age = _age
  }

  // Setup to produce errors
  // Recall that these methods are invoked on the calling context

  growOld (): void {
    this._age++
  }

  getAge (): number {
    return this._age
  }

  // Better method setup - these arrow functions are lexically scoped
  // arrow functions in js capture this from the surrounding context
  // so 'this' is what ever it is in the constructor
  // Thus both usages below will not produce errors, and we needn't worry about correct usage
  growOld2 = (): void => {
    this._age++
  }

  getAge2 = (): number => {
    return this._age
  }
}

const sharath = new Person(29)
sharath.growOld() // here 'this' is person

// Since js functions are first class they can be stored in a variable
// However doing that in this case means that the function is not called on any object
// Result in losing the calling context of 'this'

// Error case example - here 'this' is undefined when growOld() is called
// const growOld = sharath.growOld()
// growOld()

// However this works
const getAge2 = (): number => sharath.getAge2()
getAge2()

// We would never do this method to variable assignment right?
// 'real-world' example: setTimeout(sharath.growOld, 1000) again loses context of 'this'
// However this works:
setTimeout(sharath.getAge2, 3000)

console.log('On Sharath\'s next birthday he will be aged: ', sharath.getAge())

// readonly modifiers
// Note: compile time feature

type unmodifiablePoint = {
  readonly x: number
  readonly y: number
}

const point: unmodifiablePoint = {
  x: 0,
  y: 0
}

class UnmodifiableAnimal {
  // readonly can be combined with other class access modifiers
  public readonly name: string
  constructor (name: string) {
    this.name = name
  }
}

const sheep = new UnmodifiableAnimal('black sheep')
console.log(sheep.name)
// yet we disallow sheep.name = 'wolf in sheep's clothing'

// Union Types

// Use pipe to create a union type
// padding: unknown is the naive approach
// this way we catch any incorrect usage as a compile time error

type PaddingUnionType =
  | number // initial pipe can be used for readability and has no impact
  | string // can be split into multiple lines

function padLeft (input: string, padding: PaddingUnionType): string {
  if (typeof padding === 'number') {
    return Array(padding + 1).join(' ') + input
  }
  if (typeof padding === 'string') {
    return padding + input
  }
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  throw new Error(`Expected number or string, got '${padding}'.`)
}
padLeft('tabbed text', 4)
padLeft('big space', '              ')

// Literal Types
let direction: 'North' | 'East' | 'South' | 'West'

direction = 'North'
// direction = 'n0r7h'
direction = 'South'

type DiceValues = 1 | 2 | 3 | 4 | 5 | 6
function rollDice (): DiceValues {
  return (Math.floor(Math.random() * 6) + 1) as DiceValues
}
console.log('rolled dice: ', rollDice())

// Type Narrowing
class Cat {
  meow (): void {
    console.log('mew')
  }
}

class Dog {
  bark (): void {
    console.log('woof')
  }
}

type FourLeggedAnimal = Cat | Dog

function speak (animal: FourLeggedAnimal): void {
  if (animal instanceof Cat) {
    animal.meow()
  }
  if (animal instanceof Dog) {
    animal.bark()
  }
}

const mochi = new Cat()
speak(mochi)

// Discriminated Unions
type Square = {
  kind: 'square'
  size: number
}

type Rectangle = {
  kind: 'rectangle'
  width: number
  height: number
}

type Circle = {
  kind: 'circle'
  radius: number
}

type Triangle = {
  kind: 'triangle'
  base: number
  height: number
}

type Shape =
  | Square
  | Rectangle
  | Circle
  | Triangle

function area (shape: Shape): number {
  // typescript can infer the shape's properties if you hover over each value
  if (shape.kind === 'square') return shape.size * shape.size
  if (shape.kind === 'rectangle') return shape.width * shape.height
  if (shape.kind === 'circle') return 2 * Math.PI * shape.radius
  if (shape.kind === 'triangle') return 0.5 * shape.base * shape.height

  return 0
}
