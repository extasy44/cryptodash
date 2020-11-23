import React, { useContext } from 'react';
import ConfirmButton from './ConfirmButton';
import { AppContext } from '../App/AppProvider';

const WelcomeMessage = () => {
  const { state } = useContext(AppContext);
  console.log(state);
  return state.firstVisit ? (
    <div>
      Welcome to CryptoDash, please select your favorite coins to begin.{' '}
      <ConfirmButton />
    </div>
  ) : null;
};

export default WelcomeMessage;
