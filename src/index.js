import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import App from './App';
import MainScreen from './MainScreen';
import SignUp from './SignUp';

class BothPages extends Component {
  state = {
    show: [1, 0, 0],
  };

  onClick = frame => {
    const newShow = new Array(3).fill().map((_, i) => (i === frame ? 1 : 0));
    this.setState({ show: newShow });
  };

  render() {
    return (
      <Fragment>
        <styles.Layout>
          <styles.FrameOne show={this.state.show[0]}>
            <MainScreen />
          </styles.FrameOne>
          <styles.FrameTwo show={this.state.show[1]}>
            <SignUp />
          </styles.FrameTwo>
          <styles.FrameThree show={this.state.show[2]}>
            <App />
          </styles.FrameThree>
        </styles.Layout>
        <div onClick={() => this.onClick(0)}>Hey 0</div>
        <div onClick={() => this.onClick(1)}>Hey 1</div>
        <div onClick={() => this.onClick(2)}>Hey 2</div>
      </Fragment>
    );
  }
}

const styles = {
  Layout: styled.div`
    width: 600px;
    height: 600px;
    border: 1px solid black;
    position: relative;
    overflow: hidden;

    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 0 auto;
  `,
  FrameOne: styled.div`
    transform: 'translate(0, 0)';
    position: absolute;

    ${({ show }) =>
      show
        ? `
        transition: all 500ms;
        transform: 'translate(0, 0)';
        `
        : `
        transition: all 500ms;
        transform: translateX(-600px);
        `};
  `,

  FrameTwo: styled.div`
    transform: 'translate(0, 0)';
    position: absolute;

    ${({ show }) =>
      show
        ? `
      transition: all 500ms;
      transform: 'translate(0, 0)';
      `
        : `
      transition: all 500ms;
      transform: translateX(600px);
      `};
  `,

  FrameThree: styled.div`
    transform: 'translate(0, 0)';
    position: absolute;

    ${({ show }) =>
      show
        ? `
      transition: all 500ms;
      transform: 'translate(0, 0)';
      `
        : `
      transition: all 500ms;
      transform: translateX(600px);
      `};
  `,
};

ReactDOM.render(<BothPages />, document.getElementById('root'));
