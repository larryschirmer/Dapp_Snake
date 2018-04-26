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
    ready: false,
    gameover: false,
    buttonActivePost: false,
    buttonActiveReturn: false,
    game: null,
    gameId: null,
  };

  startGame = () => {
    const { canvas } = this;
    const ctx = initializeCanvas(canvas);
    const game = new Game({ size: SIZE, grid_size: GRID_SIZE, ctx });

    window.onkeydown = e => {
      newDirection = { 37: -1, 38: -2, 39: 1, 40: 2 }[e.keyCode] || newDirection;
    };

    game.on('score-update', ({ score }) => {
      const distraction = foodLines[getNumber()];
      this.setState({ score, distraction });
    });

    game.on('gameover', this.stopGame);

    this.setState({ game });

    const gameId = setInterval(() => game.tick(newDirection), 100);
    this.setState({ gameId, ready: true });
  };

  stopGame = () => {
    const { gameId } = this.state;
    console.log('game over it says');
    clearInterval(gameId);
    this.setState({ gameover: true, gameId: null, game: null });
  };

  onPostScore = () => {
    console.log('user posted score');
  };

  onGoBack = () => {
    console.log('user wants to go back');
    this.props.changeFrame(0);
    this.setState({ gameover: false, ready: false });
  };

  render() {
    const { score, distraction, gameover, ready } = this.state;
    return (
      <styles.Game>
        <styles.Header>
          <styles.Distraction>{distraction}</styles.Distraction>
          <styles.Score>{score}</styles.Score>
        </styles.Header>
        <styles.PlayField>
          <canvas ref={x => (this.canvas = x)} />
        </styles.PlayField>
        {gameover && (
          <styles.DisplayWindow>
            <div>GameOver</div>
            <styles.Button
              onMouseOver={() => this.setState({ buttonActivePost: true })}
              onMouseOut={() => this.setState({ buttonActivePost: false })}
              onClick={this.onPostScore}>
              How's about we post that score?
              {this.state.buttonActivePost && <styles.ButtonUnderline width={270} />}
            </styles.Button>
            <styles.Button
              onMouseOver={() => this.setState({ buttonActiveReturn: true })}
              onMouseOut={() => this.setState({ buttonActiveReturn: false })}
              onClick={this.onGoBack}>
              Nah, I'll go back
              {this.state.buttonActiveReturn && <styles.ButtonUnderline width={141} />}
            </styles.Button>
          </styles.DisplayWindow>
        )}
        {!ready && (
          <styles.DisplayWindow>
            <div>Ready?</div>
            <styles.Button
              onMouseOver={() => this.setState({ buttonActivePost: true })}
              onMouseOut={() => this.setState({ buttonActivePost: false })}
              onClick={this.startGame}>
              Start Game
              {this.state.buttonActivePost && <styles.ButtonUnderline width={97} />}
            </styles.Button>
          </styles.DisplayWindow>
        )}
      </styles.Game>
    );
  }
}

const styles = {
  Game: styled.div`
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

  DisplayWindow: styled.div`
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
    flex-direction: column;

    > div:nth-child(1) {
      font-size: 24px;
      padding-bottom: 5px;
    }
  `,

  Button: styled.div`
    position: relative
    cursor: pointer;
    font-size: 21px;
  `,

  ButtonUnderline: styled.div`
    position: absolute;

    top: 23px;
    width: ${({ width }) => width}px;
    height: 2px;
    background: #000;
    z-index: 10;
  `,
};

export default App;
