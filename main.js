let width = window.innerWidth ;
let height = window.innerHeight;

let Balls = [];
let gen = 0;

function anim() {
//опис самої анімації
    repaint();
    requestAnimationFrame(anim);
}

//перший запуск функції
anim();

function repaint() {
    ballsCount.innerHTML = 'Count: ' + Balls.length;
    Balls.forEach((b, index) => {
        b.draw();
        if (b.destroy) {
            Balls.splice(index, 1);
        }
    })
}

function Ball(x, y, radius) {
    this.dx = Math.random()*2+1;
    this.dy = Math.random()*2+1;
    this.x = x;
    this.y = y;
    this.radius = radius || 40;
    this.fillStyle =  '#'+Math.floor(Math.random()*16777215).toString(16);
    this.stopped = false;
    this.gen = gen;

    let div =  document.createElement('div');
    div.className = 'ball';
    div.style.width = this.radius * 2 +'px';
    div.style.height = this.radius * 2 +'px';
    div.style.backgroundColor = this.fillStyle;

    this.draw = function () {
        div.style.left = this.x - this.radius +'px';
        div.style.top = this.y - this.radius +'px';
        div.innerText = this.gen;
        
        move.call(this);
        document.body.appendChild(div);
        if (this.destroy) div.remove();
    }
}

function move() {
    collisionDetection.call(this);
    
    if (this.stopped) return;
    
    if (this.x + this.dx > width - this.radius || this.x + this.dx < this.radius * 2) {
        this.dx = -this.dx;
    }
    if (this.y + this.dy > height - this.radius || this.y + this.dy < this.radius*2) {
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
            //console.log(distance, this.radius, b.radius)
            console.log('бумць')
            
            this.dx = -this.dx;
            this.dy = -this.dy;
            
            if (((this.radius + b.radius) - distance) > (Math.abs(this.dx)*2 + Math.abs(b.dx)*2)) {
                this.destroy = true;
                add();
                genCount.innerHTML = 'Generation: ' + gen;
                gen++;
            }
        }
    })
}

for(let i =0; i<=45; i++) {
    add();
}

function add() {
    Balls.push(new Ball(Math.random()*width+40, Math.random()*height+40,  Math.random()*45+10))
}

document.addEventListener("click", function(e) {
    Balls.push(new Ball(e.clientX, e.clientY,  Math.random()*20+10))
});
