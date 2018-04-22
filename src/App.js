import React, { Component } from 'react';
import styled from 'styled-components';
import Game from './Game';

const foodLines = [
  'Is butter a carb?',
  '...chew like you have a secret',
  'You gonna eat your tots?',
  'Life is like a box of chocolates...',
  'Fish are friends, not food',
  'One bite and all your dreams will come true',
  'First we eat, then we do everything else',
  'A balanced diet is a cookie in each hand',
  'He was a bold man that first ate an oyster',
];

const getNumber = () => {
  const { random, floor } = Math;
  return floor(random() * 9);
};

const SIZE = 550;
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
    distraction: foodLines[0],
    gameover: false,
  };

  componentDidMount() {
    const { canvas } = this;
    const ctx = initializeCanvas(canvas);
    const game = new Game({ size: SIZE, grid_size: GRID_SIZE, ctx });

    const gameId = setInterval(() => game.tick(newDirection), 100); // Kick off the game loop!
    window.onkeydown = e => {
      newDirection = { 37: -1, 38: -2, 39: 1, 40: 2 }[e.keyCode] || newDirection;
    };

    game.on('gameover', () => {
      console.log('game over it says');
      this.setState({ gameover: true });
      clearInterval(gameId);
    });

    game.on('score-update', ({ score }) => {
      const distraction = foodLines[getNumber()];
      this.setState({ score, distraction });
    });
  }

  render() {
    const { score, distraction, gameover } = this.state;
    return (
      <styles.Game>
        <styles.Header>
          <styles.Distraction>{distraction}</styles.Distraction>
          <styles.Score>{score}</styles.Score>
        </styles.Header>
        <styles.PlayField>
          <canvas ref={x => (this.canvas = x)} />
        </styles.PlayField>
        {gameover && <styles.GameOver>GameOver</styles.GameOver>}
      </styles.Game>
    );
  }
}

const styles = {
  Game: styled.div`
    border: 1px dotted #101010;
    width: 600px;
    height: 600px;
    display: grid;

    grid-template-columns: auto
    grid-template-rows: 50px 500px 50px;
    position: relative;
  `,

  Header: styled.div`
    grid-row: 1/2;
    display: grid;

    grid-template-columns: 400px auto 100px 25px;
    grid-template-rows: auto;
  `,

  Score: styled.div`
    grid-column: 3/4;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  `,

  Distraction: styled.div`
    font-size: 18px;
    grid-column: 1/2;
    display: flex;
    align-items: center;
    padding-left: 25px;
  `,

  PlayField: styled.div`
    grid-row: 2/3;
    display: flex;
    justify-content: center;
  `,

  GameOver: styled.div`
    width: 300px;
    height: 150px;
    border: 1px solid black;
    position: absolute;
    top: 250px;
    left: 150px;
    background: white;

    display: flex;
    justify-content: center;
    align-items: center;
  `,
};

export default App;
