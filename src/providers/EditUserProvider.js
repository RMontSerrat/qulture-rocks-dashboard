import React, { createContext, useReducer } from 'react';
import { makeUser } from '../selectors/user';

export const START_RESULT_USER = 'startResultUser';
export const SUCCESS_RESULT_USER = 'successResultUser';
export const ERROR_RESULT_USER = 'errorResultUser';
export const RESET_USERS = 'resetUsers';

export const START_UPDATE_USER = 'startUpdateUser';
export const SUCCESS_UPDATE_USER = 'successUpdateUser';
export const ERROR_UPDATE_USER = 'errorUpdateUser';
export const DISMISS_ERROR_UPDATE_USER = 'dismissErrorUpdateUser';
export const DISMISS_SUCCESS_UPDATE_USER = 'dismissSuccessUpdateUser';

const initialState = {
  data: null,
  loadingGetUser: false,
  errorGetUser: false,
  loadingUpdateUser: false,
  errorUpdateUser: false,
  successUpdateUser: false,
}

export const EditUserContext = createContext(initialState);

export const reducer = (state, action) => {
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

const EditUserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <EditUserContext.Provider value={{state, dispatch}}>
      {children}
    </EditUserContext.Provider>
  )
}

export default EditUserProvider;
