import React, { useContext } from 'react';
import styled, { css } from 'styled-components';
import { AppContext } from './AppProvider';

const Logo = styled.div`
  font-size: 1.5em;
`;

const Bar = styled.div`
  display: grid;
  margin-bottom: 40px;
  grid-template-columns: 180px auto 100px 100px;
`;

const ControlButtonElem = styled.div`
  cursor: pointer;
  ${(props) =>
    props.active &&
    css`
      text-shadow: 0px 0px 60px #03ff03;
    `}
  ${(props) =>
    props.hidden &&
    css`
      display: none;
    `}
`;

const ControlButton = ({ name }) => {
  const { state, dispatch } = useContext(AppContext);

  console.log(state);
  return (
    <ControlButtonElem
      active={state.page === name}
      onClick={() => dispatch({ type: 'page', payload: name })}
    >
      {toProperCase(name)}
    </ControlButtonElem>
  );
};

const toProperCase = (lower) => {
  return lower.charAt(0).toUpperCase() + lower.substr(1);
};

const AppBar = () => {
  return (
    <Bar>
      <Logo> CryptoDash </Logo>
      <div />
      <ControlButton active name="dashboard" />
      <ControlButton name="settings" />
    </Bar>
  );
};

export default AppBar;
