import React, { createContext, useReducer } from 'react';
import { makeUser } from './selectors';

export const START_RESULTS = 'startResults';
export const SUCCESS_RESULTS = 'successResults';
export const ERROR_RESULTS = 'errorResults';
export const START_RESULT_USER = 'startResultUser';
export const SUCCESS_RESULT_USER = 'successResultUser';
export const ERROR_RESULT_USER = 'errorResultUser';
export const RESET_USERS = 'resetUsers';

export const START_UPDATE_USER = 'startUpdateUser';
export const SUCCESS_UPDATE_USER = 'successUpdateUser';
export const ERROR_UPDATE_USER = 'errorUpdateUser';
export const DISMISS_ERROR_UPDATE_USER = 'dismissErrorUpdateUser';
export const DISMISS_SUCCESS_UPDATE_USER = 'dismissSuccessUpdateUser';

export const START_CREATE_USER = 'startCreateUser';
export const SUCCESS_CREATE_USER = 'successCreateUser';
export const ERROR_CREATE_USER = 'errorCreateUser';
export const DISMISS_ERROR_CREATE_USER = 'dismissErrorCreateUser';
export const RESET_CREATE_USER = 'resetCreateUser';

const initialState = {
  data: null,
  loading: false,
  error: false,
  currentUser: null,
}

const editUserInitialState = {
  data: null,
  loadingGetUser: false,
  errorGetUser: false,
  loadingUpdateUser: false,
  errorUpdateUser: false,
  successUpdateUser: false,
}

const createUserInitialState = {
  userId: null,
  loading: false,
  error: false,
  success: false,
}

export const HomeContext = createContext(initialState);
export const EditUserContext = createContext(editUserInitialState);
export const CreateUserContext = createContext(createUserInitialState);

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
        loadingGetUser: true,
      };
    case SUCCESS_RESULT_USER:
      return {
        ...state,
        loadingGetUser: false,
        data: makeUser(action.data),
      };
    case ERROR_RESULT_USER:
      return {
        ...state,
        loadingGetUser: false,
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
        successUpdateUser: true,
      };
    case ERROR_UPDATE_USER:
      return {
        ...state,
        loadingUpdateUser: false,
        errorUpdateUser: action.error,
      };
    case DISMISS_ERROR_UPDATE_USER:
      return {
        ...state,
        errorUpdateUser: false,
      };
    case DISMISS_SUCCESS_UPDATE_USER:
      return {
        ...state,
        successUpdateUser: false,
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

export const createUserReducer = (state, action) => {
  switch (action.type) {
    case START_CREATE_USER:
      return {
        ...state,
        loading: true,
      };
    case SUCCESS_CREATE_USER:
      return {
        ...state,
        loading: false,
        userId: action.data.id,
        success: true,
      };
    case ERROR_CREATE_USER:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case DISMISS_ERROR_CREATE_USER:
      return {
        ...state,
        error: false,
      };
    case RESET_CREATE_USER:
      return createUserInitialState;
    default:
      throw new Error();
  }
}

export const HomeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <HomeContext.Provider value={{state, dispatch}}>
      {children}
    </HomeContext.Provider>
  )
}

export const EditUserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, editUserInitialState);
  return (
    <EditUserContext.Provider value={{state, dispatch}}>
      {children}
    </EditUserContext.Provider>
  )
}

export const CreateUserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(createUserReducer, createUserInitialState);
  return (
    <CreateUserContext.Provider value={{state, dispatch}}>
      {children}
    </CreateUserContext.Provider>
  )
}