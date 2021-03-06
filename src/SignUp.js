import React, { Component } from 'react';
import styled from 'styled-components';
import generate from 'project-name-generator';

import { setName } from './fetch';

const finePrint = `Totally optional. But, I mean this is a real opportunity to choose a name that defines who you aspire to be. Or you could choose an ironic name like Indiana Jones. Just saying… Also, if you choose to not have a "Gamer Handle", then this app will give you a random name which, roll the dice, could be cool, but you might end up with a hopelessly boring name like Dapp Snake.`;

const Input = ({ name, value, cb }) => (
  <styles.Input type="text" name={name} value={value} onChange={cb} />
);

const processGamerHandle = handle => {
  let processed = handle.split('');
  processed = processed.map(char => {
    if (char === ' ') return '-';
    return char;
  });

  return processed.join('');
};

class SignUp extends Component {
  state = {
    gamerName: '',
    buttonActive: false,
  };

  onChange = ({ target: { name, value } }) => {
    this.setState({ [name]: processGamerHandle(value) });
  };

  onSaveName = async () => {
    this.props.changeFrame(0);
    const { gamerName } = this.state;

    let nameToSave = gamerName;
    if (gamerName === '') nameToSave = generate({ words: 2 }).dashed;

    await setName(nameToSave);
    this.props.cb();
  };

  render() {
    const { gamerName } = this.state;
    return (
      <styles.Screen>
        <styles.InteractionWindow>
          <styles.Description>Give yourself a gamer name</styles.Description>
          <Input name="gamerName" value={gamerName} cb={this.onChange} />
        </styles.InteractionWindow>
        <styles.FinePrint>
          <div>Fine Print:</div>
          <div>{finePrint}</div>
        </styles.FinePrint>
        <styles.Button
          onMouseOver={() => this.setState({ buttonActive: true })}
          onMouseOut={() => this.setState({ buttonActive: false })}
          onClick={this.onSaveName}>
          Commitment
          {this.state.buttonActive && <styles.ButtonUnderline width={111} />}
        </styles.Button>
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

  InteractionWindow: styled.div`
    grid-row: 2/3;
  `,

  Description: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
  `,

  Input: styled.input`
    outline: none;
    border: transparent;
    background: transparent;

    border: 1px solid black;
    border-radius: 5px;
    margin: 70px 36px 70px 178px;
    font-size: 24px;
    text-align: center;
  `,

  FinePrint: styled.div`
    grid-row: 4/5;

    display: flex;
    justify-content: flex-end;
    flex-direction: column;
    padding: 0px 20px 12px;

    > div:nth-child(1) {
      font-size: 14px;
      padding-bottom: 3px;
    }

    > div:nth-child(2) {
      font-size: 12px;
      line-height: 14px;
    }
  `,

  Button: styled.div`
  grid-row: 3/4;
    position: relative
    cursor: pointer;
    font-size: 21px;
    display: flex;
    justify-content: center;
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

export default SignUp;
