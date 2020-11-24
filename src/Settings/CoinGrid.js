import React, { useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from '../App/AppProvider';
import CoinTile from './CoinTile';

export const CoinGridStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  grid-gap: 15px;
  margin-top: 20px;
`;

const getLowerSectionCoins = (coinList, filteredCoins) => {
  return (
    (filteredCoins && Object.keys(filteredCoins)) ||
    Object.keys(coinList).slice(0, 100)
  );
};

const getCoinsToDisplay = (coinList, topSection, favorites, filteredCoins) => {
  return topSection ? favorites : getLowerSectionCoins(coinList, filteredCoins);
};

const CoinGrid = ({ topSection }) => {
  const { state } = useContext(AppContext);
  const { coinList, favorites, filteredCoins } = state;

  return (
    <CoinGridStyled>
      {getCoinsToDisplay(coinList, topSection, favorites, filteredCoins).map(
        (coinKey, index) => {
          return (
            <CoinTile coinKey={coinKey} key={index} topSection={topSection}>
              {coinKey}
            </CoinTile>
          );
        }
      )}
    </CoinGridStyled>
  );
};

export default CoinGrid;
