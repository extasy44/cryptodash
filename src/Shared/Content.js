import React, { useContext } from 'react';
import { AppContext } from '../App/AppProvider';

const Content = ({ children }) => {
  const { state } = useContext(AppContext);

  console.log(state.coinList);
  if (!state.coinList) {
    return <div>Loading Coins</div>;
  }

  return <div>{children}</div>;
};

export default Content;
