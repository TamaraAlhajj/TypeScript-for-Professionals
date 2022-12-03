/* eslint-disable import/export */
/**
 * Typescript course code and notes
 */

/* eslint-disable @typescript-eslint/consistent-type-definitions */
/* eslint-disable @typescript-eslint/no-unused-vars */

/**
 * SECTION 1 - BASICS
 */

// Setup //
// Ensure typescript package is installed
// Initialize typescript config and env with:
// npx tsc --init --rootdir src --outdir lib
// To compile, and watch for changes run:
// npx tsc --watch

// some imports needed throughout course
import { assert } from 'console'
import { randomInt } from 'crypto'
import { type } from 'os'
import { emit } from 'process'
import { printCats } from './utils'

// Basic Intro //
let msg: string = 'Hello world'
msg += ' again'
console.log(msg)

// Primitives //
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

// Arrays //
let arr: number[] = [1, 2, 3]

arr = [1]
arr = [1, 2, 3, 4, 5, 6]
// Type error example: arr = ['hello']

// Tuples //
let tuple1: [number, string]
let tuple2: [number, number]

tuple1 = [1, '2']
tuple2 = [1, 2]

tuple1 = [4, 'random']
tuple2 = [0, 0]

// Err tuple1 = [1,2];
// Err tuple2 = [1,'2'];
// Err tuple2 = [1,2,3];

// Object types and type aliases //
type Point = { x: number, y: number }
const center: Point = {
  x: 0,
  y: 0
}

const unit: Point = {
  x: 1,
  y: 1
}

// JS and thus TS allow for modification of const variable properties
unit.x = 5
center.y = 5

// Functions //
function add (a: number, b: number): number {
  return a + b
}

function log (message: string): void {
  console.log('LOG: ', message)
}

// handling rest params must be with array types
function sum (...values: number[]): number {
  return values.reduce((previous, current) => {
    return previous + current
  })
}

sum(1, 2, 3, 4, 5)

// First class functions //
// Simply a stored func in js variable
// arrow functions

type Addition = (...values: number[]) => number
let getSum: Addition
getSum = (a: number, b: number) => a + b
getSum = (a: number, b: number, c: number) => a + b + c

// Structural Typing //
type User = { id: string }
type Product = { id: string }

const user: User = { id: 'user-a123' }
const product: Product = { id: 'product-a123' }

type Point2D = { x: number, y: number }
type Point3D = { x: number, y: number, z: number }

let pointA: Point2D = { x: 0, y: 0 }
const pointB: Point3D = { x: 0, y: 0, z: 0 }

// TS allows for extra info, in assignment function params, etc
// Called Duck-Typing (if it walks like a duck, talks like a duck...)
// Of course this doesn't work the other way around, because of missing info
pointA = pointB

// Classes //
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

// Generics //
const numFIFO = new Queue<number>()

queue.push(123)
queue.push('123')
queue.pop()

numFIFO.push(123)
numFIFO.push(22)
// ERR: numFIFO.push('123')
numFIFO.pop()

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
const abc: string = 'abc'
const num = +abc
console.log(num < 7)

// Modules //
// see top of file for import
// you can also import all with * as utils and access with utils.printCats
console.log(printCats(10))

// Type declaration //
declare const process: any
declare const importantNumber: number
// declarations can be made in a septate *.d.ts file
// definitely typed is an open source type declaration resource
// example usage:
// npm i @types/node will create a declaration file with useful definitions

// Async Await //
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

// Lexical This //

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

// readonly modifiers //
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

// Union Types //

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

// Literal Types //
let direction: 'North' | 'East' | 'South' | 'West'

direction = 'North'
// direction = 'n0r7h'
direction = 'South'

type DiceValues = 1 | 2 | 3 | 4 | 5 | 6
function rollDice (): DiceValues {
  return (Math.floor(Math.random() * 6) + 1) as DiceValues
}
console.log('rolled dice: ', rollDice())

// Type Narrowing //
// Example using a union type and narrowing with instanceof
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

// Discriminated Unions //
// Take multiple types with a shared member, in this case kind
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
  // Discriminating by kind, typescript can infer the shape's properties
  // See this by hovering over each value
  if (shape.kind === 'square') return shape.size * shape.size
  if (shape.kind === 'rectangle') return shape.width * shape.height
  if (shape.kind === 'circle') return 2 * Math.PI * shape.radius
  if (shape.kind === 'triangle') return 0.5 * shape.base * shape.height

  return 0
}

// Class Parameter Properties //
// Remove redundant variables within classes by using class access modifiers
// With Public, Private, or Protected we create these variables for use in the instance
// So we can declare them as properties simply with the modifiers
// Rather than setting this.name = to the passed name etc.
class Angel {
  constructor (
    public name: string,
    public fallen: boolean
  ) {}
}

const gabriel = new Angel('Gabriel', false)
const lucifer = new Angel('Lucifer', true)

console.log('Angel: %s, Has Fallen: %s', gabriel.name, gabriel.fallen)
console.log('Angel: %s, Has Fallen: %s', lucifer.name, lucifer.fallen)

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

function logVowels (value: string): string[] | null {
  return (value.match(/[aeiou]/gi))
}

logVowels('hello') // returns array with 2 vowels found
logVowels('sky') // returns null

// truthy statements
// null == null
// undefined == undefined
// undefined == null ***

// falsy statements
// '' == null
// 0  == null
// false == null

// So we can use double equals to filter out both null and undefined

// Intersection types //

type Client = {
  name: string
}

type Email = {
  address?: string
}

type Phone = {
  number: number
}

type ContactDetails = Client & Email & Phone & {
  hasPurchased: boolean
}

const myClient1: ContactDetails = {
  name: 'Eve',
  address: 'taylor@email.com',
  number: 123456789,
  hasPurchased: true
}

// Optional modifiers //
// members with a '?'
// undefined is automatically set as possible value of an optional modified
// so you can set it explicitly to undefined
// you cannot set it to null however, that must be an explicit type declaration

const myClient2: ContactDetails = {
  name: 'Layla',
  number: 123456789,
  hasPurchased: true
}

// Non-null Assertion Operator //
// postfix exclamation mark
// myClient!.email
// then it is up to you as the dev to ensure that the assertion is indeed not null
// this is not a type safe practice, better to refactor and throw error if null

// Interfaces //
// type vs interface - mostly allowed to do the same things
// types operate on assignment similar to setting a variable
// interfaces operate on body block similar to a js class

// extracted type alias, by using vs code lightbulb
type availableWoodTypes = null | 'soft' | 'hard'

interface Furniture {
  wood: availableWoodTypes
  legs: 0 | 3 | 4
  painted: boolean
}

const dinnerTable: Furniture = {
  wood: 'hard',
  legs: 4,
  painted: false
}

// Interface Declaration Merging //
// not supported by types

export interface Request {
  body: any
}

export interface Request {
  json: any
}

// our app merges both definitions
function handleRequest (req: Request): void {
  console.log(req.body)
  console.log(req.json)
}

// Types vs Interfaces //
// types can extract types into type aliases
// interfaces do not support this, so in these cases you need to use types
// Tip: you can get away with almost always defaulting to types...
// ...except for specific cases like declaration merging
// usage of types can enforce structure for better code for consistency

// never type //

// can be used for function that will never (should never) return something
const fail = (message: string): never => {
  throw new Error(message)
}

// only never can be assigned to never
let _ensureAllCasesAreCovered: never
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
let primaryColor!: string

function randPrimaryColor (): void {
  const index = randomInt(2)
  const colors = ['red', 'blue', 'yellow']
  primaryColor = colors[index]
}

randPrimaryColor()

// User Defined Type Guards //
// function that uses the patten "input is of type x" and returns boolean

type Flower = {
  species: string
  scent: 'sweet' | 'spicy' | 'pungent' | 'light'
  color: 'red' | 'pink' | 'white' | 'yellow' | 'multi'
}

type Tree = {
  species: string
  height: number
  wood: 'hard' | 'soft'
}

type Plant = Flower | Tree

function isFlower (plant: Plant): plant is Flower {
  return (plant as Flower).scent !== undefined
}

function isTree (plant: Plant): plant is Tree {
  return (plant as Tree).wood !== undefined
}

function plantsInMyGarden (plant: Plant): string {
  if (isFlower(plant)) return plant.scent
  if (isTree(plant)) return plant.wood
  const _ensure: never = plant
  return _ensure
}

// Assertion Functions //

function exists (person: unknown, message: string): asserts person is string {
  if (typeof person !== 'string') throw Error('I am not') // redundant
  else console.log(`${person} says: ${message}, therefore I am`)
}

const maybePerson = 'Rene'
exists(maybePerson, 'I think')

// Use type guards for app code
// Use assertions for tests

// Function Overloading //
// same as always but the multiple signatures have specific types
// compile time only, not in output js
function overloaded (string: string): void
function overloaded (string: string[]): void
function overloaded (string: string | string[]): void {}
overloaded('str')

// Call Signatures //
type bodyBlockSyntax = {
  // with the new keyword, and return class members we can use this as a class type
  new(a: number, b: number): { classMember: number }
  (a: number, b: number): number
  (a: number, b: number, c: number): number // we can declare func overloads
  debugName?: string
}

// Abstract Classes //
abstract class Command {
  abstract cmd (): string

  execute (): void {
    console.log('Executing: ', this.cmd())
  }
}

class GitUndoCommand extends Command {
  cmd (): string {
    return ('git reset --soft HEAD~1')
  }
}

// Index Signatures //
type Dictionary<T> = {
  [key: string | number]: T
}

type Dish = {
  name: string
  type: 'mezza' | 'main' | 'dessert'
}

const menu: Dictionary<Dish> = {
  tabouleh: { name: 'Tabouleh', type: 'mezza' },
  waraq: { name: 'Waraq 3ineb', type: 'mezza' },
  koubeh: { name: 'Koubeh', type: 'mezza' },
  maqloubeh: { name: 'Maqloubeh ma3 La7meh', type: 'main' },
  knaffeh: { name: 'Knaffeh', type: 'dessert' }
}

type Employee = { name: string }

const employeeIndex: Dictionary<Employee> = {
  123: { name: 'Sally Hans' },
  478: { name: 'Mary Magdalene' },
  305: { name: 'Doris Day' },
  278: { name: 'Layla Mourad' }
}

// Readonly Arrays and Tuples //

// Preferred
type Neat = readonly number[]
// eslint-disable-next-line @typescript-eslint/array-type
type Long = ReadonlyArray<number>

// without readonly here, the input array is overridden with the operations
function reverseSorted (input: readonly number[]): number[] {
  return input.slice().sort((a, b) => a - b).reverse()
}

const start = [101, 21, 5, 2, 9, 13, 10, 3894, 83, 13948, 11, 3]
const end = reverseSorted(start)

console.table({ start, end })

// tuple is simply an array type of fixed length 2
// similarly original point cannot be mutated because it is readonly
type Points = readonly [number, number]

// Double Assertion //
// Avoid and use with caution
// Could be helpful in migrating some js code
let point2: Point2D = { x: 0, y: 0 }
let point3: Point3D = { x: 0, y: 0, z: 0 }
const dish: Dish = { name: 'Stew,', type: 'main' }

point2 = point3 // structure of 2D is a subset of 3D so this is allowed

// point3 = point2
// z axis is missing in 2D type, 3D cannot be contained in 2D
// not allowed, error

point3 = point2 as Point3D // tells ts to trust us

// dish = point3 // Error
// point3 = dish // Error

// point3 = dish as Point3D // Error
// ts finds the difference to great, and tells us this may be a mistake
point3 = dish as unknown as Point3D // tells ts to trust us

// Why? unknown is allowed one-way compatibility with all types

// const Assertion //
// Technique to increase type safety of objects
// All obj members are inferred to be readonly
const ruler = {
  name: 'Sargon',
  empire: 'Akkadian'
} as const

// here empire is not type string but rather the literal value 'Akkadian'
const goddess = {
  name: 'Ishtar',
  empire: 'Akkadian' as const
}

// still mutable
goddess.name = 'Inanna'

// this parameter //
// calling context
// obj implicitly passed by the js runtime
// dependent on how it is invoked

// ts supports annotating what this should be
// must be the first param within the fc declaration
// it is a fake param and not part of the generated js
// only used for compile time checking
function double (this: { value: number }): number {
  return this.value * 2
}

const valid = {
  value: 3,
  double
}
const invalid = {
  valve: 3,
  double
}

valid.double()
// invalid.double()

console.log('double value on calling context: ', valid.double())

// Generic Constraints //
// <T extends someOtherType>
// T & {name: string}

/**
 * SECTION 4 - EXPERT
 */
