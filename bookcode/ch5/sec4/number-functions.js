// node number-functions.js

'use strict'

console.log('// Don’t use the global isNaN and isFinite functions')
console.log('isNaN(\'Hello\'):', isNaN('Hello')) // true
console.log('isFinite([0]):', isFinite([0])) // true

console.log('// max and min')
let x = 17
let y = 29
let values = [3, 1, 4, 1, 5, 9]
console.log('Math.max(x, y):', Math.max(x, y)) // The larger of x and y
console.log('Math.min(...values):', Math.min(...values)) // The smallest element of the array values

console.log('// round and trunc')
console.log('Math.round(2.5):', Math.round(2.5)) // 3
console.log('Math.round(-2.5):', Math.round(-2.5)) // -2
console.log('Math.trunc(2.5):', Math.trunc(2.5)) // 2

console.log('// Random numbers within a given range')
let a = 1
let b = 7
for (let i = 0; i < 10; i++) {
  let randomDouble = a + (b - a) * Math.random()
  let randomInt = a + Math.trunc((b - a) * Math.random()) // where a, b are integers
  console.log({randomDouble, randomInt})
}

console.log('// Formatting')
console.log('(200).toString(16):', (200).toString(16)) // 'c8'.
let num = 0.00166666
let digitsAfterDecimalPoint = 4
let significantDigits = 4
console.log('num.toFixed(digitsAfterDecimalPoint):', num.toFixed(digitsAfterDecimalPoint)) // '0.0017'
console.log('num.toExponential(significantDigits):', num.toExponential(significantDigits)) // '1.6667e-3'
console.log('num.toPrecision(significantDigits):', num.toPrecision(significantDigits)) // '0.001667'
