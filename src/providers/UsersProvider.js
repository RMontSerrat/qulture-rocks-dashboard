import React, { createContext, useReducer } from 'react';

export const START_RESULTS = 'startResults';
export const SUCCESS_RESULTS = 'successResults';
export const ERROR_RESULTS = 'errorResults';

const initialState = {
  data: null,
  loading: false,
  error: false,
  currentUser: null,
}

export const HomeContext = createContext(initialState);

export const reducer = (state, action) => {
  switch (action.type) {
    case START_RESULTS:
      return {
        ...state,
        loading: true,
      }
    case SUCCESS_RESULTS:
      return {
        ...state,
        loading: false,
        data: action.data,
      };
    case ERROR_RESULTS:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      throw new Error();
  }
}

const UsersProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <HomeContext.Provider value={{state, dispatch}}>
      {children}
    </HomeContext.Provider>
  )
}

export default UsersProvider;