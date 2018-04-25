import React, { Component, Fragment } from 'react';
import { select } from 'd3-selection';
import styled from 'styled-components';

import { processScores } from './functions';
import { getScores, getPlayerInfo } from './fetch';
import { snake as snakePath } from './snake';

class MainScreen extends Component {
  state = {
    scores: false,
    persona: false,
    buttonActive: false,
  };

  componentDidMount() {
    const svg = select(this.node);

    const snakeImg = svg
      .append('g')
      .attr('transform', `translate(${-500}, ${-550}) scale(0.60)`);

    snakeImg
      .append('path')
      .attr('d', snakePath)
      .attr('stroke', '#000')
      .attr('stroke-width', 2)
      .attr('fill', 'none')
      .attr('stroke-linecap', 'round');

    this.getScores();
    this.getPlayerInfo();
  }

  getPlayerInfo = async () => {
    const playerInfo = await getPlayerInfo();
    this.setState({ persona: playerInfo });
  };

  getScores = async () => {
    const scores = await getScores();
    this.setState({ scores });
  };

  onPlay = () => {
    console.log('you clicked play');
  };

  onSignin = () => {
    console.log('you clicked Signin');
  };

  Persona = ({ data: { name } }) => (
    <Fragment>
      {name ? (
        <styles.WelcomeBackMessage>
          <div>Welcome Back, {name}</div>
          <styles.Button
            onMouseOver={() => this.setState({ buttonActive: true })}
            onMouseOut={() => this.setState({ buttonActive: false })}
            onClick={this.onPlay}>
            Play
            {this.state.buttonActive && <styles.ButtonUnderline width={37} />}
          </styles.Button>
        </styles.WelcomeBackMessage>
      ) : (
        <this.NewHere />
      )}
    </Fragment>
  );

  NewHere = () => (
    <styles.Button
      onMouseOver={() => this.setState({ buttonActive: true })}
      onMouseOut={() => this.setState({ buttonActive: false })}
      onClick={this.onSignin}>
      Hey, you're new here. How's about we get you logged in?
      {this.state.buttonActive && <styles.ButtonUnderline width={486} />}
    </styles.Button>
  );

  render() {
    const { scores, persona } = this.state;

    return (
      <styles.Screen>
        <styles.Title>Dapp Snake!</styles.Title>
        <styles.SplishSplash>
          <svg ref={node => (this.node = node)} width={`600px`} height={`200px`} />
        </styles.SplishSplash>
        <styles.ReadyPlayerOne>
          {persona ? (
            <this.Persona data={persona} />
          ) : (
            'Tipping the scales in your favor...'
          )}
        </styles.ReadyPlayerOne>
        <styles.HighScore>
          <styles.ScoreBoardHeader>Top Scores</styles.ScoreBoardHeader>
          {scores ? (
            processScores(scores)
          ) : (
            <styles.ScoresWaiting>
              Fetching proof of ambitious snake scores...
            </styles.ScoresWaiting>
          )}
        </styles.HighScore>
      </styles.Screen>
    );
  }
}

const styles = {
  Screen: styled.div`
    width: 600px;
    height: 600px;

    display: grid;
    grid-template-columns: auto;
    grid-template-rows: 100px 200px 100px 200px;
  `,

  Title: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 36px;
    grid-row: 1/2;
  `,

  SplishSplash: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 36px;
    grid-row: 2/3;
  `,

  ReadyPlayerOne: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    grid-row: 3/4;
  `,

  WelcomeBackMessage: styled.div`
    display: flex;
    flex-direction: row;

    > div:nth-child(2) {
      margin-left: 125px;
    }
  `,

  HighScore: styled.div`
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: repeat(5, 40px);

    grid-row: 4/5;
  `,

  ScoreBoardHeader: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid black;
    grid-row: 1/2;
    font-size: 24px;
  `,

  ScoresWaiting: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    grid-row: 2/3;
    font-size: 18px;
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

export default MainScreen;
