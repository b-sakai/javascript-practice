// Control Structure

let a = 5
let x = a
const numbers = [1, 2, 3]
numbers.forEach(console.log)

// 文を( or [で始めない（;（デリミタ）の自動挿入が行われなくなるため
// 同じ行に複数の行を書くならセミコロンを置く必要がある

// "==" / "!==" ゆるい等価演算子
// "===" / "!===" 厳密な等価演算子


　
let harry = {name: 'Harry Smith', age: 42 }
let harry2 = harry
console.log(harry === harry2) // true
let harry3 = {name: 'Harry Smith', age: 42 }
console.log(harry === harry3) // false
console.log(harry == harry3) // false

// ゆるい透過性、異なった方同士の比較は使うべきではない

// Kotlinと同じような「?.」演算子がある
// switch文でbreakを忘れると「フォールスルー」と呼ばれる振る舞いが起きるため避ける開発者もいる

// 古典的なforループ
for (let i=0; i<10; i++) {
    console.log(i)
}

// for of ループ
let arr = [, 2, , 4]
arr[9] = 100
for (const element of arr) {
    console.log(element)
}

// for in ループ
for (const key in harry) {
    console.log(`${key}: ${harry[key]}`)
}
for (const i in arr) {
    console.log(`${i}: ${arr[i]}`)
}

// ラベル付きブレーク文　二重ループを抜けるときに使用できるが一般的ではない
