import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import App from './App';
import MainScreen from './MainScreen';
import SignUp from './SignUp';

import { getPlayerInfo } from './fetch';

class BothPages extends Component {
  state = {
    show: [1, 0, 0],
    persona: false,
  };

  async componentDidMount() {
    const persona = await getPlayerInfo();
    this.setState({ persona });
  }

  onClick = frame => {
    const newShow = new Array(3).fill().map((_, i) => (i === frame ? 1 : 0));
    this.setState({ show: newShow });
  };

  updateName = async () => {
    const persona = await getPlayerInfo();
    this.setState({ persona });
  };

  render() {
    return (
      <Fragment>
        <styles.Layout>
          <styles.FrameOne show={this.state.show[0]}>
            <MainScreen
              persona={this.state.persona}
              changeFrame={frame => this.onClick(frame)}
            />
          </styles.FrameOne>
          <styles.FrameTwo show={this.state.show[1]}>
            <SignUp
              persona={this.state.persona}
              cb={this.updateName}
              changeFrame={frame => this.onClick(frame)}
            />
          </styles.FrameTwo>
          <styles.FrameThree show={this.state.show[2]}>
            <App changeFrame={frame => this.onClick(frame)} />
          </styles.FrameThree>
        </styles.Layout>
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
