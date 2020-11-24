import React, { useContext } from 'react';
import styled from 'styled-components';
import { backgroundColor2, fontSize2 } from '../Shared/Styles';
import { AppContext } from '../App/AppProvider';
import _ from 'lodash';
import fuzzy from 'fuzzy';

const SearchGrid = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;
`;

const SearchInput = styled.input`
  ${backgroundColor2}
  ${fontSize2}
  border: 1px solid;
  height: 25px;
  color: #1163c9;
  place-self: center left;
`;

const Search = () => {
  const { setFilteredCoins, state } = useContext(AppContext);
  const { coinList } = state;

  const handleFilter = _.debounce((inputValue, coinList, setFilterCoins) => {
    // Get all the coin symbol
    let coinSymbols = Object.keys(coinList);
    let coinNames = coinSymbols.map((sym) => coinList[sym].CoinName);
    let allStringsToSearch = coinSymbols.concat(coinNames);
    let fuzzyResults = fuzzy
      .filter(inputValue, allStringsToSearch, {})
      .map((result) => result.string);
    let filteredCoins = _.pickBy(coinList, (result, symKey) => {
      let coinName = result.CoinName;
      return (
        _.includes(fuzzyResults, symKey) || _.includes(fuzzyResults, coinName)
      );
    });
    //console.log(filteredCoins);
    setFilterCoins(filteredCoins);
  }, 500);

  const filterCoins = (e, setFilteredCoins, coinList) => {
    let inputValue = e.target.value;
    if (!inputValue) {
      setFilteredCoins(null);
      return;
    }
    handleFilter(inputValue, coinList, setFilteredCoins);
  };

  return (
    <SearchGrid>
      <h2>Search all coins</h2>
      <SearchInput
        onKeyUp={(e) => filterCoins(e, setFilteredCoins, coinList)}
      />
    </SearchGrid>
  );
};

export default Search;
