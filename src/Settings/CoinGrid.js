import React, { useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from '../App/AppProvider';
import CoinTile from './CoinTile';

export const CoinGridStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 15px;
  margin-top: 20px;
`;

const getCoinsToDisplay = (coinList) => {
  return Object.keys(coinList).slice(0, 100);
};

const CoinGrid = () => {
  const { state } = useContext(AppContext);
  const { coinList } = state;

  return (
    <CoinGridStyled>
      {getCoinsToDisplay(coinList).map((coinKey, index) => {
        return (
          <CoinTile coinKey={coinKey} key={index}>
            {coinKey}
          </CoinTile>
        );
      })}
    </CoinGridStyled>
  );
};

export default CoinGrid;
