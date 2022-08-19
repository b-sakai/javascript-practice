# 第１０章モジュール

再利用するはずのコードを提供するときに、パブリックとプライベートを区別することが重要
オブジェクト指向プログラミングでは、その区分けがくらすによって実現される

この利点をもっと大規模なプログラミングで得られるのが、モジュールシステムである
モジュールを使うときも、クラスや関数を選んで提供し、その他の機能を隠すことで、モジュールの進化を制御できる

## 10.1　モジュールのコンセプト
「モジュール」からプログラマが使えるように機能（クラス、関数、その他の値）を提供することを「エクスポート」と呼ぶ
エクスポートされていない機能はどれも、そのモジュールのプライベートな機能である

名前の衝突が管理される
モジュールとクラスの違いを理解することは重要
　クラスはいくつでもインスタンスを持つことができるが、モジュールにインスタンスはない
　モジュールはクラスや関数や値を入れるコンテナに過ぎない

## 10.2 ECMAScriptのモジュール
 
ECMAScript: Europian Computer Manufatures Association Scipt
ファイルにいれてインクルードできるが、名前が衝突しそう。。
クロージャやヘルパー関数、ラッパー関数を使ってやりくしてきた
Node.jsが実装したモジュールシステム（いわゆる、Common.js）は、モジュールの依存関係を管理する
あるモジュールが必要になったら、そのファイルが依存ファイルと共にロードされる
そのローディングは、モジュールの必要性が生じたそのときに「同期的に」行われる

AMD（Asyncronous Module Difinition）標準では、モジュールを「非同期に」ロードするシステムが
定義されている
ブラウザベースのアプリケーションにはこの方が適している
ECMAScriptのモジュールは、どちらのシステムと比べても改善されている
依存関係とエクスポートは、本体を実行する前に迅速な解析処理によって行われる。
このため、非同期なローディングと循環的な依存が可能になる
現在、JavaScriptの世界はECMAScriptのモジュールシステムへと移行しつつある

## 10.3 デフォルトのインポート

モジュールを各プログラマの数は、ごく少数だ。それいよりずっと多くのプログラマがそれらのモジュールを消費する
pythonみたくインポートできる
例：import CaesarCipher from './modules/caesar.mjs'
cipher:暗号

## 10.4 名前付きインポート

モジュールの実装者がデフォルトでない機能のそれぞれに名前おwつける
いくつでも使いたいだけインポートできる

## 10.5 動的なインポート

場所が固定されないモジュールのインポート
オンデマンドでモジュールを動的にロードできるから、アプリケーションの鬼道コストとサイズを削減できる

動的なimport文は、モジュールを非同期にロードする
この文は「エクスポートされた機能の全てを含むオブジェクト」のプロミスを作る
そのプロミスは、モジュールがロードされたときに解決する

## 10.6 エクスポート

エクスポートは変数である
インポートする側のモジュールに置いて、この変数はリードオンリー

注意：モジュールが循環的に相互依存する場合、エクスポート機能が他のモジュールで使われるときに、
まだundefinedである可能性がある

## 10.7 モジュールのパッケージング

モジュールと、ふつうの「スクリプト」の違いは次の通り

* モジュール内のコードは、常にstrictモードで実行される
* それぞれのモジュールに独自の「トップレベル」スコープがある
　これはJavaScriptランタイムのグローバルスコープとは異なる
* たとえ複数回ロードされても、モジュールが処理されるのは一度だけ
* モジュールは非同期に処理される
* モジュールはimport文とexport文を含むことができる

JavaScriptランタイムは、モジュールの内容を読むとき、普通のスクリプトではなくモジュールとして
処理するのだということを知る必要がある
Node.jsの場合、ファイルがモジュールであることを示すために、.mjs当ファイル拡張子を使う
もし、普通の.jsという買う調子を使いたければ、configuration fileのpackage.jsonの中で、そのモジュールにマークをつける必要がある
モジュールンは常に.mjsの拡張子を使うのが、最もシンプルだろう
この拡張子はすべてのランタイムとビルドツールで認識される

メモ；Webサーバから、.mjsファイルをサービスするときは、応答のヘッダでContent-Type: text/javascriptを提供するように、サーバを設定しておく必要がある