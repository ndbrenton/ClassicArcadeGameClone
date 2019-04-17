// Variables for instances go within constructor functions

var Enemy = function(x, y, speed) { // Enemy constructor function
    this.sprite = 'images/enemy-bug.png'; // img/sprite for enemies
    this.x = x; // coordinates to manipulate enemies position
    this.y = y + 55; // centers bug vertically within tile
    this.xMove = 101;
    this.xLimitLeft = 0 - this.xMove;  // located one tile before game grid
    this.xLimitRight = this.xMove * 5; // located one tile past game grid
    this.speed = speed;
};

// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) { // Updates enemy's position
    if (this.x < this.xLimitRight) { // if enemy is within x and y limits
        this.x += this.speed * dt; // move right
    } else  {
        if (this.speed < 200) { // if speed is less than 200 px/refresh
            this.speed = this.speed + (speedAdjust() + speedAdjust()); // speedup
        } else if (this.speed > 275) { // if speed is greater than 275 px/refresh
            this.speed = this.speed - (speedAdjust() + speedAdjust()); // slowdown
        } 
        this.x = this.xLimitLeft; // reset x position once enemy reaches limit
        this.y = randomRow() + 55;// adjust y position, possibly switching rows
    }
};

Enemy.prototype.render = function() { // Enemy render() method
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


var Player = function () { // Player constructor function 
    this.sprite = 'images/char-boy.png';
    this.xMove = 101; // size of horizontal movement in pixels
    this.yMove = 83; // size of verticle movement in pixels
    this.xStart = this.xMove * 2; // starting x position
    this.yStart = (this.yMove * 4) + 55; // starting y, with pad  
    this.x = this.xStart;
    this.y = this.yStart;

}

Player.prototype.update = function () { // Player's update() method
    for(let enemy of allEnemies) { // Collision detection
        if (this.y === enemy.y && (enemy.x + enemy.xMove / 2  > this.x 
                               &&  enemy.x < this.x + this.xMove / 2)) {
           this.reset(); // send char back to starting position
        }
    }
    if (this.y === -28) { // if player reaches water
        this.reset(); // send char back to starting position
    }
}

Player.prototype.render = function () { // Player's .render() method
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.reset = function () { // sends character back to starting pos
    this.x = this.xStart;
    this.y = this.yStart;
}

Player.prototype.handleInput = function (input) { // Player's handleInput() method
    if (input == "left") { // if left-arrow is de-pressed
        if (this.x > 0) { // limits left-side 
            this.x -= this.xMove; // move left
        }
    }
    if (input == "up") { // if up-arrow is de-pressed
        if (this.y > 0) { // limits top before water
            this.y -= this.yMove; // move up
        }
    }
    if (input == "right") { // if right-arrow is de-pressed
        if (this.x < this.xMove * 4) { // limits right-side
            this.x += this.xMove; // move right
        }
    }
    if (input == "down") { // if down-arrow is de-pressed
        if (this.y < this.yMove * 4) { // limits lower border
            this.y += this.yMove; // move down
        }
    }
}

// generates a number representing one of the three stone rows
function randomRow() {
    const stoneRows = [
        (83 * 0),
        (83 * 1),
        (83 * 2)
    ];
    return stoneRows[Math.floor(Math.random() * stoneRows.length)];
}

// generates a number to adjust enemy's speed
function speedAdjust() {
    return Math.floor(Math.random() * 75 + 10);
}

// instantiates aka "initializes" objects 
const enemy1 = new Enemy(-101, 0, 100 + speedAdjust());
const enemy2 = new Enemy(-101, 83, 100 + speedAdjust());
const enemy3 = new Enemy(-101, 83 * 2, 100 + speedAdjust());
// Places enemy objects in allEnemies array
const allEnemies = [];
allEnemies.push(enemy1, enemy2, enemy3);
// Places the player object in a variable called player
const player = new Player();

// listens for key presses and sends the keys to Player's handleInput() method
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
