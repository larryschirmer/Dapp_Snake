import React, { Component } from 'react';
import Game from './Game';

const SIZE = 500;
const GRID_SIZE = SIZE / 50;
let newDirection = 1;

const initializeCanvas = canvas => {
  canvas.height = SIZE * 2;
  canvas.width = SIZE * 2;
  canvas.style.width = `${SIZE}px`;
  canvas.style.height = `${SIZE}px`;

  const ctx = canvas.getContext('2d');
  ctx.scale(2, 2);
  return ctx;
};

class App extends Component {
  state = {
    score: 0,
  };

  componentDidMount() {
    const { canvas } = this;
    const ctx = initializeCanvas(canvas);
    const game = new Game({ size: SIZE, grid_size: GRID_SIZE, ctx });

    // const gameId = setInterval(() => game.tick(newDirection), 100); // Kick off the game loop!
    window.onkeydown = e => {
      newDirection = { 37: -1, 38: -2, 39: 1, 40: 2 }[e.keyCode] || newDirection;
    };

    game.on('gameover', () => {
      console.log('game over it says');
      // clearInterval(gameId);
    });
    game.on('score-update', ({ score }) => this.setState({ score }));
  }

  render() {
    const { score } = this.state;
    return (
      <div>
        <div>Dapp Snake!</div>
        <canvas ref={x => (this.canvas = x)} />
        <div>{score}</div>
      </div>
    );
  }
}

export default App;
