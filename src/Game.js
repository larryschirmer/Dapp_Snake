/**
 * Snake game logic copied liberally from
 * https://jordaneldredge.com/blog/the-game-snake-in-90-lines-of-javascript/
 * and related github repo
 * https://github.com/captbaritone/snake.js
 *
 * Thanks Jordane
 */

import EventEmitter from 'events';

class Game extends EventEmitter {
  constructor({ size, grid_size, ctx }) {
    super({ size, grid_size, ctx });
    this.ctx = ctx;
    this.size = size;
    this.grid_size = grid_size;
    this.direction = 1; // -2: up, 2: down, -1: left, 1: right
    this.snakeLength = 5;
    this.snake = [{ x: size / 2, y: size / 2 }]; // Snake starts in the center
    this.candy = null;
    this.end = false;

    this.randomOffset = this.randomOffset.bind(this);
    this.stringifyCoord = this.stringifyCoord.bind(this);
  }

  randomOffset() {
    return Math.floor(Math.random() * this.size / this.grid_size) * this.grid_size;
  }

  stringifyCoord(obj) {
    return [obj.x, obj.y].join(',');
  }

  tick(newDirection = 1) {
    let newHead = { x: this.snake[0].x, y: this.snake[0].y };

    // Only change directon if the new direction is a different axis
    const directionIsDifferent = Math.abs(this.direction) !== Math.abs(newDirection);
    if (directionIsDifferent) this.direction = newDirection;

    // Assign new direction
    let axis = Math.abs(this.direction) === 1 ? 'x' : 'y'; // 1, -1 are X; 2, -2 are Y
    if (this.direction < 0) {
      newHead[axis] -= this.grid_size; // Move left or down
    } else {
      newHead[axis] += this.grid_size; // Move right or up
    }

    // Did we eat a candy? Detect if our head is in the same cell as the candy
    if (this.candy && this.candy.x === newHead.x && this.candy.y === newHead.y) {
      this.candy = null;
      this.snakeLength += 20;
      this.emit('score-update', { score: this.snakeLength });
    }

    this.ctx.fillStyle = '#002b36';
    this.ctx.fillRect(0, 0, this.size, this.size); // Reset the play area

    if (this.end) {
      this.ctx.fillStyle = '#eee8d5';
      this.ctx.font = '40px serif';
      this.ctx.textAlign = 'center';
      this.ctx.fillText('Refresh to play again', this.size / 2, this.size / 2);
    } else {
      this.snake.unshift(newHead); // Add the new head to the front
      this.snake = this.snake.slice(0, this.snakeLength); // Enforce the snake's max length
    }

    // Detect wall collisions
    const touchingCeiling = newHead.x >= this.size;
    const touchingWallRight = newHead.y >= this.size;
    const touchingFloor = newHead.x < 0;
    const touchingWallLeft = newHead.y < 0;
    if (touchingFloor || touchingCeiling || touchingWallLeft || touchingWallRight) {
      this.end = true;
      this.emit('gameover');
    }

    this.ctx.fillStyle = '#268bd2';

    let snakeObj = {};
    this.snake.forEach((_, i) => {
      let a = this.snake[i];
      this.ctx.fillRect(a.x, a.y, this.grid_size, this.grid_size); // Paint the snake

      // Build a collision lookup object
      if (i > 0) snakeObj[this.stringifyCoord(a)] = true;
    });

    if (snakeObj[this.stringifyCoord(newHead)]) {
      this.end = true;
      this.emit('gameover');
    } // Collided with our tail

    // Place a candy (not on the snake) if needed
    while (!this.candy || snakeObj[this.stringifyCoord(this.candy)]) {
      this.candy = { x: this.randomOffset(), y: this.randomOffset() };
    }

    this.ctx.fillStyle = '#b58900';
    this.ctx.fillRect(this.candy.x, this.candy.y, this.grid_size, this.grid_size); // Paint the candy
  }
}

export default Game;
