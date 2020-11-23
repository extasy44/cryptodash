import React, { createContext, useReducer } from 'react';

export const AppContext = createContext();

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

    default:
      return state;
  }
};

const AppProvider = ({ children }) => {
  const initialState = {
    page: 'dashboard',
    firstVisit: true,
  };

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

  return (
    <AppContext.Provider
      value={{ state, dispatch, confirmFavorites, savedSettings }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
