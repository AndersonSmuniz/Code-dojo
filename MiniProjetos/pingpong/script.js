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
const score = {
    human: 0,
    cumputer: 0,
    increaseHuman: function () {
        this.human++;
    },
    increaseComputer: function () {
        this.cumputer++;
    },
    draw: function () {
        canvasCtx.font = "bold 72px Arial";
        canvasCtx.textAlign = "center";
        canvasCtx.textBaseline = "top";
        canvasCtx.fillStyle = "#ffffff"
        canvasCtx.fillText(this.human, field.w / 4, 50);
        canvasCtx.fillText(this.cumputer, field.w / 2 + field.w / 4, 50);
    },
}

const leftPaddle = {
    x: gapX,
    y: field.h / 2,
    w: line.w,
    h: 200,
    _move: function () {
        this.y = mouse.y;
    },
    draw: function () {
        //desenho da raquete esquerda
        let radius = 5; // raio do arco dos cantos
        let gradient = canvasCtx.createLinearGradient(this.x, this.y, this.x, this.y + this.h);
        gradient.addColorStop(0, '#000000');
        gradient.addColorStop(1, '#ff0000');
        canvasCtx.fillStyle = gradient;
        canvasCtx.beginPath();
        canvasCtx.moveTo(this.x + radius, this.y);
        canvasCtx.lineTo(this.x + this.w - radius, this.y);
        canvasCtx.arc(this.x + this.w - radius, this.y + radius, radius, -Math.PI / 2, 0);
        canvasCtx.lineTo(this.x + this.w, this.y + this.h - radius);
        canvasCtx.arc(this.x + this.w - radius, this.y + this.h - radius, radius, 0, Math.PI / 2);
        canvasCtx.lineTo(this.x + radius, this.y + this.h);
        canvasCtx.arc(this.x + radius, this.y + this.h - radius, radius, Math.PI / 2, Math.PI);
        canvasCtx.lineTo(this.x, this.y + radius);
        canvasCtx.arc(this.x + radius, this.y + radius, radius, Math.PI, -Math.PI / 2);
        canvasCtx.closePath();
        canvasCtx.fill();

        this._move();
    }
}

const rightPaddle = {
    x: field.w - line.w - gapX,
    y: field.h / 2,
    w: line.w,
    h: 200,
    speed: 1,
    speedUp: function () {
        this.speed++;
    },
    speedDow: function () {
        this.speed--;
    },
    _move: function () {
        if (ball.x + 15 > field.w / 2) {
            if (this.y + this.h / 2 < ball.y + ball.r) {
                if (this.speed < 18) {
                    this.y += this.speed;
                } else {
                    this.speedDow();
                }
            } else {
                this.y -= this.speed;
            }
        }
    },
    draw: function () {
        //Desenho da raquete direita
        let radius = 5; // raio do arco dos cantos
        let gradient = canvasCtx.createLinearGradient(this.x, this.y, this.x, this.y + this.h);
        gradient.addColorStop(0, '#000000');
        gradient.addColorStop(1, '#ff0000');
        canvasCtx.fillStyle = gradient;
        canvasCtx.beginPath();
        canvasCtx.moveTo(this.x + radius, this.y);
        canvasCtx.lineTo(this.x + this.w - radius, this.y);
        canvasCtx.arc(this.x + this.w - radius, this.y + radius, radius, -Math.PI / 2, 0);
        canvasCtx.lineTo(this.x + this.w, this.y + this.h - radius);
        canvasCtx.arc(this.x + this.w - radius, this.y + this.h - radius, radius, 0, Math.PI / 2);
        canvasCtx.lineTo(this.x + radius, this.y + this.h);
        canvasCtx.arc(this.x + radius, this.y + this.h - radius, radius, Math.PI / 2, Math.PI);
        canvasCtx.lineTo(this.x, this.y + radius);
        canvasCtx.arc(this.x + radius, this.y + radius, radius, Math.PI, -Math.PI / 2);
        canvasCtx.closePath();
        canvasCtx.fill();
        this._move();
    },
}

const ball = {
    x: field.w / 2,
    y: field.h / 2,
    r: 20,
    _speed: 5,
    directionX: 1,
    directionY: 1,
    calcPosition: function () {
        // Verifica se o jogador 1(humano) fez um ponto
        if (this.x > field.w - this.r - rightPaddle.w - gapX) {
            // Calcula a posição da raquete no eixo y
            if (this.y + this.r > rightPaddle.y &&
                this.y - this.r < rightPaddle.y + rightPaddle.h
            ) {
                // Rebater a bola
                this._reverseX();
            } else {
                // Marcar ponto
                score.increaseHuman();
                this._pointUp();
            }
        }
        //verifica se o jogador 2 (computador) fez o ponto
        if (this.x < this.r + leftPaddle.w + gapX) {
            //calcula a posição da aquete no eixo y
            if (
                this.y + this.r > leftPaddle.y &&
                this.y - this.r < leftPaddle.y + leftPaddle.h
            ) {
                // Rebate a bola
                this._reverseX();
            } else {
                // Macar ponto
                score.increaseComputer();
                this._pointUp();
            }
        }

        // Calcula a posição verticaçda bola(eixo Y)
        if (
            (this.y - this.r < 0 && this.directionY < 0) ||
            (this.y > field.h - this.r && this.directionY > 0)
        ) {
            this._reverseY();
        }
    },
    _reverseX: function () {
        this.directionX *= -1;
    },
    _reverseY: function () {
        this.directionY *= -1;
    },
    _speedUp: function () {
        if (this._speed < 18) {
            this._speed += 3;
        }
    },
    _pointUp: function () {
        this.x = field.w / 2;
        this.y = field.h / 2;

        this._reverseX();
        this._speedUp();
        rightPaddle.speedUp();
    },
    _move: function () {
        this.x += this.directionX * this._speed;
        this.y += this.directionY * this._speed;
    },
    draw: function () {
        //Desenho bola
        // fillStyle define qual vai ser o stilo de preenchimento
        canvasCtx.fillStyle = "#ffffff";
        canvasCtx.beginPath();
        canvasCtx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
        canvasCtx.fill();

        this.calcPosition();
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
    score.draw();

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
        window.msRequestAnimationFrame ||
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