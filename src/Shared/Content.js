import React, { useContext } from 'react';
import { AppContext } from '../App/AppProvider';

const Content = ({ children }) => {
  const { state } = useContext(AppContext);
  const { coinList, prices, firstVisit } = state;
  if (!coinList) {
    return <div>Loading Coins ... </div>;
  }

  if (!prices) {
    return <div>Loading Prices ... </div>;
  }

  return <div>{children}</div>;
};

export default Content;
