import React, { useContext } from 'react';
import styled, { css } from 'styled-components';
import { SelectableTile } from '../Shared/Tiles';
import { fontSize3, fontSizeBig, greenBoxShadow } from '../Shared/Styles';
import { CoinHeaderGridStyled } from '../Settings/CoinHeaderGrid';
import { AppContext } from '../App/AppProvider';

const numberFormat = (number) => {
  return +(number + '').slice(0, 7);
};

const JustifyRight = styled.div`
  justify-self: right;
`;

const JustifyLeft = styled.div`
  justify-self: left;
`;

const TickerPrice = styled.div`
  ${fontSizeBig}
`;

const ChangePct = styled.div`
  color: green;
  ${(props) =>
    props.red &&
    css`
      color: red;
    `}
`;
const PriceTileStyled = styled(SelectableTile)`
  ${(props) =>
    props.compact &&
    css`
      display: grid;
      ${fontSize3}
      grid-gap: 5px;
      grid-template-columns: repeat(3, 1fr);
      justify-items: right;
    `}

  ${(props) =>
    props.currentFavorite &&
    css`
      ${greenBoxShadow}
      pointer-events: none;
    `}
`;

const ChangePercent = ({ data }) => {
  return (
    <JustifyRight>
      <ChangePct red={data.CHANGEPCT24HOUR < 0}>
        {numberFormat(data.CHANGEPCT24HOUR)}
      </ChangePct>
    </JustifyRight>
  );
};

const PriceTileRow = ({ sym, data, currentFavorite, setCurrentFavorite }) => {
  return (
    <PriceTileStyled
      onClick={setCurrentFavorite}
      currentFavorite={currentFavorite}
    >
      <CoinHeaderGridStyled>
        <div>{sym}</div>
        <ChangePercent data={data} />
      </CoinHeaderGridStyled>
      <TickerPrice>${numberFormat(data.PRICE)}</TickerPrice>
    </PriceTileStyled>
  );
};

const PriceTileCompact = ({
  sym,
  data,
  currentFavorite,
  setCurrentFavorite,
}) => {
  return (
    <PriceTileStyled
      compact
      currentFavorite={currentFavorite}
      onClick={setCurrentFavorite}
    >
      <JustifyLeft>{sym}</JustifyLeft>
      <ChangePercent data={data} />
      <div>${numberFormat(data.PRICE)}</div>
    </PriceTileStyled>
  );
};

const PriceTile = ({ price, index }) => {
  const { state, setCurrentFavorite } = useContext(AppContext);
  let sym = Object.keys(price)[0];
  let data = price[sym]['AUD'];
  let TileClass = index < 5 ? PriceTileRow : PriceTileCompact;
  return (
    <TileClass
      sym={sym}
      data={data}
      currentFavorite={state.currentFavorite === sym}
      setCurrentFavorite={() => setCurrentFavorite(sym)}
    ></TileClass>
  );
};

export default PriceTile;
