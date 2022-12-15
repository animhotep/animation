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
    
    Balls.forEach((b, index) => {
        b.draw();
/*        if (b.destroy) {
            delete Balls[index]
        }*/
    })
}

function Ball(x, y) {
    this.dx = 1;
    this.dy = 1;
    this.x = x;
    this.y = y;
    this.radius = 40;
    this.fillStyle = "#0095DD";

    this.draw = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.fillStyle;
        ctx.fill();
        ctx.lineWidth = 4;
        ctx.strokeStyle = "black";
        ctx.stroke();
        ctx.closePath();

        move.call(this);
    }
}

function move() {
    collisionDetection.call(this);
    
    if (this.x + this.dx > canvas.width - this.radius || this.x + this.dx < this.radius) {
        this.destroy = true;
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
            console.log('=')
            this.dx = -this.dx;
            this.dy = -this.dy;
            b.dx = -b.dx;
            b.dy = -b.dy;
            
            
            b.radius +=1;
            this.radius -=1;
            this.fillStyle =  '#'+Math.floor(Math.random()*16777215).toString(16);
        }
/*        if (this.x + this.dx < (b.x+b.radius*2) && this.x > b.x) {
            this.fillStyle = "red";
            this.dx = -this.dx*Math.random();
            b.dx = -b.dx;
            console.log(this.x)
        }
        
        if (this.y + this.dy > (b.y-b.radius*2) && this.y < b.y) {
            this.fillStyle = "green";
            this.dy = -this.dy;
            b.dy = -b.dy;
            console.log(this.y)
        }*/
    })
}

Balls.push(new Ball(450, 450))
Balls.push(new Ball(450, 50))

function add() {
    Balls.push(new Ball(Math.random()*100+40, Math.random()*200+40))
}
