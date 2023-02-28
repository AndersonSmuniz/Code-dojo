const canvasEl = document.querySelector("canvas"),
    canvasCtx = canvasEl.getContext("2d"),
    gapX = 10;

const mouse = { x: 0, y: 0, }
const field = {
    w: window.innerWidth,
    h: window.innerHeight,
    draw: function () {
        // desenho do campo
        canvasCtx.fillStyle = "#286047";
        canvasCtx.fillRect(0, 0, this.w, this.h);

    },
}

const line = {
    w: 15,
    h: field.h,
    draw: function () {
        //desenho da linha central
        canvasCtx.fillStyle = "#ffffff";
        canvasCtx.fillRect(field.w / 2 - this.w / 2, 0, this.w, this.h)
    },
}

const leftPaddle = {
    x: gapX,
    y: field.h / 2,
    w: line.w,
    h: 200,
    _move: function(){
        this.y = mouse.y
    },
    draw: function () {
        //desenho da raquete esquerda
        canvasCtx.fillStyle = "#ffffff"
        canvasCtx.fillRect(this.x, this.y, this.w, this.h);
    
        this._move()
    }
}

const rightPaddle = {
    x: field.w - line.w - gapX,
    y: 240,
    w: line.w,
    h: 200,
    draw: function () {
        //Desenho da raquete direita
        canvasCtx.fillRect(this.x, this.y, this.w, this.h)
    },
}

const ball = {
    x: 120,
    y: 240,
    r: 20,
    _speed: 5,
    _move: function () {
        this.x += this._speed;;
        this.y += this._speed;;
    },
    draw: function () {
        //Desenho bola
        // fillStyle define qual vai ser o stilo de preenchimento
        canvasCtx.fillStyle = "#ffffff";
        canvasCtx.beginPath();
        canvasCtx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
        canvasCtx.fill();

        this._move();
    },

}

// functon setup define as dimenções do campo e do context
function setup() {
    canvasEl.width = canvasCtx.innerWidth = window.innerWidth;
    canvasEl.height = canvasCtx.height = window.innerHeight;
}
//functon draw para desenhar todos os objetos 
function draw() {
    field.draw();
    line.draw();

    leftPaddle.draw();
    rightPaddle.draw();

    ball.draw();

}
// função para animar a bola
window.animationFrame = (function () {
    return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame |
        function (callback) {
            return window.setTimeout(callback, 1000 / 60)
        }
    )
})()

function main() {
    animationFrame(main)
    draw()
}
setup();
main();

canvasEl.addEventListener('mousemove', function (e) {

    mouse.x = e.pageX;
    mouse.y = e.pageY;
})