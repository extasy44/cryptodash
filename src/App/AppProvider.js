import React, { createContext, useReducer, useEffect } from 'react';
import cc from 'cryptocompare';

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  cc.setApiKey(process.env.REACT_APP_CRYPTO_API);

  const initialState = {
    page: 'dashboard',
    firstVisit: true,
    coinList: {},
  };

  const mainReducer = (state, action) => {
    switch (action.type) {
      case 'page':
        return {
          ...state,
          page: action.payload,
        };

      case 'firstVisit':
        return {
          ...state,
          firstVisit: action.payload,
        };

      case 'coinList':
        return { ...state, coinList: action.payload };
      default:
        return state;
    }
  };

  useEffect(() => {
    fetchCoins();
  }, []);

  const [state, dispatch] = useReducer(mainReducer, initialState);

  const savedSettings = () => {
    let cryptoDashData = JSON.parse(localStorage.getItem('cryptoDash'));

    if (!cryptoDashData) {
      dispatch({ type: 'settings', payload: 'settings' });
      dispatch({ type: 'firstVisit', payload: true });
    }

    return {};
  };

  const confirmFavorites = () => {
    dispatch({ type: 'firstVisit', payload: false });
    dispatch({ type: 'page', payload: 'dashboard' });
    localStorage.setItem(
      'cryptoDash',
      JSON.stringify({
        test: 'hello',
      })
    );
  };

  const fetchCoins = async () => {
    let coinList = await cc.coinList().data;

    dispatch({ type: 'coinList', payload: { coinList } });
  };

  return (
    <AppContext.Provider
      value={{ state, dispatch, confirmFavorites, savedSettings }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
