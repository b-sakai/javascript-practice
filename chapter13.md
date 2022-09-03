# 第13章

## 13.1 アノテーション
## 13.2 TypeScriptを実行する
## 13.3 型の定義

ユニオン型
number | number[]

基本型　⇔　ユニオン型
型エイリアス

type Numbers = number | number[]

## 13.4 基本型

number, boolean, string, symbol, nul, undefined

void 関数の戻り値の型としてしか使えない
never 「この関数は常に例外を送出するから決してリターンしない」という事実を表明する
　　　　型アノテーションに使うことはめったいない
unknown  「なんだかわからないJavashScriptの値」という表明、どんな値でもunknownに変換できる
　　　　　他のどの型とも互換性がない
any unknownのもっと制限を緩くした型、せっかくTypeScriptなのだからできるだけ使わない方ぎょい

リテラル値も唯一のインスタンスとしてその値だけを持つ、型になる
type Weekday = 'Mon' | 'Tue' | ...
のような曜日の略称を持つ型を作れたりする

メモ
一連の定数に意味のある名前を付けたいトキ、TypeScriptでは「列挙型」(enumerated type)を定義できる、値を代入することも可能


## 13.5 複合型

どの型にもその配列型がある
要素の型を混ぜた配列はタプル型となる

「オブジェクト型」
例：type Point = { x: number, y: number }

「関数型」
例：(arg1: number, arg2: number) => number
Math.powなど

「交差型」
Point & {color: string }

## 13.6 型指定

長い、確かに大事な章だから仕方がないか

const average = (x: number, y: number) => (x + y) / 2
const a = 3
const b = 4
let result = average(a,b)

「型アサーション」
JavaやC#のキャストに似ているが、もし実際の値がターゲットの型に従っていなくても例外は発生しない

「型防御関数」（type guard function）


## 13.7 サブタイプ

サブタイプはスーパータイプより条件が厳しい
サブタイプ関係
number | string型のサブタイプはnumber, string
numberのスーパータイプの一つとしてnumber | stringがある

type Point = { x: number, y: number }
type ColoredPoint = { x: number, y: number, color: string }
ColoredPoint型はPointのサブタイプ、PointはColoredPointのスーパータイプである


「置換則」
ある型の値が期待される場所には、そのサブタイプのインスタンスを供給できる

例外：
サブタイプのオブジェクトリテラルは置換できない
const distanceFromOrigin = (p: Point) => Math.sqrt(Math.pow(p.x, 2) + Math.pow(p.y, 2))
const result = distanceFromOrigin(bluePoint) // OK
const result = distanceFromOrigin({x: 3, y: 4, color: 'blue'}) // error

「オプションプロパティと過剰プロパティ」
クエスチョンマークのついたプロパティは許可されるだけで必須ではない

type MaybeColoredPoint = {
    x: number,
    y: number,
    color?: string
}

let p: MaybeColoredPoint = { x: 0, y: 0 } // OK
p.color = 'red' // OK configurable option property
p = { x: 3, y: 4, color: 'blue' } // OL can use object literal with option property

「配列型とオブジェクト型の変性」
一般にもしSがTのサブタイプならば、S[] はT[]のサブタイプである
配列型はその要素の方と同じ方向に変化するので、TypeScriptの配列型は方がともに変化する「共変性」
(covariance)を持つと言われる

この関係は「不完全」(unsound)なものだ
以下のようなエラーが起きてしまう
const colordPoints: ColoredPoint[] = [{ x: 3, y: 4, color: 'blue' }, { x: 0, y: 0, color: 'red' }]
const points: Point[] = coloredPoints // OK: pointsにはサブタイプの値を入れられる
points.push({ x: 4, y: 3 }) // OK: PointをPoint[]に追加できる、こうしてしまうと、、
console.log(colordPoints[2].color.length) // エラー: undefinedの'length'プロパティが読めない


これは言語設計書による意図的な選択である
理論的には書き換えられない配列だけを「共変」にすべきであり、書き換え可能な配列は「不変」にすべきである
つまり、型が不便だというので、この場合、TypeScriptは便利さを優先し、「完全」な型安全性を犠牲にしようと決めたのだ
共変性はオブジェクト型にも使われる
あるオブジェクト型が他のオブジェクト型のサブタイプかどうかの判定では、対応するプロパティの「サブタイプ関係」を調べる　同じプロパティを共有する２つの整数を見よう
type Colored = { color: string }
type MaybeColored = { color: string | undefined }
この場合、stringはstring | undefinedのサブタイプなので、ColoredはMaybeColoredのサブタイプである

一般に、もしSがTのサブタイプならば、オブジェクト型{ p: S }は、{ p: T }のサブタイプである
もし複数のプロパティがあれば、そのすべてが同じ方向に変化しなければならない
配列と同じように、オブジェクトの共変性も「不完全」である


## 13.8 クラス

JavaScriptのクラスとTypeScriptのクラスの構文的な違いを調べ、それからクラスと型との関係を学ぼう
（いい復習になるね〜）

「クラス宣言」
型アノテーションの他に、TypeScriptが型を推定できるような初期値を提供するという方法もある
プライベート構文を使える（JavaScriptではステージ３）
class Point {
  #x : number
  #y = 0

メモ：
TypeScriptはインスタンスフィールドとメソッドの修飾子（modifier）として、privateとprotectedもサポートしている、これらの修飾子の働きは、JavaやC++と同様
これらはJavaScriptにプライベートな変数やメソッドのための構文がなかった時代の産物である
メモ：
インスタンスフィールドはreadOnlyとして宣言できる

「クラスのインスタンス型」
TypeScriptのクラスインスタンスが持つ型には、パブリックなプロパティとメソッドのすべてが含まれる

「クラスの静的な型」
前項（多分だいぶ前）で述べたように、コンストラクタと静的メンバはクラスのインスタンス型の一部ではない

## 13.9 構造的型付け

TypeScriptの型システムでは「構造的型付け」(structure typing)が使われる
２つの型はもし構造が同じならば、同じ方とみなされる
例
type ErrorCode = [number, string]
type LineItem = [number, string]
は同じ型であり、この２つの型の間では、自由に値をコピーできる

let code: ErrorCode = [404, 'Not Found']
let items: LineItem[] = [[2, 'Blackwell Toaster']]
items[1] = code

type ErrorCode = { code: number, description: string]
type LineItem = { quantity: number, description: string }
と書いたらこの２つはプロパティ名が一致しないから、別の型になる

構造的型付けは、JavaやC#やC++のような、型の名前が問われる「名ばかりの」型システムとは、全く違うものだ
そしてJavaScriptで問われるのはオブジェクトの能力であって、型の名前ではない


## 13.10 インターフェイス

あるクラスがこの型のサブタイプであることを確実に示すにはそのクラス定義でimplemets節を使えば良い
するとTypeScriptは、このクラスが本当に正しい型の「idメソッド」を提供しているかどうかをチェックしてくれる
メモ：
implements節の役割は、これだけだ
たとえimplementsを省略したも、構造的型付けによって、PersonはIdentifiableのサブタイプになる

オブジェクト型には、もう一つの構文がある
それが「インターフェイス」だ
interfaceキーワードを使うので、JavaやC#のプログラマにとって馴染みやすい
古いバージョンのTypeScriptでは、オブジェクト型のほうがインターフェイスより制限が多かったが、いまではどちらも同じように使える

ただ、いくつか細かい違いがある
・インターフェイスを使うと、別のインターフェイスを拡張できる（extends構文）
・型宣言の場合は、extendsの代わりに交叉型を使うことになる
・インターフェイスはオブジェクト型と違って、断片的に定義できる
　これらの断片は自動的にマージされる（しかし、便利な機能かどうかは議論の余地がある）

メモ：
TypeScriptではインターフェイスでクラスを拡張できる、その場合クラスのインスタンス型のプロパティがすべてインターフェイスで採用される


## 13.11 インデックス付きプロパティ

「任意にプロパティを使えるオブジェクト」がほしいときもある
TypeScriptの型チェッカーに、プロパティがなんでも大丈夫と知らせるには「インデックスシグネチャ」(index signature)を使う必要がある
その構文は
type Dictionary = {
    creator: string,
    [arg: string]: string | string[]
}
Dictionaryのインスタンスは、どれもcreatorプロパティを１つ持つ他、値が文字列または文字列の配列である他のプロパティをいくつでも持つことができる

const dict: Dictionary = [ crattor: 'Pierre' ]
dict.hello = ['bounjour', 'sault', 'allo']
let str = 'world'
dict[str] = 'monde'

インデックスの値に整数を使えば「配列的な型」を記述できる

## 13.12 複雑な関数パラメータ

オプション、デフォルト、restのパラメータ、さらには分割したパラメータに、型アノテーションを与える方法を学ぶ
それから「多重定義」（オーバーロード）をみる

「オプションパラメータ」
オプションパレメータは必須のパラメータよりも後に置かなければならない
const average = (x: number, y?: number) => y == undefined ? x : (x + y) / 2 // TypeScript

「デフォルトパラメータ」
const average = (x = 0, y = x) => (x + y) / 2 // TypeScript

「restパラメータ」
働きはJavaScriptと全く同じ
cosnt average = (first = 0, ...followings: number[]) => {
    let sum = first
    for (const value of following) { sum += value }
    return sum / (1 + following.length)
}
(arg1: number, ...arg2: number[]) => number この関数の型

「分割」
TypeScriptの型アノテーションと分割の構文が衝突とする場合は、設定オブジェクト全体の型アノテーションを追加することで解決できる

「関数の型変性」
関数型はパラメータ型と「逆変」（contravariant）の関係である
もしパラメータ型を「スーパータイプ」で置き換えたら、その関数のサブタイプが作られる

「多重定義」
戻り値の型も引数の型によって変えたいときなどに便利（ユニオン型だと限界がある）

## 13.13 ジェネリックプログラミング

クラスや、型や、関数の宣言「ジェネリック」（generic：総称的）になるおは、まだ指定されていない型のために、あとで記入すべき「型パラメータ」（type parameters)を使うときだ
たとえばTypeScript標準のSet<T>型は型パラメータTがあるので、Set<string>や、Set<Point>などどんな型の集合でも作ることができる

「ジェネリックなクラスと型」
class Entry<K, V> {
    key: K
    value: V
    constructor(key: K, value: V) {
        this.key = key
        this.value = value
    }
}
ジェネリッククラスを「実体化」(instantiate)するには、これらの型変数を型で置き換えればいい
例：Entry<string, number>
メモ：型パラメータにはデフォルトが提供できる
type Pair<T = any> = {first T, second: T}

型はコンストラクタの引数からも推定可能

「ジェネリック関数」
型パラメータを持つ関数
例：
function count<T>(arr: T[], target: T) {
    let count = 0
    for (let e of arr) if (e == target) count++
        return count
}
let digits = [3, 4, 1, 5, 9, 2, 6, 5, 3, 5]
let result = count(digits, 5) // OK
result = count(digits, 'Fred') // 型エラー

ジェネリック関数を呼び出す場合、型パラメータを目地的に指定する必要がない
引数の方から推定される体

「型束縛」
ときには、ジェネリックなクラスまたは関数の型パラメータが何らかの条件を満たす必要があるかもしれない
そういう条件は「型束縛」(type bound)によって表現する

const tail = <T>(values: T) => values.slice(1) // error
const tail = <t extends { slice(from: number, to?: number): T}>(values:T) => values.slice(1) // OK
extendキーワードは意味は違うのだが、流用されている
let result = tail([1,7,2,9]) // [7, 2, 9]
let result = tail('Hello') // ello

「型の消去」
TypeScriptのコードを普通のJavaScriptのコードに変換すると、すべての型が消去される

なげーなーこの章。。
ジェネリックプログラミングはあんま好かんのよねー

「ジェネリックの型変性」

「条件型」
T extends U ? V : Wという形式

「マップした型」


この本はJavaScriptで導入が予定されているような機能も紹介されていて良いね


## ふと思ったこと

理系の教科書的な本では抽象的な説明をしたあとに、演習問題として具体的な問題を出して演習させているが、これは教科書を作る側の都合では？
個人的には具体例を豊富に与えられた後に、抽象化をして覚えるやり方のほうが絶対頭に入りやすい気がする

これは機械学習も同じなのでは？（具体的な訓練データと教師データをセットで大量に処理させている）
なぜ教科書はこの形式なんだ？？？？
絶対具体　ー＞　抽象の順番であるべきだろ

つまり、具体例を豊富に与えられて、その中から法則を見つけてくださいという問題を出す　で他の具体例の問題を解く
これが正しいのでは？

抽象　ー＞　具体のばあい抽象の方をテンプレート的に頭に入れなきゃいけなくて苦しいよ
章末問題の形式も悪い、普通に考えて都度問題を出すべきだろ！

具体例をよこせ（特に数学の教科書）
勉強するときに具体例について自分で考察して観る必要が絶対ある気がする
なんかそういう形式の教科書あってもよいのでは？

つまり問題、答えのセットをたくさん与えて、そのあとに公式を考えてみよう？と出して解説する形
そういうアプリ作れないか？

プログラミングするときだって、用途があってそれをまとめようという動機でクラスを作ったりするほうが絶対自然な順序な気がする
