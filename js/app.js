/*---------- ENEMIES CONSTRUCTOR AND METHODS ----------*/
const Enemy = function(x, y, u) {
    /*
     *Method to randomly set position and velocity of
     *enemy within given limits.
     */
    this.randomize = function() {
        this.x = -Math.floor(Math.random()*550)-50;
        this.y = Math.floor((Math.random()*7))*83+56;
        this.u = Math.floor((Math.random()*250)+125);
    };

    this.sprite = 'images/enemy-bug.png';

    // Initialize the enemies.
    this.randomize();
};


/* 
 *Update the enemy's position, required method for game.
 *Parameter: dt, a time delta between ticks.
 *You should multiply any movement by the dt parameter
 *which will ensure the game runs at the same speed for
 *all computers.
 */
Enemy.prototype.update = function(dt) {

    this.x += this.u*dt;

    // Reset enemy position at the end of the canvas.
    if(this.x > 883) {
        this.randomize();
    }
    
    // Set collitions.
    if((this.x <= (player.x + 45)) && (this.x >= (player.x - 45)) && (this.y === player.y)) {
        setTimeout(function() {
            player.reset();
        }, 10);
    }
    
};


// Draw the enemy on the screen, required method for game.
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


/*---------- PLAYER CONSTRUCTOR AND METHODS ----------*/
const Player = function(x, y, u) {
    this.x = x;
    this.y = y;
    this.u = u;
    this.sprite = 'images/char-boy.png';
};


// When player steps on water goes back to square one.
Player.prototype.update = function() {
    self = this;
    if (this.y === -27) {
        setTimeout(function() {
            self.reset();      //this.player in setTimeout() does not
        }, 500);                 //work!!! this is global object here!!
    }
};


/*
 *Draw player on canvas.
 *Draw message on canvas when player wins.
 */
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    if (this.y === -27) {
        ctx.font = '48px sans-serif';
        ctx.fillStyle = '#c20000';
        ctx.fillText('You win.!!', 350, 270);
    }
};


// Reset player position when he wins or loses. 
Player.prototype.reset = function() {
    this.x = 400;
    this.y = 720;
};


// Makes player move according to keyboard keys pressed.
Player.prototype.handleInput = function(keyInput) {

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


/*---------- INSTANTIATE OBJECTS ----------*/
const player = new Player(400, 720, 1);
const allEnemies = [];

for (let i=1; i<=10;i++) {
    allEnemies.push(new Enemy());
}


/*This listens for key presses and sends the keys to your
 *Player.handleInput() method.
 */
document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
