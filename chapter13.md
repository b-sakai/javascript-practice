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
## 13.7 サブタイプ
## 13.8 クラス
## 13.9 構造的型付け
## 13.10 インターフェイス
## 13.11 インデックス付きプロパティ
## 13.12 複雑な関数パラメータ
## 13.13 ジェネリックプログラミング