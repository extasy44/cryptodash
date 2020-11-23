import React, { useContext } from 'react';
import { AppContext } from '../App/AppProvider';
import { SelectableTile } from '../Shared/Tiles';
import CoinHeaderGrid from './CoinHeaderGrid';
import CoinImage from '../Shared/CoinImage';

const CoinTile = ({ coinKey }) => {
  const { state } = useContext(AppContext);
  let coin = state.coinList[coinKey];
  const TileClass = SelectableTile;

  return (
    <TileClass>
      <CoinHeaderGrid name={coin.CoinName} symbol={coin.Symbol} />
      <CoinImage coin={coin} />
    </TileClass>
  );
};

export default CoinTile;
