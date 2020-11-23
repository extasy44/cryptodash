import React, { useContext } from 'react';
import { AppContext } from '../App/AppProvider';

const WelcomeMessage = () => {
  const { state } = useContext(AppContext);

  return state.firstVisit ? (
    <div>
      Welcome to CryptoDash, please select your favorite coins to begin.{' '}
    </div>
  ) : null;
};

export default WelcomeMessage;
