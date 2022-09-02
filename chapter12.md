# 第１２章　イテレータとジェネレータ

for of ループと配列の展開（spread）で使えるものだ
コードの中でイテレータを使えるように、その実装方法を習得しよう

イテレータの実装は面倒だが、ジェネレータを使えば、その仕事は大いに単純化される
「ジェネレータ」は、複数の値を生成できる関数だが、１つ値を生成したら、いったんサスペンドし、
次の値が要求されたときにレジュームする
ジェネレータはコールバックを必要としない非同期プログラミングのビルディングブロックでもある
この章の題材はどれも上級レベルだ

## 12.1 イテラブルな値

イテラブルな（反復処理が可能な）値のJavaScriptにおける用途で、最も一般的な直は多分for ofループだろう。
たとえば配列は「イテラブル」だ

次の値はどれもイテラブルである
・配列と文字列
・セットとマップ
・配列/型付配列/セット/マップのkey, values, entriesメソッドが返すオブジェクト
・documet.querySelectorAll('div')の呼び出しが返すような、DOMのデータ構造

一般に、Symbo.iteratorという名の「イテレータオブジェクトを作り出すメソッド」を持っている値は
イテラブルである
const helloIter = 'Hello'[Symbol.iterator]()

イテレータオブジェクトのnextメソッドは「次の値」と「反復をおえたかどうかを示すインジケータ」を含むオブジェクトを作りだす
helloIter.next()

JavaScriptでイテラブルが使われる状況は次の通り
・すでに述べた、for (const v of iterable)のループの中
・配列の展開：[...iterable]
・配列の分割：[first, second, third] = iterable
・Array.from(iterable)関数
・SetとMapのコンストラクタ:new Set(iterable)
・この章で後ほど紹介する、yield*ディレクティブ
・iterable[Symbol.iterable]()が返す関数を呼び出した作るイテレータをプログラマが利用できる場所ならどこでも

## 12.2 イテラブルを実装する

このセクションではfor ofループや配列の展開などに置くことができるイテラブルオブジェクトの作り方を
学ぶ
具体例で実際に試してみるのが、一番理解しやすい
イテラブルなRangeクラスを実装しよう
この「領域」クラスのイテレータが作り出すのは、所与の範囲にある値だ

## 12.3 打ち切り可能なイテレータ

もしイテレータオブジェクトが「returnという名のメソッド」を持っていたら、そのイテレータは「打ち切り可能」である
反復が途中で打ち切られるトキ、そのreturnメソッドが呼び出される

## 12.4 ジェネレータ

これまでの節では、nextメソッドが一度に1個の値を作り出すイテレータの実装方法を見てきた
そういう実装は、面倒な作業になるかもしれない
イテレータはnextを継続的に呼び出す間、そのための状態を覚えておく必要がある
たとえ単純な領域の場合でも、実装は些細ではない

「ジェネレータ関数」
function* rangeGenerator(start, end) {
    for (let i = start; i < end; i++) 
        yield i
}
yieldキーワードは、１個の値を作り出すが、リターンと違って、そこで関数から抜け出わけではない
関数は、値をyieldするたびにサスペンドされる
(yieldという英語には、何かを「作り出す」という意味の他に「他に譲る」という意味がある。
信号のない交差点には、優先道路の車両に道を譲れ、という「YIELD」標識があるから、yieldには「一時停止」のニュアンスがある
)
そして次の値を要求されたとき、この関数はyield文の後から（また次の値をyieldするまで）実行を続ける

functionに続くアスタリスク（*）によって、この関数はジェネレータ関数としてタグ付けされている
通常の関数は、リターン時に１個の結果を生成するだけだが、ジェネレータ関数は、yield文を実行するたびに結果を１個ずつ生成する
ジェネレータ関数を呼び出した時点では、まだ関数本文の実行が開始されない。
その代わりイテレータオブジェクトが手に入る
const rangeIter = rangeGenerator(10, 20)

他のイテレータと同じく、rangeIterにもnextメソッドがある
最初にnextを呼び出したとき、ジェネレータ関数の本文が、yield文に到達するまで実行される
そしてnextメソッドからは{value: yieldされた値, done: false}のオブジェクトが返される

let nextResult = rangeIter.next() // { value: 10, done: false }
この後、nextメソッドが呼び出される度に、ジェネレータ関数の実行が最後のyield文から再開され、
また次のyield文に到達するまで続行される

ジェネレータ関数がリターンするとき、nextメソッドは{ value: リターンされた値, done:true }
を返して、繰り返しの完了を通知する
nextResult = rangeIter.next() // { value: undefined, done: true }
もしジェネレータ関数のコードが例外を送出することがあれば、nextの呼び出しはその例外で終了する

メモ
JavaScriptのyieldは使える範囲が浅い、yieldできるのはジェネレータ関数の内側だけだ
ジェネレータ関数が呼び出す関数の中でyieldすることはできない

ジェネレータ関数は名前付きでも匿名関数でも良い
function* myGenerator(...) { ... }
const myGenerator = function* (...) { ... }

もしオブジェクトのプロパティか、メソッドの１つがジェネレータ関数ならば、それにアスタリスクをつける
アロー関数をジェネレータにすることはできない
ジェネレータ関数の呼び出しはイテラブルを置けるところなら、どこでも置ける
（for ofループや、配列の展開など）

## 12.5 ネストしたyield

ジェネレータ関数の内側にあるジェネレータの値を全て取得するにはyield*文を使う必要がある

let arr = [1, [2, 3, 4], 5]
function* flatArrayGenerator(arr) {
    for (const element of arr)
        if (Array.isArray(element)) {
            yield* arayGenerator(element)
        } else {
            yield element
        }
    }
}
const result = [...flatArrayGenerator(arr)] // [1, 2, 3, 4, 5]

深く入れ子になっている場合は再帰呼び出しさせる
function* flatArrayGenerator(arr) {
    for (const element of arr)
        if (Array.isArray(element)) {
            yield* flatArayGenerator(element)
        } else {
            yield element
        }
    }
}

この例が示している重要なポイントは、JavaScriptにおけるジェネレータ関数の制限を、yield*で克服
できるということだ
つまり、どのyield文もジェネレータ関数自身の中に置く必要が有り、ジェネレータ関数から呼び出される関数にはおけない
しかし、あるジェネレータ関数が呼び出されて値をyieldしていく合間に別のジェネレータ関数を呼び出すという状況はyield*文で解決できるのだ

yield*文は、nextが呼び出される度に１個の値を作り出すイテラブルの値にも使える
我々のarrayGeneratorは実は次のようにあっさり定義できたのだ
function* arrayGenerator(arr) {
    yield* arr
}
メモ
ジェネレータ関数は値をyieldするだけでなく、終了時に値を返すこともできる
function* arrayGenerator(arr) {
    for (const element of arr)
        yield element
    return arr.length
}
この戻り値は、doneプロパティがtrueになるときの反復の最終結果に含まれる
yieldされる値を反復処理しているとき、戻り値は無視される
けれども、他のジェネレータ関数の内側にあるyield*式の値として戻り値をキャプチャすることができる
function* elementsFollowedByLength(arr) {
    const len = yield* arrayGenerator(arr);
    yield len;
}

## 12.6 値を消費するジェネレータ

これまでは値のシーケンスを生成するためのジェネレータを使ったが、ジェネレータは値を消費することもできる
１個の引数を付けてnextを呼び出すと、ジェネレータではそれがyield式の値になる

・ジェネレータは、nextメソッドを呼び出した側から値を受信して積算する
・ジェネレータは、nextメソッドの呼び出し側に現在のsumを送る
注意
ただし最初にnextを呼び出して、ジェネレータ本文の実行を最初のyield文まで進める必要がある
その後はジェネレータが消費する値を付けたnextの呼び出しを開始できる

returnメソッドを呼び出したら、ジェネレータはシャットダウンする、

## 12.7 ジェネレータと非同期処理
## 12.8 非同期なジェネレータとイテレータ