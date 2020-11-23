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

const getCoinsToDisplay = (coinList, topSection) => {
  return Object.keys(coinList).slice(0, topSection ? 10 : 100);
};

const CoinGrid = ({ topSection }) => {
  const { state } = useContext(AppContext);
  const { coinList } = state;

  return (
    <CoinGridStyled>
      {getCoinsToDisplay(coinList, topSection).map((coinKey, index) => {
        return (
          <CoinTile coinKey={coinKey} key={index} topSection={topSection}>
            {coinKey}
          </CoinTile>
        );
      })}
    </CoinGridStyled>
  );
};

export default CoinGrid;
