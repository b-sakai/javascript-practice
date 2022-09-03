// Object-oriented Programming

// JavaScriptには本当の意味のクラスは存在しない
// クラスというのは単なるコンストラクタ関数
// そしてサブクラスは、スーパークラスのコンストラクタを呼び出すコンストラクタ関数


function createPoint(x, y) {
    return {
        x: x,
        y: y,
        getX: function() {
            return this.x
        },
        getY: function() {
            return this.y
        },
        translate: function(x, y) {
            this.x += x
            this.y += y
        },
        scale: function(s) {
            this.x *= s
            this.y *= s
        }
    }
}

let a = createPoint(1, 2)
console.log(createPoint(1, 2))
a.translate(3,3)
console.log(a.x)
a.scale(4)
console.log(a)
console.log(a.getY())

function Point(x, y) {
    this.x = x
    this.y = y
}
Point.prototype.translate = function(tx, ty)  {
    this.x += tx
    this.y += ty
}

const p1 = new Point(1, 2)
p1.translate(2, 3)
console.log(p1)

class CPoint {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
    scale(s) {
        this.x *= s
        this.y *= s
    }
}
const p2 = new CPoint(1, 2)
p2.scale(3)
console.log(p2)

function createGreetable(str) {
    
}
