// Enemies our player must avoid
var Enemy = function(x, y, u) {
    this.x = x;
    this.y = y;
    this.u = Math.floor((Math.random()*200)+100);
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.u*dt;

    //reset enemy position at the end of the canvas
    if(this.x > 883) {
        this.x = -100;
        this.u = Math.floor((Math.random()*200)+100);
    }
    
    //set collitions
    if((this.x <= (player.x + 45)) && (this.x >= (player.x - 45)) && (this.y === player.y)) {
            setTimeout(function() {
            player.x = 400;
            player.y = 720;
            }, 10);
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

Player.prototype.update = function() {
    //when player on water goes back to square one.
    if (this.y === -27) {
        setTimeout(function() {
            //this in here is the global window object!!!
            //that is why this is not working!!
            player.x = 400;
            player.y = 720;
        }, 50);


    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//When player loses or wins
Player.prototype.reset = function() {
    
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
        this.y -= 83;
        break;

        case 'down':
        this.y += 83;
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

    if(this.x >= 800 && keyInput === 'right') {
        this.x = 800;
    }

    if(this.y <= -27 && keyInput === 'up') {
        this.y = -27;
    }

    if(this.y >= 720 && keyInput === 'down') {
        this.y = 720;
    }

};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const enemy1 = new Enemy(-600, 56, 1);
const enemy2 = new Enemy(-300, 139, 1);
const enemy3 = new Enemy(-100, 222, 1);
const enemy4 = new Enemy(-350, 305, 1);
const enemy5 = new Enemy(-150, 388, 1);
const enemy6 = new Enemy(-500, 471, 1);
const enemy7 = new Enemy(-350, 554, 1);
const enemy8 = new Enemy(-250, 471, 1);
const enemy9 = new Enemy(-50, 305, 1);
const enemy10 = new Enemy(-100, 56, 1);
const allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6, enemy7, enemy8, enemy9, enemy10];
const player = new Player(400, 720, 1);

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
