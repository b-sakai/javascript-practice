// node unicode.js

'use strict'

console.log('// This string does not match the following regular expression')
const message1 = 'Hello 🌐'
const regex1 = /Hello .$/
console.log('regex1.test(message1):', regex1.test(message1)) // false

console.log('// Remedy: u flag')
const regex2 = /Hello .$/u
console.log('regex2.test(message1):', regex2.test(message1)) // true

console.log('// \\u{...} escape sequences')
// Only work when u flag is set      
const regex3 = /[A-Za-z]+ \u{1F310}/u
console.log('regex2.test(message1):', regex2.test(message1)) // true
// Without the u flag, \u matches u
const regex4 = /[A-Za-z]+ \u{1F310}/
const message2 = 'Hello u{1F310}'
console.log('regex4.test(message2):', regex4.test(message2)) // true

console.log('// Unicode character classes')
// Unicode character class \p{L} matches letters from any language     
const regex5 = /Hello, \p{L}+!/u
const message3 = 'Hello, värld!'
console.log('regex5.test(message3):', regex5.test(message3)) // true
const message4 = 'Hello, 世界!'
console.log('regex5.test(message4):', regex5.test(message4)) // true
