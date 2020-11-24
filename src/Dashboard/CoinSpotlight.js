import React, { useContext } from 'react';
import styled from 'styled-components';
import { Tile } from '../Shared/Tiles';
import { AppContext } from '../App/AppProvider';
import CoinImage from '../Shared/CoinImage';

const SpotlightName = styled.h2`
  text-align: center;
`;
const CoinSpotlight = () => {
  const { state } = useContext(AppContext);
  const { currentFavorite, coinList } = state;

  return (
    <Tile>
      <SpotlightName> {coinList[currentFavorite]?.CoinName}</SpotlightName>
      <CoinImage spotlight coin={coinList[currentFavorite]} />
    </Tile>
  );
};

export default CoinSpotlight;
