const canvas = document.getElementById("tutorial");
const ctx = canvas.getContext("2d");
let Balls = [];

function anim() {
//опис самої анімації
    repaint();
    requestAnimationFrame(anim);
}

//перший запуск функції
anim();

function repaint() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ballsCount.innerHTML = 'Count: ' + Balls.length;
    Balls.forEach((b, index) => {
        b.draw();
        if (b.destroy) {
            Balls.splice(index, 1);
        }
    })
}

function Ball(x, y, radius) {
    this.dx = Math.random()*2;
    this.dy = Math.random()*2;
    this.x = x;
    this.y = y;
    this.radius = radius || 40;
    this.fillStyle =  '#'+Math.floor(Math.random()*16777215).toString(16);
    this.stopped = false;

    this.draw = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.fillStyle;
        ctx.fill();
/*        ctx.lineWidth = 4;
        ctx.strokeStyle = "black";
        ctx.stroke();*/
        ctx.closePath();

        move.call(this);
    }
}

function move() {
    collisionDetection.call(this);
    
    if (this.stopped) return;
    
    if (this.x + this.dx > canvas.width - this.radius || this.x + this.dx < this.radius) {
        this.dx = -this.dx;
    }
    if (this.y + this.dy > canvas.height - this.radius || this.y + this.dy < this.radius) {
        this.dy = -this.dy;
    }
    
    this.x += this.dx;
    this.y += this.dy;
}

function collisionDetection() {
    Balls.forEach((b, index) => {
        let dx = this.x - b.x;
        let dy = this.y - b.y;
        let distance = Math.sqrt(dx*dx+dy*dy);

        if (distance !== 0 && distance <= (this.radius + b.radius)) {
            //37.71368821877989 84
           // console.log(distance, this.radius + b.radius)
            console.log('бумць')
            
            this.dx = -this.dx;
            this.dy = -this.dy;
            
            //this.fillStyle =  '#'+Math.floor(Math.random()*16777215).toString(16);

/*            b.dx = -b.dx;
            b.dy = -b.dy;*/

            if (((this.radius + b.radius) - distance) > (Math.abs(this.dx)*2 + Math.abs(b.dx)*2)) {
                this.destroy = true;
                add();
            }
        }
    })
}

for(let i =0; i<=45; i++) {
    add();
}

function add() {
    Balls.push(new Ball(Math.random()*1500, Math.random()*900,  Math.random()*40+10))
}
canvas.addEventListener("click", function(e) {
    Balls.push(new Ball(e.clientX, e.clientY,  Math.random()*20+10))
});
