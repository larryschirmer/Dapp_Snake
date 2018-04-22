import React, { Component } from 'react';
import styled from 'styled-components';

const newHere = `Hey, you're new here. How's about we get you logged in?`;
const mockName = `creator`;
const mockAddress = `0x9495BA0b81f92d45C2F4...`;
const mockScore = `218`;

class MainScreen extends Component {
  render() {
    return (
      <styles.Screen>
        <styles.Title>Dapp Snake!</styles.Title>
        <styles.SplishSplash>Flashy Image Thing</styles.SplishSplash>
        <styles.ReadyPlayerOne>
          <div>{newHere}</div>
        </styles.ReadyPlayerOne>
        <styles.HighScore>
          <styles.ScoreBoardHeader>Top Scores</styles.ScoreBoardHeader>
          <styles.Score index={0} border>
            <div>{mockName}</div>
            <div>{mockAddress}</div>
            <div>{mockScore}</div>
          </styles.Score>
          <styles.Score index={1}>
            <div>{mockName}</div>
            <div>{mockAddress}</div>
            <div>{mockScore}</div>
          </styles.Score>
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
  Score: styled.div`
    grid-column: 1/2;
    grid-row: ${({ index }) => `${index + 2}/${index + 3}`}
    font-size: 18px;

    display: grid;
    grid-template-columns: 200px 300px 100px;

    ${({ border }) => (border ? `border-bottom: 1px solid blue` : ``)}

    > div {
      display: flex;
      padding-left: 10px;
      align-items: center;
    }

    > div:nth-child(1) {
      grid-column: 1/2;
    }

    > div:nth-child(2) {
      grid-column: 2/3;
    }

    > div:nth-child(3) {
      grid-column: 3/4;
    }
  `,
};

export default MainScreen;
