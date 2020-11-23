import React, { useContext } from 'react';
import { AppContext } from '../App/AppProvider';

const Page = ({ name, children }) => {
  const { state } = useContext(AppContext);

  console.log(state);
  if (state.page !== name) {
    return null;
  }
  return <div>{children}</div>;
};

export default Page;
