import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import App from './App';
import MainScreen from './MainScreen';
import SignUp from './SignUp';

const BothPages = () => (
  <styles.Layout>
    <MainScreen />
    <SignUp />
    <App />
  </styles.Layout>
);

const styles = {
  Layout: styled.div`
    width: 1805px;
    height: 605px;

    display: flex;
    flex-direction: row;
  `,
};

ReactDOM.render(<BothPages />, document.getElementById('root'));
