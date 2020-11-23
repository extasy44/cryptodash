import React, { useContext } from 'react';
import styled, { css } from 'styled-components';
import { AppContext } from '../App/AppProvider';
import { SelectableTile } from '../Shared/Tiles';

export const CoinGridStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 15px;
`;

const CoinGrid = () => {
  const { state } = useContext(AppContext);
  const { coinList } = state;
  console.log(coinList);
  return (
    <CoinGridStyled>
      {Object.keys(coinList).map((coinKey, index) => {
        return <SelectableTile key={index}>{coinKey}</SelectableTile>;
      })}
    </CoinGridStyled>
  );
};

export default CoinGrid;
