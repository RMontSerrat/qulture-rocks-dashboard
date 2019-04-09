import React, { createContext, useReducer } from 'react';
import { makeUser } from './selectors';

export const START_RESULTS = 'startResultUsers';
export const SUCCESS_RESULTS = 'successResultUsers';
export const ERROR_RESULTS = 'errorResultUsers';
export const START_RESULT_USER = 'startResultRepositories';
export const SUCCESS_RESULT_USER = 'successResultRepositories';
export const ERROR_RESULT_USER = 'errorResultRepositories';
export const RESET_USERS = 'resetUsers';

export const START_UPDATE_USER = 'startUpdateUser';
export const SUCCESS_UPDATE_USER = 'successUpdateUser';
export const ERROR_UPDATE_USER = 'errorUpdateUser';

export const START_CREATE_USER = 'startCreateUser';
export const SUCCESS_CREATE_USER = 'successCreateUser';
export const ERROR_CREATE_USER = 'errorCreateUser';

const initialState = {
  data: null,
  loading: false,
  error: false,
  currentUser: null,
}

const userInitialState = {
  data: null,
  loading: false,
  error: false,
  loadingUpdateUser: false,
  errorUpdateUser: false,
  loadingCreateUser: false,
  errorCreateUser: false,
}

export const HomeContext = createContext(initialState);
export const UserContext = createContext(userInitialState);

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

export const userReducer = (state, action) => {
  switch (action.type) {
    case START_RESULT_USER:
      return {
        ...state,
        loading: true,
      };
    case SUCCESS_RESULT_USER:
      return {
        ...state,
        loading: false,
        data: makeUser(action.data),
      };
    case ERROR_RESULT_USER:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case START_UPDATE_USER:
      return {
        ...state,
        loadingUpdateUser: true,
      };
    case SUCCESS_UPDATE_USER:
      return {
        ...state,
        loadingUpdateUser: false,
        data: makeUser(action.data),
      };
    case ERROR_UPDATE_USER:
      return {
        ...state,
        loadingUpdateUser: false,
        errorUpdateUser: action.error,
      };
    case START_CREATE_USER:
      return {
        ...state,
        loadingCreateUser: true,
      };
    case SUCCESS_CREATE_USER:
      return {
        ...state,
        loadingCreateUser: false,
        data: makeUser(action.data),
      };
    case ERROR_CREATE_USER:
      return {
        ...state,
        loading: false,
        errorCreateUser: action.error,
      };
    case RESET_USERS:
      return {
        loading: false,
        error: false,
        data: null,
      };
    default:
      throw new Error();
  }
}

export const HomeContainer = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <HomeContext.Provider value={{state, dispatch}}>
      {children}
    </HomeContext.Provider>
  )
}

export const UserContainer = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, userInitialState);
  return (
    <UserContext.Provider value={{state, dispatch}}>
      {children}
    </UserContext.Provider>
  )
}