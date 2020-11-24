import React, { useContext } from 'react';
import { AppContext } from '../App/AppProvider';
import { SelectableTile, DisabledTile, DeletableTile } from '../Shared/Tiles';
import CoinHeaderGrid from './CoinHeaderGrid';
import CoinImage from '../Shared/CoinImage';

const clickCoinHandler = (topSection, coinKey, addCoin, removeCoin) => {
  return topSection
    ? () => {
        removeCoin(coinKey);
      }
    : () => {
        addCoin(coinKey);
      };
};

const CoinTile = ({ coinKey, topSection }) => {
  const { state, addCoin, removeCoin, isInFavorites } = useContext(AppContext);
  let coin = state.coinList[coinKey];
  let TileClass = SelectableTile;

  if (topSection) {
    TileClass = DeletableTile;
  } else if (isInFavorites(coinKey)) {
    TileClass = DisabledTile;
  }

  return (
    <TileClass
      onClick={clickCoinHandler(topSection, coinKey, addCoin, removeCoin)}
    >
      <CoinHeaderGrid
        topSection={topSection}
        name={coin?.CoinName}
        symbol={coin?.Symbol}
      />
      <CoinImage coin={coin} />
    </TileClass>
  );
};

export default CoinTile;
