const game = {
    id: 'game',
    elem: null,
    width: 800,
    height: 600,
    background: 'white',
    create() {
        document.body.innerHTML += `<div id='${this.id}'></div>`;
        this.show();
    },
    show() {
        this.elem = document.getElementById(`${this.id}`);
        this.elem.style.width =  this.width + 'px';
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
    },
    move() {
        if (this.topChange < 0 || this.topChange + this.height >= game.height - bar.height && 
                                  this.leftChange + this.width/2 > bar.leftChange && 
                                  this.leftChange + this.width/2 < bar.leftChange + bar.width) {this.topPixel *= -1};
        if (this.leftChange >= game.width - this.width || this.leftChange < 0) this.leftPixel *= -1;
        if (this.topChange + this.height > game.height ) {console.log('game over')};
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
    }
}
game.create();
ball.create();
setInterval(() => ball.show(), 10);
bar.create();
document.onkeydown = (e) => {bar.move(e)};
