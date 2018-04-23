import React, { Component } from 'react';
import styled from 'styled-components';

import { processScores } from './functions';
import { getScores } from './fetch';

const newHere = `Hey, you're new here. How's about we get you logged in?`;

class MainScreen extends Component {
  state = {
    scores: false,
  };

  componentDidMount() {
    this.getScores();
  }

  getScores = async () => {
    const scores = await getScores();
    this.setState({ scores });
  };

  render() {
    const { scores } = this.state;

    return (
      <styles.Screen>
        <styles.Title>Dapp Snake!</styles.Title>
        <styles.SplishSplash>Flashy Image Thing</styles.SplishSplash>
        <styles.ReadyPlayerOne>
          <div>{newHere}</div>
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
    border: 1px dotted #101010;
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
    border: 1px solid black;
    grid-row: 1/2;
  `,

  SplishSplash: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 36px;
    border: 1px solid black;
    grid-row: 2/3;
  `,

  ReadyPlayerOne: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    border: 1px solid black;
    grid-row: 3/4;
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
};

export default MainScreen;
