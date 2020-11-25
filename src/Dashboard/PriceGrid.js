import React, { useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from '../App/AppProvider';
import PriceTile from './PriceTile';

const PriceGridStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 15px;
  margin-top: 40px;
`;

const PriceGrid = () => {
  const { state } = useContext(AppContext);
  let { prices } = state;

  return (
    <PriceGridStyled>
      {prices.length === 0 ? (
        <div>Loading Prices ... </div>
      ) : (
        prices.map((price, index) => (
          <PriceTile key={`priceTile-${index}`} index={index} price={price} />
        ))
      )}
    </PriceGridStyled>
  );
};

export default PriceGrid;
