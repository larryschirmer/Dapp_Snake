import React from 'react';
import styled from 'styled-components';

import { trimAddress } from '../functions';

export default scores =>
  scores.map((score, index) => (
    <styles.Score key={`${score.address}-${index}`} index={index}>
      <div>{score.name}</div>
      <div>{trimAddress(score.address)}</div>
      <div>{score.score}</div>
    </styles.Score>
  ));

const styles = {
  Score: styled.div`
    grid-column: 1/2;
    grid-row: ${({ index }) => `${Number(index) + 2}/${Number(index) + 3}`}
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
