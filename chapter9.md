

要約をまとめておくことでトルクを下げて、理解しやすくしよう！
あと多分、思考を早くしてしまうと、すぐそばの情報が気になってしまう性分なので、
それを抑えられる気がする。
とはいえ、全て関連事項で勉強していくのは効率悪くはないと思う。
タスク管理は難しいが。
全手を知りたいのであれば、回り道ではないのでは？
やはり、方法論好きすぎ問題。プログラマーに向いた性質だと思うけど。

プロミスは古い機構だが、async, awaitを理解するために重要なので、やる
自分で行う必要が生じることはあまりない
読み飛ばしても良い？

## 9.2 プロミスを作る

Promiseコンストラクタ：成功時と失敗時の２つのハンドラを引数として渡す

Promiseの制御の流れ
* Promiseコンストラクタが呼びだされる
* executor関数が呼び出される
* executor関数が、１つ以上のコールバックを持つ非同期タスクを始動する
* executor関数がリターンする
* コンストラクタがリターンする、これでプロミスを「未決定」(pending)状態になる
* コンストラクタが呼び出したコードが最後まで実行される
* 非同期タスクが完了する
* タスクのコールバックが呼び出される
* そのコールバックから、resolveまたはrejectのハンドラが呼び出され、プロミスは成功
　または失敗の状態に遷移する、どちらの場合もこれでプロミスは「決定済み」になる

例外で終わったらプロミスの状態は決定されない
一般にコールバックではtry/catchを使ってtどの例外でもrejectハンドラに渡すのが良い
ただ、executor関数の中で送出される例外はcatchする必要がない、この場合はコンストラクタが
「失敗したプロミス」を作る

## 9.3 即決するプロミス

Promise.resolve(value), Promise.reject(error)で即座に解決、失敗するプロミスが作れる

## 9.4 プロミスの結果を取得する

promise.thenメソッドを使うことで成功した時のアクションを指定できる
結果を消費する関数
例：promsie.then(console.log)

## 9.5 プロミスの連鎖

プロミスの結果が、もう一つの非同期タスクに渡される場合、プロミスは連鎖する

## 9.6 失敗の処理

thenメソッドの第二引数に指定すれば良い
ただ、普通はcatchメソッドを使うほうが良い
promise.then(resolve).catch(reason)

promise.finallyメソッドはプロミスが決定してもしてなくてもハンドラを呼び出す

## 9.7 複数のプロミスを実行する

Promise.all(iterable)で「イテラブルに入っているすべての全てのプロミスが解決したときに解決するプロミス」が手に入る
Promise.allはタスクを並列処理で実行するわけではなく、全てのタスクは１本のスレッドでシーケンシャルに実行される

## 9.8 プロミスの競争

Promise.race(iterable)は「居てラブルに入っているプロミス群を、その１つが決定するまで実行し、最初に決定したプロミスによって競争(race)の結果が決まる」
「失敗したプロミス」が競争にかつこともあり得る、その場合、その他全てのプロミスはたとえその日つが結果を出していても、捨てられてしまう
コレに対応する、Promise.anyがステージ4に昇格した。
Primise.abyはタスクの１つが解決するまで実行を続ける

## 9.9 async

到達したぞ！本丸！
これまで、thenとcatchnoメソッドを使ってプロミスのパイプラインを構築する方法と、Promise,.all, Promise.anyを使って、
プロミスのシーケンスをコンカレントに実行する方法を見てきた。
ただ、このスタイルのプログラミングは余り便利ではない
使い慣れた文のシーケンスを制御の流れを使うのでなく、代わりにメソッドコールのパイプラインをセットアップする必要が
あるというのがその理由だ

ここで登場するのが「async/await構文」！

let value = await promise
プロミスの解決を待って、その値を返す
await演算子が許されるのはasyncキーワードでタグ付けされた関数だけ

コンパイラはasync関数のコードを変換して、await演算子に続くステップがプロミスの解決後に実行されるようにする

複数のawait, ループも使える
これらの例でわかるように、舞台裏でコンパイラが行う書き換えは些細なものではない

注意：もしasync関数を呼び出すときにawaitキーワードを書き忘れたら、その関数は呼び出されてプロミスを返すが、そのプロミスはただ何もしない

asyncキーワードの対象は次のどれか
・アロー関数：　async {url, params} => {...}
・メソッド： clas ImageLoader { async load(url) {...} }
・名前付き関数と匿名関数： async function loadImage(url) {...} ,　async function(url) {...}
・オブジェクトリテラルのメソッド： obj = { async loadImage(url) {...} }

これらの全てのケースで結果として作られる関数は、FunctionではなくAsyncFunctionのインスタンスである

## 9.10 asyncの戻り値

async関数は、値を返すように見えても、常にプロミスを返す
つまり、プロミスを返すのでthenを使う、あるいはawait演算子を使って結果を得る
cosnt getCatIamgeURL = async () => {...}

thenパターン
getCatImageURL().then()

await演算子パターン
const url = await getCatImageURL()
const img = await loadImage(url)
imgdiv.appendChild(img)

await演算子パターンではもう一つのasync関数の中で行う必要があることに注意
thenパターンのほうが読みやすいと思う（筆者意見）

## 9.11 コンカレントなawait

コンカレント：同時並行
awaitの連続的な呼出は、順番に１つずつ実行される

並行して実行したい場合はPromise.allを使う必要がある
const [img1, img2] = await Promise.all([loadImage(url), loadCatImage()])
この式の意味を読み取るには、async/awaitの構文を理解しているだけではなく、プロミスについて本当に知っている必要がある
Promise.allの引数は、プロミスのイテラブル
ここでloadImage関数はプロミスを返すふつうの関数であり、loadCatImageは暗黙のうちにプロミスを返すasync関数である
Promise.allは１個のプロミスを返すのでコレに対してawaitを呼び出すことができる、ただし、そのプロミスの結果は配列であり、それを分解することになる
舞台裏で何が起きているのか理解できないと、間違いを起こしやすいものだ。次の例がわかるだろうか？
const [img1, img2] = [await loadImage(url), await loadCatImage()] // 間違い、このではシーケンシャルなまま
この文はコンパイルを通り、実行できるが、画像がコンカレントにロードされない
await loadIamge(url)の呼出が完了するまで、await loadCatImage()の呼出は始まらないのだ

## 9.12 async関数での例外
async関数の中で例外を創出すると、「失敗したプロミス」が作られる
逆に「失敗したプロミス」を受け取ったawait演算子は、例外を送出する
あらゆるawaitをtry/catchで囲む必要はないが、async関数でのエラー処理には何らかの戦略が必要
多分トップレベルのasync関数ですべての非同期例外をキャッチするか、「呼び出し側が、リターンされるプロミスに対してcatchを呼び出す必要がある」という事実を文書かるることに鳴るだろう
Node.jsのトップレベルでプロミスが失敗すると、「将来のバージョンのNode.jsでは、代わりにプロセスを終了させるかもしれません」などという厳しい警告が発生する

演習問題は例によって飛ばそう。







## 
