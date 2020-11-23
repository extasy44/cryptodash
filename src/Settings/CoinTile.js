import React, { useContext } from 'react';
import { AppContext } from '../App/AppProvider';
import { SelectableTile, DisabledTile, DeletableTile } from '../Shared/Tiles';
import CoinHeaderGrid from './CoinHeaderGrid';
import CoinImage from '../Shared/CoinImage';

const CoinTile = ({ coinKey, topSection }) => {
  const { state } = useContext(AppContext);
  let coin = state.coinList[coinKey];
  let TileClass = SelectableTile;

  if (topSection) {
    TileClass = DeletableTile;
  }

  return (
    <TileClass>
      <CoinHeaderGrid
        topSection={topSection}
        name={coin.CoinName}
        symbol={coin.Symbol}
      />
      <CoinImage coin={coin} />
    </TileClass>
  );
};

export default CoinTile;
