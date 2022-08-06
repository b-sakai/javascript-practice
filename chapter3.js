// Functions and Functional Programming

'use strict'

console.log('Functions and Functional Programming')

// functionキーワードもしくはアロー演算子=>を使うことで関数リテラル（無名関数）を定義できる）
const averageFun = function (x, y) { return (x + y) / 2}
const averageArrow = (x, y) => (x + y) / 2
console.log(averageFun(6, 7))
console.log(averageArrow(6, 7))

// オブジェクトの波括弧とブロックの波括弧に気をつけろ！

// practice 10
for (var i = 0; i < 10; i++) {
  //  setTimeout(() => console.log(i), 1000 * i)
}
console.log(i)


// practice 12
if (Math.random() < 0.5) {
    say('Hello')
    function say(greeting) { console.log(`${greeting}!`)}
}
say('Goodbye')
