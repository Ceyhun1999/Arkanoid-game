const game = {
    id: 'game',
    elem: null,
    width: 800,
    height: 500,
    background: 'white',
    create() {
        document.body.innerHTML += `<div id='${this.id}'></div>`;
        this.show();
    },
    show() {
        this.elem = document.getElementById(`${this.id}`);
        this.elem.style.maxWidth =  this.width + 'px';
        this.elem.style.height =  this.height + 'px';
        this.elem.style.background =  this.background;
    },
};

const ball = {
    id: 'ball',
    elem: null,
    width: 30,
    height: 30,
    background: 'red',
    topPixel: 2,
    leftPixel: 2,
    topChange: 0,
    leftChange: 0,
    create() {
        game.elem.innerHTML += `<div id='${this.id}'></div>`;
        this.show();
    },
    show() {
        this.elem = document.getElementById(`${this.id}`);
        this.elem.style.width =  this.width + 'px';
        this.elem.style.height =  this.height + 'px';
        this.elem.style.borderRadius =  '50%';
        this.elem.style.background =  this.background;
        this.elem.style.top = this.topChange + 'px';
        this.elem.style.left = this.leftChange + 'px';
        this.move();
        bricks.collision();
    },
    move() {
        if (this.topChange < 0 || this.topChange + this.height > game.height - bar.height && 
                                  this.leftChange + this.width/2 > bar.leftChange && 
                                  this.leftChange + this.width/2 < bar.leftChange + bar.width) {this.topPixel *= -1};
        if (this.leftChange >= game.width - this.width || this.leftChange < 0) this.leftPixel *= -1;
        if (this.topChange > game.height - this.height ) {
           alert('game over')
        };
        this.topChange += this.topPixel;
        this.leftChange += this.leftPixel;
    },
};

const bar = {
    id: 'bar',
    elem: null,
    width: 150,
    height: 10,
    background: 'blue',
    leftPixel: 10,
    leftChange: 0,
    bottom: 0,
    create() {
        game.elem.innerHTML += `<div id='${this.id}'></div>`;
        this.show();
    },
    show() {
        this.elem = document.getElementById(`${this.id}`);
        this.elem.style.width = this.width + 'px';
        this.elem.style.height = this.height + 'px';
        this.elem.style.bottom = this.bottom + 'px';
        this.elem.style.background = this.background;
        this.elem.style.left = this.leftChange + 'px';
    },
    move(e) {
        if (e.keyCode === 39 && this.leftChange < game.width - this.width) this.leftChange += this.leftPixel;  
        if (e.keyCode === 37 && this.leftChange > 0) this.leftChange -= this.leftPixel;
        this.show();
        bricks.collision();
    },
};

const bricks = {
    setir: 3,
    sira: 5,
    gap: 5,
    arr: [],
    scoreNum: 0,
    create() {
        for (let i = 0; i < this.setir; i++) {
            for (let j = 0; j < this.sira; j++) {
                let brick = new function() {
                    this.id = `brick${i}${j}`;
                    this.elem = null;
                    this.width = (game.width - bricks.gap * (bricks.sira + 1)) / bricks.sira;
                    this.height = this.width / 4;
                    this.color = '#99dfff';
                    this.x = j * this.width + (j + 1) * bricks.gap;
                    this.y = i * this.height + (i + 1) * bricks.gap;
                    this.status = 1;
                }
                this.arr.push(brick);
                game.elem.innerHTML += `<div class="td" id="${brick.id}"></div>`;
            }
        }
        this.show();
    },
    show() {
        this.arr.forEach(item => {
            item.elem = document.getElementById(item.id);
            item.elem.style.width = item.width + 'px';
            item.elem.style.height = item.height + 'px';
            item.elem.style.background = item.color;
            item.elem.style.left = item.x + 'px';
            item.elem.style.top = item.y + 'px'
        });
    },
    collision() {
        this.arr.forEach((brick, i, array) => {
            if( ball.leftChange + ball.width > brick.x  &&  ball.leftChange < brick.x + brick.width &&
                ball.topChange + ball.height > brick.y  &&  ball.topChange < brick.y + brick.height) {
                brick.elem.remove();
                array.splice(i, 1) ;
                ball.topPixel *= -1;
                this.scoreNum += 1;
                const scoreText = document.getElementById('scoreText');
                scoreText.innerHTML = `Score: ${this.scoreNum}`;
                if(this.scoreNum == 15) {
                    alert('you win')
                };
            }
        });
    }
}
ball.leftChange = bar.leftChange + bar.width/2 - ball.width/2;
ball.topChange = game.height - bar.height - ball.height;
ball.topPixel = -1;
game.create();
ball.create();
bar.create();
bricks.create();
setInterval(() => ball.show(), 10);
document.onkeydown = (e) => {bar.move(e)};
