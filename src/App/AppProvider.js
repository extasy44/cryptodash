import React, { createContext, useReducer, useEffect } from 'react';
import cc from 'cryptocompare';
import _ from 'lodash';

export const AppContext = createContext();
const MAX_FAVORITES = 10;

const AppProvider = ({ children }) => {
  cc.setApiKey(process.env.REACT_APP_CRYPTO_API);

  const initialState = {
    page: 'dashboard',
    firstVisit: true,
    coinList: [],
    favorites: ['BTC', 'ETH', 'XMR', 'DOGE', 'ORB'],
    currentFavorite: [],
    filteredCoins: [],
    prices: [],
  };

  const mainReducer = (state, action) => {
    return { ...state, [action.type]: action.payload };
  };

  const [state, dispatch] = useReducer(mainReducer, initialState);

  const savedSettings = () => {
    let cryptoDashData = JSON.parse(localStorage.getItem('cryptoDash'));

    if (!cryptoDashData) {
      dispatch({ type: 'settings', payload: 'settings' });
      dispatch({ type: 'firstVisit', payload: true });
    } else {
      let { favorites, currentFavorite } = cryptoDashData;
      dispatch({ type: 'favorites', payload: favorites });
      dispatch({ type: 'currentFavorite', payload: currentFavorite });
    }
  };

  const fetchPrices = async () => {
    if (state.firstVisit) return;
    let prices = await getPrices();

    dispatch({ type: 'prices', payload: [...prices] });
  };

  const getPrices = async () => {
    let returnData = [];
    console.log(state.favorites);
    for (let i = 0; i < state.favorites.length; i++) {
      try {
        let priceData = await cc.priceFull(state.favorites[i], 'AUD');
        returnData.push(priceData);
      } catch (e) {
        console.warn('Fetch price error: ', e.message);
      }
    }
    console.log(returnData);
    return returnData;
  };

  const confirmFavorites = () => {
    let currentFavorite = state.favorites[0];
    dispatch({ type: 'firstVisit', payload: false });
    dispatch({ type: 'page', payload: 'dashboard' });
    dispatch({ type: 'currentFavorite', payload: currentFavorite });
    localStorage.setItem(
      'cryptoDash',
      JSON.stringify({
        favorites: state.favorites,
        currentFavorite: state.currentFavorite,
      })
    );
    fetchPrices();
  };

  const setCurrentFavorite = (sym) => {
    dispatch({ type: 'currentFavorite', payload: sym });
    localStorage.setItem(
      'cryptoDash',
      JSON.stringify({
        favorites: state.favorites,
        currentFavorite: state.currentFavorite,
      })
    );
  };

  const fetchCoins = async () => {
    let coinList = (await cc.coinList()).Data;
    dispatch({ type: 'coinList', payload: coinList });
  };

  const addCoin = (key) => {
    let favorites = [...state.favorites];

    if (favorites.length < MAX_FAVORITES) {
      favorites.push(key);
      dispatch({ type: 'favorites', payload: favorites });
    }
  };

  const isInFavorites = (key) => _.includes(state.favorites, key);

  const removeCoin = (key) => {
    let favorites = [...state.favorites];
    dispatch({ type: 'favorites', payload: _.pull(favorites, key) });
  };

  const setFilteredCoins = (filteredCoins) => {
    dispatch({ type: 'filteredCoins', payload: filteredCoins });
  };

  useEffect(() => {
    savedSettings();
    fetchCoins();
    fetchPrices();
    // eslint-disable-next-line
  }, []);

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
        confirmFavorites,
        savedSettings,
        addCoin,
        removeCoin,
        isInFavorites,
        setFilteredCoins,
        setCurrentFavorite,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
