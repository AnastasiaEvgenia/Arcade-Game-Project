// Enemies our player must avoid
var Enemy = function(x, y, u) {
    this.x = x;
    this.y = y;
    this.u = Math.floor((Math.random()*100)+50);
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.u*dt;
    if(this.x > 500) {
        this.x = -300;
        this.u = Math.floor((Math.random()*100)+100);
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, u) {
    this.x = x;
    this.y = y;
    this.u = u;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function(dt) {
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


Player.prototype.handleInput = function(keyInput) {

    //Makes player move according to keyboard keys pressed
    switch (keyInput) {
        case 'left':
        this.x -= 100;
        break;

        case 'right':
        this.x += 100;
        break;

        case 'up':
        this.y -= 90;
        break;

        case 'down':
        this.y += 90;
        break;

        default:
        this.x = this.x;
        this.y = this.y;
    }

    /*
     * If statements check player not to go
     * out of canvas area. 
     */
    if(this.x <= 0 && keyInput === 'left') {
        this.x = 0;
    }

    if(this.x >= 400 && keyInput === 'right') {
        this.x = 400;
    }

    if(this.y <= -50 && keyInput === 'up') {
        this.y = -50;
    }

    if(this.y >= 400 && keyInput === 'down') {
        this.y = 400;
    }

};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const enemy1 = new Enemy(-100, 60, 0);
const enemy2 = new Enemy(-400, 145, 0);
const enemy3 = new Enemy(-600, 225, 0);
const allEnemies = [enemy1, enemy2, enemy3];
const player = new Player(200, 400, 0);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
